document.addEventListener('DOMContentLoaded', () => {
  const promoTrack = document.getElementById('promoTrack');
  const promoDots = Array.from(document.querySelectorAll('#promoDots .promo-dot'));
  const promoPrev = document.querySelector('.promo-prev');
  const promoNext = document.querySelector('.promo-next');
  const promoSlides = Array.from(document.querySelectorAll('#promoTrack .promo-slide'));
  const promoCount = promoDots.length || promoSlides.length;
  let promoIndex = 0;

  function setPromoSlide(i) {
    if (!promoTrack || !promoCount) return;
    promoIndex = (i + promoCount) % promoCount;
    promoTrack.style.transform = `translateX(-${promoIndex * 100}%)`;
    promoDots.forEach((dot, index) => dot.classList.toggle('active', index === promoIndex));
  }

  promoDots.forEach((dot, index) => dot.addEventListener('click', () => setPromoSlide(index)));
  if (promoPrev) promoPrev.addEventListener('click', () => setPromoSlide(promoIndex - 1));
  if (promoNext) promoNext.addEventListener('click', () => setPromoSlide(promoIndex + 1));
  if (promoTrack && promoCount) setInterval(() => setPromoSlide(promoIndex + 1), 6500);

  const PRODUCTS = [
    {
  id: 'lg-buds-lite',
  brand: 'LG XBOOM',
  category: 'Audífonos',
  name: 'LG xboom Buds Lite',
  price: 'S/ 169',
  benefits: ['Mild ANC', 'Bluetooth 5.4', 'Hasta 35h con estuche'],
  short: 'Audífonos inalámbricos ligeros para el día a día, con drivers de grafeno, Bluetooth 5.4, cancelación Mild ANC y hasta 35 horas de autonomía con el estuche. Ideales para música, llamadas, estudio, oficina y movilidad diaria.',
  features: [
    'Drivers ligeros de grafeno para mayor claridad',
    'Cancelación Mild ANC para reducir ruido ambiental',
    'Bluetooth 5.4 con conexión moderna y estable',
    'Conexión multipunto para alternar entre dispositivos compatibles',
    'Fast Pair para emparejamiento rápido',
    'Hasta 11.5 horas de reproducción por carga',
    'Hasta 35 horas de autonomía con el estuche',
    'Cuatro presets de ecualización ajustables',
    'Diseño ligero para uso diario',
    'Ideales para música, llamadas, estudio, oficina y movilidad diaria'
  ],
  best: 'estudio, oficina, llamadas, caminatas, gimnasio ligero, viajes y uso diario',
  img: 'assets/images/productos/lg-buds-lite/negro/previa buds negro.avif',
  variants: [
    {
      id: 'negro',
      label: 'Negro',
      color: '#111111',
      gallery: [
        { src: 'assets/images/productos/lg-buds-lite/negro/previa buds negro.avif', label: 'Vista previa' },
        { src: 'assets/images/productos/lg-buds-lite/negro/frontal negro.jpeg', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-buds-lite/negro/lateral buds negro.avif', label: 'Vista lateral' },
        { src: 'assets/images/productos/lg-buds-lite/negro/buds negro.avif', label: 'Audífonos' },
        { src: 'assets/images/productos/lg-buds-lite/negro/audifonos negro.avif', label: 'Detalle de audífonos' },
        { src: 'assets/images/productos/lg-buds-lite/negro/audifonos negro 1.avif', label: 'Otra vista' },
        { src: 'assets/images/productos/lg-buds-lite/negro/caja buds negro.avif', label: 'Empaquetado' }
      ]
    },
    {
      id: 'blanco',
      label: 'Blanco',
      color: '#f2f2f2',
      gallery: [
        { src: 'assets/images/productos/lg-buds-lite/blanco/previa buds blanco.webp', label: 'Vista previa' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/frontal blanco.avif', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/lateral blanco.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/superior blanco.avif', label: 'Vista superior' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/muestra buds blanco.webp', label: 'Muestra del producto' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/audifonos blancos.webp', label: 'Audífonos' },
        { src: 'assets/images/productos/lg-buds-lite/blanco/audifonos 2 blanco.webp', label: 'Otra vista' }
      ]
    }
  ]
},
      {
  id: 'lg-mini',
  brand: 'LG XBOOM',
  category: 'Portátil',
  name: 'LG XBOOM Mini',
  price: 'S/ 169',
  benefits: ['5W de potencia', 'IP67 agua y polvo', 'Hasta 10h de batería'],
  short: 'Sonido premium en formato mini. Pequeño, moderno y fácil de llevar, con sonido Signature xboom by will.i.am para el uso diario.',
  features: [
    'Sonido claro y balanceado de 5W',
    'Diseño compacto y portátil',
    'Resistencia IP67 al agua y polvo',
    'Hasta 10 horas de reproducción',
    'AI Sound para mejorar música y voz',
    'Correa práctica para colgarlo fácilmente',
    'Bluetooth 5.4, Auracast y Party Link',
    'USB-C Audio para laptop o tablet'
  ],
  best: 'habitación, escritorio, cocina, baño, piscina, estudio y viajes',
  img: 'assets/images/productos/lg-xboom-mini.png',
  gallery: [
  { src: 'assets/images/productos/lg-xboom-mini/01-frontal.png', label: 'Vista frontal' },
  { src: 'assets/images/productos/lg-xboom-mini/02-correa.webp', label: 'Detalle de correa' },
  { src: 'assets/images/productos/lg-xboom-mini/03-lateral.webp', label: 'Vista lateral' },
  { src: 'assets/images/productos/lg-xboom-mini/04-trasera.webp', label: 'Vista trasera' }
]
},
{
  id: 'lg-rock',
  brand: 'LG XBOOM',
  category: 'Portátil',
  name: 'LG XBOOM Rock',
  price: 'S/ 199',
  cta: 'Quiero el XBOOM Rock',
  benefits: ['6W de potencia', 'IP67 agua y polvo', 'Hasta 10h de batería'],
  short: 'Sonido resistente para tus aventuras. Compacto, potente y preparado para playa, camping, rutas o viajes con sonido Signature xboom by will.i.am.',
  features: [
    'Sonido potente de 6W',
    'Resistencia IP67 al agua y polvo',
    'Durabilidad Military Standard 810H',
    'Hasta 10 horas de reproducción',
    'AI Sound para mejorar música y voz',
    'Correa all-mount para sujetarlo fácilmente',
    'Bluetooth 5.4, Auracast y Party Link',
    'USB-C Audio para conexión directa'
  ],
  best: 'playa, camping, bicicleta, caminatas, viajes y uso al aire libre',
  img: 'assets/images/productos/lg-xboom-rock-rojo.png',
  variants: [
  {
    id: 'rojo',
    label: 'Rojo',
    color: '#e52520',
    gallery: [
      { src: 'assets/images/productos/lg-xboom-rock/rojo/01-frontal.png', label: 'Vista frontal' },
      { src: 'assets/images/productos/lg-xboom-rock/rojo/02-frontal-detalle.webp', label: 'Detalle frontal' },
      { src: 'assets/images/productos/lg-xboom-rock/rojo/03-lateral.webp', label: 'Vista lateral' },
      { src: 'assets/images/productos/lg-xboom-rock/rojo/04-trasera.webp', label: 'Vista trasera' },
      { src: 'assets/images/productos/lg-xboom-rock/rojo/05-uso-exterior.png', label: 'Uso exterior' }
    ]
  },
  {
    id: 'negro',
    label: 'Negro',
    color: '#111111',
    gallery: [
      { src: 'assets/images/productos/lg-xboom-rock/negro/01-frontal.png', label: 'Vista frontal' },
      { src: 'assets/images/productos/lg-xboom-rock/negro/02-frontal-detalle.webp', label: 'Detalle frontal' },
      { src: 'assets/images/productos/lg-xboom-rock/negro/03-lateral.webp', label: 'Vista lateral' },
      { src: 'assets/images/productos/lg-xboom-rock/negro/04-trasera.webp', label: 'Vista trasera' },
      { src: 'assets/images/productos/lg-xboom-rock/negro/05-uso-exterior.png', label: 'Uso exterior' }
    ]
  }
]
},
    {
      id: 'lg-grab',
      brand: 'LG XBOOM',
      category: 'Portátil',
      name: 'LG XBOOM Grab',
      price: 'S/ 275',
      benefits: ['30W de potencia', 'IP67 agua y polvo', 'Certificación militar'],
      short: 'Parlante portátil resistente y ligero, diseñado para acompañarte en cualquier aventura con gran autonomía y resistencia.',
      features: [
        'Potencia de 30W',
        'Certificación IP67 resistente al agua y polvo',
        'Certificación militar MIL-STD-810H para mayor durabilidad',
        'Hasta 20 horas de batería',
        'Diseño compacto con correa integrada para fácil transporte'
      ],
      best: 'playa, piscina, viajes, bicicleta y uso diario',
      img: 'assets/images/productos/lg-xboom-grab.png',
      gallery: [
        { src: 'assets/images/productos/lg-xboom-grab/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-xboom-grab/02-lateral.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/lg-xboom-grab/03-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/lg-xboom-grab/04-portabilidad.webp', label: 'Portabilidad' },
        { src: 'assets/images/productos/lg-xboom-grab/05-inferior.webp', label: 'Detalle lateral' },
        { src: 'assets/images/productos/lg-xboom-grab/06-ambiental.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'lg-bounce',
      brand: 'LG XBOOM',
      category: 'Portátil',
      name: 'LG XBOOM Bounce',
      price: 'S/ 389',
      benefits: ['40W de potencia', 'IP67 agua y polvo', 'Hasta 30h de batería'],
      short: 'Más batería, más bajos y resistencia para reuniones, viajes y planes al aire libre.',
      features: [
        'Potencia de 40W',
        'Certificación IP67 resistente al agua y polvo',
        'Certificación militar MIL-STD-810H',
        'Hasta 30 horas de batería',
        'Graves potentes y sonido amplio'
      ],
      best: 'reuniones, terrazas, camping, viajes y actividades al aire libre',
      img: 'assets/images/productos/lg-xboom-bounce.webp',
      gallery: [
        { src: 'assets/images/productos/lg-xboom-bounce/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-xboom-bounce/02-lateral.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/lg-xboom-bounce/03-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/lg-xboom-bounce/04-portabilidad.webp', label: 'Portabilidad' },
        { src: 'assets/images/productos/lg-xboom-bounce/05-interior.webp', label: 'Interior' },
        { src: 'assets/images/productos/lg-xboom-bounce/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'lg-xg8t',
      brand: 'LG XBOOM',
      category: 'Portátil',
      name: 'LG XBOOM XG8T',
      price: 'S/ 830',
      benefits: ['120W de potencia', 'Luces LED RGB', 'IP67 resistente'],
      short: 'Potencia, luces y resistencia para llevar música fuerte a reuniones, playa, viajes y planes al aire libre.',
      features: [
        'Potencia de 120W',
        'Certificación IP67 resistente al agua y polvo',
        'Certificación militar MIL-STD-810H',
        'Luces LED RGB sincronizadas con la música',
        'Graves profundos y sonido potente'
      ],
      best: 'fiestas, reuniones, playa, terrazas y usuarios que buscan potencia con luces',
      img: 'assets/images/productos/lg-xboom-xg8t.webp',
      gallery: [
        { src: 'assets/images/productos/lg-xboom-xg8t/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-xboom-xg8t/02-inferior.webp', label: 'Vista inferior' },
        { src: 'assets/images/productos/lg-xboom-xg8t/03-lateral.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/lg-xboom-xg8t/04-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/lg-xboom-xg8t/05-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/lg-xboom-xg8t/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'lg-stage301',
      brand: 'LG XBOOM',
      category: 'Fiesta',
      name: 'LG XBOOM Stage 301',
      price: 'S/ 950',
      benefits: ['120W de potencia', 'Karaoke integrado', 'Micrófono y guitarra'],
      short: 'Parlante potente para fiestas, reuniones, karaoke y eventos donde necesitas más presencia, luces y sonido envolvente.',
      features: [
        'Potencia de 120W',
        'Entradas para micrófono y guitarra',
        'Función karaoke integrada',
        'Batería portátil y reemplazable',
        'Diseño ideal para eventos y entretenimiento'
      ],
      best: 'fiestas, karaoke, reuniones grandes, eventos y espacios donde necesitas más potencia',
      img: 'assets/images/productos/lg-xboom-stage-301.webp',
      gallery: [
        { src: 'assets/images/productos/lg-xboom-stage-301/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/lg-xboom-stage-301/02-luces-led.webp', label: 'Luces LED' },
        { src: 'assets/images/productos/lg-xboom-stage-301/03-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/lg-xboom-stage-301/04-conexiones.webp', label: 'Conexiones' },
        { src: 'assets/images/productos/lg-xboom-stage-301/05-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/lg-xboom-stage-301/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'jbl-go4',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Go 4',
      price: 'S/ 129',
      benefits: ['JBL Pro Sound', 'IP67 agua y polvo', 'Hasta 7h de batería'],
      short: 'Compacto, resistente y fácil de llevar. Disponible en colores para elegir el estilo que más va contigo.',
      features: [
        'Diseño ultracompacto y ligero',
        'Certificación IP67 resistente al agua y polvo',
        'Sonido JBL Pro Sound con bajos mejorados',
        'Hasta 7 horas de batería',
        'Fácil de transportar a cualquier lugar'
      ],
      best: 'uso diario, viajes, playa, piscina, mochila, oficina y regalos',
      img: 'assets/images/productos/jbl-go-4.webp',
      variants: [
        {
          id: 'negro',
          label: 'Negro',
          color: '#111111',
          gallery: [
            { src: 'assets/images/productos/jbl-go-4/negro/01-frontal.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-go-4/negro/02-lateral.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-go-4/negro/03-trasera.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-go-4/negro/04-uso-exterior.webp', label: 'Uso exterior' }
          ]
        },
        {
          id: 'camuflado',
          label: 'Camuflado',
          color: '#58633b',
          gallery: [
            { src: 'assets/images/productos/jbl-go-4/camuflado/01-frontal.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-go-4/camuflado/02-lateral.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-go-4/camuflado/03-trasera.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-go-4/camuflado/04-uso-exterior.webp', label: 'Uso exterior' }
          ]
        }
      ]
    },
    {
      id: 'jbl-grip',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL GRIP',
      price: 'S/ 199',
      benefits: ['16W de potencia', 'Mosquetón integrado', 'IP68 resistente'],
      short: 'Parlante portátil con diseño de agarre, resistente y fácil de llevar para música en viajes, playa, piscina y aventuras.',
      features: [
        'Potencia de 16W',
        'Mosquetón integrado para colgarlo fácilmente',
        'Certificación IP68 resistente al agua y polvo',
        'Hasta 14 horas de batería',
        'Sonido JBL Pro Sound'
      ],
      best: 'viajes, trekking, playa, piscina, mochilas, bicicleta y actividades al aire libre',
      img: 'assets/images/productos/jbl-grip.webp',
      gallery: [
        { src: 'assets/images/productos/jbl-grip/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-grip/02-inferior.webp', label: 'Vista inferior' },
        { src: 'assets/images/productos/jbl-grip/03-luces-led.webp', label: 'Luces LED' },
        { src: 'assets/images/productos/jbl-grip/04-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-grip/05-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-grip/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'jbl-flip7',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Flip 7',
      price: 'S/ 349',
      benefits: ['35W de potencia', 'IP68 resistente', 'Auracast'],
      short: 'Sonido potente, diseño portátil y resistencia para llevar música a la playa, piscina, viajes y reuniones.',
      features: [
        'Potencia de 35W',
        'Sonido JBL Pro Sound con graves potentes',
        'Certificación IP68 resistente al agua y polvo',
        'Tecnología Auracast para conectar múltiples parlantes',
        'Diseño portátil y resistente'
      ],
      best: 'playa, piscina, viajes, reuniones, deportes acuáticos y uso diario',
      img: 'assets/images/productos/jbl-flip-7.webp',
      gallery: [
        { src: 'assets/images/productos/jbl-flip-7/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-flip-7/02-lateral.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-flip-7/03-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-flip-7/04-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-flip-7/05-accesorios.webp', label: 'Accesorios' },
        { src: 'assets/images/productos/jbl-flip-7/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
      id: 'jbl-charge6',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Charge 6',
      price: 'S/ 499',
      benefits: ['45W de potencia', 'Powerbank integrado', 'Hasta 24h batería'],
      short: 'Sonido potente, batería de larga duración y asa resistente para llevar tu música a cualquier plan.',
      features: [
        'Potencia de 45W',
        'Sonido potente con graves profundos',
        'Powerbank integrado para cargar celulares',
        'Certificación IP68 resistente al agua y polvo',
        'Hasta 24 horas de batería'
      ],
      best: 'viajes largos, reuniones, playa, camping, terrazas y usuarios que buscan autonomía y potencia',
      img: 'assets/images/productos/jbl-charge-6.webp',
      gallery: [
        { src: 'assets/images/productos/jbl-charge-6/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-charge-6/02-portatil.webp', label: 'Portabilidad' },
        { src: 'assets/images/productos/jbl-charge-6/03-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-charge-6/04-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-charge-6/05-accesorio.webp', label: 'Accesorio' },
        { src: 'assets/images/productos/jbl-charge-6/06-uso-exterior.webp', label: 'Uso exterior' }
      ]
    },
    {
  id: 'jbl-xtreme5',
  brand: 'JBL',
  category: 'Portátil premium',
  name: 'JBL Xtreme 5',
  price: 'S/ 1169',
  benefits: ['Hasta 130W de potencia', 'IP68 agua y polvo', 'Hasta 24h de batería'],
  short: 'Parlante portátil premium con potencia para exteriores, bajos profundos, luces personalizables y resistencia IP68. Ideal para reuniones grandes, playa, piscina, terrazas y fiestas donde necesitas sonido fuerte y presencia.',
  features: [
    'Hasta 130W de potencia conectado a corriente',
    'Hasta 90W de potencia usando batería',
    'Sonido potente con graves profundos y mayor claridad',
    'Certificación IP68 resistente al agua y polvo',
    'Diseño robusto y resistente para exteriores',
    'Hasta 24 horas de reproducción',
    'Hasta 28 horas con PlayTime Boost',
    'Bluetooth 6.0 y Auracast para conexión con parlantes compatibles',
    'Luces laterales personalizables desde JBL Portable app',
    'Ecualizador personalizable desde la app JBL Portable',
    'Audio por USB-C compatible',
    'Función powerbank para cargar tu celular',
    'Correa de transporte para llevarlo con mayor comodidad'
  ],
  best: 'fiestas, reuniones grandes, playa, piscina, terrazas, viajes y exteriores donde necesitas potencia',
  img: 'assets/images/productos/jbl-xtreme-5/negro/01-vista-previa-negro.png',
  variants: [
    {
      id: 'negro',
      label: 'Negro',
      color: '#111111',
      gallery: [
        { src: 'assets/images/productos/jbl-xtreme-5/negro/01-vista-previa-negro.png', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/02-frontal-negro.png', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/03-lateral-negro.png', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/04-superior-negro.png', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/05-trasera-negro.png', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/06-correa-negro.png', label: 'Correa' },
        { src: 'assets/images/productos/jbl-xtreme-5/negro/07-trasera-bateria-negro.png', label: 'Trasera y batería' }
      ]
    },
    {
      id: 'azul',
      label: 'Azul',
      color: '#1f5eff',
      gallery: [
        { src: 'assets/images/productos/jbl-xtreme-5/azul/01-vista-previa-azul.png', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/02-frontal-azul.png', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/03-lateral-azul.png', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/04-superior-azul.png', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/05-trasera-azul.png', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/06-correa-azul.png', label: 'Correa' },
        { src: 'assets/images/productos/jbl-xtreme-5/azul/07-trasera-bateria-azul.png', label: 'Trasera y batería' }
      ]
    },
    {
      id: 'camuflado',
      label: 'Camuflado',
      color: '#5d6542',
      gallery: [
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/01-vista-previa-camuflado.png', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/02-frontal-camuflado.png', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/03-lateral-camuflado.png', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/04-superior-camuflado.png', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/05-trasera-camuflado.png', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/06-correa-camuflado.png', label: 'Correa' },
        { src: 'assets/images/productos/jbl-xtreme-5/camuflado/07-trasera-bateria-camuflado.png', label: 'Trasera y batería' }
      ]
    }
  ]
},
    {
  id: 'jbl-boombox4',
  brand: 'JBL',
  category: 'Fiesta',
  name: 'JBL Boombox 4',
  price: 'S/ 1499',
  benefits: ['Sonido potente JBL', 'IP68 agua y polvo', 'Hasta 34 horas de batería'],
  short: 'Parlante portátil de alta potencia para fiestas, reuniones grandes, playa, piscina y exteriores. Sonido JBL potente, graves profundos, batería de larga duración y diseño resistente para llevar la música a otro nivel.',
  features: [
    'Sonido JBL potente para fiestas y exteriores',
    'Graves profundos con gran presencia',
    'Certificación IP68 resistente al agua y polvo',
    'Hasta 34 horas de reproduccion',
    'Diseño robusto y portátil con asa integrada',
    'Ideal para reuniones grandes, playa, piscina y terrazas',
    'Conectividad Bluetooth para uso diario',
    'Construcción resistente para uso al aire libre'
  ],
  best: 'fiestas, reuniones grandes, playa, piscina, terrazas, viajes y usuarios que buscan máxima potencia',
  img: 'assets/images/productos/jbl-boombox-4/01-vista-previa.png',
  gallery: [
    { src: 'assets/images/productos/jbl-boombox-4/01-vista-previa.png', label: 'Vista previa' },
    { src: 'assets/images/productos/jbl-boombox-4/01-frontal.png', label: 'Vista frontal' },
    { src: 'assets/images/productos/jbl-boombox-4/03-lateral.png', label: 'Vista lateral' },
    { src: 'assets/images/productos/jbl-boombox-4/04-trasera.png', label: 'Vista trasera' },
    { src: 'assets/images/productos/jbl-boombox-4/05-superior.png', label: 'Vista superior' },
    { src: 'assets/images/productos/jbl-boombox-4/06-inferior.png', label: 'Vista inferior' },
    { src: 'assets/images/productos/jbl-boombox-4/07-empaquetado.png', label: 'Empaquetado' }
  ]
}
  ];

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalBack = document.getElementById('modalBack');
  const modalImg = document.getElementById('modalImg');
  const modalThumbs = document.getElementById('modalThumbs');
  const modalGalleryLabel = document.getElementById('modalGalleryLabel');
  const modalMainImage = document.getElementById('modalMainImage');
  const modalPrevImage = document.getElementById('modalPrevImage');
  const modalNextImage = document.getElementById('modalNextImage');
  const productCards = Array.from(document.querySelectorAll('.product-card'));

  let currentGallery = [];
  let currentGalleryIndex = 0;
  let currentGalleryProductName = '';
  let touchStartX = 0;
  let activeVariantIndex = 0;

  function resetModalScroll() {
    window.requestAnimationFrame(() => {
      const modalCard = document.querySelector('.modal-card');
      if (modal) modal.scrollTop = 0;
      if (modalCard) modalCard.scrollTop = 0;
      if (modalThumbs) modalThumbs.scrollLeft = 0;
    });
  }

  function resetThumbnailScroll() {
    window.requestAnimationFrame(() => {
      if (modalThumbs) modalThumbs.scrollLeft = 0;
    });
  }

  function getActiveVariant(product) {
    if (product && Array.isArray(product.variants) && product.variants.length) {
      return product.variants[activeVariantIndex] || product.variants[0];
    }
    return null;
  }

  function getActiveGallery(product) {
    const variant = getActiveVariant(product);
    if (variant && Array.isArray(variant.gallery) && variant.gallery.length) return variant.gallery;
    if (product && Array.isArray(product.gallery) && product.gallery.length) return product.gallery;
    return [{ src: product?.img || '', label: 'Vista principal' }];
  }

  function setGalleryImage(index) {
    if (!modalImg || !currentGallery.length) return;
    currentGalleryIndex = (index + currentGallery.length) % currentGallery.length;
    const item = currentGallery[currentGalleryIndex];
    modalImg.style.opacity = '0';
    modalImg.style.transform = 'scale(.985)';
    window.setTimeout(() => {
      modalImg.src = item.src;
      modalImg.alt = `${currentGalleryProductName} - ${item.label}`;
      if (modalGalleryLabel) modalGalleryLabel.textContent = item.label;
      if (modalThumbs) {
        modalThumbs.querySelectorAll('.gallery-thumb').forEach((thumb, thumbIndex) => {
          const isActive = thumbIndex === currentGalleryIndex;
          thumb.classList.toggle('active', isActive);
          thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }
      modalImg.style.opacity = '1';
      modalImg.style.transform = 'scale(1)';
    }, 90);
  }

  function updateWhatsAppLink(product) {
    const wa = document.getElementById('modalWhatsApp');
    if (!wa || !product) return;
    const variant = getActiveVariant(product);
    const colorText = variant ? ` color ${variant.label}` : '';
    const msg = encodeURIComponent(`Hola JOR STORE, quiero información sobre ${product.name}${colorText} (${product.price})`);
    wa.href = `https://wa.me/51925789830?text=${msg}`;
  }

  function renderProductGallery(product) {
    currentGallery = getActiveGallery(product);
    currentGalleryIndex = 0;
    currentGalleryProductName = product.name;

    if (modalThumbs) {
      modalThumbs.innerHTML = currentGallery.map((item, index) => `
        <button class="gallery-thumb${index === 0 ? ' active' : ''}" type="button" aria-label="Ver ${item.label}" aria-selected="${index === 0 ? 'true' : 'false'}">
          <img src="${item.src}" alt="${item.label}" loading="lazy">
          <span>${item.label}</span>
        </button>
      `).join('');

      modalThumbs.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          setGalleryImage(index);
        });
      });
    }

    currentGallery.slice(1).forEach(item => {
      const preload = new Image();
      preload.src = item.src;
    });

    setGalleryImage(0);
  }

  function renderVariantSelector(product) {
    const modalInfo = document.querySelector('.modal-info');
    if (!modalInfo) return;

    let selector = document.getElementById('modalVariantSelector');

if (!selector) {
  selector = document.createElement('div');
  selector.id = 'modalVariantSelector';
  selector.className = 'modal-variant-selector';
}

const brand = document.getElementById('modalBrand');

if (brand) {
  brand.insertAdjacentElement('beforebegin', selector);
} else {
  modalInfo.prepend(selector);
}

    if (!product.variants || !product.variants.length) {
      selector.innerHTML = '';
      selector.hidden = true;
      return;
    }

    selector.hidden = false;
    selector.innerHTML = `
      <span>Color disponible:</span>
      <div class="variant-buttons">
        ${product.variants.map((variant, index) => `
          <button type="button" class="variant-btn ${index === activeVariantIndex ? 'active' : ''}" data-variant-index="${index}" style="--variant-color:${variant.color || '#111'}">
            <i></i>${variant.label}
          </button>
        `).join('')}
      </div>
    `;

    selector.querySelectorAll('.variant-btn').forEach(button => {
      button.addEventListener('click', () => {
        activeVariantIndex = Number(button.dataset.variantIndex || 0);
        renderVariantSelector(product);
        renderProductGallery(product);
        updateWhatsAppLink(product);
        resetThumbnailScroll();
      });
    });
  }

  function openProduct(id) {
    const product = PRODUCTS.find(item => item.id === id);
    if (!product || !modal) return;

    activeVariantIndex = 0;
    renderProductGallery(product);
    renderVariantSelector(product);

    document.getElementById('modalBrand').textContent = `${product.brand} · ${product.category}`;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.short;
    document.getElementById('modalFeatures').innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
    document.getElementById('modalBest').innerHTML = `<strong>Ideal para:</strong> ${product.best}`;
    document.getElementById('modalPrice').innerHTML = `<strong>${product.price}</strong>`;
    updateWhatsAppLink(product);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    resetModalScroll();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function updateProductCards() {
    productCards.forEach(card => {
      const product = PRODUCTS.find(item => item.id === card.dataset.id);
      if (!product) return;

      card.querySelector('.offer-ribbon')?.remove();
      card.querySelector('.urgency-line')?.remove();

      const stock = card.querySelector('.badge.stock');
      if (stock) stock.innerHTML = '✓ En stock';

      const body = card.querySelector('.product-body');
      const title = body?.querySelector('h3');
      if (body && title && !body.querySelector('.quick-benefits')) {
        const benefits = document.createElement('ul');
        benefits.className = 'quick-benefits';
        benefits.innerHTML = (product.benefits || []).slice(0, 3).map(item => `<li>✓ ${item}</li>`).join('');
        title.insertAdjacentElement('afterend', benefits);
      }

      const priceLine = card.querySelector('.price-line');
      if (priceLine) {
        priceLine.classList.remove('promo-price-line');
        priceLine.innerHTML = `<strong>${product.price}</strong><span>Precio JOR STORE</span>`;
      }

      const button = card.querySelector('.details-btn');
      if (button) button.textContent = 'Ver detalles';
    });
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.details-btn');
    if (button) {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest('.product-card');
      if (card) openProduct(card.dataset.id);
      return;
    }

    const card = event.target.closest('.product-card');
    if (card) openProduct(card.dataset.id);
  });

  updateProductCards();

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBack) modalBack.addEventListener('click', event => {
    event.preventDefault();
    closeModal();
  });

  if (modalPrevImage) {
    modalPrevImage.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setGalleryImage(currentGalleryIndex - 1);
    });
  }

  if (modalNextImage) {
    modalNextImage.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      setGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (modalMainImage) {
    modalMainImage.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    modalMainImage.addEventListener('touchend', event => {
      const touchEndX = event.changedTouches[0].clientX;
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) < 42) return;
      setGalleryImage(distance > 0 ? currentGalleryIndex - 1 : currentGalleryIndex + 1);
    }, { passive: true });
  }

  productCards.forEach(card => {
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProduct(card.dataset.id);
      }
    });
  });

  if (modal) modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
    if (!modal || !modal.classList.contains('open')) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setGalleryImage(currentGalleryIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setGalleryImage(currentGalleryIndex + 1);
    }
  });
});
