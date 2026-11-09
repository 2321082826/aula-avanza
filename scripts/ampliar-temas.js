// EJECUTAR UNA VEZ (se puede repetir de forma segura): npm run ampliar
// Agrega temas 4-10 y sus preguntas a las materias existentes.
// NO sobreescribe documentos existentes ni toca usuarios, notas o avances.
const {db} = require('../firebase-admin');
const {MATERIAS} = require('./contenido');
const {crearExtras} = require('./temas-adicionales');
async function main(){
 let nuevos=0, existentes=0, batch=db.batch(), esperando=0;
 async function guardar(ref,datos){
   const snap=await ref.get();
   if(snap.exists){existentes++;return;}
   batch.create(ref,datos);nuevos++;esperando++;
   if(esperando>=300){await batch.commit();batch=db.batch();esperando=0;}
 }
 for(let grado=1;grado<=6;grado++) {
   const fase=Math.ceil(grado/2)-1;
   for(const [clave] of MATERIAS){
     const id=`g${grado}_${clave}`;
     const materia=await db.doc('materias/'+id).get();
     if(!materia.exists) throw new Error('Falta '+id+'. Ejecuta npm run seed primero.');
     const extras=crearExtras(clave,fase);
     for(let i=0;i<extras.length;i++){
       const [titulo,explicacion,ejemplo,enunciado,opciones,correcta]=extras[i];
       const orden=i+4, tid=`${id}_t${orden}`;
       await guardar(db.doc(`temas/${tid}`),{materiaId:id,grado,orden,titulo,explicacion,ejemplo});
       await guardar(db.doc(`preguntas/${tid}`),{materiaId:id,grado,temaId:tid,orden,enunciado,opciones,correcta});
     }
   }
 }
 if(esperando)await batch.commit();
 // Actualizar cantidad de preguntas anunciada por cada examen de materia.
 for(let grado=1;grado<=6;grado++)for(const [clave] of MATERIAS){
   const id=`g${grado}_${clave}`;
   await db.doc('examenes/'+id).set({cantidadPreguntas:10},{merge:true});
 }
 console.log(`Ampliación completada: ${nuevos} documentos nuevos, ${existentes} existentes conservados.`);
 console.log('Cada una de las 54 materias dispone de 10 temas y 10 preguntas de examen, si los 3 originales estaban presentes.');
}
main().catch(e=>{console.error(e);process.exitCode=1});
