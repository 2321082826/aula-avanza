require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const crypto = require('node:crypto');
const path = require('node:path');
const { db, auth } = require('./firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');

const app = express();
app.disable('x-powered-by');
// SDK web servido desde gstatic; configurar CSP específica antes de despliegue público.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30,
  standardHeaders: 'draft-8', legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intenta de nuevo más tarde.' }
});
app.use('/api/registro', authLimiter);
app.use('/api/login', authLimiter);

function validarCuenta(nombre, password) {
  const usuario = typeof nombre === 'string' ? nombre.trim().toLowerCase() : '';
  if (!/^[a-z0-9_]{3,24}$/.test(usuario)) throw Object.assign(new Error('Usuario: 3 a 24 letras minúsculas, números o guion bajo.'), { status: 400 });
  if (typeof password !== 'string' || password.length < 10 || Buffer.byteLength(password,'utf8') > 72) {
    throw Object.assign(new Error('La contraseña debe tener de 10 a 72 bytes.'), { status: 400 });
  }
  return usuario;
}
function errorHttp(res, err) {
  if (!err.status || err.status >= 500) console.error('Error de servidor:', err);
  res.status(err.status || 500).json({ error: err.status ? err.message : 'Error interno del servidor' });
}
function api(fn) { return (req,res) => Promise.resolve(fn(req,res)).catch(err=>errorHttp(res,err)); }
function fallo(status, message) {throw Object.assign(new Error(message), {status});}

app.get('/api/config', (req,res) => res.json({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}));

app.post('/api/registro', api(async (req,res) => {
  const usuario = validarCuenta(req.body.usuario, req.body.password);
  const passwordHash = await bcrypt.hash(req.body.password, 12);
  const uid = crypto.randomUUID();
  const usuarioRef = db.doc(`nombresUsuario/${usuario}`);
  const perfilRef = db.doc(`usuarios/${uid}`);
  const secretRef = db.doc(`credenciales/${uid}`);
  // Crear cuenta en Firebase Auth usando UID propio. Sin correo.
  await auth.createUser({ uid, displayName: usuario, disabled: false });
  try {
    await db.runTransaction(async tx => {
      const existente = await tx.get(usuarioRef);
      if (existente.exists) fallo(409, 'Ese nombre de usuario ya está ocupado');
      tx.create(usuarioRef, { uid });
      tx.create(perfilRef, { nombreUsuario: usuario, gradoSeleccionado: null, creadoEn: FieldValue.serverTimestamp() });
      tx.create(secretRef, { hash: passwordHash });
    });
  } catch (e) {
    await auth.deleteUser(uid).catch(() => {});
    throw e;
  }
  const token = await auth.createCustomToken(uid);
  res.status(201).json({ token });
}));

app.post('/api/login', api(async (req,res) => {
  const usuario = validarCuenta(req.body.usuario, req.body.password);
  const nombreSnap = await db.doc(`nombresUsuario/${usuario}`).get();
  if (!nombreSnap.exists) fallo(401, 'Usuario o contraseña incorrectos');
  const uid = nombreSnap.data().uid;
  const secreto = await db.doc(`credenciales/${uid}`).get();
  const correcto = secreto.exists && await bcrypt.compare(req.body.password, secreto.data().hash);
  if (!correcto) fallo(401, 'Usuario o contraseña incorrectos');
  const token = await auth.createCustomToken(uid);
  res.json({ token });
}));

async function verificar(req,res,next) {
  try {
    const valor = req.headers.authorization || '';
    if (!valor.startsWith('Bearer ')) return res.status(401).json({ error: 'Inicia sesión primero' });
    req.uid = (await auth.verifyIdToken(valor.slice(7), true)).uid;
    next();
  } catch { res.status(401).json({ error: 'Sesión inválida' }); }
}
app.use('/api/privado', verificar);

app.get('/api/privado/perfil', api(async(req,res)=>{
  const snap = await db.doc(`usuarios/${req.uid}`).get();
  if (!snap.exists) fallo(404,'Usuario no encontrado');
  res.json({ uid:req.uid, nombreUsuario:snap.data().nombreUsuario, gradoSeleccionado:snap.data().gradoSeleccionado });
}));

