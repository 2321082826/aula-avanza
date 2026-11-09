const { db } = require('../firebase-admin');
const { MATERIAS, D } = require('./contenido');

async function ejecutar() {
  let batch = db.batch();
  let pendientes = 0;
  let total = 0;
  async function agregar(ref, datos) {
    batch.set(ref, datos);
    pendientes++; total++;
    if (pendientes >= 350) {
      await batch.commit();
      batch = db.batch(); pendientes = 0;
    }
  }
  for (let grado = 1; grado <= 6; grado++) {
    const fase = Math.ceil(grado / 2) + 2;
    await agregar(db.doc(`grados/grado_${grado}`), {
      numero: grado, nombre: `${grado}º de primaria`, fase, activo: true
    });
    const indiceFase = fase - 3;
    for (const [orden, [clave, nombre, campo]] of MATERIAS.entries()) {
      const idMateria = `g${grado}_${clave}`;
      await agregar(db.doc(`materias/${idMateria}`), {
        grado, clave, nombre, campoFormativo: campo, orden: orden + 1, activo: true
      });
      const lecciones = D[clave][indiceFase];
      for (const [i, [titulo, explicacion, ejemplo, pregunta, opciones, correcta]] of lecciones.entries()) {
        const leccionId = `${idMateria}_t${i+1}`;
        await agregar(db.doc(`temas/${leccionId}`), {
          materiaId: idMateria, grado, orden: i+1, titulo, explicacion, ejemplo
        });
        await agregar(db.doc(`preguntas/${leccionId}`), {
          materiaId: idMateria, grado, temaId: leccionId, orden: i+1,
          enunciado: pregunta, opciones, correcta
        });
      }
      await agregar(db.doc(`examenes/${idMateria}`), {
        grado, materiaId: idMateria, tipo: 'materia', cantidadPreguntas: lecciones.length
      });
    }
    await agregar(db.doc(`examenes/g${grado}_general`), {
      grado, tipo: 'general', cantidadPreguntas: MATERIAS.length
    });
  }
  if (pendientes) await batch.commit();
  console.log(`Carga terminada: ${total} documentos (6 grados, 54 materias, 162 temas, 162 preguntas y 60 exámenes).`);
  console.log('No ejecutar el seed tras añadir contenido propio sin revisar las coincidencias de IDs.');
}
ejecutar().catch(e => { console.error('Error de carga:', e); process.exit(1); });
