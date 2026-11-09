import {initializeApp} from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js';
import {getAuth,onAuthStateChanged,signInWithCustomToken,signOut} from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';

const appEl=document.querySelector('#app');
const identidad=document.querySelector('#identidad');
let auth=null, perfil=null, grado=null, contenido=null, progreso=null, materia=null, examen=null, historial={maxIntentos:3,intentos:{},registros:[]};
const escapar = v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const error = (msg)=>`<p class="alert error">${escapar(msg)}</p>`;
const e= (x)=>escapar(x);
function mostrar(html){appEl.innerHTML=html;window.scrollTo({top:0,behavior:'instant'});}
function encabezar(t,sub=''){return `<div class="eyebrow">Aula Avanza · ${grado}º de primaria</div><h1 class="heading">${e(t)}</h1><p class="intro">${e(sub)}</p>`;}
async function api(ruta,{method='GET',data,autorizado=true}={}) {
 const headers={};if(data)headers['Content-Type']='application/json';
 if(autorizado){const usuario=auth.currentUser;if(!usuario)throw Error('No hay una sesión activa');headers.Authorization='Bearer '+await usuario.getIdToken();}
 const r=await fetch('/api/'+ruta,{method,headers,body:data?JSON.stringify(data):undefined});
 const x=await r.json().catch(()=>({}));if(!r.ok)throw Error(x.error||'Error de conexión');return x;
}
function registro(esRegistro=false,msj='') {
 identidad.innerHTML=''; perfil=null; grado=null;
 mostrar(`<section class="panel auth auth-split" aria-labelledby="authTitulo">
   <div class="auth-hero">
    <div class="auth-hero-content">
      <span class="auth-hero-tag">AULA AVANZA · PLATAFORMA EDUCATIVA</span>
      <h2>Aprender abre nuevas posibilidades.</h2>
      <p>Un espacio para estudiar, practicar y avanzar a tu ritmo, de primero a sexto de primaria.</p>
      <div class="auth-highlights"><span>01 — Aprende</span><span>02 — Practica</span><span>03 — Avanza</span></div>
    </div>
   </div>
   <div class="auth-content">
    <div class="auth-badge">TU ESPACIO PARA APRENDER</div>
    <h1 id="authTitulo">${esRegistro?'Crea tu cuenta':'¡Bienvenido de nuevo!'}</h1>
    <p class="auth-intro">${esRegistro?'Regístrate con un usuario y una contraseña. No necesitas correo electrónico.':'Ingresa a tus lecciones, consulta tu progreso y continúa donde te quedaste.'}</p>
    ${msj?error(msj):''}
    <form id="formAcceso" class="auth-form">
      <div class="field">
        <label for="usuario">Nombre de usuario</label>
        <input id="usuario" name="usuario" autocomplete="username" minlength="3" maxlength="24" pattern="[a-zA-Z0-9_]{3,24}" title="Entre 3 y 24 caracteres: letras sin acentos, números o guion bajo" required placeholder="Ej. estudiante_10" aria-describedby="ayudaUsuario">
        <small class="ayuda" id="ayudaUsuario">3 a 24 caracteres · Letras sin acentos, números o guion bajo (_). Sin espacios.</small>
      </div>
      <div class="field">
        <label for="password">Contraseña</label>
        <div class="campo-contrasena">
          <input id="password" name="password" type="password" autocomplete="${esRegistro?'new-password':'current-password'}" minlength="10" required placeholder="Escribe tu contraseña" aria-describedby="ayudaPassword">
          <button type="button" class="ver-contrasena" id="verPassword" aria-label="Mostrar contraseña" aria-pressed="false">Mostrar</button>
        </div>
        <small class="ayuda" id="ayudaPassword">${esRegistro?'Mínimo 10 caracteres y máximo 72 bytes. Puedes combinar letras, números y símbolos.':'Usa la misma contraseña que registraste al crear tu cuenta.'}</small>
        ${esRegistro?'<div class="password-meter" aria-hidden="true"><span id="nivelSeguridad"></span></div><small class="password-meter-text" id="textoSeguridad">La longitud mínima es de 10 caracteres</small>':''}
      </div>
      <button class="btn fill auth-submit" type="submit">${esRegistro?'Crear mi cuenta':'Iniciar sesión'} <span aria-hidden="true">→</span></button>
    </form>
    <div class="auth-switch"><span>${esRegistro?'¿Ya tienes cuenta?':'¿Aún no tienes una cuenta?'}</span><button class="link" id="alternar" type="button">${esRegistro?'Iniciar sesión':'Registrarme'}</button></div>
    <p class="auth-privacy">Tu progreso se guarda en tu cuenta. Nunca compartas tu contraseña.</p>
   </div>
 </section>`);
 document.querySelector('#alternar').onclick=()=>registro(!esRegistro);
 const clave=document.querySelector('#password');
 const ver=document.querySelector('#verPassword');
 ver.onclick=()=>{
   const visible=clave.type==='password';
   clave.type=visible?'text':'password';
   ver.textContent=visible?'Ocultar':'Mostrar';
   ver.setAttribute('aria-pressed',String(visible));
   ver.setAttribute('aria-label',visible?'Ocultar contraseña':'Mostrar contraseña');
 };
 if(esRegistro){
   const barra=document.querySelector('#nivelSeguridad');
   const texto=document.querySelector('#textoSeguridad');
   clave.addEventListener('input',()=>{
     const valor=clave.value;
     const bytes=new TextEncoder().encode(valor).length;
     let nivel=0;
     if(valor.length>=10) nivel++;
     if(/[a-z]/.test(valor)&&/[A-Z]/.test(valor)) nivel++;
     if(/[0-9]/.test(valor)) nivel++;
     if(/[^a-zA-Z0-9]/.test(valor)) nivel++;
     const etiquetas=['Escribe una contraseña','Básica','Moderada','Buena','Más robusta'];
     barra.style.width=(nivel*25)+'%';
     barra.dataset.level=String(nivel);
     texto.textContent=bytes>72?'Supera el máximo de 72 bytes':etiquetas[nivel];
   });
 }
 document.querySelector('#formAcceso').onsubmit=async ev=>{
   ev.preventDefault();
   const form=ev.currentTarget;
   const btn=form.querySelector('button[type=submit]');
   const original=btn.innerHTML;
   const datos=Object.fromEntries(new FormData(form));
   datos.usuario=datos.usuario.trim().toLowerCase();
   if(esRegistro&&new TextEncoder().encode(datos.password).length>72){
     const pass=form.querySelector('#password');
     pass.setCustomValidity('La contraseña no debe superar 72 bytes');
     pass.reportValidity();
     pass.addEventListener('input',()=>pass.setCustomValidity(''),{once:true});
     return;
   }
   btn.disabled=true;btn.textContent=esRegistro?'Creando cuenta...':'Ingresando...';
   try{
     const {token}=await api(esRegistro?'registro':'login',{method:'POST',data:datos,autorizado:false});
     await signInWithCustomToken(auth,token);
   }catch(err){registro(esRegistro,err.message);}
   finally{if(btn.isConnected){btn.disabled=false;btn.innerHTML=original;}}
 };
}
async function cargarPerfil(){perfil=await api('privado/perfil');identidad.innerHTML=`<div class="fila"><span class="muted">@${e(perfil.nombreUsuario)}</span><button class="btn mini sec" id="salir">Salir</button></div>`;document.querySelector('#salir').onclick=()=>signOut(auth);if(perfil.gradoSeleccionado){await elegirGrado(perfil.gradoSeleccionado,false)}else{elegirPantallaGrado();}}
function elegirPantallaGrado(){grado=null;mostrar(`<section class="panel"><div class="eyebrow">Bienvenido, @${e(perfil.nombreUsuario)}</div><h1 class="heading">Selecciona tu grado escolar</h1><p class="intro">Puedes cambiar de grado después. Cada grado guarda su progreso por separado.</p><div class="grilla">${[1,2,3,4,5,6].map(n=>`<div class="tarjeta"><div class="numero">${n}º</div><h3>Primaria</h3><button class="btn" data-grado="${n}">Entrar</button></div>`).join('')}</div></section>`);document.querySelectorAll('[data-grado]').forEach(x=>x.onclick=()=>elegirGrado(Number(x.dataset.grado),true));}
async function elegirGrado(n,guardar){try{if(guardar)await api('privado/grado',{method:'POST',data:{grado:n}});grado=n;[contenido,progreso,historial]=await Promise.all([api(`privado/contenido/${n}`),api(`privado/progreso/${n}`),api(`privado/historial/${n}`)]);panelMaterias();}catch(err){mostrar(`<div class="panel">${error(err.message)}<button class="btn" id="volver">Volver</button></div>`);document.querySelector('#volver').onclick=elegirPantallaGrado;}}
function completados(m){return contenido.temas.filter(t=>t.materiaId===m.id&&progreso.estudiados?.includes(t.id)).length}
function total(m){return contenido.temas.filter(t=>t.materiaId===m.id).length}
function nota(m){return progreso.notas?.[m.id]?.calificacion;}
function todasNotas(){return contenido.materias.length>0&&contenido.materias.every(m=>progreso.notas?.[m.id]);}
function cantidadIntentos(id){return historial.intentos?.[id]??(id==='general'?(progreso.general?1:0):(progreso.notas?.[id]?1:0));}
function restantes(id){return Math.max(0,3-cantidadIntentos(id));}
function fechaVisible(fecha){if(!fecha)return 'Fecha anterior no disponible';const d=new Date(fecha);return isNaN(d.getTime())?'Sin fecha':d.toLocaleString('es-MX',{dateStyle:'medium',timeStyle:'short'});}
function tarjetaIntentos(id){const r=historial.registros.filter(x=>x.materiaId===id).sort((a,b)=>a.intento-b.intento);return `<div class="historial-evaluacion"><div class="historial-titulo"><strong>Historial de intentos</strong><span>${cantidadIntentos(id)} / 3 utilizados</span></div><div class="historial-linea">${[1,2,3].map(n=>{const dato=r.find(x=>x.intento===n);return `<div class="intento-celda ${dato?'realizado':''}"><span>Intento ${n}</span>${dato?`<strong>${e(dato.calificacion)}/10</strong><small>${e(fechaVisible(dato.fecha))}</small>`:'<strong>Disponible</strong>'}</div>`}).join('')}</div></div>`;}
function panelMaterias(){
 materia=null;
 mostrar(`<section class="panel"><div class="fila"><div>${encabezar('Tus materias','Cada materia tiene 10 temas y hasta 3 intentos de examen.')}</div><button class="btn sec" id="cambiar">Cambiar grado</button></div>
 <div class="grilla">${contenido.materias.map(m=>`<div class="tarjeta"><span class="pildora">${e(m.campoFormativo)}</span><h3>${e(m.nombre)}</h3><p>${completados(m)} de ${total(m)} temas verificados</p><p class="muted">Examen: ${cantidadIntentos(m.id)} de 3 intentos utilizados</p>${nota(m)!==undefined?`<p>Última calificación: <strong>${nota(m)}/10</strong></p>`:''}<button class="btn sec" data-materia="${e(m.id)}">Abrir materia</button></div>`).join('')}</div>
 <div class="tema"><h2>Examen general de ${grado}º</h2><p>Disponible después de completar los exámenes de todas las materias.</p><p>${restantes('general')} intentos restantes</p><button id="general" class="btn" ${todasNotas()&&restantes('general')>0?'':'disabled'}>Presentar examen general</button>${progreso.general?`<p class="alert ok">Última nota general: <strong>${progreso.general.calificacion}/10</strong></p>`:''}${tarjetaIntentos('general')}</div>
 <div class="tema"><h2>Historial de todas las materias</h2>${contenido.materias.map(m=>`<details class="historial-desplegable"><summary>${e(m.nombre)} · ${cantidadIntentos(m.id)} de 3 intentos</summary>${tarjetaIntentos(m.id)}</details>`).join('')}</div></section>`);
 document.querySelector('#cambiar').onclick=elegirPantallaGrado;
 document.querySelectorAll('[data-materia]').forEach(b=>b.onclick=()=>abrirMateria(b.dataset.materia));
 document.querySelector('#general').onclick=()=>abrirExamen('general');
}
let indiceLeccion = 0;
function listaTemas(id) {
 return contenido.temas.filter(t=>t.materiaId===id).sort((a,b)=>a.orden-b.orden);
}
function abrirMateria(id,indice=0) {
 materia=contenido.materias.find(m=>m.id===id);
 if(!materia)return;
 const temas=listaTemas(id);
 if(!temas.length){mostrar(`<section class="panel">${encabezar(materia.nombre)}<p>No hay temas cargados.</p><button class="btn sec" id="volverMaterias">Volver a materias</button></section>`);document.querySelector('#volverMaterias').onclick=panelMaterias;return;}
 indiceLeccion=Math.max(0,Math.min(temas.length-1,indice));
 const t=temas[indiceLeccion], est=completados(materia);
 const estudiado=progreso.estudiados?.includes(t.id)??false;
 mostrar(`<section class="panel">
  <nav class="navegacion-superior" aria-label="Navegación"><button class="btn out" id="volverMaterias">← Todas las materias</button><span class="muted">Tema ${indiceLeccion+1} de ${temas.length}</span></nav>
  ${encabezar(materia.nombre,'Lee la explicación, revisa el ejemplo y responde una pregunta para verificar lo aprendido.')}
  <div class="progreso"><span style="width:${Math.round(est/temas.length*100)}%"></span></div>
  <p class="muted">${est} de ${temas.length} temas verificados</p>
  <nav class="indice-temas" aria-label="Temas de la materia">${temas.map((x,i)=>`<button class="tema-tab ${i===indiceLeccion?'actual':''}" data-indice="${i}" aria-current="${i===indiceLeccion?'step':'false'}">${i+1}. ${e(x.titulo)} ${progreso.estudiados?.includes(x.id)?'✓':''}</button>`).join('')}</nav>
  <article class="tema"><div class="fila"><h2>${indiceLeccion+1}. ${e(t.titulo)}</h2><span class="pildora ${estudiado?'bien':''}">${estudiado?'Verificado':'Por verificar'}</span></div>
  <h3>Explicación</h3><p>${e(t.explicacion)}</p><div class="ejemplo"><strong>Ejemplo resuelto:</strong> ${e(t.ejemplo)}</div>
  <div id="zonaVerificacion">${estudiado?'<p class="alert ok">Ya respondiste correctamente la comprobación de este tema.</p>':'<button class="btn" id="abrirVerificacion">Comprobar lo aprendido</button>'}</div></article>
  <nav class="navegacion-leccion" aria-label="Navegación entre lecciones"><button class="btn sec" id="anterior" ${indiceLeccion===0?'disabled':''}>← Anterior</button><button class="btn sec" id="siguiente" ${indiceLeccion===temas.length-1?'disabled':''}>Siguiente →</button></nav>
  <div class="tema"><h2>Evaluación acumulativa de ${e(materia.nombre)}</h2><p>Después de verificar todos los temas podrás presentar el examen de la materia.</p><p>${restantes(id)} de 3 intentos restantes</p><button class="btn" id="examenMateria" ${est<temas.length||restantes(id)===0?'disabled':''}>Presentar examen</button>${tarjetaIntentos(id)}${nota(materia)!==undefined?`<p class="alert ok">Calificación: <strong>${nota(materia)}/10</strong></p>`:''}</div>
 </section>`);
 document.querySelector('#volverMaterias').onclick=panelMaterias;
 document.querySelector('#anterior').onclick=()=>abrirMateria(id,indiceLeccion-1);
 document.querySelector('#siguiente').onclick=()=>abrirMateria(id,indiceLeccion+1);
 document.querySelectorAll('[data-indice]').forEach(b=>b.onclick=()=>abrirMateria(id,Number(b.dataset.indice)));
 document.querySelector('#examenMateria').onclick=()=>abrirExamen(id);
 if(!estudiado)document.querySelector('#abrirVerificacion').onclick=()=>mostrarVerificacion(t,id,indiceLeccion);
}
async function mostrarVerificacion(tema,id,indice){
 const zona=document.querySelector('#zonaVerificacion');
 zona.innerHTML='<p class="muted" role="status">Preparando pregunta...</p>';
 try{
  const v=await api(`privado/verificacion/${encodeURIComponent(tema.id)}`);
  zona.innerHTML=`<form id="formVerificacion" class="comprobacion"><h3>Comprobación de aprendizaje</h3><p>${e(v.pregunta)}</p>${v.opciones.map((op,i)=>`<label class="opcion"><input type="radio" name="opcion" value="${i}" required> ${e(op)}</label>`).join('')}<button class="btn" type="submit">Verificar respuesta</button><div id="resultadoVerificacion" aria-live="polite"></div></form>`;
  document.querySelector('#formVerificacion').onsubmit=async ev=>{
   ev.preventDefault();const btn=ev.target.querySelector('button[type=submit]');btn.disabled=true;
   const opcion=Number(new FormData(ev.target).get('opcion'));
   try{
    const resultado=await api('privado/verificar-tema',{method:'POST',data:{temaId:tema.id,opcion}});
    if(resultado.correcto){
     progreso=await api(`privado/progreso/${grado}`);
     abrirMateria(id,indice);
     const msj=document.createElement('p');msj.className='alert ok';msj.textContent=resultado.mensaje;
     document.querySelector('#zonaVerificacion').append(msj);
    }else{
     const msg=document.querySelector('#resultadoVerificacion');msg.className='alert error';msg.textContent=resultado.mensaje;
     btn.disabled=false;
    }
   }catch(err){const msg=document.querySelector('#resultadoVerificacion');msg.className='alert error';msg.textContent=err.message;btn.disabled=false;}
  };
 }catch(err){zona.innerHTML=`<p class="alert error">${e(err.message)}</p><button class="btn sec" id="volverIntentar">Reintentar</button>`;document.querySelector('#volverIntentar').onclick=()=>mostrarVerificacion(tema,id,indice);}
}
async function abrirExamen(id){try{examen={id,...await api(`privado/examen/${grado}/${id}`)};mostrar(`<section class="panel"><div class="ruta"><button id="volverExamen">${id==='general'?'Materias':'Volver a lecciones'}</button> / Evaluación</div>${encabezar(id==='general'?'Examen general':`Examen de ${materia.nombre}`,'Contesta todas las preguntas y presiona Calificar. El servidor calculará tu nota.')}
 <p class="alert">Intento ${cantidadIntentos(id)+1} de 3 · Al calificar se consumirá un intento.</p><form id="formExamen">${examen.preguntas.map((p,i)=>`<div class="pregunta"><h3>${i+1}. ${e(p.enunciado)}</h3>${p.opciones.map((op,j)=>`<label class="opcion"><input type="radio" name="p${i}" value="${j}" required> ${e(op)}</label>`).join('')}</div>`).join('')}<p class="muted">${examen.preguntas.length} preguntas · Calificación de 0 a 10</p><button class="btn" type="submit" id="calificar">Calificar examen</button></form></section>`);document.querySelector('#volverExamen').onclick=()=>id==='general'?panelMaterias():abrirMateria(id);document.querySelector('#formExamen').onsubmit=async ev=>{ev.preventDefault();const boton=document.querySelector('#calificar');boton.disabled=true;const datos=new FormData(ev.target);const respuestas=examen.preguntas.map((p,i)=>({id:p.id,opcion:Number(datos.get(`p${i}`))}));try{const resultado=await api('privado/calificar',{method:'POST',data:{grado,materiaId:id,respuestas}});[progreso,historial]=await Promise.all([api(`privado/progreso/${grado}`),api(`privado/historial/${grado}`)]);verResultado(resultado,id);}catch(err){alert(err.message);boton.disabled=false;}};}catch(err){alert(err.message);}}