app.post('/api/privado/grado', api(async (req,res) => {
  const grado = Number(req.body.grado);
  if (!Number.isInteger(grado) || grado < 1 || grado > 6) fallo(400, 'Grado incorrecto');
  await db.doc(`usuarios/${req.uid}`).update({ gradoSeleccionado: grado });
  res.json({ ok:true, grado });
}));

app.get('/api/privado/contenido/:grado', api(async(req,res)=>{
  const grado = Number(req.params.grado);
  if (!Number.isInteger(grado) || grado<1 || grado>6) fallo(400,'Grado inválido');
  const [materias, temas] = await Promise.all([
    db.collection('materias').where('grado','==',grado).get(),
    db.collection('temas').where('grado','==',grado).get()
  ]);
  res.json({ grado,
    materias: materias.docs.map(x=>({ id:x.id, ...x.data() })).sort((a,b)=>a.orden-b.orden),
    temas: temas.docs.map(x=>({ id:x.id, ...x.data() })).sort((a,b)=>a.orden-b.orden)
  });
}));

function refProgreso(uid,grado) { return db.doc(`usuarios/${uid}/progreso/grado_${grado}`); }
app.get('/api/privado/progreso/:grado', api(async(req,res)=>{
  const grado = Number(req.params.grado);
  if (!Number.isInteger(grado) || grado<1 || grado>6) fallo(400,'Grado inválido');
  const snap = await refProgreso(req.uid,grado).get();
  res.json(snap.exists ? snap.data() : { estudiados:[], notas:{}, general:null });
}));
// Comprobación de comprensión: el servidor elige las opciones y valida la respuesta.
// La respuesta correcta no se envía al navegador antes de responder.
async function prepararVerificacion(temaId) {
  if (typeof temaId !== 'string' || !/^[a-z0-9_]{1,100}$/.test(temaId)) fallo(400, 'Tema inválido');
  const snap = await db.doc(`temas/${temaId}`).get();
  if (!snap.exists) fallo(404, 'Tema no encontrado');
  const tema = snap.data();
  const otros = await db.collection('temas').where('materiaId', '==', tema.materiaId).get();
  const temas = otros.docs.map(d => ({id:d.id, ...d.data()}))
    .filter(t => t.id !== temaId && typeof t.explicacion === 'string');
  if (temas.length < 2) fallo(409, 'Se necesitan al menos tres temas para generar esta comprobación');

  // Diferente de las preguntas del examen acumulativo; las opciones incorrectas
  // proceden de explicaciones de otros temas de la misma materia.
  const resumir = texto => String(texto).trim().slice(0, 240);
  const seleccion = [...temas].sort((a,b) => a.id.localeCompare(b.id)).slice(0, 2);
  let opciones = [resumir(tema.explicacion), ...seleccion.map(t => resumir(t.explicacion))];
  // Rotación determinista basada en el identificador, para que la corrección
  // utilice exactamente el mismo orden que se presentó al estudiante.
  const desplazamiento = [...temaId].reduce((n,c)=>n+c.charCodeAt(0),0) % 3;
  opciones = opciones.slice(desplazamiento).concat(opciones.slice(0, desplazamiento));
  const correcta = (3 - desplazamiento) % 3;
  return { tema, opciones, correcta };
}

app.get('/api/privado/verificacion/:temaId', api(async(req,res) => {
  const {tema, opciones} = await prepararVerificacion(req.params.temaId);
  res.json({
    temaId: req.params.temaId,
    titulo: tema.titulo,
    pregunta: `¿Cuál de estas explicaciones corresponde a «${tema.titulo}»?`,
    opciones
  });
}));

app.post('/api/privado/verificar-tema', api(async(req,res) => {
  const {temaId, opcion} = req.body;
  if (!Number.isInteger(opcion) || opcion < 0 || opcion > 2) fallo(400, 'Selecciona una respuesta válida');
  const {tema, correcta} = await prepararVerificacion(temaId);
  if (opcion !== correcta) return res.json({correcto:false, mensaje:'Aún no es correcto. Repasa la explicación y vuelve a intentarlo.'});
  await refProgreso(req.uid, tema.grado).set({
    estudiados:FieldValue.arrayUnion(temaId)
  }, {merge:true});
  res.json({correcto:true, mensaje:'¡Bien! Se comprobó la respuesta y se guardó tu avance.'});
}));
// No hay ruta que permita marcar como estudiado sin responder.

