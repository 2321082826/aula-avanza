# Aula Avanza — Firebase + usuario y contraseña

Proyecto web (HTML, CSS, JS) con backend Node/Express, Cloud Firestore y Firebase Authentication **mediante tokens personalizados**. No se pide correo electrónico a estudiantes. Se requiere un servidor: la contraseña NUNCA se guarda ni verifica en JavaScript del navegador.

## Requisitos

- Node.js 20 o superior.
- Proyecto Firebase existente con Firestore.
- Firebase Authentication inicializado en la consola (Authentication > Comenzar). No es necesario habilitar el proveedor Correo/Contraseña: se usa Custom Token.
- Una aplicación web registrada en Configuración del proyecto (icono </>) para obtener la configuración pública.
- Una clave de cuenta de servicio privada para desarrollo local, obtenida desde Configuración del proyecto > Cuentas de servicio > Generar nueva clave privada. GUARDAR FUERA DE public y FUERA DE repositorios.

## Preparación paso a paso

1. Descomprime este ZIP y abre la carpeta en VS Code.
2. En la consola de VS Code: `npm install`.
3. Copia `.env.example` a `.env`.
4. En la consola Firebase > Configuración del proyecto > General > Tus apps > app web, copia `projectId`, `apiKey`, `authDomain`, `appId` y `messagingSenderId` a `.env`.
5. Pon en `GOOGLE_APPLICATION_CREDENTIALS` la **ruta absoluta** al archivo privado descargado. Ejemplo: `C:/Users/TU_USUARIO/Documents/secretos/aula-avanza-admin.json`.
6. En Firebase > Firestore Database > Reglas, pega `firestore.rules` y pulsa Publicar. Las reglas **bloquean todo acceso directo del navegador**, porque toda operación Firestore la realiza el backend con credenciales de servidor.
7. En Firebase > Authentication, pulsa `Comenzar` para inicializar el servicio. **No hace falta solicitar correo**, ni habilitar Email/Password.
8. Ejecuta `npm run seed` **una vez** para crear grados, materias, temas, preguntas y metadatos de exámenes. Usa el Admin SDK y requiere credenciales.
9. Ejecuta `npm start`.
10. Abre `http://localhost:3000` desde el navegador. NO abras index.html con Live Server, porque la página usa rutas `/api/` que solo sirve Node.

## Si ya creaste manualmente grados

El cargador de datos usa IDs determinísticos (`grado_1`, `g1_matematicas`, etc.) y sobrescribirá documentos de esos IDs, sin borrar documentos de IDs diferentes. No hay que crear documentos manualmente. Conviene usar primero un proyecto de prueba si has añadido contenido real.

## Estructura de Firestore

- `grados/grado_1` ... `grado_6`
- `materias/g6_matematicas` (54 docs)
- `temas/g6_matematicas_t1` (162 docs)
- `preguntas/g6_matematicas_t1` (162 docs, respuestas correctas **privadas**)
- `examenes/g6_matematicas` y `examenes/g6_general` (60 docs)
- `nombresUsuario/sofia123` → referencia privada al UID
- `credenciales/{uid}` → hash bcrypt de contraseña (NO contraseña sin cifrar)
- `usuarios/{uid}` → perfil (no almacena contraseña)
- `usuarios/{uid}/progreso/grado_6` → lecciones, notas de materias y resultado general

## Diseño de exámenes

- 3 temas y 3 preguntas por materia/grado, 9 materias por grado.
- 1 examen por materia que se activa después de estudiar sus 3 temas.
- 1 examen general por grado que se activa después de completar los 9 exámenes de materia.
- El examen general tiene 9 preguntas, una por materia, y presenta nota individual por materia y global.
- Las notas del examen de una materia se guardan en `notas`; el último intento reemplaza la nota anterior. Los exámenes generales se guardan en `general`.
- Este es un **contenido curricular inicial de demostración**, no el temario completo validado por la SEP. Algunos temas se comparten entre los dos grados de la misma fase (1-2, 3-4, 5-6). Antes de utilizarlo en una escuela, ampliar, revisar y adaptar el banco pedagógico.

## Seguridad y despliegue

- No publiques `.env`, ni el JSON de cuenta de servicio, ni `credenciales` ni `preguntas`.
- El servidor aplica límite básico de intentos de inicio y registro por IP. Para producción agrega protección frente a bots, monitoreo, límites por usuario, políticas de recuperación de contraseña y medidas de privacidad para menores.
- No hay recuperación automática de contraseña en esta versión; un administrador deberá verificar al alumno para restablecerla con un proceso seguro futuro.
- Si llevas el backend a Cloud Run o App Hosting, usa credenciales administradas/ADC con IAM en vez de distribuir claves JSON.
- Las reglas de Firestore no limitan el Admin SDK: la protección depende además de tu servidor y de los permisos IAM.
- Firebase Authentication sigue estando habilitado internamente con custom tokens para sesiones, aunque la interfaz solo solicita usuario y contraseña. No hay inicio de sesión por correo.
- Usa HTTPS cuando publiques la plataforma en Internet.

## Estructura local

- `public/index.html`, `public/styles.css`, `public/app.js`: interfaz web.
- `server.js`: registro, inicio de sesión, gestión de progreso, calificación segura.
- `firebase-admin.js`: conexión privilegiada Firestore/Auth.
- `scripts/contenido.js`: banco inicial de lecciones y preguntas.
- `scripts/cargar-datos.js`: carga automática a Firestore.
- `firestore.rules`: bloqueo completo del acceso Firestore directo al cliente.
- `.env.example`: nombres de variables, sin credenciales reales.

## Comprobaciones

- `http://localhost:3000/api/config` debe mostrar solo configuración pública web.
- En Firestore > Datos, deben aparecer `grados`, `materias`, `temas`, `preguntas`, `examenes` tras `npm run seed`.
- Registra `sofia123` con contraseña de al menos 10 caracteres, inicia sesión, elige sexto, marca los tres temas de Matemáticas y presenta su examen.
- Puedes cerrar sesión y volver a entrar con el mismo usuario; el progreso seguirá en Firestore.

## Solución de problemas

- `Could not load the default credentials`: revisar `GOOGLE_APPLICATION_CREDENTIALS` (ruta absoluta, archivo JSON privado).
- `auth/invalid-api-key`: revisar `FIREBASE_API_KEY` y app web.
- `PERMISSION_DENIED`: verificar cuenta de servicio, proyecto, que Firestore exista y permisos IAM.
- `SERVICE_DISABLED`: inicializa Firebase Authentication desde consola.
- `Usuario ya ocupado`: elige otro nombre, el nombre de usuario se normaliza a minúsculas.
- Si tu proyecto de Firebase requiere configuración de facturación para una característica, consúltala en la consola antes de activarla.