function verResultado(r,id){const detalle=r.detalle.map((d,i)=>`<div class="tema"><strong>${i+1}. ${d.acierto?'Respuesta correcta':'Respuesta incorrecta'}</strong><p>Respuesta correcta: ${e(d.correcta)}</p></div>`).join('');const desglose=r.desglose?`<h2>Resultado por materia en el examen general</h2><div class="resultados">${Object.entries(r.desglose).map(([clave,nota])=>`<div>${e(contenido.materias.find(m=>m.id===clave)?.nombre||clave)}<strong>${nota}/10</strong></div>`).join('')}</div>`:'';mostrar(`<section class="panel"><div class="eyebrow">Evaluación completada</div><h1>Tu calificación</h1><p>Intento ${r.intento} de ${r.maxIntentos} · ${Math.max(0,r.maxIntentos-r.intento)} restantes</p><div class="nota">${r.calificacion}<span style="font-size:25px">/10</span></div><p>Obtuviste ${r.aciertos} de ${r.total} respuestas correctas.</p>${desglose}${tarjetaIntentos(id)}<h2>Revisión de respuestas</h2>${detalle}<div class="fila" style="margin-top:23px"><button class="btn" id="irMaterias">Volver a las materias</button>${id!=='general'?'<button class="btn sec" id="volverLecciones">Repasar lecciones</button>':''}</div></section>`);document.querySelector('#irMaterias').onclick=panelMaterias;if(id!=='general')document.querySelector('#volverLecciones').onclick=()=>abrirMateria(id);}

(async()=>{try{const conf=await api('config',{autorizado:false});const firebase=initializeApp(conf);auth=getAuth(firebase);onAuthStateChanged(auth,async user=>{try{if(user)await cargarPerfil();else registro();}catch(err){mostrar(`<div class="panel">${error(err.message)}<button class="btn" onclick="location.reload()">Reintentar</button></div>`);}});}catch(err){mostrar(`<div class="panel"><h1>Falta configurar Firebase</h1>${error(err.message)}<p>Revisa el archivo .env, el servidor y las credenciales del proyecto.</p></div>`);}})();