async function preguntasMateria(materiaId) {
  const snap = await db.collection('preguntas').where('materiaId','==',materiaId).get();
  return snap.docs.map(x=>({id:x.id, ...x.data()})).sort((a,b)=>a.orden-b.orden);
}
async function datosExamen(grado,materiaId,uid) {
  const progresoSnap = await refProgreso(uid,grado).get();
  const progreso = progresoSnap.exists ? progresoSnap.data() : {};
  if (materiaId === 'general') {
    const mats = await db.collection('materias').where('grado','==',grado).get();
    if (mats.empty || mats.docs.some(m=>!(progreso.notas||{})[m.id])) fallo(403,'Completa primero los exámenes de todas las materias');
    const sets = await Promise.all(mats.docs.map(m=>preguntasMateria(m.id)));
    const qs = sets.map(xs=>xs[0]).filter(Boolean);
    return qs;
  }
  const mat = await db.doc(`materias/${materiaId}`).get();
  if (!mat.exists || mat.data().grado!==grado) fallo(404,'Materia incorrecta');
  const temas = await db.collection('temas').where('materiaId','==',materiaId).get();
  const estudiados = progreso.estudiados || [];
  if (temas.empty || temas.docs.some(t=>!estudiados.includes(t.id))) fallo(403,'Estudia todos los temas antes del examen');
  return preguntasMateria(materiaId);
}
// Máximo de tres envíos CALIFICADOS por examen y por grado.
const MAX_INTENTOS = 3;
function notaAnterior(progreso, materiaId) {
  return materiaId === 'general' ? progreso.general : progreso.notas?.[materiaId];
}
function totalIntentos(progreso, materiaId) {
  const valor = progreso.intentos?.[materiaId];
  return Number.isInteger(valor) ? valor : (notaAnterior(progreso,materiaId) ? 1 : 0);
}
function validarExamenId(grado, materiaId) {
  if(!Number.isInteger(grado)||grado<1||grado>6 ||
     typeof materiaId !== 'string' ||
     !(materiaId === 'general' || new RegExp('^g'+grado+'_[a-z]+$').test(materiaId))) {
     fallo(400, 'Examen inválido');
  }
}
function refHistorial(uid) { return db.collection(`usuarios/${uid}/intentos`); }

app.get('/api/privado/historial/:grado', api(async(req,res)=>{
  const grado=Number(req.params.grado);
  if(!Number.isInteger(grado)||grado<1||grado>6) fallo(400,'Grado inválido');
  const [snap,pSnap]=await Promise.all([
    refHistorial(req.uid).where('grado','==',grado).get(),
    refProgreso(req.uid,grado).get()
  ]);
  const p=pSnap.exists?pSnap.data():{};
  const registros=snap.docs.map(d=>({id:d.id,...d.data()}));
  const registrados=new Set(registros.map(x=>x.materiaId));
  // Las notas antiguas se muestran como un primer intento histórico.
  for(const [id,n] of Object.entries({...p.notas,...(p.general?{general:p.general}:{})})){
    if(!registrados.has(id) && n){
      registros.push({id:'legacy_'+id,materiaId:id,grado,intento:1,
        calificacion:n.calificacion,aciertos:n.aciertos,total:n.total,
        fecha:n.fecha||null,origen:'anterior'});
    }
  }
  registros.sort((a,b)=>(b.fecha||'').localeCompare(a.fecha||''));
  const contadores={};
  for(const id of [...new Set([...registros.map(r=>r.materiaId),'general'])]){
    contadores[id]=totalIntentos(p,id);
  }
  res.json({maxIntentos:MAX_INTENTOS,intentos:contadores,registros});
}));

