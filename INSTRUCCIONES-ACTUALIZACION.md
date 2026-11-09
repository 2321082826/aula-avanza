# Aula Avanza — 10 temas por materia y tres intentos por examen

## Qué cambia

- Los nueve cursos por grado pasan de 3 a 10 temas: 54 materias × 10 = 540 lecciones.
- Cada examen por materia contiene diez preguntas (una por tema). El general mantiene nueve, una por materia.
- Cada examen tiene máximo **tres envíos calificados** por alumno y por grado. Abrirlo y salir no consume intento.
- El servidor controla el máximo dentro de una transacción de Firestore. El historial se guarda en `usuarios/{uid}/intentos/{id}` y se muestra por materia, con fechas y notas.
- Para estudiantes que ya tenían una nota, esa nota se considera el primer intento y aparecerá como anterior. No es posible reconstruir exámenes anteriores eliminados o sin datos.
- Las lecciones anteriores siguen marcadas como estudiadas; las nuevas requieren verificación de respuesta para habilitar el examen.
- Se conserva la **última calificación** en `usuarios/{uid}/progreso/grado_N`, además del historial completo de intentos.
- En primera y segunda primaria se utiliza la base didáctica de fase 3; tercero/cuarto fase 4; quinto/sexto fase 5. Es contenido inicial que requiere revisión curricular.

## Instalar en tu proyecto que ya funciona

1. Guarda una copia del proyecto y de `server.js` y `public/`.
2. Copia `server.js`, `public/app.js`, `public/styles.css`, `scripts/temas-adicionales.js` y `scripts/ampliar-temas.js` del ZIP a tu proyecto, respetando rutas.
3. En `package.json` agrega al objeto `scripts`: `"ampliar": "node scripts/ampliar-temas.js"`. O utiliza `node scripts/ampliar-temas.js` directamente para no cambiar `package.json`.
4. **Conserva tu `.env`, `firebase-admin.js`, `scripts/contenido.js` y tu JSON privado**. No vuelvas a ejecutar `npm run seed`: el seed anterior podría sobrescribir los temas originales que hayas editado.
5. Ejecuta en la raíz: `node scripts/ampliar-temas.js`. Debe agregar 756 documentos (378 temas + 378 preguntas) cuando no existe ninguno de los temas nuevos. El script puede repetirse; respeta los documentos ya existentes.
6. Ejecuta `node --check server.js` y `node --check public/app.js`, luego `npm start` y abre `http://localhost:3000`.
7. Verifica en Firestore que `temas/g1_matematicas_t10` y `preguntas/g1_matematicas_t10` existan.

## Firestore

Colecciones: `grados`, `materias`, `temas`, `preguntas`, `examenes`, `usuarios`. Dentro de `usuarios/{uid}` se guardan `progreso/grado_N` e `intentos/{id}`. **No abras permisos públicos de lectura/escritura.** El servidor usa Firebase Admin SDK.

## Seguridad y limitaciones

- La restricción de tres intentos se verifica en el servidor dentro de una transacción para evitar dobles envíos simultáneos.
- El sistema no reserva un intento al abrir el cuestionario: se cuenta al **calificar un envío correcto y completo**.
- Las notas anteriores se consideran un intento aun cuando no hay registro detallado de cada intento antiguo.
- No se cambia la autenticación ni las cuentas existentes.
- No se incluyen claves privadas ni datos reales de los estudiantes.
- Los temas agregados contienen explicaciones y preguntas iniciales; el banco debe pasar revisión pedagógica antes de utilizarse para evaluaciones oficiales.
