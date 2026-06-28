/**
 * Spanish (es-MX) dictionary. Mirrors the shape of `EN` exactly — invariant
 * fields (image paths, icon names, slugs, logos, numbers, place names, and
 * partner names) keep their English/source values; only human-readable copy
 * is translated. Typed as `Dictionary` so tsc flags any missing field.
 */
import type { Dictionary } from "./en";

export const ES: Dictionary = {
  home: {
    hero: {
      eyebrow: "Redefiniendo la excelencia logística",
      headline: "Calidad y confiabilidad en cada entrega",
      subhead:
        "Tu socio logístico de confianza para transporte confiable y de alto volumen. Conectamos más de 1,200 ciudades en Estados Unidos, México y Canadá — con consistencia, velocidad y certeza en cada milla.",
      bgImage: "/brand/TBM-1.jpg",
    },
    stats: [
      { value: "1,200+", label: "Ciudades (EE.UU., CA y MX)" },
      { value: "25,000+", label: "Cargas al año" },
      { value: "500+", label: "Colaboradores" },
    ],
    kinetic: [
      "Transportista con activos propios",
      "Puerta a puerta",
      "EE.UU. ⇄ MX ⇄ CA",
      "C-TPAT · FAST · OEA",
      "Desde 1999",
      "Soporte en vivo 24/7",
      "Cruces fiscalizados (cross-dock)",
    ],
    journey: {
      eyebrow: "Qué le pasa a tu carga",
      headline: "Un solo transportista, de tu andén al de tu cliente",
      body: "La mayoría de la carga transfronteriza cambia de manos tres o cuatro veces. La tuya no. Sigue una carga de TBM desde la recolección hasta la prueba de entrega — mismo transportista, misma responsabilidad, todo el camino.",
      stages: [
        {
          n: "01",
          title: "Recolección en tu andén",
          body: "Un operador de TBM en equipo de TBM carga en tus instalaciones — EE.UU., México o Canadá. El rastreo GPS y las cámaras con IA están activos desde la primera milla.",
        },
        {
          n: "02",
          title: "Traslado a la frontera",
          body: "Tractocamiones de modelo reciente, renovados cada tres años y mantenidos en casa. Tu CSR dedicado vigila la ruta y anticipa cualquier detalle antes de que se vuelva un retraso.",
        },
        {
          n: "03",
          title: "Cross-dock fiscalizado en el cruce",
          body: "En los principales cruces EE.UU.–México, nuestras instalaciones fiscalizadas consolidan, desconsolidan o redirigen en minutos — no en días. Acceso controlado y seguridad las 24 horas.",
        },
        {
          n: "04",
          title: "Cruce expedito",
          body: "Las certificaciones C-TPAT, FAST y OEA mantienen las cargas en los carriles de comerciante confiable, mientras la Carta Porte validada con IA libera la aduana mexicana sin rechazos.",
        },
        {
          n: "05",
          title: "Entrega — mismo transportista",
          body: "La carga llega puerta a puerta sin transferencias a terceros ni vacíos en la cadena de custodia. La prueba de entrega y las actualizaciones en vivo llegan a tu bandeja.",
        },
      ],
    },
    about: {
      eyebrow: "Quiénes somos",
      headline: "Operando desde 1999, al servicio de la región T-MEC",
      body: [
        "Desde 1999, TBM Carriers ha expandido su red por Estados Unidos, México y Canadá, ofreciendo soluciones logísticas confiables y de alto desempeño. Combinamos tecnología avanzada, procesos eficientes y un equipo experimentado para resolver demandas de transporte complejas con precisión y consistencia.",
        "Nuestra red con activos propios — terminales a ambos lados de la frontera, talleres de mantenimiento certificados y un equipo de soporte 24/7 — mantiene cada embarque confiable, seguro y responsable desde la recolección hasta la entrega.",
      ],
      image: "/brand/tbm-carriers-91.jpg",
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      headline: "Tres pasos hacia un embarque confiable",
      body: "Simplifica tus envíos con nuestro proceso de tres pasos, sencillo pero poderoso. Descubre cómo TBM Carriers reduce el manejo, mejora los tiempos de tránsito y entrega soluciones transfronterizas consistentes y confiables.",
      steps: [
        {
          n: "01",
          title: "Solicita una cotización",
          body: "Comparte información básica de tu embarque para recibir una estimación inicial de costo de nuestros especialistas.",
          image: "/brand/tbm-q.jpg",
        },
        {
          n: "02",
          title: "Comparte los detalles",
          body: "Proporciona los datos clave del envío, incluyendo puntos de recolección y entrega, para diseñar la solución a tu medida.",
          image: "/brand/tbm-e.jpg",
        },
        {
          n: "03",
          title: "Lo hacemos realidad",
          body: "Elige tu fecha de recolección, confirma los detalles y deja que TBM Carriers se encargue del resto — con eficiencia y confiabilidad.",
          image: "/brand/tbm-r.jpg",
        },
      ],
    },
    crossBorder: {
      eyebrow: "Soluciones logísticas transfronterizas",
      headline: "Integradas, con activos propios y costo optimizado",
      subhead:
        "Tres pilares detrás de una carga transfronteriza que no se queda varada en la frontera.",
      pillars: [
        {
          title: "Activos propios + integración",
          body: "Entregamos logística transfronteriza integrada y con activos propios que reduce costos mientras mejora la velocidad y la confiabilidad del tránsito. Alianzas estratégicas con transportistas certificados C-TPAT aseguran operaciones seguras y en cumplimiento por todo México.",
        },
        {
          title: "Red internacional sin fricciones",
          body: "Nuestra red internacional sin fricciones minimiza el manejo, reduce costos operativos y disminuye el riesgo — respaldada por una red de más de 25 transportistas aliados certificados C-TPAT.",
        },
        {
          title: "Integración intermodal con Ferromex",
          body: "A través de nuestra alianza con Ferromex, integramos la red ferroviaria intermodal de México para ofrecer transporte transfronterizo escalable, eficiente y de costo optimizado.",
        },
      ],
    },
    crossDock: {
      eyebrow: "Operaciones de cross-dock transfronterizo",
      headline: "Simplifica tu experiencia de envío con el cross-dock transfronterizo",
      body: "Las instalaciones de cross-dock fiscalizadas en los principales cruces EE.UU./México nos permiten consolidar, desconsolidar y redirigir en minutos — no en días. El resultado: ventanas de tránsito más cortas, menor costo de manejo y mayor cumplimiento a ambos lados de la línea.",
      image: "/brand/tbm-carriers-98.jpg",
    },
    network: {
      eyebrow: "Nuestra red",
      headline: "Cobertura transfronteriza en los principales corredores comerciales de Norteamérica",
      body: "Ubicada estratégicamente en los grandes cruces EE.UU.–México, nuestra red sustenta una logística transfronteriza segura, eficiente y de alto desempeño.",
      crossings: [
        { us: "Otay Mesa, CA", mx: "Tijuana, B.C." },
        { us: "Calexico, CA", mx: "Mexicali, B.C." },
        { us: "Nogales, AZ", mx: "Nogales, Son." },
        { us: "Del Rio, TX", mx: "Cd. Acuña, Coah." },
        { us: "Eagle Pass, TX", mx: "Piedras Negras, Coah." },
        { us: "Laredo, TX", mx: "Nuevo Laredo, Tamps." },
        { us: "El Paso, TX", mx: "Ciudad Juárez, Chih." },
      ],
    },
    texasBand: {
      eyebrow: "De Texas a donde sea",
      headline: "Transporte de carga seguro, protegido y confiable por Estados Unidos y Texas",
      body: "¿Buscas transporte de carga confiable por todo Estados Unidos? TBM Carriers entrega soluciones logísticas seguras, eficientes y de alto desempeño, respaldadas por experiencia, tecnología avanzada y operaciones de confianza en Texas y más allá. Contáctanos hoy para conocer cómo podemos apoyar tus necesidades de envío.",
      bgImage: "/brand/home_airport_sectionbg7.jpg",
    },
    whyUs: {
      eyebrow: "Cumplimos en todo",
      headline: "Más limpio, más fuerte, más confiable",
      body: "Soluciones logísticas de extremo a extremo diseñadas para entregar confiabilidad, cobertura y certeza en cada embarque.",
      features: [
        {
          title: "Soluciones rápidas y expertas",
          body: "Aprovecha nuestro equipo experimentado y nuestra red confiable para entregar transporte rápido, eficiente y confiable por Estados Unidos, México y Canadá.",
          icon: "Zap",
        },
        {
          title: "Seguridad y confiabilidad",
          body: "Aprovecha nuestro equipo de última generación y nuestro equipo de mantenimiento certificado para garantizar seguridad y eficiencia en toda Norteamérica.",
          icon: "ShieldCheck",
        },
        {
          title: "Servicio de amplio alcance",
          body: "Aprovecha nuestra flexibilidad y adaptabilidad — soluciones a la medida de tus necesidades en más de 1,200 ciudades.",
          icon: "Globe2",
        },
        {
          title: "Soporte 24/7",
          body: "Aprovecha nuestra visibilidad de carga con IA y a nuestros profesionales de seguridad para monitorear y proteger tu producto en el camino, a toda hora.",
          icon: "Headphones",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas, respondidas",
      headline: "Lo que preguntan los embarcadores antes de cambiarse",
      body: "Respuestas claras sobre cómo funciona la carga transfronteriza cuando un solo transportista responsable es dueño de todo el movimiento.",
      items: [
        {
          q: "¿Son un transportista con activos propios o un bróker?",
          a: "Con activos propios. Somos dueños de los tractocamiones, las cajas, las terminales y los talleres de mantenimiento a ambos lados de la frontera EE.UU.–México — y operadores de TBM mueven cada carga. Esa es la diferencia entre un bróker que promete servicio y un transportista que lo entrega.",
        },
        {
          q: "¿Cómo evitan que la carga se quede varada en la frontera?",
          a: "Nuestros propios operadores manejan el cruce puerta a puerta — sin transferencias a terceros ni vacíos en la cadena de custodia. Las certificaciones C-TPAT, FAST y OEA mantienen las cargas en los carriles de comerciante confiable, y los cross-docks fiscalizados en los principales cruces nos permiten consolidar, desconsolidar o redirigir en minutos, no en días.",
        },
        {
          q: "¿Qué es la Carta Porte y cómo la manejan?",
          a: "La Carta Porte es el documento obligatorio de embarque en México, y los campos incorrectos provocan rechazos, auditorías y detenciones. Nuestra herramienta de IA llena y valida la documentación contra los requisitos más recientes del SAT, señalando problemas antes de que la carga salga del andén.",
        },
        {
          q: "¿Dónde operan?",
          a: "Por Estados Unidos, México y Canadá — más de 1,200 ciudades, con terminales e instalaciones fiscalizadas en cada gran cruce EE.UU.–México, desde Otay Mesa y Calexico hasta Nogales, Eagle Pass y Laredo.",
        },
        {
          q: "¿Cómo rastreo mi embarque?",
          a: "Cada tractocamión lleva GPS y cámaras con IA para visibilidad continua en tiempo real. Recibes actualizaciones en vivo a través de nuestro portal de rastreo, y tu Representante de Servicio al Cliente vigila la ruta y anticipa cualquier detalle antes de que se vuelva un retraso.",
        },
        {
          q: "¿Qué certificaciones y programas de seguridad tienen?",
          a: "TBM Carriers Inc. y TBM Carriers de México son participantes certificados en C-TPAT y OEA, además de FAST, SmartWay, la Junta de Recursos del Aire de California (CARB) y el Southwest Minority Supplier Development Council — seguridad y cumplimiento auditados detrás de cada carga.",
        },
        {
          q: "¿Cómo empiezo o solicito una cotización?",
          a: "Contacta directamente a nuestro equipo de ventas — un clic abre un correo a una persona real que conoce la carga transfronteriza. Sin formularios, sin call centers, y respondemos en menos de 24 horas.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Envía con confianza",
      headline: "Soluciones logísticas confiables, seguras y eficientes en toda Norteamérica.",
      bgImage: "/brand/tbm-t.jpg",
    },
  },

  about: {
    hero: {
      eyebrow: "Quiénes somos",
      headline: "TBM Carriers: la ruta a la excelencia",
      subhead:
        "Construido sobre experiencia, tecnología y personas. Operando en la región T-MEC desde 1999.",
      bgImage: "/brand/tbm-c-9090.jpg",
    },
    mvh: {
      eyebrow: "Misión, visión, historia",
      headline: "Desde 1999, una sola dirección",
      items: [
        {
          label: "Misión",
          body: "Brindar soluciones logísticas competitivas y a la medida que satisfagan las necesidades de transporte de nuestros clientes mediante procesos innovadores, tecnología avanzada y un equipo altamente calificado, comprometido con un servicio con integridad, consistencia y excelencia.",
        },
        {
          label: "Visión",
          body: "Ser una empresa líder de transporte y logística, reconocida por la excelencia en el servicio, la solidez financiera y las alianzas de largo plazo.",
        },
        {
          label: "Historia",
          body: "Desde 1999, TBM Carriers ha ampliado su presencia por la región T-MEC. Como empresa con activos propios y terminales ubicadas estratégicamente en Estados Unidos y México, brindamos la infraestructura y la experiencia para atender necesidades logísticas transfronterizas complejas.",
        },
      ],
    },
    pillarsIntro: {
      eyebrow: "Construido sobre experiencia, tecnología y personas",
      headline: "Los tres pilares detrás de cada embarque de TBM",
      body: "Cada carga que sale de nuestros andenes viaja sobre el mismo cimiento: una cultura de seguridad tomada en serio, equipo mantenido por encima de las normas federales e instalaciones construidas para la operación transfronteriza.",
    },
    pillars: [
      {
        title: "Seguridad",
        body: "La seguridad de nuestros colaboradores, clientes y del público es nuestra máxima prioridad. En TBM Carriers, la seguridad es un principio central integrado en nuestras políticas, procedimientos y operación diaria.",
      },
      {
        title: "Equipo",
        body: "Nuestra flota se compone de tractocamiones Kenworth e International de modelo reciente, renovados en un ciclo de tres años y mantenidos por encima de las normas federales de seguridad y emisiones por técnicos certificados internos y proveedores autorizados.",
      },
      {
        title: "Instalaciones",
        body: "Nuestras instalaciones ubicadas estratégicamente a lo largo de la frontera EE.UU.–México están protegidas con sistemas de vigilancia avanzados y puntos de acceso controlados, monitoreados de forma continua por personal de seguridad capacitado para garantizar operaciones seguras, eficientes y confiables.",
      },
    ],
    story: {
      eyebrow: "Acumulando experiencia",
      headline: "Una red en crecimiento por la región T-MEC",
      body: [
        "Desde 1999, TBM Carriers ha ampliado su presencia por Estados Unidos, México y Canadá — una empresa con activos propios y terminales ubicadas estratégicamente que brindan la infraestructura y la experiencia para atender necesidades logísticas transfronterizas complejas.",
        "Combinamos tecnología avanzada, procesos eficientes y un equipo altamente calificado para entregar un servicio confiable y excelencia operativa en cada embarque.",
      ],
      image: "/brand/tbm-c-4.jpg",
    },
    facilities: {
      eyebrow: "Nuestras instalaciones",
      headline: "Terminales a ambos lados de la frontera",
      body: "Nuestras instalaciones están ubicadas estratégicamente a lo largo de la frontera EE.UU.–México. Todas las entradas y salidas están protegidas con sistemas de vigilancia y control de acceso, monitoreadas por personal de seguridad capacitado. Esta infraestructura garantiza operaciones seguras y eficientes, y refleja nuestro compromiso con la calidad y la seguridad.",
      image: "/brand/TBM-C-40.jpg",
    },
    ai: {
      eyebrow: "Tecnología",
      headline: "Usamos IA para simplificar la Carta Porte",
      body: "El mandato de Carta Porte en México agrega complejidad real a la carga transfronteriza — los campos incorrectos provocan rechazos, auditorías y detenciones. Nuestra herramienta de IA llena los documentos de cumplimiento, los valida contra los requisitos más recientes del SAT y señala problemas antes de que la carga salga del andén.",
    },
  },

  services: [
    {
      slug: "border-crossing",
      title: "Cruce de frontera",
      short:
        "Servicio transfronterizo puerta a puerta manejado por operadores de TBM, con seguridad, consistencia y plena responsabilidad en cada etapa.",
      full: "Nuestras operaciones transfronterizas las manejan de principio a fin operadores de TBM con equipo propio de TBM. Sin transferencias a terceros en la frontera, sin vacíos en la cadena de custodia. Las certificaciones C-TPAT, FAST y OEA mantienen tus cargas en el carril expedito.",
      image: "/brand/icons/icon-border-crossing.png",
    },
    {
      slug: "distribution-warehousing",
      title: "Distribución y almacenaje",
      short:
        "Servicios de transportista fiscalizado con almacenaje flexible y soluciones de cross-dock para una distribución eficiente y un flujo de inventario ágil.",
      full: "Almacenaje fiscalizado a ambos lados de la frontera, operaciones de cross-dock para un giro rápido y visibilidad de inventario a través de los sistemas de nuestros aliados. Diseñado para flujos de alto volumen en retail, automotriz e industrial.",
      image: "/brand/icons/icon-warehousing.png",
    },
    {
      slug: "customer-service",
      title: "Servicio al cliente",
      short:
        "Un representante dedicado funciona como tu único punto de contacto, asegurando comunicación clara, actualizaciones oportunas y soporte constante.",
      full: "Cada cuenta se asigna a un Representante de Servicio al Cliente dedicado que conoce tus embarques, tus rutas y a tus contactos. Un solo número, una sola bandeja, respuestas reales.",
      image: "/brand/icons/icon-customer-service.png",
    },
    {
      slug: "shops",
      title: "Mantenimiento de flota",
      short:
        "Talleres de mantenimiento de última generación con técnicos certificados, asegurando desempeño, confiabilidad y seguridad óptimos de la flota.",
      full: "Nuestros talleres internos realizan inspecciones DOT, mantenimiento preventivo y reparaciones de servicio completo en toda la flota. Técnicos certificados, equipo de grado de fábrica y un inventario de refacciones que mantiene los camiones rodando.",
      image: "/brand/icons/icon-fleet-maintenance.png",
    },
    {
      slug: "gps-tracking",
      title: "Rastreo en tiempo real",
      short:
        "Monitoreo continuo del embarque con tecnología de rastreo avanzada, con visibilidad en tiempo real y mayor seguridad en toda nuestra red.",
      full: "Rastreo GPS en cada camión, cámaras con IA hacia el operador y hacia el camino, y alertas proactivas ante desviaciones o retrasos. Ves lo que nosotros vemos.",
      image: "/brand/icons/icon-tracking.png",
    },
    {
      slug: "location",
      title: "Ubicaciones",
      short:
        "Operaciones con activos propios y terminales a ambos lados de la frontera EE.UU.–México, para una logística transfronteriza sin fricciones y mayor control de tu carga.",
      full: "Activos propios significa que somos dueños de los camiones, las cajas, las terminales y los talleres de mantenimiento. Esa es la diferencia entre un bróker que promete servicio y un transportista que lo entrega.",
      image: "/brand/icons/icon-locations.png",
    },
  ],

  serviceFeatures: [
    {
      title: "Soluciones logísticas",
      body: "Soluciones de transporte a la medida de tus necesidades operativas — incluyendo personal, gestión logística y soporte escalable, diseñadas para adaptarse a las demandas cambiantes del negocio.",
    },
    {
      title: "TBM Intermodal",
      body: "Soluciones intermodales seguras y de costo eficiente, integradas con la red ferroviaria del Pacífico de Ferromex, conectando terminales clave por todo México — transporte de alta capacidad, tiempos de tránsito consistentes y menores emisiones.",
    },
    {
      title: "Servicio puerta a puerta",
      body: "Transporte puerta a puerta totalmente integrado por México, EE.UU. y Canadá — minimizando el manejo, reduciendo costos y disminuyendo el riesgo de daño.",
    },
  ],

  servicesAi: {
    eyebrow: "Tecnología",
    headline: "Usamos IA para simplificar tu Carta Porte",
    body: "El mandato de Carta Porte en México agrega complejidad real a la carga transfronteriza — los campos incorrectos provocan rechazos, auditorías y detenciones. Nuestra herramienta de IA llena los documentos de cumplimiento, los valida contra los requisitos más recientes del SAT y señala problemas antes de que la carga salga del andén.",
    image: "/brand/tbm-back-girl.jpg",
  },

  servicesTech: {
    eyebrow: "Operaciones",
    headline: "Tecnología que impulsa nuestra operación",
    items: [
      {
        partner: "Samsara",
        title: "Rastreo y telemetría en tiempo real",
        body: "El rastreo GPS y la telemetría en tiempo real brindan visibilidad continua, actualizaciones en vivo y mayor control operativo en cada embarque.",
      },
      {
        partner: "McLeod",
        title: "TMS integrado",
        body: "Un sistema integrado de gestión de transporte (TMS) sustenta el despacho, la intermediación de carga y la administración de activos — optimizando la eficiencia y agilizando la operación.",
      },
    ],
  },

  certifications: [
    {
      slug: "ctpat",
      short: "C-TPAT",
      full: "Customs Trade Partnership Against Terrorism",
      blurb:
        "Como participantes activos, cooperamos con CBP en los esfuerzos por asegurar la cadena de suministro.",
      description:
        "Programa de la Aduana y Protección Fronteriza de EE.UU. (CBP) que asegura la cadena de suministro internacional contra el terrorismo. Los miembros obtienen procesamiento expedito en la frontera.",
      logo: "/brand/ctpat-logo.jpg",
    },
    {
      slug: "fast",
      short: "FAST",
      full: "Free and Secure Trade",
      blurb:
        "Garantizando procesamiento expedito y comercio seguro a través de las fronteras.",
      description:
        "Programa conjunto EE.UU./México/Canadá para embarques comerciales transfronterizos expeditos mediante carriles FAST dedicados.",
      logo: "/brand/fast-logo.jpg",
    },
    {
      slug: "smartway",
      short: "SmartWay",
      full: "SmartWay Transport Partner",
      blurb:
        "Demostrando nuestro compromiso con la gestión ambiental y la eficiencia.",
      description:
        "Programa de la EPA que reconoce a los transportistas que miden y mejoran su eficiencia de combustible y reducen las emisiones de su flota.",
      logo: "/brand/smartway-logo.jpg",
    },
    {
      slug: "oea",
      short: "OEA",
      full: "Operador Económico Autorizado",
      blurb:
        "El programa de comerciante confiable de México, que otorga trato aduanero expedito en el cruce.",
      description:
        "El programa Operador Económico Autorizado de México — equivalente al C-TPAT — que otorga estatus de comerciante confiable y aduana más rápida.",
      logo: "/brand/oea-logo.jpg",
    },
    {
      slug: "smsdc",
      short: "SWMSDC",
      full: "Southwest Minority Supplier Development Council",
      blurb:
        "Comprometidos con ampliar las oportunidades para empresas de minorías.",
      description:
        "Empresa certificada como propiedad de minorías a través de la red del National Minority Supplier Development Council.",
      logo: "/brand/soutwest-logo.jpg",
    },
    {
      slug: "carb",
      short: "CARB",
      full: "California Air Resources Board",
      blurb:
        "Dedicados a mejorar la calidad del aire y reducir el impacto ambiental.",
      description:
        "En cumplimiento con las regulaciones de CARB para operación de camiones limpios en las carreteras de California.",
      logo: "/brand/california-air-resources-logo.jpg",
    },
  ],

  complianceLead:
    "Implementando, siguiendo y manteniendo procedimientos y mejores prácticas consistentes con los criterios de seguridad C-TPAT/OEA:",
  compliancePractices: [
    "Cooperar con la Aduana y Protección Fronteriza de EE.UU. (CBP) y las autoridades pertinentes para fortalecer la seguridad de la cadena de suministro.",
    "Cumplir y superar los estándares recomendados de negocio y seguridad en todas las operaciones.",
    "Apoyar las iniciativas globales para prevenir el terrorismo y proteger el comercio internacional.",
    "Brindar lineamientos de seguridad y capacitación a empleados, contratistas, proveedores de servicio y socios afiliados.",
    "Garantizar un entorno seguro y protegido para empleados, clientes, proveedores y visitantes.",
    "Investigar y responder con prontitud ante cualquier incidente de seguridad relacionado con la seguridad de la carga o el cumplimiento C-TPAT/OEA, y notificar a las autoridades correspondientes cuando se requiera.",
    "Revisar, ajustar y actualizar las evaluaciones de riesgo, las prácticas y los procedimientos de seguridad de forma periódica y según sea necesario.",
  ],

  nav: {
    home: "Inicio",
    knowUs: "Conócenos",
    networkServices: "Red y Servicios",
    compliance: "Cumplimiento y Seguridad",
    contact: "Contáctanos",
  },

  ui: {
    contactSales: "Contactar a Ventas",
    emailSales: "Escribir a Ventas",
    trackShipment: "Rastrear Envío",
    ourServices: "Nuestros Servicios",
    seeAllServices: "Ver todos los servicios",
    learnAboutUs: "Conócenos",
    learnMore: "Ver más",
    learnMoreAbout: "Ver más sobre",
    serviceOverview: "Resumen",
    serviceHighlights: "Puntos clave",
    moreServices: "Más servicios",
    allServices: "Todos los servicios",
    scrollToExplore: "Desliza para explorar",
    backToTop: "Volver arriba",
    menu: "Menú principal",
    close: "Cerrar",
    language: "Idioma",
    heroLocations: "Ubicaciones en toda Norteamérica",
    contactEyebrow: "Contacto",
    contactTitle: "Habla con una persona real, en cualquiera de los dos países",
    contactSubtitle:
      "Un solo número, una sola bandeja, un solo equipo responsable — a ambos lados de la frontera.",
    replyWithin: "Respondemos en menos de 24 horas",
    regionUS: "Estados Unidos",
    regionMX: "México",
    stillHaveQuestion: "¿Tienes otra pregunta?",
    footerNavHeading: "Navegar",
    footerCertHeading: "Certificados y confiables en toda Norteamérica",
    footerSecurityLink: "Conoce cómo funciona nuestro programa de seguridad",
    networkExplore: "Explorar",
    networkPlanLane: "Planear una ruta",
    partnershipsCerts: "Alianzas y certificaciones",
    servicesHeadline: "Eficiencia y confiabilidad en cada embarque",
    servicesCommitment:
      "Cada embarque recibe la atención que merece — sin importar el tamaño.",
    integratedEyebrow: "Soluciones logísticas integradas",
    integratedHeadline: "Diseñadas para el desempeño y la confiabilidad",
    complianceHeadline: "Dos programas, un solo manual de seguridad",
    complianceIntro:
      "Como miembro confiable de C-TPAT/OEA, TBM Carriers cumple rigurosos estándares de seguridad para garantizar la integridad, la confiabilidad y la seguridad de las operaciones de comercio internacional en toda Norteamérica.",
    emailSafetyTeam: "Escribe a nuestro equipo de seguridad",
    featuredService: "Servicio destacado",
    tagline:
      "Entregamos soluciones de transporte confiables y de extremo a extremo, con un compromiso de calidad, consistencia y confianza.",
    footerCtaEyebrow: "Cruzando fronteras desde",
    footerCtaHeadlineA: "¿Listo para enviar con",
    footerCtaHeadlineB: "confianza?",
    footerCtaBody:
      "Habla con nuestros especialistas transfronterizos — respondemos en menos de 24 horas.",
    allRightsReserved: "Todos los derechos reservados.",
    operatingSince: "Operando desde",
    track: "Rastrear",
    openMenu: "Abrir menú",
    skipToContent: "Saltar al contenido",
    mobileNav: "Navegación móvil",
    showOnMap: "ver en el mapa de la red",
    certifications: "Certificaciones",
    highlights: "Destacados de TBM",
    contactByEmail: "Contactar a ventas por correo",
    copyPhone: "Copiar número de teléfono",
    salesSubject: "Consulta de ventas — TBM Carriers",
  },

  map: {
    all: "Todos",
    explore: "Explorar",
    planLane: "Planear ruta",
    groups: {
      terminal: "Terminales y matriz",
      dropyard: "Patios de remolques",
      crossing: "Cruces fronterizos",
      office: "Oficinas y talleres",
    },
    roles: {
      hq: "Matriz",
      terminal: "Terminal",
      dropyard: "Patio de remolques",
      crossing: "Cruce fronterizo",
      office: "Oficina",
      maintenance: "Taller de mantenimiento",
    },
    tapOrigin: "Toca una ciudad de origen",
    thenDestination: "en el mapa, luego un destino.",
    originColon: "Origen:",
    nowTapDestination: "— ahora toca un destino.",
    reset: "Reiniciar",
    resetLane: "Reiniciar ruta",
    viaPrefix: "vía el cruce",
    viaSuffix: "",
    miAbbr: "mi",
    kmAbbr: "km",
    dayShort: "día",
    daysShort: "días",
    estTransit: "de tránsito est.",
    getFirmQuote: "Obtener cotización en firme",
    laneQuoteSubject: "Cotización de ruta",
    planFootnote:
      "Estimaciones de planeación basadas en tiempos de manejo estándar de carga completa — tu CSR dedicado confirma horarios y precios exactos.",
    planCaption: "Planeador de rutas — toca dos ciudades para trazar una ruta",
    captionTerminals: "terminales y matriz",
    captionDropYards: "patios de remolques",
    captionCrossings: "cruces fronterizos",
    captionOffices: "oficinas y talleres",
    captionCorridors: "las líneas en movimiento trazan nuestros corredores insignia",
  },
};
