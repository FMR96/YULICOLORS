export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "cta" }

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  content: ContentBlock[]
  image: string
  category: string
  date: string
  readTime: number
  author: string
}

export const posts: BlogPost[] = [
  {
    slug: "micropigmentacion-cejas-camas-sevilla",
    title: "Micropigmentación de cejas en Camas: la guía definitiva",
    metaTitle: "Micropigmentación de Cejas en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "Descubre todo sobre la micropigmentación de cejas en Camas, Sevilla. Técnicas, resultados, precios y por qué YULI COLORS es el centro de referencia en la zona.",
    excerpt:
      "Si buscas micropigmentación de cejas en Camas, esta guía responde todas tus dudas: técnicas, durabilidad, cuidados y por qué elegir un centro especializado cerca de ti.",
    image: "/images/result-2.jpg",
    category: "Micropigmentación",
    date: "2025-01-14",
    readTime: 6,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "Si estás buscando micropigmentación de cejas en Camas (Sevilla), has llegado al lugar correcto. En YULI COLORS, centro de estética premium ubicado en Camas, llevamos años especializándonos en esta técnica para ofrecer resultados naturales, duraderos y completamente personalizados.",
      },
      {
        type: "h2",
        text: "¿Qué es la micropigmentación de cejas?",
      },
      {
        type: "p",
        text: "La micropigmentación de cejas es una técnica semipermanente que deposita pigmentos especializados en las capas superficiales de la dermis para crear el efecto de unas cejas perfectamente definidas. A diferencia del maquillaje convencional, sus resultados duran entre 12 y 24 meses, permitiéndote despertar cada mañana con unas cejas impecables sin ningún esfuerzo.",
      },
      {
        type: "h2",
        text: "Técnicas disponibles en YULI COLORS Camas",
      },
      {
        type: "ul",
        items: [
          "Efecto polvo: acabado suave y aterciopelado, ideal para pieles mixtas o grasas.",
          "Microblading con tebori y máquina: trazos pelo a pelo de máxima precisión para un resultado hiperrealista.",
          "Cejas mixtas: la combinación perfecta de pelo a pelo y efecto polvo para el resultado más completo.",
        ],
      },
      {
        type: "h2",
        text: "¿Por qué elegir micropigmentación en Camas en lugar de desplazarte?",
      },
      {
        type: "p",
        text: "Muchas clientas de Camas, Gines, Tomares y San Juan de Aznalfarache recorren kilómetros para tratamientos de calidad. En YULI COLORS tienes un centro especializado en tu municipio, con la misma calidad que encontrarías en el centro de Sevilla — sin atascos, sin desplazamientos y con la comodidad de estar cerca de casa.",
      },
      {
        type: "h2",
        text: "¿Cuánto dura la micropigmentación de cejas?",
      },
      {
        type: "p",
        text: "La duración varía según el tipo de piel, los cuidados posteriores y el estilo de vida, pero en general los resultados se mantienen entre 12 y 24 meses. Recomendamos una sesión de retoque al año para mantener el color y la definición en su punto óptimo.",
      },
      {
        type: "h2",
        text: "Cuidados post-tratamiento",
      },
      {
        type: "ol",
        items: [
          "Evitar el agua directa en la zona durante los primeros 7 días.",
          "No exponerse al sol intenso ni usar cremas con retinol en la zona.",
          "Aplicar el bálsamo cicatrizante que te proporcionamos en el centro.",
          "No rascar ni desprender la costra que pueda formarse durante la cicatrización.",
        ],
      },
      {
        type: "h2",
        text: "¿Quién es buena candidata para la micropigmentación?",
      },
      {
        type: "p",
        text: "Prácticamente cualquier persona que quiera mejorar la apariencia de sus cejas es candidata. Es especialmente recomendable para quienes tienen cejas escasas, asimétricas, con zonas despobladas o simplemente quieren simplificar su rutina de maquillaje y despertar perfectas cada día.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "depilacion-laser-camas-sevilla",
    title: "Depilación láser en Camas, Sevilla: di adiós al vello para siempre",
    metaTitle: "Depilación Láser en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "La depilación láser definitiva en Camas, Sevilla. Tecnología de última generación, resultados permanentes y piel perfectamente suave. Reserva tu consulta en YULI COLORS.",
    excerpt:
      "La depilación láser en Camas ya es una realidad gracias a YULI COLORS. Descubre cómo funciona, cuántas sesiones necesitas y por qué es la mejor inversión para tu piel.",
    image: "/images/instagram-2.jpg",
    category: "Depilación",
    date: "2025-01-28",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "La depilación láser en Camas ya no requiere desplazarte a la capital. En YULI COLORS, tu centro de estética de referencia en Camas (Sevilla), ofrecemos depilación láser definitiva con tecnología de última generación para resultados permanentes en todas las zonas del cuerpo.",
      },
      {
        type: "h2",
        text: "¿Cómo funciona la depilación láser?",
      },
      {
        type: "p",
        text: "La depilación láser actúa mediante pulsos de luz que se dirigen al pigmento de melanina presente en el folículo piloso. El calor generado destruye progresivamente el folículo, impidiendo el crecimiento futuro del vello. El proceso es seguro, eficaz y adecuado para la gran mayoría de fototipos de piel.",
      },
      {
        type: "h2",
        text: "Zonas que puedes tratar en YULI COLORS",
      },
      {
        type: "ul",
        items: [
          "Piernas completas o medias piernas",
          "Axilas y zona del bikini",
          "Zona facial (labio superior, mentón, patillas)",
          "Espalda y pecho",
          "Brazos y antebrazos",
          "Zona íntima completa",
        ],
      },
      {
        type: "h2",
        text: "¿Cuántas sesiones necesito?",
      },
      {
        type: "p",
        text: "El número de sesiones depende de la zona, el fototipo de piel y el tipo de vello. En general, se recomiendan entre 6 y 10 sesiones espaciadas cada 4-8 semanas para obtener resultados permanentes. Tras el ciclo completo, la gran mayoría de clientas experimenta una reducción del vello superior al 90%.",
      },
      {
        type: "h2",
        text: "Ventajas de hacerla en Camas con YULI COLORS",
      },
      {
        type: "ul",
        items: [
          "Centro especializado en tu municipio, sin necesidad de ir al centro de Sevilla.",
          "Tecnología láser de última generación adaptada a todos los fototipos.",
          "Consulta previa gratuita para valorar tu caso de forma personalizada.",
          "Precios competitivos con resultados de primer nivel.",
          "Equipo profesional con amplia experiencia en depilación definitiva.",
        ],
      },
      {
        type: "h2",
        text: "¿Es dolorosa la depilación láser?",
      },
      {
        type: "p",
        text: "Las nuevas tecnologías láser han reducido considerablemente las molestias. La mayoría de clientas describe la sensación como un leve pellizco o calor pasajero, completamente tolerable. Aplicamos técnicas de enfriamiento durante el tratamiento para maximizar tu confort en cada sesión.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "tratamientos-faciales-camas-sevilla",
    title: "Los mejores tratamientos faciales en Camas, Sevilla",
    metaTitle: "Tratamientos Faciales en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "Descubre los mejores tratamientos faciales en Camas, Sevilla. Limpieza facial, hidratación, radiofrecuencia e IPL en YULI COLORS, tu centro de estética premium.",
    excerpt:
      "Una piel radiante y cuidada está al alcance de las residentes en Camas. Descubre los tratamientos faciales más demandados y cómo pueden transformar tu piel.",
    image: "/images/result-1.jpg",
    category: "Tratamientos Faciales",
    date: "2025-02-05",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "Si resides en Camas o sus alrededores y buscas tratamientos faciales de calidad profesional sin tener que desplazarte a Sevilla, YULI COLORS es tu centro. Llevamos años ofreciendo rituales faciales personalizados que transforman la piel desde la primera sesión.",
      },
      {
        type: "h2",
        text: "¿Por qué son importantes los tratamientos faciales profesionales?",
      },
      {
        type: "p",
        text: "La piel del rostro es nuestra carta de presentación y también la más expuesta al sol, la contaminación y el estrés cotidiano. Los tratamientos faciales profesionales van mucho más allá de una limpieza básica: actúan en profundidad para renovar, hidratar, uniformizar y rejuvenecer la piel de forma que ningún producto cosmético de uso doméstico puede lograr.",
      },
      {
        type: "h2",
        text: "Tratamientos faciales disponibles en YULI COLORS, Camas",
      },
      {
        type: "ul",
        items: [
          "Limpieza facial profunda: elimina impurezas, puntos negros y células muertas.",
          "Ritual de hidratación intensiva: recupera la barrera cutánea y devuelve la luminosidad.",
          "Tratamiento antiedad personalizado: combate arrugas y pérdida de firmeza.",
          "IPL fotorrejuvenecimiento: borra manchas y rojeces con luz pulsada.",
          "Radiofrecuencia facial: reafirma y redensifica la piel de forma no invasiva.",
        ],
      },
      {
        type: "h2",
        text: "¿Con qué frecuencia debo hacerme un tratamiento facial?",
      },
      {
        type: "p",
        text: "Lo recomendable es una sesión mensual para pieles que requieren mantenimiento activo, y cada 6-8 semanas para un mantenimiento preventivo. En la primera visita a YULI COLORS realizamos un análisis completo de tu piel para diseñar un plan personalizado que se adapte a tus necesidades y objetivos.",
      },
      {
        type: "h2",
        text: "Tratamientos faciales para cada tipo de piel en Camas",
      },
      {
        type: "p",
        text: "No existe un protocolo universal: en YULI COLORS cada tratamiento se adapta a tu tipo de piel específico — seca, grasa, mixta, sensible o madura. El clima de Camas y Sevilla, con sol intenso la mayor parte del año, hace especialmente importante el mantenimiento de una piel bien hidratada y protegida.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "lifting-pestanas-camas-sevilla",
    title: "Lifting de pestañas en Camas: la mirada perfecta sin esfuerzo",
    metaTitle: "Lifting de Pestañas en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "Lifting de pestañas en Camas, Sevilla. Curvado semipermanente que abre y eleva tu mirada de forma natural. Sin extensiones, sin máscaras. Reserva en YULI COLORS.",
    excerpt:
      "El lifting de pestañas es el tratamiento más demandado para conseguir una mirada abierta y luminosa sin extensiones ni maquillaje diario. Disponible en Camas.",
    image: "/images/instagram-3.jpg",
    category: "Cejas & Pestañas",
    date: "2025-02-18",
    readTime: 4,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "El lifting de pestañas se ha convertido en uno de los tratamientos más solicitados en YULI COLORS, nuestro centro de estética en Camas, Sevilla. Y no es de extrañar: en apenas una sesión de 45 minutos, consigues una mirada visiblemente más abierta, elevada y luminosa que dura entre 6 y 8 semanas.",
      },
      {
        type: "h2",
        text: "¿Qué es exactamente el lifting de pestañas?",
      },
      {
        type: "p",
        text: "El lifting de pestañas es un tratamiento que curva y eleva tus pestañas naturales desde la raíz utilizando productos especializados de permanente. A diferencia de las extensiones, no añade ningún elemento artificial — simplemente realza lo que ya tienes, con un resultado que parece recién salida de la peluquería durante semanas.",
      },
      {
        type: "h2",
        text: "Lifting de pestañas con tinte incluido",
      },
      {
        type: "p",
        text: "En YULI COLORS combinamos el lifting con tinte de pestañas para un resultado todavía más impactante. El tinte oscurece las pestañas desde la raíz hasta la punta, creando el efecto de una máscara de pestañas perfecta sin tener que aplicarla cada mañana.",
      },
      {
        type: "h2",
        text: "¿Es adecuado el lifting para todo tipo de pestañas?",
      },
      {
        type: "p",
        text: "El lifting está especialmente recomendado para pestañas rectas o caídas que tienden a tapar el ojo. También funciona perfectamente en pestañas cortas que, al curvarse, parecen visualmente más largas y abundantes. En la consulta previa valoramos tu caso de forma individual.",
      },
      {
        type: "h2",
        text: "Cuidados después del lifting de pestañas",
      },
      {
        type: "ul",
        items: [
          "Evitar el contacto con agua durante las primeras 24 horas.",
          "No frotar los ojos ni usar desmaquillante oleoso en la zona.",
          "Aplicar un sérum nutritivo para pestañas para prolongar el resultado.",
          "Evitar la sauna o el baño de vapor durante 48 horas.",
        ],
      },
      {
        type: "h2",
        text: "¿Por qué hacerlo en YULI COLORS en Camas?",
      },
      {
        type: "p",
        text: "En Camas y toda la comarca del Aljarafe encontrarás pocos centros con la especialización y la calidad que ofrecemos en YULI COLORS. Utilizamos productos profesionales de alta gama y una técnica depurada para garantizar resultados uniformes, seguros y de larga duración en cada clienta.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "microblading-vs-efecto-polvo-cejas",
    title: "Microblading vs efecto polvo: ¿cuál es mejor para tus cejas?",
    metaTitle: "Microblading vs Efecto Polvo en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "¿Microblading o efecto polvo? Te explicamos las diferencias, ventajas y cuál se adapta mejor a tu tipo de piel y estilo de vida. Expertos en Camas, Sevilla.",
    excerpt:
      "Dos técnicas de micropigmentación, resultados muy distintos. Descubre cuál es la mejor opción para tus cejas según tu tipo de piel y lo que buscas.",
    image: "/images/about-clinic.jpg",
    category: "Micropigmentación",
    date: "2025-02-27",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "Una de las preguntas más frecuentes que recibimos en YULI COLORS, nuestro centro de micropigmentación en Camas (Sevilla), es: '¿qué es mejor, el microblading o el efecto polvo?' La respuesta no es única — depende de tu tipo de piel, tus cejas naturales y el resultado que buscas.",
      },
      {
        type: "h2",
        text: "¿Qué es el microblading?",
      },
      {
        type: "p",
        text: "El microblading (o técnica pelo a pelo) consiste en crear trazos finos que imitan el pelo natural de la ceja. En YULI COLORS trabajamos con la técnica tebori japonesa combinada con máquina para obtener la máxima precisión y el resultado más hiperrealista posible. El efecto es el de unas cejas con pelos naturales perfectamente colocados.",
      },
      {
        type: "h2",
        text: "¿Qué es el efecto polvo?",
      },
      {
        type: "p",
        text: "El efecto polvo, también llamado efecto sombra o ombre brows, crea un relleno suave y difuminado que imita el resultado de unas cejas maquilladas con sombra. El acabado es más compacto y aterciopelado, con mayor cobertura y durabilidad que el microblading.",
      },
      {
        type: "h2",
        text: "Comparativa: microblading vs efecto polvo",
      },
      {
        type: "ul",
        items: [
          "Aspecto: microblading = más natural y definido / efecto polvo = más maquillado y compacto.",
          "Duración: microblading = 12-18 meses / efecto polvo = 18-24 meses.",
          "Tipo de piel: microblading = mejor en piel seca / efecto polvo = ideal para piel grasa o mixta.",
          "Mantenimiento: el efecto polvo requiere menos retoques con el tiempo.",
        ],
      },
      {
        type: "h2",
        text: "¿Y las cejas mixtas?",
      },
      {
        type: "p",
        text: "Las cejas mixtas combinan lo mejor de ambas técnicas: trazos pelo a pelo en la zona inicial y efecto polvo en el cuerpo y la cola. El resultado es espectacular — naturales en la nariz y bien definidas en la cola, con una durabilidad excelente.",
      },
      {
        type: "h2",
        text: "¿Cuál te recomendamos en YULI COLORS?",
      },
      {
        type: "p",
        text: "En YULI COLORS realizamos siempre una consulta previa en la que analizamos tu tipo de piel, el estado de tus cejas naturales y tu estilo de vida antes de recomendar la técnica más adecuada. No existe una técnica universal — existe la técnica perfecta para ti.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "radiofrecuencia-facial-camas-sevilla",
    title: "Radiofrecuencia facial en Camas: rejuvenece sin bisturí",
    metaTitle: "Radiofrecuencia Facial en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "Radiofrecuencia facial en Camas, Sevilla. Reafirma, redensifica y rejuvenece tu piel sin cirugía ni recuperación. Resultados visibles desde la primera sesión en YULI COLORS.",
    excerpt:
      "La radiofrecuencia facial es el tratamiento antiedad más demandado para recuperar firmeza sin pasar por el quirófano. Disponible en YULI COLORS, Camas.",
    image: "/images/instagram-4.jpg",
    category: "Tratamientos Faciales",
    date: "2025-03-06",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "La radiofrecuencia facial se ha consolidado como uno de los tratamientos antiedad no invasivos más eficaces del mercado. En YULI COLORS, centro de estética avanzada en Camas (Sevilla), ofrecemos este tratamiento con tecnología de última generación para devolverte una piel más firme, luminosa y visiblemente más joven.",
      },
      {
        type: "h2",
        text: "¿Cómo funciona la radiofrecuencia facial?",
      },
      {
        type: "p",
        text: "La radiofrecuencia emite ondas electromagnéticas que penetran en las capas profundas de la piel generando un calor controlado. Este calor estimula los fibroblastos para producir nuevo colágeno y elastina, las proteínas responsables de la firmeza y elasticidad cutánea. El resultado es una piel más tersa, redensificada y con el óvalo facial visiblemente mejorado.",
      },
      {
        type: "h2",
        text: "¿Para quién está indicada la radiofrecuencia en Camas?",
      },
      {
        type: "ul",
        items: [
          "Piel con pérdida de firmeza o flacidez incipiente.",
          "Contorno facial poco definido.",
          "Arrugas finas y marcas de expresión.",
          "Piel apagada o deshidratada que ha perdido luminosidad.",
          "Como complemento o mantenimiento tras otros tratamientos.",
        ],
      },
      {
        type: "h2",
        text: "¿Cuántas sesiones necesito?",
      },
      {
        type: "p",
        text: "Para obtener resultados óptimos recomendamos un ciclo inicial de 6 a 10 sesiones, una por semana, seguido de sesiones de mantenimiento mensuales. Los resultados son acumulativos: la producción de colágeno continúa incluso semanas después de la última sesión.",
      },
      {
        type: "h2",
        text: "¿Es dolorosa o requiere recuperación?",
      },
      {
        type: "p",
        text: "La radiofrecuencia facial es completamente indolora y no requiere ningún tiempo de recuperación. La sensación durante el tratamiento es de un calor agradable y relajante. Podrás reincorporarte a tu vida normal inmediatamente después de la sesión, lo que la convierte en una opción ideal para clientas de Camas con agendas ocupadas.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "laminado-cejas-camas-sevilla",
    title: "Laminado de cejas en Camas: el tratamiento tendencia que lo cambia todo",
    metaTitle: "Laminado de Cejas en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "El laminado de cejas llega a Camas, Sevilla con YULI COLORS. Cejas voluminosas, peinadas y perfectas durante 8 semanas. Sin micropigmentación, resultado natural.",
    excerpt:
      "El laminado de cejas es la revolución del momento para unas cejas llenas, ordenadas y de aspecto natural. Descubre por qué todas lo quieren en Camas.",
    image: "/images/instagram-1.jpg",
    category: "Cejas & Pestañas",
    date: "2025-03-14",
    readTime: 4,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "El laminado de cejas se ha convertido en el tratamiento estrella de la temporada y en YULI COLORS, tu centro de estética en Camas, Sevilla, no podíamos quedarnos atrás. Si todavía no has probado esta técnica, sigue leyendo — puede que sea exactamente lo que tus cejas necesitan.",
      },
      {
        type: "h2",
        text: "¿En qué consiste el laminado de cejas?",
      },
      {
        type: "p",
        text: "El laminado de cejas es un tratamiento que aplica una fórmula especial sobre los pelos de la ceja para suavizarlos, redirigirlos hacia arriba y fijarlos en su nueva posición. El resultado son unas cejas perfectamente peinadas, voluminosas y con ese efecto 'soap brows' que arrasó en redes sociales — pero duradero.",
      },
      {
        type: "h2",
        text: "¿Cuánto dura el laminado de cejas?",
      },
      {
        type: "p",
        text: "Los resultados del laminado se mantienen entre 6 y 8 semanas. A diferencia de la micropigmentación, es un tratamiento no permanente que no altera el color natural de tus cejas (salvo que lo combines con tinte). Es perfectamente reversible y sin ningún riesgo.",
      },
      {
        type: "h2",
        text: "¿Para quién está pensado el laminado?",
      },
      {
        type: "ul",
        items: [
          "Cejas con pelo fino que se aplana o cae durante el día.",
          "Cejas despobladas que necesitan parecer más densas.",
          "Cejas con pelos que crecen en distintas direcciones.",
          "Personas que buscan un resultado natural sin micropigmentación.",
          "Quienes quieren probar el efecto antes de dar el paso a la semipermanente.",
        ],
      },
      {
        type: "h2",
        text: "Laminado con tinte de cejas en YULI COLORS",
      },
      {
        type: "p",
        text: "En YULI COLORS combinamos habitualmente el laminado con tinte de cejas para intensificar el color y conseguir un resultado todavía más espectacular. Esta combinación es la favorita de nuestras clientas de Camas y alrededores por su efecto visual inmediato y su durabilidad.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "centro-estetica-referencia-camas",
    title: "YULI COLORS: el centro de estética de referencia en Camas, Sevilla",
    metaTitle: "Centro de Estética en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "YULI COLORS es el centro de estética premium de referencia en Camas, Sevilla. Micropigmentación, depilación láser, tratamientos faciales y más. Más de 5.000 clientas satisfechas.",
    excerpt:
      "¿Por qué YULI COLORS se ha convertido en el centro de estética de referencia en Camas? Te contamos nuestra historia, valores y lo que nos hace únicos.",
    image: "/images/hero-beauty.jpg",
    category: "Centro",
    date: "2025-03-24",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "En Camas, Sevilla, cuando alguien pregunta por el mejor centro de estética de la zona, un nombre aparece una y otra vez: YULI COLORS. No es casualidad. Detrás de esta reputación hay años de trabajo, formación continua, más de 5.000 clientas satisfechas y una filosofía muy clara: la belleza debe sentirse natural y auténtica.",
      },
      {
        type: "h2",
        text: "¿Qué hace diferente a YULI COLORS?",
      },
      {
        type: "ul",
        items: [
          "Especialización real: somos expertas en micropigmentación, no un centro que hace de todo sin profundizar en nada.",
          "Tecnología de vanguardia: equipamiento europeo de última generación en todas las especialidades.",
          "Atención personalizada: cada clienta recibe un plan diseñado específicamente para ella.",
          "Más de 10 años de experiencia acumulada en estética avanzada.",
          "Formación continua: nuestro equipo se actualiza constantemente con las técnicas más innovadoras.",
        ],
      },
      {
        type: "h2",
        text: "Servicios disponibles en YULI COLORS Camas",
      },
      {
        type: "p",
        text: "Desde micropigmentación artística hasta depilación láser definitiva, pasando por tratamientos faciales avanzados, lifting de pestañas, laminado de cejas, radiofrecuencia e IPL. En YULI COLORS encontrarás un catálogo completo de estética de alta gama sin tener que desplazarte fuera de Camas.",
      },
      {
        type: "h2",
        text: "Clientas de toda la comarca del Aljarafe",
      },
      {
        type: "p",
        text: "Nuestra ubicación en Camas nos convierte en el centro de referencia natural para toda la comarca del Aljarafe. Recibimos clientas de Gines, Tomares, Bormujos, Espartinas, Palomares del Río y San Juan de Aznalfarache que prefieren la cercanía y la confianza de un centro de primer nivel en su entorno.",
      },
      {
        type: "h2",
        text: "Reserva tu consulta gratuita",
      },
      {
        type: "p",
        text: "Todas las clientas nuevas de YULI COLORS reciben una consulta de valoración gratuita y sin compromiso. En esa primera cita analizamos tu caso, respondemos todas tus dudas y diseñamos el plan más adecuado para ti. Así de simple.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "ipl-fotorrejuvenecimiento-camas-sevilla",
    title: "IPL en Camas: elimina manchas y rojeces con luz pulsada",
    metaTitle: "IPL Fotorrejuvenecimiento en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "IPL fotorrejuvenecimiento en Camas, Sevilla. Elimina manchas, rojeces y couperosis con tecnología de luz pulsada. Resultados visibles desde la primera sesión en YULI COLORS.",
    excerpt:
      "El IPL o fotorrejuvenecimiento trata manchas, rojeces y envejecimiento cutáneo de forma no invasiva. Disponible ahora en YULI COLORS, Camas, Sevilla.",
    image: "/images/result-1.jpg",
    category: "Tratamientos Faciales",
    date: "2025-04-01",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "El IPL (Intense Pulsed Light o Luz Pulsada Intensa) es uno de los tratamientos de fotorrejuvenecimiento más eficaces disponibles actualmente. En YULI COLORS, tu centro de estética avanzada en Camas, Sevilla, utilizamos esta tecnología para tratar manchas, rojeces, couperosis y los primeros signos del envejecimiento con resultados visibles y sin agresión.",
      },
      {
        type: "h2",
        text: "¿Qué problemas trata el IPL?",
      },
      {
        type: "ul",
        items: [
          "Manchas solares y de la edad en rostro, escote y manos.",
          "Rojeces difusas y couperosis.",
          "Rosácea leve o moderada.",
          "Tono irregular y falta de luminosidad.",
          "Poros dilatados y textura irregular.",
          "Primeras arrugas finas superficiales.",
        ],
      },
      {
        type: "h2",
        text: "¿Cómo funciona el IPL?",
      },
      {
        type: "p",
        text: "El IPL emite pulsos de luz de amplio espectro que penetran en la piel y son absorbidos selectivamente por la melanina (manchas) o la hemoglobina (rojeces vasculares). El tejido pigmentado o vascular se calienta y destruye de forma selectiva sin dañar los tejidos circundantes, consiguiendo así uniformizar el tono y mejorar la textura global.",
      },
      {
        type: "h2",
        text: "¿Por qué es especialmente relevante en Camas y Sevilla?",
      },
      {
        type: "p",
        text: "Vivir en Camas, en la provincia de Sevilla, implica una exposición solar importante durante gran parte del año. Esto acelera la aparición de manchas solares y el envejecimiento cutáneo. El IPL es especialmente efectivo para tratar los daños acumulados por el sol y prevenir su progresión, convirtiéndose en un aliado fundamental para la piel mediterránea.",
      },
      {
        type: "h2",
        text: "¿Cuántas sesiones son necesarias?",
      },
      {
        type: "p",
        text: "Para un resultado óptimo se recomiendan entre 3 y 5 sesiones separadas 3-4 semanas entre sí. Muchas clientas notan mejoría desde la primera sesión. El tratamiento puede combinarse con radiofrecuencia o rituales faciales para potenciar los resultados.",
      },
      { type: "cta" },
    ],
  },

  {
    slug: "micropigmentacion-labios-camas-sevilla",
    title: "Micropigmentación de labios en Camas: despierta perfecta cada mañana",
    metaTitle: "Micropigmentación de Labios en Camas, Sevilla | YULI COLORS",
    metaDescription:
      "Micropigmentación de labios en Camas, Sevilla. Define, colorea y rellena visualmente tus labios con resultados naturales que duran meses. Expertos en YULI COLORS.",
    excerpt:
      "La micropigmentación de labios es la solución perfecta para unas labios definidos, coloreados y con volumen visual de forma semipermanente. Descúbrela en Camas.",
    image: "/images/hero-beauty.jpg",
    category: "Micropigmentación",
    date: "2025-04-10",
    readTime: 5,
    author: "YULI COLORS",
    content: [
      {
        type: "p",
        text: "La micropigmentación de labios es uno de los tratamientos semipermanentes que más satisfacción genera entre nuestras clientas de Camas y alrededores. En YULI COLORS llevamos años perfeccionando esta técnica para ofrecer labios visualmente más carnosos, definidos y coloridos — de forma completamente natural y personalizada.",
      },
      {
        type: "h2",
        text: "¿Qué es la micropigmentación de labios?",
      },
      {
        type: "p",
        text: "La micropigmentación de labios es un procedimiento semipermanente que deposita pigmentos en la dermis labial para redefinir el contorno, unificar el color y aportar volumen visual. El resultado puede ir desde el más natural (efecto tinte) hasta un acabado más intenso y definido, siempre adaptado a tu visión de belleza.",
      },
      {
        type: "h2",
        text: "Tipos de micropigmentación de labios en YULI COLORS",
      },
      {
        type: "ul",
        items: [
          "Perfilado de labios: define el contorno de forma precisa para unos labios con más carácter.",
          "Labios acuarela: rellena todo el labio con un efecto sutil, natural y jugoso.",
          "Labios compactos: cobertura total con un acabado opaco y definido.",
          "Neutralización: corrige tonos morados o apagados para recuperar un tono natural rosado.",
        ],
      },
      {
        type: "h2",
        text: "¿Para quién es ideal la micropigmentación de labios?",
      },
      {
        type: "p",
        text: "Es perfecta para quienes tienen labios con poco color definido, contornos irregulares, asimetrías leves o simplemente quieren simplificar su maquillaje diario. También es muy demandada por clientas con vitíligo perioral o que han perdido pigmentación labial con los años.",
      },
      {
        type: "h2",
        text: "¿Cuánto dura la micropigmentación de labios?",
      },
      {
        type: "p",
        text: "Los resultados duran entre 12 y 18 meses en función del tono elegido (los colores más suaves se aclaran antes), el tipo de piel y los cuidados posteriores. Una sesión de retoque anual es suficiente para mantener el resultado en perfecto estado.",
      },
      {
        type: "h2",
        text: "Reserva tu cita en Camas",
      },
      {
        type: "p",
        text: "En YULI COLORS, Camas, todas las sesiones de micropigmentación de labios incluyen una consulta de diseño previa donde elegimos juntas el tono, la forma y la técnica más adecuada para ti. El resultado siempre será tuyo — simplemente, en su mejor versión.",
      },
      { type: "cta" },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getLatestPosts(n = 3): BlogPost[] {
  return getAllPosts().slice(0, n)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
