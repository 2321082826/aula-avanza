// Siete lecciones adicionales para cada materia y fase. Todas las entradas
// contienen explicación, ejemplo, pregunta y respuesta; las opciones se generan
// usando respuestas de otros conceptos dentro de la misma materia/fase.
// Base didáctica inicial: requiere revisión pedagógica antes de uso escolar formal.
const EXTRA = {
matematicas: [
`Comparación de números|Comparar números permite saber cuál es mayor, menor o igual.|8 es mayor que 5.|¿Cuál número es mayor que 5?|8
Decenas y unidades|Una decena reúne diez unidades.|23 tiene 2 decenas y 3 unidades.|¿Cuántas unidades tiene una decena?|10
Series numéricas|Una serie continúa con una regla identificable.|2, 4, 6, 8 aumenta de dos en dos.|¿Qué número continúa 2, 4, 6, 8?|10
Números pares|Un número par puede agruparse en parejas sin sobrar elementos.|6 fichas forman 3 parejas.|¿Cuál número es par?|6
Medición de longitud|La longitud indica qué tan largo es un objeto.|Una regla mide centímetros.|¿Qué instrumento mide longitudes pequeñas?|Regla
Monedas y precios|El dinero permite pagar y calcular cuánto falta o sobra.|Dos monedas de cinco pesos suman diez pesos.|¿Cuánto valen dos monedas de cinco pesos?|10 pesos
Interpretar tablas|Las tablas ordenan datos para que podamos contarlos y compararlos.|Una tabla puede indicar cuántos alumnos prefieren cada fruta.|¿Qué recurso organiza datos en filas y columnas?|Tabla`,
`Valor posicional|La posición de una cifra determina cuánto vale.|En 352, el 3 representa 300.|¿Cuánto vale el 3 en 352?|300
Multiplicaciones por 10|Al multiplicar un entero por 10, aumenta diez veces su valor.|14 por 10 es 140.|¿Cuánto es 14 × 10?|140
Números decimales|Los decimales representan cantidades que pueden tener partes de una unidad.|0.5 representa la mitad de uno.|¿Qué decimal equivale a un medio?|0.5
Perímetro|El perímetro es la suma de las longitudes de los lados.|Un cuadrado de lado 3 cm tiene 12 cm de perímetro.|¿Cuál es el perímetro de un cuadrado de lado 3 cm?|12 cm
Ángulos|Un ángulo se forma con dos semirrectas con el mismo origen.|La esquina de un libro suele formar un ángulo recto.|¿Cuántos grados tiene un ángulo recto?|90 grados
Unidades de capacidad|La capacidad indica cuánto líquido cabe en un recipiente.|Una botella puede contener un litro de agua.|¿Qué unidad sirve para medir capacidad?|Litro
Gráficas de barras|Las barras permiten comparar cantidades de distintas categorías.|La barra más alta suele representar la mayor frecuencia.|¿Qué gráfica usa barras para comparar cantidades?|Gráfica de barras`,
`Operaciones con fracciones|Para sumar fracciones con igual denominador se suman numeradores.|2/7 + 3/7 = 5/7.|¿Cuánto es 2/7 + 3/7?|5/7
Decimales y dinero|Los centavos son centésimas de una unidad monetaria.|$12.50 son doce pesos con cincuenta centavos.|¿Cuántos centavos representa 0.50 pesos?|50
Potencias|Una potencia representa multiplicaciones repetidas de la misma base.|3² significa 3 × 3.|¿Cuánto es 3²?|9
Mínimo común múltiplo|El mínimo común múltiplo es el menor múltiplo positivo compartido.|MCM de 4 y 6 es 12.|¿Cuál es el MCM de 4 y 6?|12
Volumen|El volumen mide el espacio ocupado por un cuerpo tridimensional.|Una caja de 2 × 3 × 4 cm ocupa 24 cm³.|¿Qué volumen tiene una caja de 2 × 3 × 4 cm?|24 cm³
Media aritmética|La media se obtiene sumando datos y dividiendo entre su cantidad.|La media de 4, 6 y 8 es 6.|¿Cuál es la media de 4, 6 y 8?|6
Probabilidad|La probabilidad describe qué tan posible es un resultado.|En una moneda equilibrada hay dos resultados igualmente posibles.|¿Qué probabilidad tiene obtener cara con una moneda equilibrada?|1/2`],
espanol: [
`Separación silábica|Las sílabas son grupos de sonidos que forman palabras.|La palabra casa tiene dos sílabas: ca-sa.|¿Cuántas sílabas tiene casa?|2
Vocales y consonantes|Las vocales son a, e, i, o, u; otras letras son consonantes.|En sol hay una vocal y dos consonantes.|¿Cuál es la vocal de sol?|o
Construcción de oraciones|Una oración comunica una idea con sentido.|El perro duerme es una oración completa.|¿Cuál es una oración completa?|El perro duerme
Mayúsculas|Se usa mayúscula al comenzar una oración y en nombres propios.|María vive aquí comienza con mayúscula.|¿Con qué tipo de letra empieza una oración?|Mayúscula
Signos de interrogación|Los signos ¿ y ? enmarcan una pregunta escrita.|¿Dónde está el libro? es una pregunta.|¿Qué signos delimitan preguntas en español?|¿ ?
Sinónimos|Dos palabras son sinónimas cuando tienen significados parecidos.|Alegre y contento pueden ser sinónimos.|¿Qué palabra es sinónimo de alegre?|Contento
Comprensión de cuentos|Un cuento suele presentar personajes, un lugar y acontecimientos.|Ana encontró una llave es un acontecimiento del relato.|¿Quién realiza las acciones en un cuento?|Personajes`,
`Sustantivos|Los sustantivos nombran personas, lugares, animales y cosas.|Escuela es un sustantivo.|¿Qué clase de palabra es escuela?|Sustantivo
Adjetivos|Los adjetivos expresan cualidades de los sustantivos.|Grande describe a una casa.|¿Qué palabra describe una cualidad?|Grande
Verbos|Los verbos expresan acciones, procesos o estados.|Caminar es un verbo.|¿Qué clase de palabra es caminar?|Verbo
Párrafos|Un párrafo agrupa oraciones alrededor de una idea.|Una descripción puede ocupar un párrafo.|¿Qué reúne oraciones sobre una idea central?|Párrafo
Texto instructivo|Un texto instructivo presenta pasos para realizar algo.|Una receta organiza ingredientes y pasos.|¿Qué texto explica pasos para preparar comida?|Receta
Idea principal|La idea principal expresa la información central de un texto.|En un texto sobre abejas, puede ser su función polinizadora.|¿Qué información resume el tema central?|Idea principal
Acentuación|La tilde marca la sílaba tónica según reglas de acentuación.|Canción lleva tilde en la última sílaba.|¿Qué signo ortográfico tiene canción?|Tilde`,
`Argumentación|Un argumento ofrece razones para sostener una opinión.|Debemos ahorrar agua porque es necesaria para la vida.|¿Qué sostiene una opinión con razones?|Argumento
Conectores|Los conectores relacionan ideas de un texto.|Sin embargo introduce contraste entre ideas.|¿Qué conector introduce contraste?|Sin embargo
Técnicas de resumen|Un resumen presenta las ideas esenciales con menos palabras.|Un resumen de un artículo omite ejemplos secundarios.|¿Qué texto sintetiza ideas esenciales?|Resumen
Metáfora|La metáfora relaciona elementos por semejanza sin usar una comparación literal.|Tus ojos son estrellas es una metáfora.|¿Qué recurso aparece en tus ojos son estrellas?|Metáfora
Texto expositivo|El texto expositivo explica información con claridad y orden.|Un artículo sobre volcanes puede ser expositivo.|¿Qué tipo de texto explica información?|Expositivo
Evaluación de fuentes|Verificar autor, fecha y evidencia ayuda a evaluar una fuente.|Un artículo con referencias permite comprobar sus afirmaciones.|¿Qué conviene revisar para verificar una fuente?|Autor y evidencia
Debate|El debate es un intercambio organizado de posturas con argumentos.|Los participantes expresan opiniones y escuchan réplicas.|¿Qué se presenta para defender una postura en un debate?|Argumentos`],
ciencias: [
`Características de los seres vivos|Los seres vivos realizan funciones como nutrición, relación y reproducción.|Un árbol crece y necesita agua y luz.|¿Cuál de estos es un ser vivo?|Árbol
Partes de una planta|Raíz, tallo, hojas y flores pueden cumplir funciones distintas.|La raíz absorbe agua del suelo.|¿Qué parte absorbe agua del suelo?|Raíz
Sentidos|Los sentidos ayudan a percibir el entorno.|Con los ojos percibimos luz y colores.|¿Qué órgano usamos para ver?|Ojos
Estados del agua|El agua puede encontrarse sólida, líquida o gaseosa.|El hielo es agua en estado sólido.|¿En qué estado está el hielo?|Sólido
Ciclo del día|La rotación de la Tierra produce la alternancia de día y noche.|Cuando una región mira al Sol es de día.|¿Qué movimiento causa día y noche?|Rotación
Alimentación|Una alimentación variada aporta distintos nutrimentos.|Incluir frutas y verduras favorece una dieta diversa.|¿Qué favorece una alimentación equilibrada?|Variedad de alimentos
Materiales|Los materiales se distinguen por propiedades como dureza o flexibilidad.|El vidrio es frágil; la goma es flexible.|¿Qué propiedad permite doblar un material?|Flexibilidad`,
`Ecosistemas|Un ecosistema incluye seres vivos y elementos físicos que interactúan.|Un bosque contiene árboles, suelo, agua y animales.|¿Qué reúne seres vivos y ambiente físico?|Ecosistema
Productores y consumidores|Una cadena alimentaria representa relaciones de alimentación.|Hierba, conejo y zorro forman una cadena posible.|¿Qué organismo produce su propio alimento mediante fotosíntesis?|Planta
Proceso digestivo|El sistema digestivo transforma alimentos y absorbe nutrimentos.|El estómago participa en la digestión.|¿Qué sistema procesa los alimentos?|Digestivo
Fuerza y movimiento|Una fuerza puede cambiar el movimiento o la forma de un objeto.|Empujar un carrito puede ponerlo en movimiento.|¿Qué puede modificar la velocidad de un objeto?|Fuerza
Mezclas|Una mezcla reúne sustancias sin formar necesariamente una nueva.|Agua con arena forma una mezcla heterogénea.|¿Qué es el agua con arena?|Mezcla
Cambios de estado|El calor o enfriamiento pueden cambiar el estado de la materia.|Al hervir, agua líquida pasa a vapor.|¿Cómo se llama el paso de líquido a gas?|Evaporación
Energía eléctrica|La electricidad permite funcionar a muchos aparatos.|Una linterna usa energía de pilas para iluminar.|¿Qué energía alimenta una linterna con pilas?|Eléctrica`,
`La célula|La célula es la unidad estructural básica de los organismos vivos.|Un tejido se forma con muchas células.|¿Cuál es la unidad básica de los seres vivos?|Célula
Fotosíntesis|Las plantas producen azúcares usando luz, agua y dióxido de carbono.|Una hoja con luz transforma energía solar en energía química.|¿Qué proceso permite producir alimento a las plantas?|Fotosíntesis
Sistema circulatorio|La sangre transporta oxígeno y sustancias por el cuerpo.|El corazón bombea sangre por vasos sanguíneos.|¿Qué órgano bombea la sangre?|Corazón
Cambios químicos|En un cambio químico se forman sustancias diferentes.|La combustión transforma materiales y libera energía.|¿Qué cambio produce sustancias nuevas?|Químico
Gravedad|La gravedad es una interacción que atrae cuerpos con masa.|La Tierra atrae una pelota que cae.|¿Qué fuerza provoca la caída de una pelota?|Gravedad
Biodiversidad|La biodiversidad incluye variedad de genes, especies y ecosistemas.|Un bosque con distintas especies presenta biodiversidad.|¿Qué concepto describe la variedad de seres vivos?|Biodiversidad
Fuentes de energía|Las fuentes renovables se reponen naturalmente a escala humana.|El viento puede generar electricidad con aerogeneradores.|¿Qué fuente de energía usa aerogeneradores?|Viento`],
historia: [
`Pasado y presente|El pasado se refiere a lo ocurrido antes; el presente es lo que sucede ahora.|Una foto antigua muestra un momento pasado.|¿Qué tiempo muestra una foto de hace años?|Pasado
Línea del tiempo|Una línea del tiempo coloca sucesos en orden cronológico.|Primero nacer, después aprender a caminar.|¿Qué herramienta ordena sucesos cronológicamente?|Línea del tiempo
Mi historia familiar|La historia familiar recoge recuerdos y cambios entre generaciones.|Una entrevista a abuelos puede revelar costumbres anteriores.|¿A quién podrías entrevistar sobre tu familia?|Abuelos
Objetos del pasado|Los objetos antiguos dan pistas sobre la vida cotidiana.|Una lámpara de aceite muestra otra forma de iluminación.|¿Qué nos aporta un objeto antiguo?|Pistas históricas
Fiestas y tradiciones|Las tradiciones transmiten prácticas culturales entre generaciones.|Una celebración comunitaria puede repetirse cada año.|¿Qué transmite costumbres entre generaciones?|Tradición
Comparación de épocas|Comparar imágenes permite observar transformaciones con el tiempo.|Una calle antes de pavimentarse luce diferente.|¿Qué permite reconocer una comparación histórica?|Cambios
Fuentes orales|Los relatos de testigos pueden aportar información sobre hechos pasados.|Una entrevista es una fuente oral.|¿Qué fuente histórica es una entrevista?|Oral`,
`Civilizaciones antiguas|Las primeras civilizaciones desarrollaron ciudades y formas de gobierno.|Egipto antiguo construyó monumentos junto al Nilo.|¿Qué civilización antigua se desarrolló junto al Nilo?|Egipto
Mesoamérica|Mesoamérica fue una región cultural con pueblos diversos.|Mayas y mexicas fueron pueblos mesoamericanos.|¿Qué pueblo fue mesoamericano?|Mayas
Agricultura antigua|La agricultura favoreció asentamientos estables y nuevas ocupaciones.|Sembrar maíz permitió producir alimentos localmente.|¿Qué actividad favoreció poblaciones sedentarias?|Agricultura
Intercambio comercial|Los pueblos intercambiaban bienes e ideas mediante rutas comerciales.|El trueque es un intercambio sin moneda.|¿Cómo se llama cambiar bienes sin dinero?|Trueque
Época colonial|La época colonial transformó la organización social y económica de Nueva España.|Se establecieron instituciones del virreinato.|¿Cómo se llamó el territorio colonial que incluyó México?|Nueva España
Inicio de la Independencia|El movimiento independentista inició en 1810 y culminó en 1821.|El Grito de Dolores se asocia con 1810.|¿En qué año comenzó el movimiento de independencia?|1810
Cronología histórica|Ordenar procesos ayuda a comprender causas y consecuencias.|La Independencia ocurrió antes que la Revolución mexicana.|¿Qué ocurrió primero en México?|Independencia`,
`Etapas de la Revolución mexicana|La Revolución mexicana comenzó en 1910 por conflictos sociales y políticos.|Diversos grupos demandaron cambios en el país.|¿En qué año comenzó la Revolución mexicana?|1910
Derechos en la Constitución de 1917|La Constitución de 1917 estableció principios y derechos fundamentales.|Incluye disposiciones sobre educación y trabajo.|¿En qué año se promulgó la Constitución vigente de México?|1917
Reforma liberal|Las Leyes de Reforma cambiaron relaciones entre Iglesia y Estado.|La separación de asuntos civiles y religiosos fue un cambio importante.|¿Qué transformación impulsaron las Leyes de Reforma?|Separación Iglesia Estado
México contemporáneo|El México contemporáneo experimentó urbanización, industrialización y cambios políticos.|Muchas ciudades crecieron durante el siglo XX.|¿Qué proceso aumenta población en ciudades?|Urbanización
Derechos sociales|Los derechos sociales incluyen educación, salud y trabajo digno.|La educación pública expresa un compromiso social.|¿Cuál es un derecho social?|Educación
Fuentes primarias|Las fuentes primarias se produjeron durante el periodo que se estudia.|Una carta escrita en 1910 es primaria para ese año.|¿Qué tipo de fuente es una carta de la época?|Primaria
Causas y consecuencias|Los procesos históricos tienen factores que los originan y efectos posteriores.|Una sequía puede causar migraciones.|¿Cómo llamamos a un factor que origina un hecho?|Causa`],
geografia: [
`Puntos cardinales|Norte, sur, este y oeste permiten ubicarse.|Una brújula indica el norte magnético.|¿Qué dirección opone al norte?|Sur
Planos y mapas|Un plano representa espacios vistos desde arriba.|Un plano escolar muestra salones y pasillos.|¿Qué dibujo representa un lugar desde arriba?|Plano
Símbolos cartográficos|Los mapas emplean símbolos para representar objetos y lugares.|Una línea azul suele marcar un río.|¿Qué explica el significado de los símbolos de un mapa?|Leyenda
Paisajes naturales|Los paisajes naturales tienen elementos como montañas, ríos y vegetación.|Una montaña es un elemento natural.|¿Qué elemento pertenece al paisaje natural?|Montaña
Relieve|El relieve comprende formas de la superficie terrestre.|Valles y mesetas son formas del relieve.|¿Qué concepto incluye montañas y valles?|Relieve
Agua del planeta|El agua se encuentra en océanos, ríos, lagos y hielo.|Un río transporta agua corriente.|¿Qué cuerpo de agua suele fluir hacia otro?|Río
Entorno urbano y rural|Las áreas urbanas concentran edificaciones; las rurales suelen tener menor densidad.|Un pueblo agrícola suele considerarse rural.|¿Qué entorno se relaciona más con actividades agrícolas?|Rural`,
`Continentes|Los continentes son grandes extensiones terrestres utilizadas para organizar el espacio geográfico.|África es uno de los continentes.|¿Qué es África?|Continente
Océanos|Los océanos son grandes masas de agua salada.|El Pacífico baña la costa occidental de México.|¿Qué océano está al oeste de México?|Pacífico
Escala cartográfica|La escala relaciona distancias del mapa con distancias reales.|1 cm puede representar 1 km según la escala.|¿Qué relaciona mapa y distancia real?|Escala
Regiones naturales|Las regiones naturales se distinguen por clima, vegetación y fauna.|Los desiertos suelen tener escasas precipitaciones.|¿Qué región presenta poca lluvia generalmente?|Desierto
Riesgos naturales|Los riesgos naturales incluyen eventos capaces de causar daños.|Un sismo intenso puede afectar construcciones.|¿Qué evento implica movimiento de la corteza terrestre?|Sismo
Aprovechamiento de recursos naturales|Los recursos naturales son componentes del ambiente aprovechados por las personas.|El agua dulce es un recurso natural.|¿Cuál es un recurso natural?|Agua dulce
Actividad económica|Las actividades económicas producen, distribuyen o consumen bienes y servicios.|Cultivar verduras es una actividad primaria.|¿Qué actividad pertenece al sector primario?|Agricultura`,
`Husos horarios|Los husos horarios ayudan a organizar horas en distintas regiones.|Ciudades lejanas pueden tener horarios diferentes.|¿Qué sistema explica diferencias de hora entre regiones?|Husos horarios
Coordenadas|La latitud y longitud permiten localizar puntos sobre la Tierra.|Una posición puede escribirse con grados de latitud y longitud.|¿Qué par permite ubicar un punto terrestre?|Latitud y longitud
Densidad poblacional|La densidad relaciona población con la superficie de un territorio.|Mil habitantes en 10 km² equivalen a 100 hab/km².|¿Cuánto es 1000 habitantes entre 10 km²?|100 hab/km²
Urbanización|La urbanización implica aumento de población y actividades en ciudades.|El crecimiento de áreas metropolitanas refleja urbanización.|¿Qué proceso expande la población urbana?|Urbanización
Globalización|La globalización conecta economías y sociedades a escala mundial.|Un producto puede diseñarse en un país y fabricarse en otro.|¿Qué proceso relaciona mercados mundiales?|Globalización
Sustentabilidad|La sustentabilidad busca satisfacer necesidades cuidando recursos futuros.|Reducir consumo de agua favorece sustentabilidad.|¿Qué enfoque protege recursos para generaciones futuras?|Sustentabilidad
Cambio climático|El cambio climático implica transformaciones duraderas del sistema climático.|El incremento de temperatura media global es un indicador.|¿Qué fenómeno describe calentamiento sostenido del planeta?|Cambio climático`],
civica: [
`Reglas del aula|Las reglas ayudan a que el grupo comparta espacios con respeto.|Levantar la mano permite ordenar intervenciones.|¿Qué organiza la convivencia en clase?|Reglas
Empatía|La empatía consiste en intentar comprender cómo se siente otra persona.|Acompañar a alguien triste puede mostrar empatía.|¿Qué valor permite comprender sentimientos ajenos?|Empatía
Honestidad|La honestidad consiste en actuar y hablar con verdad.|Devolver un objeto encontrado muestra honestidad.|¿Qué valor practicamos al devolver algo ajeno?|Honestidad
Responsabilidad|Ser responsable implica cumplir compromisos y asumir consecuencias.|Llevar materiales a clase cumple un compromiso.|¿Qué valor expresa cumplir los compromisos?|Responsabilidad
Solidaridad|La solidaridad consiste en apoyar a quienes lo necesitan.|Compartir útiles cuando alguien los olvidó puede ser solidario.|¿Qué valor muestra ayudar a alguien?|Solidaridad
Buen trato|El buen trato exige respeto y evitar burlas o violencia.|Pedir las cosas por favor favorece el buen trato.|¿Qué conducta expresa buen trato?|Hablar con respeto
Participación|Participar significa aportar ideas y colaborar en decisiones compartidas.|Proponer actividades para el grupo es participar.|¿Qué acción muestra participación?|Proponer ideas`,
`Normas y leyes|Las leyes son reglas obligatorias que organizan la vida social.|Las normas de tránsito buscan prevenir accidentes.|¿Qué tipo de reglas son obligatorias en una sociedad?|Leyes
Igualdad|La igualdad reconoce el mismo valor y dignidad de las personas.|Todos los alumnos deben tener oportunidades de participar.|¿Qué principio rechaza trato injusto por diferencias?|Igualdad
Derechos y deberes|Ejercer derechos también implica respetar los derechos ajenos.|Tengo derecho a opinar y deber de escuchar.|¿Qué corresponde al derecho a opinar?|Escuchar a otros
Mediación|La mediación facilita acuerdos con ayuda de una persona imparcial.|Un docente puede ayudar a dialogar a dos compañeros.|¿Qué método utiliza una persona neutral para dialogar?|Mediación
Participación ciudadana|La ciudadanía puede mejorar su comunidad mediante acciones informadas.|Una consulta vecinal recoge propuestas.|¿Qué actividad reúne opiniones de la comunidad?|Consulta vecinal
Cuidado ambiental|Proteger el entorno es responsabilidad colectiva.|Separar residuos disminuye contaminación.|¿Qué acción ayuda a cuidar el ambiente?|Separar residuos
Inclusión|La inclusión busca que todas las personas puedan participar con respeto.|Adaptar una actividad facilita participación de más compañeros.|¿Qué principio permite que todos participen?|Inclusión`,
`Constitución|La Constitución establece bases de organización y derechos de un país.|En México la Constitución es una norma fundamental.|¿Qué documento establece principios fundamentales del Estado?|Constitución
Democracia|La democracia incluye participación, pluralidad y decisiones mediante reglas.|En elecciones se eligen representantes.|¿Qué sistema promueve participación y elecciones?|Democracia
Derechos humanos|Los derechos humanos corresponden a toda persona por su dignidad.|Nadie debe ser discriminado por su origen.|¿Qué derechos corresponden a todas las personas?|Humanos
Resolución pacífica|El diálogo y la negociación son alternativas a la violencia.|Escuchar razones ayuda a construir acuerdos.|¿Qué método busca acuerdos sin violencia?|Diálogo
Privacidad digital|Proteger datos personales reduce riesgos en internet.|No compartir contraseñas es una práctica segura.|¿Qué información debemos mantener privada?|Contraseñas
Discriminación|Discriminar es tratar injustamente a alguien por características personales.|Excluir a un compañero por su acento es discriminación.|¿Qué conducta debemos evitar para convivir con respeto?|Discriminación
Bien común|El bien común comprende condiciones que benefician a la comunidad.|Mantener limpia una plaza beneficia a muchas personas.|¿Qué concepto busca bienestar colectivo?|Bien común`],
comunitario: [
`Higiene diaria|Los hábitos de limpieza ayudan a prevenir enfermedades.|Lavarse las manos antes de comer reduce microbios.|¿Qué hábito previene enfermedades?|Lavarse las manos
Descanso|Dormir suficiente permite recuperar energía y apoyar el aprendizaje.|Una rutina nocturna favorece el sueño.|¿Qué actividad recupera energía durante la noche?|Dormir
Juegos cooperativos|Los juegos cooperativos buscan lograr metas compartidas.|Un equipo transporta una pelota sin dejarla caer.|¿Qué tipo de juego tiene una meta colectiva?|Cooperativo
Seguridad vial|Cruzar con atención y seguir señales reduce accidentes.|Esperar la luz peatonal ayuda a cruzar seguro.|¿Qué señal indica cuándo cruzar una calle?|Semáforo
Amistad|Una amistad sana incluye cuidado, respeto y confianza.|Escuchar a un amigo demuestra atención.|¿Qué caracteriza una amistad saludable?|Respeto
Expresión emocional|Nombrar emociones facilita pedir ayuda cuando se necesita.|Decir tengo miedo permite comunicar una emoción.|¿Qué acción ayuda a comunicar emociones?|Nombrarlas
Cuidado del entorno|Mantener espacios comunes limpios favorece la convivencia.|Depositar basura en su lugar cuida el patio.|¿Qué acción cuida los espacios comunes?|Depositar basura correctamente`,
`Autocuidado|El autocuidado incluye decisiones para preservar la salud y la seguridad.|Usar protector solar en exteriores puede proteger la piel.|¿Qué hábito ayuda a proteger la piel al sol?|Protector solar
Alimentación variada|Comer distintos grupos de alimentos ayuda a cubrir necesidades nutricionales.|Combinar verduras, cereales y proteínas aumenta variedad.|¿Qué caracteriza a una alimentación equilibrada?|Variedad
Actividad física|Mover el cuerpo con regularidad beneficia la salud.|Caminar y jugar al aire libre son actividades físicas.|¿Qué hábito ayuda a mantener activo el cuerpo?|Movimiento regular
Comunicación respetuosa|Expresar desacuerdos sin insultos favorece la convivencia.|Prefiero otra opción porque… comunica una opinión con respeto.|¿Qué forma de comunicación evita insultos?|Respetuosa
Trabajo colaborativo|Un equipo organiza responsabilidades para alcanzar objetivos.|Dividir tareas facilita un mural escolar.|¿Qué acción facilita el trabajo en equipo?|Repartir tareas
Prevención escolar|Reconocer riesgos del entorno escolar ayuda a evitar accidentes.|Mantener escaleras despejadas disminuye caídas.|¿Qué acción reduce accidentes en escaleras?|Mantenerlas despejadas
Servicio comunitario|El servicio comunitario responde a necesidades compartidas.|Organizar una colecta puede apoyar a familias necesitadas.|¿Qué actividad ayuda a otras personas de la comunidad?|Colecta solidaria`,
`Hábitos sostenibles|Los hábitos sostenibles reducen desperdicios y cuidan recursos.|Reutilizar botellas disminuye residuos.|¿Qué práctica permite dar nuevos usos a objetos?|Reutilizar
Manejo del estrés|El estrés puede gestionarse con descanso, apoyo y organización.|Dividir una tarea grande en partes ayuda a organizarse.|¿Qué estrategia puede reducir estrés ante tareas?|Organización
Autoestima|La autoestima se relaciona con la valoración que una persona hace de sí misma.|Reconocer fortalezas sin compararse es saludable.|¿Qué concepto describe la valoración personal?|Autoestima
Decisiones responsables|Elegir responsablemente implica considerar consecuencias y alternativas.|Antes de publicar una foto, pedir permiso es responsable.|¿Qué debemos considerar antes de decidir?|Consecuencias
Liderazgo colaborativo|El liderazgo colaborativo escucha y distribuye responsabilidades.|Una representante pide opiniones al grupo.|¿Qué práctica caracteriza liderazgo colaborativo?|Escuchar opiniones
Prevención de violencia|Reconocer agresiones y buscar apoyo protege la convivencia.|Contar a un adulto de confianza una situación de acoso es adecuado.|¿A quién puedes acudir ante acoso escolar?|Adulto de confianza
Proyecto de bienestar|Un proyecto de bienestar identifica metas y acciones para mejorar hábitos.|Planear horas de descanso puede ser una meta.|¿Qué instrumento organiza metas y acciones personales?|Plan de bienestar`],
artes: [
`Líneas y trazos|Las líneas pueden ser rectas, curvas o quebradas.|Una espiral está hecha de líneas curvas.|¿Qué tipo de línea forma una espiral?|Curva
Formas geométricas|Las figuras se pueden usar para crear composiciones visuales.|Un collage puede combinar círculos y triángulos.|¿Qué figura tiene tres lados?|Triángulo
Texturas|La textura describe cómo se siente o parece una superficie.|La corteza de un árbol suele parecer áspera.|¿Qué propiedad distingue una superficie áspera?|Textura
Sonidos graves y agudos|Los sonidos se diferencian por su altura o frecuencia.|Un silbido suele ser más agudo que un tambor grande.|¿Qué sonido suele ser más agudo?|Silbido
Pulso musical|El pulso es una regularidad temporal que podemos marcar con palmadas.|Marcar golpes constantes acompaña una canción.|¿Qué elemento musical mantiene golpes regulares?|Pulso
Dibujo de observación|Observar formas y proporciones ayuda a dibujar objetos.|Dibujar una taza mirando su contorno es observación.|¿Qué técnica parte de mirar un objeto real?|Observación
Creación colectiva|Varias personas pueden participar en una misma obra.|Una clase crea un mural entre todos.|¿Qué obra puede elaborarse en equipo?|Mural colectivo`,
`Colores cálidos y fríos|Los colores pueden agruparse según asociaciones visuales de temperatura.|Rojo y naranja suelen considerarse cálidos.|¿Qué color suele considerarse cálido?|Naranja
Perspectiva|La perspectiva ayuda a representar profundidad en un plano.|Las vías de tren parecen acercarse al horizonte.|¿Qué recurso da impresión de profundidad?|Perspectiva
Patrones visuales|Un patrón repite elementos siguiendo cierta regla.|Círculo, cuadrado, círculo, cuadrado es un patrón.|¿Qué caracteriza a un patrón?|Repetición
Escena teatral|Una escena agrupa acciones que ocurren en un momento del relato teatral.|Dos personajes dialogan en un escenario.|¿Qué unidad contiene acciones dramáticas?|Escena
Instrumentos musicales|Los instrumentos producen sonido al vibrar partes diferentes.|Una guitarra vibra en sus cuerdas.|¿Qué parte vibra en una guitarra?|Cuerdas
Danza y espacio|La danza combina movimiento, ritmo y uso del espacio.|Un giro cambia la orientación del cuerpo.|¿Qué arte utiliza movimiento corporal rítmico?|Danza
Apreciación artística|Apreciar una obra implica observar, describir e interpretar.|Comentar colores de un mural ayuda a apreciarlo.|¿Qué acción inicia la apreciación de una obra?|Observar`,
`Teoría del color|La combinación de colores puede crear armonía o contraste visual.|Azul y naranja contrastan intensamente en muchas composiciones.|¿Qué par produce contraste cromático intenso?|Azul y naranja
Fotografía|La fotografía registra imágenes mediante luz y encuadre.|Cambiar el encuadre altera qué elementos aparecen.|¿Qué decide qué entra en una fotografía?|Encuadre
Cine y lenguaje audiovisual|El cine combina imágenes en secuencia y sonido para narrar.|Un plano general muestra un espacio amplio.|¿Qué plano presenta un entorno amplio?|Plano general
Música y emociones|Tempo, dinámica y melodía influyen en cómo percibimos música.|Una melodía lenta puede transmitir calma.|¿Qué término describe la velocidad musical?|Tempo
Patrimonio artístico|Las obras patrimoniales reflejan memorias e identidades de comunidades.|Un mural histórico puede transmitir hechos y valores.|¿Qué expresión visual puede ser patrimonio?|Mural histórico
Diseño gráfico|El diseño gráfico organiza textos e imágenes para comunicar.|Un cartel combina título, color e ilustración.|¿Qué pieza comunica un mensaje con texto e imagen?|Cartel
Crítica constructiva|Una crítica constructiva describe aspectos de una obra con argumentos y respeto.|Explicar qué transmite una escena es más útil que burlarse.|¿Qué caracteriza una crítica constructiva?|Argumentos respetuosos`],
ingles: [
`Family|Family members include mother, father, sister and brother.|Sister means hermana.|¿Qué significa sister?|Hermana
School objects|Classroom objects include pencil, notebook and ruler.|Pencil means lápiz.|¿Qué significa pencil?|Lápiz
Animals|Common animal names include dog, cat and bird.|Bird means pájaro.|¿Qué significa bird?|Pájaro
Days of the week|The days include Monday, Tuesday and Wednesday.|Monday means lunes.|¿Qué significa Monday?|Lunes
Feelings|Words like happy and sad describe feelings.|Happy means feliz.|¿Qué significa happy?|Feliz
Food|Food words include bread, apple and rice.|Apple means manzana.|¿Qué significa apple?|Manzana
Simple questions|Questions can begin with what, who or where.|Where are you? asks for location.|¿Qué significa where?|Dónde`,
`There is and there are|There is refers to singular existence; there are to plural.|There are three books means hay tres libros.|¿Qué expresión se usa para varios objetos?|There are
Can and cannot|Can expresses ability; cannot expresses inability.|I can swim means puedo nadar.|¿Qué significa can en I can swim?|Poder
Prepositions of place|Prepositions describe location, such as in, on and under.|The book is under the table means está debajo.|¿Qué significa under?|Debajo
Weather|Weather vocabulary includes sunny, cloudy and rainy.|Rainy means lluvioso.|¿Qué significa rainy?|Lluvioso
Present continuous|The present continuous describes ongoing actions.|She is reading means ella está leyendo.|¿Qué tiempo describe she is reading?|Present continuous
Descriptions|Adjectives describe characteristics of people or things.|Tall means alto.|¿Qué significa tall?|Alto
Directions|Directions include left, right and straight.|Turn left means gira a la izquierda.|¿Qué significa left?|Izquierda`,
`Future with will|Will can express future events and predictions.|I will study means estudiaré.|¿Qué palabra expresa futuro en I will study?|Will
Going to|Going to often expresses plans or intentions.|I am going to travel describes a plan.|¿Qué estructura indica un plan futuro?|Going to
Present perfect|Present perfect links past actions to the present.|I have finished means he terminado.|¿Qué expresión representa present perfect?|Have finished
Modal should|Should expresses advice or recommendation.|You should rest means deberías descansar.|¿Qué modal expresa consejo?|Should
Conditionals|The first conditional describes possible future outcomes.|If it rains, I will stay home.|¿Qué palabra introduce la condición?|If
Reading inference|An inference uses text clues to understand unstated ideas.|If the street is wet, it may have rained.|¿Qué habilidad obtiene conclusiones a partir de pistas?|Inference
Linking words|Linking words connect ideas; because presents a reason.|I stayed home because it rained.|¿Qué palabra introduce una razón?|Because`]
};

function parseRows(text) {
 return text.trim().split('\n').map(line => line.split('|').map(x=>x.trim()));
}
function crearExtras(clave, fase) {
 const rows = parseRows(EXTRA[clave][fase]);
 if (rows.length !== 7 || rows.some(r=>r.length!==5)) throw Error('Contenido adicional incompleto: '+clave+' / '+fase);
 return rows.map(([titulo,explicacion,ejemplo,pregunta,correcta],i)=>{
   // Otros conceptos de la misma materia son distractores iniciales.
   const distractores=[];
   for(let paso=1;paso<=6 && distractores.length<3;paso++) {
     const candidato=rows[(i+paso)%rows.length][4];
     if(candidato!==correcta && !distractores.includes(candidato)) distractores.push(candidato);
   }
   if(distractores.length<3) throw Error('Respuestas insuficientes: '+clave+' '+fase+' '+i);
   const indiceCorrecto=(i+fase)%4;
   const opciones=[...distractores]; opciones.splice(indiceCorrecto,0,correcta);
   return [titulo,explicacion,ejemplo,pregunta,opciones,indiceCorrecto];
 });
}
module.exports={crearExtras};
