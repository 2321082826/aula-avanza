// Banco inicial de contenido: 9 materias x 3 fases x 3 lecciones.
// Los grados de una misma fase comparten parte de la base didáctica inicial;
// amplíala con el programa escolar correspondiente antes de producción.
const MATERIAS = [
  ['matematicas','Matemáticas','Saberes y pensamiento científico'],
  ['espanol','Español y lectura','Lenguajes'],
  ['ciencias','Ciencias naturales','Saberes y pensamiento científico'],
  ['historia','Historia','Ética, naturaleza y sociedades'],
  ['geografia','Geografía','Ética, naturaleza y sociedades'],
  ['civica','Formación cívica y ética','Ética, naturaleza y sociedades'],
  ['comunitario','De lo humano a lo comunitario','De lo humano y lo comunitario'],
  ['artes','Artes','Lenguajes'],
  ['ingles','Inglés','Lenguajes']
];
// Registro: titulo, explicacion, ejemplo, pregunta, opciones, indiceCorrecto.
const D = {
matematicas: [
 [
  ['Suma de cantidades','Sumar significa juntar cantidades para encontrar un total.','Si hay 4 lápices y llegan 3, ahora hay 4 + 3 = 7.','¿Cuánto es 4 + 3?',['7','6','8','9'],0],
  ['Restar cantidades','Restar es quitar una cantidad de otra para saber cuánto queda.','De 9 fichas quitamos 2: 9 − 2 = 7.','¿Cuánto es 9 − 2?',['5','6','7','8'],2],
  ['Figuras geométricas','Un triángulo tiene tres lados; un cuadrado tiene cuatro lados iguales.','La señal triangular tiene tres lados.','¿Cuántos lados tiene un triángulo?',['4','2','3','5'],2]
 ],
 [
  ['Multiplicación','Multiplicar permite calcular grupos iguales con una sola operación.','3 grupos de 4 objetos son 3 × 4 = 12.','¿Cuánto es 3 × 4?',['7','10','12','14'],2],
  ['División','Dividir consiste en repartir una cantidad en partes iguales.','Si repartes 20 galletas entre 5 personas, tocan 4 a cada una.','¿Cuánto es 20 ÷ 5?',['4','5','3','6'],0],
  ['Fracciones','Una fracción expresa partes iguales de una unidad.','1/2 de una pizza son una de dos partes iguales.','¿Qué representa 1/2?',['Dos pizzas','Una mitad','Tres partes','Un entero y medio'],1]
 ],
 [
  ['Proporcionalidad','Dos cantidades son proporcionales cuando mantienen una razón constante.','Si 2 cuadernos cuestan $30, 4 cuestan $60.','Si 2 cuadernos cuestan $30, ¿cuánto cuestan 4?',['$45','$50','$60','$90'],2],
  ['Porcentajes','Un porcentaje indica cuántas partes hay de cada 100.','El 25 % de 200 es 50 porque 200 × 0.25 = 50.','¿Cuánto es 25 % de 200?',['25','50','75','100'],1],
  ['Área de rectángulos','El área mide la superficie interior de una figura. En un rectángulo es base × altura.','Si mide 6 cm por 4 cm, el área es 24 cm².','¿Cuál es el área de un rectángulo de 6 × 4?',['10 cm²','20 cm²','24 cm²','28 cm²'],2]
 ]
],
espanol: [
 [
  ['Sílabas','Las palabras pueden dividirse en sílabas, que son grupos de sonidos.','La palabra casa se separa ca-sa: dos sílabas.','¿Cuántas sílabas tiene «casa»?',['1','2','3','4'],1],
  ['Oraciones','Una oración comunica una idea y suele comenzar con mayúscula y terminar con punto.','«Mi perro juega.» es una oración completa.','¿Cuál es una oración?',['perro azul','Mi perro juega.','casa la','rápido'],1],
  ['Lectura comprensiva','Comprender un texto es identificar lo que dice y responder preguntas sobre él.','«Ana riega una planta»: Ana cuida una planta.','Si Ana riega una planta, ¿qué hace Ana?',['La pinta','La riega','La corta','La vende'],1]
 ],
 [
  ['Sustantivos y adjetivos','El sustantivo nombra seres u objetos; el adjetivo describe sus características.','En «árbol alto», árbol es sustantivo y alto es adjetivo.','¿Cuál es el adjetivo en «árbol alto»?',['árbol','alto','el','ninguno'],1],
  ['Ideas principales','La idea principal resume lo más importante que comunica un párrafo.','Un texto sobre la importancia del agua tiene como idea central cuidar el agua.','¿Qué expresa la idea principal?',['Un detalle menor','El tema esencial','Una palabra difícil','Solo el título'],1],
  ['Uso de signos','Los signos de interrogación en español abren y cierran una pregunta.','«¿Cómo estás?» utiliza ambos signos.','¿Cuál está escrito correctamente?',['Cómo estás?','¿Cómo estás?','¿Cómo estás.','Cómo estás'],1]
 ],
 [
  ['Texto argumentativo','Argumentar consiste en defender una opinión con razones y evidencias.','«Debemos reciclar porque reduce residuos» contiene una razón.','¿Qué necesita un argumento sólido?',['Solo una emoción','Razones claras','Muchas exclamaciones','Repetir una idea'],1],
  ['Resumen','Un resumen conserva las ideas principales con menos palabras y sin cambiar el sentido.','Un artículo extenso puede resumirse en un párrafo con las ideas clave.','¿Qué debe contener un buen resumen?',['Solo ejemplos','Ideas principales','Todas las frases originales','Opiniones nuevas'],1],
  ['Fuentes confiables','Comparar fuentes y revisar su autor y fecha ayuda a evaluar información.','Una publicación con autor identificado y referencias puede verificarse.','¿Qué ayuda a verificar una fuente?',['Solo los colores','Autor y referencias','Cantidad de emojis','Un título llamativo'],1]
 ]
],
ciencias: [
 [
  ['Seres vivos','Los seres vivos nacen, crecen, realizan funciones vitales y pueden reproducirse.','Una planta necesita agua y luz para crecer.','¿Cuál es un ser vivo?',['Una piedra','Una planta','Una mesa','Una moneda'],1],
  ['Los sentidos','Los sentidos permiten recibir información del entorno mediante órganos especializados.','Con los oídos escuchamos sonidos.','¿Qué órgano usamos para escuchar?',['Ojos','Nariz','Oídos','Manos'],2],
  ['Cuidado del agua','El agua es importante para la vida y debemos evitar desperdiciarla.','Cerrar la llave mientras nos cepillamos ahorra agua.','¿Qué acción ahorra agua?',['Dejar la llave abierta','Cerrar la llave','Tirar basura al río','Lavar banquetas con manguera'],1]
 ],
 [
  ['Estados de la materia','La materia puede presentarse como sólido, líquido o gas.','El hielo es agua sólida y el vapor es agua en estado gaseoso.','¿En qué estado está el hielo?',['Gas','Líquido','Sólido','Plasma'],2],
  ['Cadenas alimentarias','Una cadena alimentaria describe cómo se transfiere energía entre organismos.','Pasto → conejo → zorro.','¿Qué organismo produce su propio alimento?',['Zorro','Conejo','Pasto','Águila'],2],
  ['Sistema digestivo','La digestión transforma alimentos para aprovechar nutrientes.','El estómago participa en el procesamiento de alimentos.','¿Cuál es una función de la digestión?',['Escuchar sonidos','Aprovechar nutrientes','Ver colores','Mover huesos'],1]
 ],
 [
  ['Ecosistemas','Un ecosistema reúne seres vivos, factores físicos y sus interacciones.','En un bosque interactúan árboles, animales, suelo y agua.','¿Qué integra un ecosistema?',['Solo animales','Seres vivos y ambiente','Solo plantas','Solo agua'],1],
  ['Energía','La energía permite producir movimiento, calor y otros cambios.','La luz solar puede transformarse en electricidad con paneles.','¿Cuál es una fuente renovable de energía?',['Carbón','Petróleo','Sol','Gasolina'],2],
  ['Cambios físicos y químicos','En un cambio físico no se forman sustancias nuevas; en uno químico sí pueden formarse.','Derretir hielo es un cambio físico.','¿Qué tipo de cambio es derretir hielo?',['Químico','Nuclear','Físico','Biológico'],2]
 ]
],
historia: [
 [
  ['Antes y después','Ordenar acontecimientos ayuda a comprender cómo transcurre el tiempo.','Primero desayunamos, después salimos a la escuela.','¿Qué palabra señala que algo ocurrió más tarde?',['Antes','Después','Ayer','Siempre'],1],
  ['Historia familiar','Fotos, relatos y objetos nos permiten conocer acontecimientos del pasado.','Una fotografía antigua muestra cómo era la familia hace años.','¿Cuál puede ser una fuente del pasado?',['Fotografía antigua','Pronóstico futuro','Una adivinanza','Un juego imaginario'],0],
  ['Cambios en la comunidad','Las comunidades cambian con el tiempo por la construcción y las actividades humanas.','Una calle antes de tierra puede convertirse en avenida pavimentada.','¿Qué muestra un cambio histórico local?',['Una calle transformada','Una piedra inmóvil','Una suma','Una figura geométrica'],0]
 ],
 [
  ['Culturas mesoamericanas','Diversos pueblos desarrollaron culturas en Mesoamérica antes de la conquista europea.','Los mayas desarrollaron conocimientos matemáticos y calendáricos.','¿Cuál fue una cultura mesoamericana?',['Maya','Romana','Vikinga','Egipcia'],0],
  ['Independencia de México','El movimiento de independencia comenzó en 1810 y transformó la historia del territorio.','El Grito de Dolores se asocia con el inicio del movimiento.','¿En qué año inició la Independencia de México?',['1521','1810','1910','2000'],1],
  ['Fuentes históricas','Las fuentes primarias son testimonios u objetos cercanos al hecho estudiado.','Una carta de la época puede ser una fuente primaria.','¿Cuál es una fuente histórica primaria?',['Carta de la época','Película ficticia actual','Opinión sin fuentes','Predicción'],0]
 ],
 [
  ['Revolución mexicana','La Revolución mexicana comenzó en 1910 y reunió movimientos con distintas demandas.','Las demandas agrarias fueron parte importante del conflicto.','¿En qué año comenzó la Revolución mexicana?',['1810','1910','1521','2001'],1],
  ['Constitución de 1917','La Constitución de 1917 estableció principios e instituciones del Estado mexicano.','El artículo 3 se relaciona con la educación.','¿En qué año se promulgó la Constitución vigente de México?',['1824','1857','1917','2017'],2],
  ['Líneas del tiempo','Las líneas del tiempo ayudan a ordenar y comparar fechas de hechos históricos.','1810 ocurre antes que 1910.','¿Qué hecho ocurrió primero?',['1917','1910','1810','2000'],2]
 ]
],
geografia: [
 [
  ['Orientación','Podemos orientarnos reconociendo puntos de referencia y direcciones.','La escuela puede estar a la derecha del parque.','¿Qué sirve para orientarnos?',['Puntos de referencia','Solo colores','Una suma','Una canción'],0],
  ['Paisajes','Un paisaje reúne elementos naturales y elementos construidos por las personas.','Montañas son naturales; edificios son construidos.','¿Cuál es un elemento natural?',['Puente','Montaña','Carretera','Edificio'],1],
  ['Planos sencillos','Un plano representa un lugar visto desde arriba mediante símbolos.','Un plano de la escuela indica dónde están los salones.','¿Qué representa un plano?',['Solo sonidos','Un espacio','Una receta','El clima futuro'],1]
 ],
 [
  ['Puntos cardinales','Norte, sur, este y oeste son direcciones principales de orientación.','En una brújula convencional, N indica norte.','¿Qué indica la letra N en una brújula?',['Sur','Este','Norte','Oeste'],2],
  ['Mapas y símbolos','Los mapas utilizan símbolos y leyendas para representar información espacial.','Una línea azul puede identificar un río, según la leyenda.','¿Para qué sirve la leyenda de un mapa?',['Para medir sonidos','Para explicar símbolos','Para poner fechas','Para sumar'],1],
  ['Recursos naturales','Los recursos naturales provienen del ambiente y se utilizan para satisfacer necesidades.','El agua y la madera son recursos naturales.','¿Cuál es un recurso natural?',['Plástico fabricado','Agua','Computadora','Automóvil'],1]
 ],
 [
  ['Latitud y longitud','La latitud y longitud son coordenadas que permiten localizar lugares en la Tierra.','La latitud indica distancia angular respecto del ecuador.','¿Con qué se relaciona la latitud?',['El ecuador','El precio','La temperatura del horno','La edad'],0],
  ['Clima y tiempo','El tiempo describe condiciones atmosféricas del momento; el clima considera patrones de largo plazo.','«Hoy llueve» describe el tiempo atmosférico.','¿Cuál frase describe el tiempo atmosférico?',['El desierto suele ser seco','Hoy llueve','Los veranos suelen ser cálidos','La región tiene clima templado'],1],
  ['Población y migración','La migración es el desplazamiento de personas para vivir en otro lugar.','Una familia puede mudarse a otra ciudad por trabajo.','¿Qué es migración?',['Moverse para residir en otro lugar','Un fenómeno lunar','Una roca','Una medida del tiempo'],0]
 ]
],
civica: [
 [
  ['Respeto','Respetar implica reconocer la dignidad y los derechos de las demás personas.','Escuchar a alguien sin interrumpir muestra respeto.','¿Cuál acción demuestra respeto?',['Burlarse','Escuchar','Empujar','Excluir'],1],
  ['Acuerdos','Los acuerdos ayudan a convivir y organizar actividades de forma justa.','En clase acordamos turnarnos para hablar.','¿Qué ayuda a una buena convivencia?',['Gritar','Acuerdos','Ignorar reglas','Excluir'],1],
  ['Emociones','Reconocer emociones ayuda a expresarlas sin lastimar a otras personas.','Decir «estoy triste» expresa una emoción.','¿Cuál es una emoción?',['Mesa','Tristeza','Lápiz','Piedra'],1]
 ],
 [
  ['Derechos de la infancia','Niñas y niños tienen derechos como educación, protección y participación.','Todos los niños tienen derecho a aprender.','¿Cuál es un derecho de la infancia?',['Ser excluido','Recibir educación','Ser discriminado','No ser escuchado'],1],
  ['Resolución de conflictos','Dialogar y escuchar permite buscar soluciones pacíficas a desacuerdos.','Dos compañeros hablan para acordar cómo compartir material.','¿Qué ayuda a resolver un conflicto?',['Dialogar','Insultar','Amenazar','Gritar'],0],
  ['Diversidad','Las diferencias de cultura y experiencias enriquecen la vida comunitaria.','Respetamos que compañeros tengan distintas costumbres.','¿Qué conducta favorece la inclusión?',['Discriminar','Respetar diferencias','Excluir','Burlarse'],1]
 ],
 [
  ['Participación democrática','La participación democrática implica expresar opiniones, escuchar y decidir con reglas justas.','Un grupo vota para elegir representantes.','¿Qué es una práctica democrática?',['Imponer sin escuchar','Votar con reglas claras','Excluir opiniones','Amenazar'],1],
  ['Responsabilidad digital','Usar internet responsablemente incluye proteger datos y verificar información.','No compartimos contraseñas con desconocidos.','¿Qué práctica es segura en internet?',['Publicar contraseñas','Proteger datos personales','Aceptar a cualquiera','Compartir ubicación pública'],1],
  ['Igualdad y no discriminación','Todas las personas merecen igual dignidad y oportunidades, sin discriminación.','La participación en clase debe estar abierta a todas las personas.','¿Qué promueve la igualdad?',['Dar oportunidades justas','Excluir','Ridiculizar','Imponer prejuicios'],0]
 ]
],
comunitario: [
 [
  ['Cuidado personal','Los hábitos cotidianos favorecen el bienestar físico y emocional.','Lavarse las manos antes de comer es un hábito de higiene.','¿Cuál es un hábito de higiene?',['No lavarse las manos','Lavarse las manos','Compartir cepillo dental','No dormir'],1],
  ['Trabajo en equipo','Colaborar es contribuir con otros para lograr una meta común.','Dos compañeros comparten tareas en un proyecto.','¿Qué implica colaborar?',['Compartir tareas','Trabajar contra otros','No escuchar','Abandonar al equipo'],0],
  ['Mi comunidad','La comunidad reúne personas que conviven y comparten espacios y actividades.','La escuela y el vecindario son parte de una comunidad.','¿Cuál es un espacio comunitario?',['Escuela','Un planeta imaginario','Una cifra','Una letra'],0]
 ],
 [
  ['Hábitos saludables','La alimentación variada, el movimiento y el descanso apoyan la salud.','Dormir lo suficiente ayuda a recuperar energía.','¿Qué favorece la salud?',['Dormir poco','Descansar y moverse','Evitar el agua','Omitir comidas'],1],
  ['Proyecto comunitario','Un proyecto comunitario identifica una necesidad y organiza acciones para atenderla.','Una campaña de limpieza mejora un parque.','¿Qué caracteriza a un proyecto comunitario?',['Resolver una necesidad común','Excluir vecinos','No planear','Desperdiciar recursos'],0],
  ['Comunicación asertiva','La comunicación asertiva expresa ideas y necesidades con claridad y respeto.','«No estoy de acuerdo porque…» permite hablar sin insultar.','¿Qué frase es asertiva?',['¡Cállate!','No estoy de acuerdo, expliquemos','No me importa','Eres incapaz'],1]
 ],
 [
  ['Bienestar integral','El bienestar integra salud física, emociones y relaciones con otras personas.','Organizar tiempo de estudio, descanso y ocio favorece equilibrio.','¿Qué integra el bienestar?',['Solo notas','Salud física y emocional','Solo dinero','Solo deporte'],1],
  ['Prevención de riesgos','Detectar peligros y establecer medidas de prevención reduce accidentes.','Identificar rutas de evacuación ayuda en emergencias.','¿Qué es una medida preventiva?',['Bloquear salidas','Conocer rutas de evacuación','Ignorar avisos','Correr sin ver'],1],
  ['Participación social','Participar en acciones colectivas puede mejorar las condiciones de la comunidad.','Un comité estudiantil propone reducir residuos.','¿Cuál es una forma de participación social?',['Organizar mejoras colectivas','Destruir espacios','Excluir opiniones','No colaborar'],0]
 ]
],
artes: [
 [
  ['Colores primarios','En pintura tradicional, rojo, amarillo y azul se presentan como colores primarios.','Mezclar amarillo y azul produce verde en pinturas comunes.','¿Cuál es un color primario tradicional?',['Verde','Morado','Azul','Naranja'],2],
  ['Ritmo','El ritmo organiza sonidos y silencios en el tiempo.','Las palmadas repetidas pueden formar un ritmo.','¿Qué forma un ritmo?',['Sonidos organizados','Solo dibujos','Un mapa','Una cuenta bancaria'],0],
  ['Expresión corporal','El cuerpo puede comunicar emociones e ideas mediante gestos y movimiento.','Mover brazos lentamente puede expresar calma.','¿Qué usamos para la expresión corporal?',['Solo números','Movimientos y gestos','Solo letras','Un termómetro'],1]
 ],
 [
  ['Elementos visuales','Línea, forma, color y textura son recursos de expresión visual.','Una línea curva y una recta producen efectos diferentes.','¿Cuál es un elemento visual?',['Color','Temperatura corporal','Gravedad','Velocidad'],0],
  ['Contraste','El contraste hace visibles diferencias entre elementos como claro y oscuro.','Un texto oscuro sobre fondo claro tiene contraste.','¿Qué muestra contraste visual?',['Claro frente a oscuro','Dos sonidos idénticos','Dos cifras iguales','Silencio total'],0],
  ['Narrativa teatral','El teatro cuenta historias mediante personajes, acciones y escenas.','Un diálogo revela lo que desean los personajes.','¿Qué elemento aparece en una obra teatral?',['Personajes','Latitud','Denominadores','Ecuaciones'],0]
 ],
 [
  ['Composición visual','Componer es organizar elementos para guiar la atención y comunicar una intención.','Ubicar el tema principal en un punto destacado da jerarquía visual.','¿Qué hace la composición?',['Organiza elementos','Calcula volumen','Mide presión','Divide números'],0],
  ['Patrimonio cultural','El patrimonio cultural comprende expresiones y bienes significativos para una comunidad.','Una danza tradicional puede ser patrimonio cultural.','¿Cuál puede ser patrimonio cultural?',['Danza tradicional','Un error de suma','Una contraseña','Un número aleatorio'],0],
  ['Análisis artístico','Analizar una obra incluye describir sus elementos, contexto y posibles significados.','Observar colores y símbolos ayuda a interpretar un mural.','¿Qué ayuda a analizar una obra?',['Contexto y elementos','Solo precio','Solo tamaño del archivo','Solo fecha de compra'],0]
 ]
],
ingles: [
 [
  ['Greetings','En inglés, hello se utiliza para saludar y goodbye para despedirse.','Hello, Ana! significa ¡Hola, Ana!','¿Qué significa «hello»?',['Adiós','Hola','Gracias','Por favor'],1],
  ['Colors','Los nombres de colores en inglés incluyen red, blue, green y yellow.','Blue significa azul.','¿Qué significa «blue»?',['Rojo','Amarillo','Azul','Verde'],2],
  ['Numbers','Los números básicos en inglés incluyen one, two, three y four.','Three significa tres.','¿Qué significa «three»?',['Dos','Tres','Cuatro','Cinco'],1]
 ],
 [
  ['Daily routines','Las rutinas se describen con verbos como wake up, eat y study.','I study at school = estudio en la escuela.','¿Qué significa «study»?',['Comer','Estudiar','Dormir','Correr'],1],
  ['Present simple','El presente simple describe hábitos y hechos habituales.','She plays soccer expresa una actividad habitual.','¿Cuál es una oración correcta?',['She play soccer','She plays soccer','She playing soccer','She played tomorrow'],1],
  ['Places in town','Podemos identificar lugares como school, library, hospital y park.','Library significa biblioteca.','¿Qué significa «library»?',['Hospital','Parque','Biblioteca','Escuela'],2]
 ],
 [
  ['Past simple','El pasado simple expresa acciones terminadas en el pasado.','Yesterday I visited my friend expresa una acción pasada.','¿Cuál expresa pasado?',['I visit today','I visited yesterday','I will visit','I am visiting now'],1],
  ['Comparatives','Los comparativos permiten comparar características entre dos cosas.','Bigger significa más grande.','¿Cuál es el comparativo de «big»?',['Biggest','Bigger','More bigly','Bigging'],1],
  ['Reading comprehension','Para comprender textos en inglés buscamos ideas principales y detalles relevantes.','The cat is sleeping significa que el gato está durmiendo.','En «The cat is sleeping», ¿qué hace el gato?',['Está corriendo','Está comiendo','Está durmiendo','Está leyendo'],2]
 ]
]
};
module.exports = { MATERIAS, D };