app.get('/api/privado/examen/:grado/:materiaId', api(async(req,res)=>{
  const grado=Number(req.params.grado);
  if (!Number.isInteger(grado) || grado<1 || grado>6) fallo(400,'Grado incorrecto');
  validarExamenId(grado,req.params.materiaId);
  const pSnap=await refProgreso(req.uid,grado).get();
  if(totalIntentos(pSnap.exists?pSnap.data():{},req.params.materiaId)>=MAX_INTENTOS) fallo(403,'Has agotado los 3 intentos de este examen');
  const qs=await datosExamen(grado,req.params.materiaId,req.uid);
  res.json({ tipo:req.params.materiaId==='general'?'general':'materia', preguntas:qs.map(q=>({id:q.id,enunciado:q.enunciado,opciones:q.opciones,materiaId:q.materiaId})) });
}));
app.post('/api/privado/calificar', api(async(req,res)=>{
  const {grado,materiaId,respuestas}=req.body;
  validarExamenId(grado,materiaId);
  if(!Array.isArray(respuestas)) fallo(400,'Evaluación inválida');
  // Revalidar prerrequisitos y respuestas en el servidor, no confiar en el navegador.
  const qs=await datosExamen(grado,materiaId,req.uid);
  if(!qs.length || respuestas.length!==qs.length) fallo(400,'Responde todas las preguntas');
  const recibidas=new Map();
  for(const r of respuestas){
    if(!r||typeof r.id!=='string'||!Number.isInteger(r.opcion)||r.opcion<0||r.opcion>3||recibidas.has(r.id)) fallo(400,'Respuestas inválidas');
    recibidas.set(r.id,r.opcion);
  }
  if(qs.some(q=>!recibidas.has(q.id))) fallo(400,'Faltan respuestas');
  const aciertos=qs.filter(q=>recibidas.get(q.id)===q.correcta).length;
  const calificacion=Number((aciertos/qs.length*10).toFixed(1));
  const detalle=qs.map(q=>({id:q.id,acierto:recibidas.get(q.id)===q.correcta,correcta:q.opciones[q.correcta]}));
  const desglose={};
  if(materiaId==='general'){
    const porMateria={};
    for(const q of qs){
      const a=porMateria[q.materiaId]||{aciertos:0,total:0};
      a.total++; if(recibidas.get(q.id)===q.correcta)a.aciertos++;
      porMateria[q.materiaId]=a;
    }
    for(const [id,a] of Object.entries(porMateria)) desglose[id]=Number((a.aciertos/a.total*10).toFixed(1));
  }
  const progresoRef=refProgreso(req.uid,grado);
  const fecha=new Date().toISOString();
  const docNuevo=refHistorial(req.uid).doc();
  let numeroIntento;
  await db.runTransaction(async tx=>{
    const snap=await tx.get(progresoRef);
    const previo=snap.exists?snap.data():{};
    const hechos=totalIntentos(previo,materiaId);
    if(hechos>=MAX_INTENTOS) fallo(403,'Has agotado los 3 intentos de este examen');
    numeroIntento=hechos+1;
    const previoAnterior=notaAnterior(previo,materiaId);
    if(!Number.isInteger(previo.intentos?.[materiaId]) && previoAnterior){
      // Preservar la última calificación existente antes de esta actualización.
      tx.set(refHistorial(req.uid).doc(`legado_g${grado}_${materiaId}`),{
        grado,materiaId,intento:1,calificacion:previoAnterior.calificacion,
        aciertos:previoAnterior.aciertos??null,total:previoAnterior.total??null,
        fecha:previoAnterior.fecha||null,origen:'anterior'
      });
    }
    const nota={calificacion,aciertos,total:qs.length,fecha};
    const cambios={intentos:{[materiaId]:numeroIntento}};
    if(materiaId==='general') cambios.general={...nota,desglose};
    else cambios.notas={[materiaId]:nota};
    tx.set(progresoRef,cambios,{merge:true});
    tx.create(docNuevo,{grado,materiaId,intento:numeroIntento,...nota,
      ...(materiaId==='general'?{desglose}:{})});
  });
  res.json({calificacion,aciertos,total:qs.length,detalle,
    ...(materiaId==='general'?{desglose}:{}),
    intento:numeroIntento,maxIntentos:MAX_INTENTOS});
}));

const PORT=Number(process.env.PORT||3000);
app.listen(PORT,()=>console.log(`Aula Avanza: http://localhost:${PORT}`));
