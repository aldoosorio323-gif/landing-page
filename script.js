document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '51925789830';
  const PRICE_FORMATTER = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 });
  const promoCarousel = document.querySelector('[data-promo-carousel]');
  const promoTrack = promoCarousel?.querySelector('#promoTrack');
  const promoSlides = Array.from(document.querySelectorAll('#promoTrack .promo-slide'));
  const hasMultipleSlides = promoSlides.length > 1;
  let promoIndex = 0;
  let promoIntervalId = null;
  let promoAutoplayPausedByUser = false;
  let promoPointerStartX = 0;
  let promoLastSwipeAt = 0;

  function syncPromoHeight() {
    const image = promoSlides[promoIndex]?.querySelector('img');
    const carouselWidth = promoCarousel?.getBoundingClientRect().width || 0;
    if (!promoCarousel || !image || !carouselWidth || !image.naturalWidth || !image.naturalHeight) return;
    const activeHeight = Math.round(carouselWidth * image.naturalHeight / image.naturalWidth);
    promoCarousel.style.setProperty('--promo-active-height', `${activeHeight}px`);
  }

  promoSlides.forEach(slide => {
    const image = slide.querySelector('img');
    if (!image) return;

    const handleLoad = () => {
      slide.classList.add('is-loaded');
      if (slide === promoSlides[promoIndex]) syncPromoHeight();
    };
    const handleError = () => {
      slide.classList.add('has-image-error');
      console.error(`[JOR STORE] No se pudo cargar el banner del carrusel: ${image.currentSrc || image.src}`);
    };

    if (image.complete) {
      if (image.naturalWidth > 0) handleLoad();
      else handleError();
      return;
    }

    image.addEventListener('load', handleLoad, { once: true });
    image.addEventListener('error', handleError, { once: true });
  });

  function setPromoSlide(i) {
    if (!promoTrack) return;
    promoIndex = (i + promoSlides.length) % promoSlides.length;
    promoSlides.forEach((slide, index) => {
      const isActive = index === promoIndex;
      slide.classList.toggle('is-active', isActive);
      slide.hidden = !isActive;
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    window.requestAnimationFrame(syncPromoHeight);
  }

  function initPromoCarousel() {
    if (!promoCarousel || !promoTrack || !hasMultipleSlides) return;

    const promoPrev = document.createElement('button');
    promoPrev.className = 'promo-arrow promo-prev';
    promoPrev.type = 'button';
    promoPrev.setAttribute('aria-label', 'Imagen anterior');
    promoPrev.textContent = '‹';

    const promoNext = document.createElement('button');
    promoNext.className = 'promo-arrow promo-next';
    promoNext.type = 'button';
    promoNext.setAttribute('aria-label', 'Imagen siguiente');
    promoNext.textContent = '›';

    const promoDots = document.createElement('div');
    promoDots.className = 'promo-nav';
    promoDots.setAttribute('role', 'group');
    promoDots.setAttribute('aria-label', 'Seleccionar banner promocional');
    promoSlides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.className = `promo-dot${index === 0 ? ' active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver promoción ${index + 1} de ${promoSlides.length}`);
      dot.addEventListener('click', () => interactAndNavigate(index));
      promoDots.appendChild(dot);
    });

    const updatePromoControls = () => {
      promoDots.querySelectorAll('.promo-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === promoIndex);
        dot.setAttribute('aria-current', index === promoIndex ? 'true' : 'false');
      });
    };

    const navigateToPromoSlide = index => {
      setPromoSlide(index);
      updatePromoControls();
    };

    const stopPromoAutoplay = () => {
      if (promoIntervalId === null) return;
      window.clearInterval(promoIntervalId);
      promoIntervalId = null;
    };

    const startPromoAutoplay = () => {
      if (!hasMultipleSlides || promoAutoplayPausedByUser || promoIntervalId !== null || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      promoIntervalId = window.setInterval(() => {
        navigateToPromoSlide(promoIndex + 1);
      }, 7000);
    };

    const pauseForInteraction = () => {
      promoAutoplayPausedByUser = true;
      stopPromoAutoplay();
    };

    const interactAndNavigate = index => {
      navigateToPromoSlide(index);
      pauseForInteraction();
    };

    promoPrev.addEventListener('click', () => interactAndNavigate(promoIndex - 1));
    promoNext.addEventListener('click', () => interactAndNavigate(promoIndex + 1));
    promoCarousel.append(promoPrev, promoNext, promoDots);
    promoCarousel.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      interactAndNavigate(promoIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });
    const beginSwipe = clientX => {
      promoPointerStartX = clientX;
      pauseForInteraction();
    };
    const finishSwipe = clientX => {
      const distance = clientX - promoPointerStartX;
      if (Math.abs(distance) < 45 || Date.now() - promoLastSwipeAt < 400) return;
      promoLastSwipeAt = Date.now();
      interactAndNavigate(promoIndex + (distance < 0 ? 1 : -1));
    };
    promoCarousel.addEventListener('pointerdown', event => {
      if (event.isPrimary) beginSwipe(event.clientX);
    });
    promoCarousel.addEventListener('pointerup', event => {
      if (event.isPrimary) finishSwipe(event.clientX);
    });
    promoCarousel.addEventListener('pointerenter', stopPromoAutoplay);
    promoCarousel.addEventListener('pointerleave', startPromoAutoplay);
    promoCarousel.addEventListener('focusin', stopPromoAutoplay);
    promoCarousel.addEventListener('focusout', event => {
      if (!promoCarousel.contains(event.relatedTarget)) startPromoAutoplay();
    });
    setPromoSlide(0);
    updatePromoControls();
    startPromoAutoplay();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopPromoAutoplay();
      else startPromoAutoplay();
    });
    window.addEventListener('pagehide', () => {
      stopPromoAutoplay();
    }, { once: true });
    window.addEventListener('resize', () => window.requestAnimationFrame(syncPromoHeight), { passive: true });
    if ('ResizeObserver' in window) {
      const promoResizeObserver = new ResizeObserver(() => window.requestAnimationFrame(syncPromoHeight));
      promoResizeObserver.observe(promoCarousel);
    }
  }

  initPromoCarousel();

  function initRealClientCarousels() {
    document.querySelectorAll('[data-real-carousel]').forEach(carousel => {
      const track = carousel.querySelector('.real-carousel-track');
      const cards = Array.from(carousel.querySelectorAll('.real-client-card'));
      const prev = carousel.querySelector('.real-carousel-prev');
      const next = carousel.querySelector('.real-carousel-next');
      const dotsWrap = carousel.querySelector('.real-carousel-dots');
      let scrollFrame = 0;
      let pagePositions = [];

      if (!track || !cards.length) return;

      function buildPages() {
        const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
        const firstCard = cards[0];
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : track.clientWidth;
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
        const step = Math.max(1, cardWidth + gap);
        const visibleCards = Math.max(1, Math.floor((track.clientWidth + gap + 2) / step));
        const pageCount = Math.max(1, Math.ceil(cards.length / visibleCards));

        pagePositions = Array.from({ length: pageCount }, (_, index) => {
          const cardIndex = Math.min(cards.length - 1, index * visibleCards);
          return Math.min(maxScroll, Math.round(cards[cardIndex].offsetLeft - track.offsetLeft));
        }).filter((position, index, positions) => index === 0 || Math.abs(position - positions[index - 1]) > 4);

        const finalPageStart = Math.max(0, cards.length - visibleCards);
        const finalPosition = Math.min(maxScroll, Math.round(cards[finalPageStart].offsetLeft - track.offsetLeft));
        if (Math.abs(finalPosition - pagePositions[pagePositions.length - 1]) > 4) {
          pagePositions.push(finalPosition);
        }
        pagePositions = [...new Set(pagePositions.map(position => Math.min(maxScroll, Math.max(0, Math.round(position)))) )];

        if (dotsWrap) {
          dotsWrap.innerHTML = pagePositions.map((_, index) => (
            `<button class="real-carousel-dot${index === 0 ? ' active' : ''}" type="button" aria-label="Ver página ${index + 1}"></button>`
          )).join('');
          dotsWrap.querySelectorAll('.real-carousel-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => scrollToPage(index));
          });
        }

        updateControls();
      }

      function getActivePageIndex() {
        if (!pagePositions.length) return 0;
        return pagePositions.reduce((bestIndex, position, index) => (
          Math.abs(track.scrollLeft - position) < Math.abs(track.scrollLeft - pagePositions[bestIndex]) ? index : bestIndex
        ), 0);
      }

      function updateControls() {
        const activeIndex = getActivePageIndex();
        const isStart = activeIndex <= 0;
        const isEnd = activeIndex >= pagePositions.length - 1;

        if (prev) {
          prev.disabled = isStart;
          prev.setAttribute('aria-disabled', isStart ? 'true' : 'false');
        }

        if (next) {
          next.disabled = isEnd;
          next.setAttribute('aria-disabled', isEnd ? 'true' : 'false');
        }

        if (dotsWrap) {
          dotsWrap.querySelectorAll('.real-carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
          });
        }
      }

      function scrollToPage(index) {
        if (!pagePositions.length) buildPages();
        const nextIndex = Math.min(Math.max(index, 0), pagePositions.length - 1);
        track.scrollTo({ left: pagePositions[nextIndex], behavior: 'smooth' });
      }

      function movePage(direction) {
        scrollToPage(getActivePageIndex() + direction);
      }

      if (prev) prev.addEventListener('click', () => movePage(-1));
      if (next) next.addEventListener('click', () => movePage(1));

      track.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        movePage(event.key === 'ArrowRight' ? 1 : -1);
      });

      track.addEventListener('scroll', () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = window.requestAnimationFrame(updateControls);
      }, { passive: true });

      window.addEventListener('resize', () => {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = window.requestAnimationFrame(buildPages);
      });

      buildPages();
    });
  }

  const PRODUCTS = [
    {
  id: 'lg-buds-lite',
  brand: 'LG XBOOM',
  category: 'Audífonos',
  name: 'LG XBOOM Buds Lite',
  stockStatus: 'in_stock',
  promotion: 'Oferta de septiembre',
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
      price: 120,
      regularPrice: 299,
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
      price: 120,
      regularPrice: 299,
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
  offerPrice: 169,
  regularPrice: 319,
  stockStatus: 'in_stock',
  promotion: null,
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
  offerPrice: 189,
  regularPrice: 399,
  stockStatus: 'in_stock',
  promotion: null,
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
    default: true,
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
      price: 249,
      regularPrice: 649,
      stockStatus: 'in_stock',
      promotion: 'Oferta de septiembre',
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
      offerPrice: 379,
      regularPrice: 899,
      stockStatus: 'in_stock',
      promotion: null,
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
      offerPrice: 830,
      regularPrice: 1299,
      stockStatus: 'out_of_stock',
      promotion: null,
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
      offerPrice: 899,
      regularPrice: 1299,
      stockStatus: 'out_of_stock',
      promotion: null,
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
      name: 'JBL GO 4',
      stockStatus: 'in_stock',
      promotion: 'Oferta de septiembre',
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
          price: 109,
          regularPrice: 220,
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
          price: 109,
          regularPrice: 220,
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
      name: 'JBL Grip',
      stockStatus: 'in_stock',
      promotion: 'Oferta de septiembre',
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
      variants: [
        {
          id: 'negro',
          label: 'Negro',
          color: '#111111',
          price: 180,
          regularPrice: 399,
          specialNote: 'Precio especial para las primeras 7 unidades negras',
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
          id: 'azul',
          label: 'Azul',
          color: '#2f6179',
          price: 199,
          regularPrice: 399,
          gallery: [
            { src: 'assets/images/productos/jbl-grip/azul 1.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-grip/azul 2.webp', label: 'Vista superior' },
            { src: 'assets/images/productos/jbl-grip/azul 3.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-grip/azul 4.webp', label: 'Vista frontal secundaria' },
            { src: 'assets/images/productos/jbl-grip/azul 5.webp', label: 'Vista frontal alternativa' },
            { src: 'assets/images/productos/jbl-grip/azul 6.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-grip/azul 7.webp', label: 'Detalle trasero' },
            { src: 'assets/images/productos/jbl-grip/azul 8.webp', label: 'Luces LED' },
            { src: 'assets/images/productos/jbl-grip/azul 9.webp', label: 'Detalle superior' }
          ]
        },
        {
          id: 'camuflado',
          label: 'Camuflado',
          color: '#58633b',
          price: 199,
          regularPrice: 399,
          gallery: [
            { src: 'assets/images/productos/jbl-grip/camuflado 1.jfif', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-grip/camuflado 2.jfif', label: 'Luces LED' },
            { src: 'assets/images/productos/jbl-grip/camuflado 3.jfif', label: 'Vista superior' },
            { src: 'assets/images/productos/jbl-grip/camuflado 4.jfif', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-grip/camuflado 5.jfif', label: 'Vista lateral' }
          ]
        }
      ]
    },
    {
      id: 'jbl-flip7',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Flip 7',
      offerPrice: 329,
      regularPrice: 599,
      stockStatus: 'in_stock',
      promotion: null,
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
      variants: [
        {
          id: 'negro',
          label: 'Negro',
          color: '#111111',
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
          id: 'azul',
          label: 'Azul',
          color: '#294d7a',
          gallery: [
            { src: 'assets/images/productos/jbl-flip-7/azul 1.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-flip-7/azul 2.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-flip-7/azul 3.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-flip-7/azul 4.webp', label: 'Empaquetado' }
          ]
        },
        {
          id: 'camuflado',
          label: 'Camuflado',
          color: '#58633b',
          stockStatus: 'out_of_stock',
          gallery: [
            { src: 'assets/images/productos/jbl-flip-7/camuflado 1.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 2.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 3.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 4.webp', label: 'Vista angular' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 5.webp', label: 'Vista frontal alternativa' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 6.webp', label: 'Accesorios' },
            { src: 'assets/images/productos/jbl-flip-7/camuflado 7.webp', label: 'Empaquetado' }
          ]
        },
        {
          id: 'morado',
          label: 'Morado',
          color: '#6d3bb9',
          stockStatus: 'out_of_stock',
          gallery: [
            { src: 'assets/images/productos/jbl-flip-7/morado 1.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-flip-7/morado 2.webp', label: 'Vista angular' },
            { src: 'assets/images/productos/jbl-flip-7/morado 4.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-flip-7/morado 5.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-flip-7/morado 6.webp', label: 'Vista superior' },
            { src: 'assets/images/productos/jbl-flip-7/morado 7.webp', label: 'Detalle de controles' }
          ]
        },
        {
          id: 'rosado',
          label: 'Rosado',
          color: '#dca4a0',
          gallery: [
            { src: 'assets/images/productos/jbl-flip-7/rsoa 5.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-flip-7/rosa 1.webp', label: 'Vista con accesorios' },
            { src: 'assets/images/productos/jbl-flip-7/rosa 3.webp', label: 'Detalle de controles' },
            { src: 'assets/images/productos/jbl-flip-7/rsoa 2.webp', label: 'Accesorios' },
            { src: 'assets/images/productos/jbl-flip-7/rsoa 4.webp', label: 'Empaquetado' }
          ]
        }
      ]
    },
    {
      id: 'jbl-charge6',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Charge 6',
      offerPrice: 480,
      regularPrice: 799,
      stockStatus: 'in_stock',
      promotion: null,
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
      variants: [
        {
          id: 'negro',
          label: 'Negro',
          color: '#111111',
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
          id: 'azul',
          label: 'Azul',
          color: '#294d7a',
          gallery: [
            { src: 'assets/images/productos/jbl-charge-6/azul 1.webp', label: 'Vista frontal' },
            { src: 'assets/images/productos/jbl-charge-6/azul 2.webp', label: 'Vista trasera' },
            { src: 'assets/images/productos/jbl-charge-6/azul 3.webp', label: 'Vista lateral' },
            { src: 'assets/images/productos/jbl-charge-6/azul 4.webp', label: 'Detalle de controles' },
            { src: 'assets/images/productos/jbl-charge-6/azul 5.webp', label: 'Vista inferior' },
            { src: 'assets/images/productos/jbl-charge-6/azul 6.webp', label: 'Portabilidad' },
            { src: 'assets/images/productos/jbl-charge-6/azul 7.webp', label: 'Vista angular izquierda' },
            { src: 'assets/images/productos/jbl-charge-6/azul 8.webp', label: 'Vista angular derecha' }
          ]
        }
      ]
    },
    {
  id: 'jbl-xtreme5',
  brand: 'JBL',
  category: 'Portátil premium',
  name: 'JBL Xtreme 5',
  offerPrice: 1050,
  regularPrice: 1499,
  stockStatus: 'in_stock',
  promotion: null,
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
      stockStatus: 'in_stock',
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
      stockStatus: 'in_stock',
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
      stockStatus: 'in_stock',
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
},    {
  id: 'jbl-boombox4',
  brand: 'JBL',
  category: 'Fiesta',
  name: 'JBL Boombox 4',
  offerPrice: 1440,
  regularPrice: 2500,
  stockStatus: 'in_stock',
  promotion: null,
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
  img: 'assets/images/productos/jbl-boombox-4/Blanco 1.webp',
  variants: [
    {
      id: 'azul',
      label: 'Azul',
      color: '#506a82',
      price: 1440,
      stockStatus: 'out_of_stock',
      gallery: [
        { src: 'assets/images/productos/jbl-boombox-4/01-vista-previa.png', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-boombox-4/01-frontal.png', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-boombox-4/03-lateral.png', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-boombox-4/04-trasera.png', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-boombox-4/05-superior.png', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-boombox-4/06-inferior.png', label: 'Vista inferior' },
        { src: 'assets/images/productos/jbl-boombox-4/07-empaquetado.png', label: 'Empaquetado' }
      ]
    },
    {
      id: 'blanco',
      label: 'Blanco',
      color: '#f2f2f0',
      price: 1440,
      stockStatus: 'in_stock',
      default: true,
      gallery: [
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 1.webp', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 2.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 3.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 4.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 5.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 6.webp', label: 'Vista inferior' },
        { src: 'assets/images/productos/jbl-boombox-4/Blanco 7.webp', label: 'Empaquetado' }
      ]
    },
    {
      id: 'camuflado',
      label: 'Camuflado',
      color: '#58633b',
      price: 1440,
      stockStatus: 'out_of_stock',
      gallery: [
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 1.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 2.webp', label: 'Vista previa' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 3.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 4.webp', label: 'Vista frontal secundaria' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 5.webp', label: 'Vista frontal alternativa' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 6.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 7.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-boombox-4/camuflado 8.webp', label: 'Detalle lateral' }
      ]
    }
  ]
},
{
  id: 'jbl-partybox720',
  brand: 'JBL',
  category: 'PartyBox',
  name: 'JBL PartyBox 720',
  offerPrice: 2999,
  regularPrice: 5499,
  stockStatus: 'in_stock',
  promotion: null,
  benefits: [
    '800 W RMS con AI Sound Boost',
    'Espectáculo de luces dinámico',
    'IPX4 y ruedas reforzadas'
  ],
  short: 'Convierte cualquier espacio en una experiencia de alto impacto con 800 W RMS de JBL Pro Sound, graves profundos, AI Sound Boost y un espectáculo de luces que sigue el ritmo de la música.',
  modalFeatures: [
    '800 W RMS con graves profundos',
    'Luces dinámicas sincronizadas',
    'Diseño IPX4 fácil de transportar'
  ],
  best: 'fiestas, eventos, karaoke, presentaciones, terrazas y reuniones grandes',
  img: 'assets/images/productos/JBL-party-box-720/1.webp',
  variants: [
    {
      id: 'negro',
      label: 'Negro',
      color: '#1c1c1c',
      stockStatus: 'in_stock',
      gallery: [
        { src: 'assets/images/productos/JBL-party-box-720/1.webp', label: 'Vista principal' },
        { src: 'assets/images/productos/JBL-party-box-720/2.webp', label: 'Vista angular derecha' },
        { src: 'assets/images/productos/JBL-party-box-720/3.webp', label: 'Vista angular izquierda' },
        { src: 'assets/images/productos/JBL-party-box-720/4.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/JBL-party-box-720/5.jfif', label: 'Vista posterior' },
        { src: 'assets/images/productos/JBL-party-box-720/6.jfif', label: 'Compartimentos de batería' },
        { src: 'assets/images/productos/JBL-party-box-720/7.webp', label: 'Base y ruedas' },
        { src: 'assets/images/productos/JBL-party-box-720/8.webp', label: 'Controles superiores' },
        { src: 'assets/images/productos/JBL-party-box-720/9.jfif', label: 'Panel de conexiones' },
        { src: 'assets/images/productos/JBL-party-box-720/10.jfif', label: 'Vista posterior con conexiones' },
        { src: 'assets/images/productos/JBL-party-box-720/11.jfif', label: 'Vista lateral' },
        { src: 'assets/images/productos/JBL-party-box-720/12.webp', label: 'Detalle lateral y ruedas' }
      ]
    }
  ]
}
  ];

  const FEATURED_PRODUCT_IDS = ['jbl-go4', 'lg-buds-lite', 'jbl-grip', 'lg-grab'];

  function getProductAvailability(product) {
    if (!Array.isArray(product.variants) || !product.variants.length) {
      return product.stockStatus !== 'out_of_stock';
    }
    return product.variants.some(variant => (variant.stockStatus ?? product.stockStatus ?? 'in_stock') !== 'out_of_stock');
  }

  function getCatalogProducts() {
    return [...PRODUCTS].sort((a, b) => getProductStartingPrice(a) - getProductStartingPrice(b));
  }

  function renderCatalog() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = getCatalogProducts().map(product => {
      const defaultVariantIndex = getDefaultVariantIndex(product);
      const defaultVariant = defaultVariantIndex >= 0 ? product.variants[defaultVariantIndex] : null;
      const commerce = getVariantCommerce(product, defaultVariant);
      const primaryImage = getVariantPrimaryImage(product, defaultVariant).src;
      return `
        <article aria-label="Ver detalles de ${product.name}" class="product-card${product.promotion ? ' is-promotional' : ''}${commerce.isAvailable ? '' : ' is-sold-out'}" data-id="${product.id}" data-stock="${commerce.stockStatus}" role="button" tabindex="0">
          ${product.promotion ? `<span class="offer-ribbon">${product.promotion}</span>` : ''}
          <div class="badge-row"><span class="badge brand">${product.brand}</span><span class="badge stock"></span></div>
          <img alt="${product.name}" src="${primaryImage}" width="480" height="360" loading="lazy" decoding="async">
          <div class="product-body">
            <h3>${product.name}</h3>
            <div class="price-line"></div>
            <div class="product-card-actions">
              <button class="details-btn" type="button">Ver detalles</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  renderCatalog();

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalBack = document.getElementById('modalBack');
  const modalImg = document.getElementById('modalImg');
  const modalThumbs = document.getElementById('modalThumbs');
  const modalGalleryLabel = document.getElementById('modalGalleryLabel');
  const modalImagePosition = document.getElementById('modalImagePosition');
  const modalMainImage = document.getElementById('modalMainImage');
  const modalPrevImage = document.getElementById('modalPrevImage');
  const modalNextImage = document.getElementById('modalNextImage');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const brandFilterButtons = Array.from(document.querySelectorAll('[data-brand-filter]'));
  const catalogFilterStatus = document.getElementById('catalogFilterStatus');

  let currentGallery = [];
  let currentGalleryIndex = 0;
  let currentGalleryProductName = '';
  let touchStartX = 0;
  let touchStartY = 0;
  let activeVariantIndex = 0;
  const selectedVariantByProduct = new Map();
  let productModalTrigger = null;
  let backgroundScrollPosition = { x: 0, y: 0 };
  let bodyLockSnapshot = null;

  function resetModalScroll() {
    if (modal) modal.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (modal) modal.style.setProperty('--modal-scroll-top', '0px');
    if (modalThumbs) modalThumbs.scrollLeft = 0;
    window.requestAnimationFrame(() => {
      if (modal) modal.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      if (modalThumbs) modalThumbs.scrollLeft = 0;
    });
  }

  function lockPageBehindModal() {
    if (bodyLockSnapshot) return;

    const bodyStyle = document.body.style;
    backgroundScrollPosition = { x: window.scrollX, y: window.scrollY };
    bodyLockSnapshot = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow
    };

    document.body.classList.add('modal-open');
    bodyStyle.position = 'fixed';
    bodyStyle.top = `-${backgroundScrollPosition.y}px`;
    bodyStyle.left = `-${backgroundScrollPosition.x}px`;
    bodyStyle.right = '0';
    bodyStyle.width = '100%';
    bodyStyle.overflow = 'hidden';
  }

  function unlockPageBehindModal() {
    if (!bodyLockSnapshot) {
      document.body.classList.remove('modal-open');
      return;
    }

    const bodyStyle = document.body.style;
    Object.entries(bodyLockSnapshot).forEach(([property, value]) => {
      bodyStyle[property] = value;
    });
    bodyLockSnapshot = null;
    document.body.classList.remove('modal-open');
    const rootStyle = document.documentElement.style;
    const previousScrollBehavior = rootStyle.scrollBehavior;
    rootStyle.scrollBehavior = 'auto';
    window.scrollTo(backgroundScrollPosition.x, backgroundScrollPosition.y);
    rootStyle.scrollBehavior = previousScrollBehavior;
  }

  function resetThumbnailScroll() {
    window.requestAnimationFrame(() => {
      if (modalThumbs) modalThumbs.scrollLeft = 0;
    });
  }

  function getDefaultVariantIndex(product) {
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return -1;
    const explicitDefaultIndex = product.variants.findIndex(variant => variant.default === true);
    if (explicitDefaultIndex >= 0) return explicitDefaultIndex;
    const blackIndex = product.variants.findIndex(variant => (
      String(variant.id || '').toLowerCase() === 'negro' ||
      String(variant.label || '').toLowerCase() === 'negro'
    ));
    return blackIndex >= 0 ? blackIndex : 0;
  }

  function getSelectedVariantIndex(product) {
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return -1;
    const selectedVariantId = selectedVariantByProduct.get(product.id);
    const selectedIndex = product.variants.findIndex(variant => variant.id === selectedVariantId);
    return selectedIndex >= 0 ? selectedIndex : getDefaultVariantIndex(product);
  }

  function rememberSelectedVariant(product, variantIndex) {
    const variant = product?.variants?.[variantIndex];
    if (!variant) return null;
    selectedVariantByProduct.set(product.id, variant.id);
    return variant;
  }

  function getActiveVariant(product) {
    if (!product || !Array.isArray(product.variants) || !product.variants.length) return null;
    return product.variants[activeVariantIndex] || product.variants[getDefaultVariantIndex(product)];
  }

  function getSelectedVariant(product) {
    const selectedIndex = getSelectedVariantIndex(product);
    return selectedIndex >= 0 ? product.variants[selectedIndex] : null;
  }

  function formatProductPrice(value) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? `S/${PRICE_FORMATTER.format(Math.round(numericValue))}` : '';
  }

  function keepModalCloseVisible() {
    if (!modal) return;
    modal.style.setProperty('--modal-scroll-top', `${modal.scrollTop}px`);
  }

  function calculateDiscount(offerPrice, regularPrice) {
    if (!Number.isFinite(offerPrice) || !Number.isFinite(regularPrice) || regularPrice <= offerPrice) return 0;
    return Math.round(((regularPrice - offerPrice) / regularPrice) * 100);
  }

  function getProductStartingPrice(product) {
    const variantPrices = Array.isArray(product?.variants)
      ? product.variants.map(variant => Number(variant.price ?? variant.offerPrice)).filter(Number.isFinite)
      : [];
    const productPrice = Number(product?.price ?? product?.offerPrice);
    if (Number.isFinite(productPrice)) variantPrices.push(productPrice);
    return variantPrices.length ? Math.min(...variantPrices) : Number.POSITIVE_INFINITY;
  }

  function getVariantCommerce(product, variant = null) {
    const offerPrice = Number(variant?.price ?? variant?.offerPrice ?? product?.price ?? product?.offerPrice);
    const regularPrice = Number(variant?.regularPrice ?? product?.regularPrice);
    const stockStatus = variant?.stockStatus ?? product?.stockStatus ?? 'in_stock';
    return {
      offerPrice,
      regularPrice,
      offerPriceText: formatProductPrice(offerPrice),
      regularPriceText: formatProductPrice(regularPrice),
      discountPercent: calculateDiscount(offerPrice, regularPrice),
      specialNote: variant?.specialNote || '',
      stockStatus,
      isAvailable: stockStatus !== 'out_of_stock'
    };
  }

  function getPricePresentationMarkup(commerce, { prefix = '', note = commerce.specialNote } = {}) {
    const discountText = `-${commerce.discountPercent}%`;
    const offerPriceText = `${prefix}${commerce.offerPriceText}`;
    const accessiblePrice = `Precio de oferta ${offerPriceText}, ${commerce.discountPercent}% de descuento. Antes: ${commerce.regularPriceText}.${note ? ` ${note}.` : ''}`;
    return `
      <div class="product-price-display" aria-label="${accessiblePrice}">
        <div class="product-price-offer-row">
          <strong class="product-offer-price" aria-hidden="true">${prefix ? `<span class="product-price-prefix">${prefix}</span>` : ''}${commerce.offerPriceText}</strong>
          <span class="product-discount-badge" aria-hidden="true">${discountText}</span>
        </div>
        <span class="product-regular-price" aria-hidden="true">Antes: <del>${commerce.regularPriceText}</del></span>
        ${note ? `<small class="product-price-note">${note}</small>` : ''}
      </div>
    `;
  }

  function renderStockStatus(target, commerce) {
    if (!target) return;
    target.dataset.stock = commerce.stockStatus;
    target.classList.toggle('is-out-of-stock', !commerce.isAvailable);
    target.textContent = commerce.isAvailable ? '✓ En stock' : 'Agotado';
    target.setAttribute('aria-label', commerce.isAvailable ? 'En stock' : 'Agotado');
  }

  function renderSoldOutState(target, commerce) {
    if (!target) return;
    target.classList.toggle('is-sold-out', !commerce.isAvailable);
    target.dataset.stock = commerce.stockStatus;
  }

  function getProductOnlyGallery(gallery) {
    return (Array.isArray(gallery) ? gallery : []).filter(item => {
      const source = String(item?.src || '');
      return source && !/(?:^|\/)(?:logos?)(?:\/|$)|jor-store|modal-mark/i.test(source);
    });
  }

  function getProductFallbackImage(product) {
    return getProductOnlyGallery([{ src: product?.img || '', label: 'Vista principal' }])[0] || null;
  }

  function getVariantPrimaryImage(product, variant) {
    return getProductOnlyGallery(variant?.gallery)[0] || getProductFallbackImage(product) || { src: '', label: 'Vista principal' };
  }

  function getVariantProductLabel(product, variant = getActiveVariant(product)) {
    return variant ? `${product.name} color ${variant.label}` : product.name;
  }

  function getActiveGallery(product) {
    const variant = getActiveVariant(product);
    const variantGallery = getProductOnlyGallery(variant?.gallery);
    const productGallery = getProductOnlyGallery(product?.gallery);
    if (variantGallery.length) return variantGallery;
    if (productGallery.length) return productGallery;
    const fallback = getProductFallbackImage(product);
    return fallback ? [fallback] : [];
  }

  function getDefaultProductGallery(product) {
    const defaultVariantIndex = getDefaultVariantIndex(product);
    const variant = defaultVariantIndex >= 0 ? product?.variants?.[defaultVariantIndex] : null;
    const variantGallery = getProductOnlyGallery(variant?.gallery);
    const productGallery = getProductOnlyGallery(product?.gallery);
    if (variantGallery.length) return variantGallery;
    if (productGallery.length) return productGallery;
    const fallback = getProductFallbackImage(product);
    return fallback ? [fallback] : [];
  }

  function setProductGalleryView({ gallery, index, image, label, position, thumbs, productName }) {
    if (!image || !gallery.length) return 0;
    const nextIndex = (index + gallery.length) % gallery.length;
    const item = gallery[nextIndex];
    image.style.opacity = '0';
    window.setTimeout(() => {
      image.src = item.src;
      image.alt = `${productName}, ${item.label.toLowerCase()}`;
      if (label) label.textContent = item.label;
      if (position) position.textContent = `${nextIndex + 1} de ${gallery.length}`;
      if (thumbs) {
        thumbs.querySelectorAll('.product-gallery-thumb').forEach((thumb, thumbIndex) => {
          const isActive = thumbIndex === nextIndex;
          thumb.classList.toggle('active', isActive);
          thumb.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }
      image.style.opacity = '1';
    }, 90);
    return nextIndex;
  }

  function renderProductGalleryComponent({ product, gallery, thumbs, onSelect, productLabel = product.name }) {
    if (!thumbs) return;
    thumbs.setAttribute('aria-label', `Vistas de ${productLabel}`);
    thumbs.innerHTML = gallery.map((item, index) => `
      <button class="product-gallery-thumb${index === 0 ? ' active' : ''}" type="button" aria-label="Mostrar ${item.label.toLowerCase()} de ${productLabel}" aria-selected="${index === 0 ? 'true' : 'false'}">
        <img src="${item.src}" alt="${productLabel}, ${item.label.toLowerCase()}" loading="lazy">
        <span>${item.label}</span>
      </button>
    `).join('');

    thumbs.querySelectorAll('.product-gallery-thumb').forEach((thumb, index) => {
      thumb.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(index);
      });
    });

    gallery.slice(1).forEach(item => {
      const preload = new Image();
      preload.src = item.src;
    });
  }

  function renderProductFeatures(target, features) {
    if (!target) return;
    target.innerHTML = (features || []).slice(0, 3).map(feature => `<li>${feature}</li>`).join('');
  }

  function renderProductPrice({ product, selectedVariant = null, target }) {
    if (!target) return;
    const commerce = getVariantCommerce(product, selectedVariant);
    const displayedPrice = commerce.offerPriceText;
    const hasChanged = target.dataset.displayedPrice && target.dataset.displayedPrice !== displayedPrice;
    if (hasChanged) target.classList.add('is-changing-price');
    target.dataset.displayedPrice = displayedPrice;
    target.innerHTML = getPricePresentationMarkup(commerce);
    if (hasChanged) window.requestAnimationFrame(() => target.classList.remove('is-changing-price'));
  }

  function trapModalFocus(event, modalElement) {
    if (event.key !== 'Tab' || !modalElement) return false;
    const card = modalElement.querySelector('[role="dialog"]');
    const focusable = card
      ? Array.from(card.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => !element.hidden && element.offsetParent !== null)
      : [];
    if (!focusable.length) return false;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!card.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
    return true;
  }

  function setGalleryImage(index) {
    if (!modalImg || !currentGallery.length) return;
    currentGalleryIndex = setProductGalleryView({
      gallery: currentGallery,
      index,
      image: modalImg,
      label: modalGalleryLabel,
      position: modalImagePosition,
      thumbs: modalThumbs,
      productName: currentGalleryProductName
    });
  }

  function getModalStockStatus() {
    const modalInfo = document.querySelector('#productModal .product-modal-info');
    if (!modalInfo) return null;
    let status = document.getElementById('modalStockStatus');
    if (!status) {
      status = document.createElement('span');
      status.id = 'modalStockStatus';
      status.className = 'product-modal-stock-status';
      const modalPrice = modalInfo.querySelector('.product-price--catalog');
      if (modalPrice) modalPrice.insertAdjacentElement('beforebegin', status);
      else modalInfo.appendChild(status);
    }
    return status;
  }

  function replaceModalBuyElement(tagName) {
    const current = document.getElementById('modalWhatsApp');
    if (!current || current.tagName === tagName.toUpperCase()) return current;
    const replacement = document.createElement(tagName);
    replacement.id = 'modalWhatsApp';
    replacement.className = current.className;
    current.replaceWith(replacement);
    return replacement;
  }

  function buildCatalogWhatsAppMessage(product, variant, commerce) {
    const intent = commerce.isAvailable ? 'quiero comprar o consultar' : 'quiero consultar reposición de';
    const color = variant?.label || 'No aplica';
    const promotion = product.promotion || 'Sin promoción';
    const specialNote = commerce.specialNote ? ` Condición: ${commerce.specialNote}.` : '';
    return `Hola JOR STORE, ${intent} ${product.name}. Color seleccionado: ${color}. Precio de oferta: ${commerce.offerPriceText}. Promoción: ${promotion}.${specialNote}`;
  }

  function getProductWhatsAppUrl(product, variant = null) {
    const commerce = getVariantCommerce(product, variant);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildCatalogWhatsAppMessage(product, variant, commerce))}`;
  }

  function renderFeaturedOffers() {
    const grid = document.getElementById('featuredOffersGrid');
    if (!grid) return;
    grid.innerHTML = FEATURED_PRODUCT_IDS.map(id => PRODUCTS.find(product => product.id === id))
      .filter(Boolean)
      .map(product => {
        const variant = getSelectedVariant(product);
        const commerce = getVariantCommerce(product, variant);
        const image = getVariantPrimaryImage(product, variant).src;
        const priceOptions = product.id === 'jbl-grip'
          ? { prefix: 'Desde ', note: 'S/180 solo para las primeras 7 unidades negras' }
          : undefined;
        return `
          <article class="featured-offer-card${commerce.isAvailable ? '' : ' is-sold-out'}" data-product-id="${product.id}" data-stock="${commerce.stockStatus}" role="button" tabindex="0" aria-label="Ver detalles de ${product.name}">
            <span class="featured-offer-badge">${product.promotion}</span>
            <img src="${image}" alt="${product.name}" width="420" height="315" loading="lazy" decoding="async">
            <div class="featured-offer-body">
              <p>${product.brand}</p>
              <h3>${product.name}</h3>
              <div class="featured-offer-price">${getPricePresentationMarkup(commerce, priceOptions)}</div>
              <div class="featured-offer-actions">
                <button class="details-btn" type="button">Ver detalles</button>
              </div>
            </div>
          </article>
        `;
      }).join('');
  }

  function updateModalCommerce(product) {
    if (!product) return;
    const variant = getActiveVariant(product);
    const commerce = getVariantCommerce(product, variant);

    renderProductPrice({
      product,
      selectedVariant: variant,
      target: document.getElementById('modalPrice')
    });
    renderStockStatus(getModalStockStatus(), commerce);
    renderSoldOutState(modal, commerce);

    const buy = replaceModalBuyElement('a');
    if (!buy) return;
    buy.dataset.stock = commerce.stockStatus;
    buy.href = getProductWhatsAppUrl(product, variant);
    buy.target = '_blank';
    buy.rel = 'noopener noreferrer';
    buy.removeAttribute('aria-disabled');
    buy.textContent = commerce.isAvailable ? 'Comprar' : 'Consultar reposición';

    if (modal) modal.dataset.stock = commerce.stockStatus;
  }

  function renderProductGallery(product) {
    const activeVariant = getActiveVariant(product);
    currentGallery = getActiveGallery(product);
    currentGalleryIndex = 0;
    currentGalleryProductName = getVariantProductLabel(product, activeVariant);
    const hasMultipleImages = currentGallery.length > 1;

    if (modalMainImage) modalMainImage.setAttribute('aria-label', `Galería de ${currentGalleryProductName}`);
    if (modalPrevImage) {
      modalPrevImage.hidden = !hasMultipleImages;
      modalPrevImage.setAttribute('aria-label', `Vista anterior de ${currentGalleryProductName}`);
    }
    if (modalNextImage) {
      modalNextImage.hidden = !hasMultipleImages;
      modalNextImage.setAttribute('aria-label', `Vista siguiente de ${currentGalleryProductName}`);
    }
    if (modalImagePosition) modalImagePosition.hidden = !hasMultipleImages;
    if (modalThumbs) modalThumbs.hidden = !hasMultipleImages;

    renderProductGalleryComponent({
      product,
      gallery: currentGallery,
      thumbs: modalThumbs,
      onSelect: setGalleryImage,
      productLabel: currentGalleryProductName
    });

    setGalleryImage(0);
  }

  function renderVariantSelector(product) {
    const modalInfo = document.querySelector('#productModal .product-modal-info');
    if (!modalInfo) return;

    let selector = document.getElementById('modalVariantSelector');
    if (!selector) {
      selector = document.createElement('fieldset');
      selector.id = 'modalVariantSelector';
      selector.className = 'product-modal-variant-selector';
    }

    const modalPrice = modalInfo.querySelector('.product-price--catalog');
    const modalStock = document.getElementById('modalStockStatus');
    if (modalStock) modalStock.insertAdjacentElement('beforebegin', selector);
    else if (modalPrice) modalPrice.insertAdjacentElement('beforebegin', selector);
    else modalInfo.appendChild(selector);

    if (!product.variants || !product.variants.length) {
      selector.innerHTML = '';
      selector.hidden = true;
      return;
    }

    selector.hidden = false;
    selector.innerHTML = `
      <legend>Seleccionar color:</legend>
      <div class="product-variant-buttons">
        ${product.variants.map((variant, index) => {
          const commerce = getVariantCommerce(product, variant);
          const stockText = commerce.isAvailable ? '' : ', agotado';
          return `
            <button type="button" class="product-variant-button ${index === activeVariantIndex ? 'active' : ''}${commerce.isAvailable ? '' : ' is-out-of-stock'}" data-variant-index="${index}" data-stock="${commerce.stockStatus}" style="--variant-color:${variant.color || '#111'}" aria-label="Seleccionar ${product.name} color ${variant.label}${stockText}" aria-pressed="${index === activeVariantIndex ? 'true' : 'false'}">
              <i aria-hidden="true"></i><span>${variant.label}</span>${commerce.isAvailable ? '' : '<small>Agotado</small>'}
            </button>
          `;
        }).join('')}
      </div>
    `;

    selector.querySelectorAll('.product-variant-button').forEach(button => {
      const selectModalVariant = event => {
        event.preventDefault();
        event.stopPropagation();
        const restoreKeyboardFocus = event.detail === 0;
        activeVariantIndex = Number(button.dataset.variantIndex || 0);
        const selectedVariant = rememberSelectedVariant(product, activeVariantIndex);
        if (modal && selectedVariant) modal.dataset.selectedColor = selectedVariant.label;
        renderVariantSelector(product);
        renderProductGallery(product);
        updateProductCardVariant(product, false);
        updateModalCommerce(product);
        resetThumbnailScroll();
        if (restoreKeyboardFocus) {
          selector.querySelector(`[data-variant-index="${activeVariantIndex}"]`)?.focus();
        }
      };

      button.addEventListener('click', selectModalVariant);
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') selectModalVariant(event);
      });
    });
  }

  function openProduct(id, trigger = document.activeElement) {
    const product = PRODUCTS.find(item => item.id === id);
    if (!product || !modal) return;

    productModalTrigger = trigger;
    activeVariantIndex = getSelectedVariantIndex(product);
    const selectedVariant = activeVariantIndex >= 0
      ? rememberSelectedVariant(product, activeVariantIndex)
      : null;
    modal.dataset.productId = product.id;
    modal.dataset.selectedColor = selectedVariant?.label || '';
    renderProductGallery(product);
    renderVariantSelector(product);

    document.getElementById('modalBrand').textContent = `${product.brand} · ${product.category}`;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.short;
    renderProductFeatures(document.getElementById('modalFeatures'), product.modalFeatures || product.benefits);
    updateModalCommerce(product);

    lockPageBehindModal();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    resetModalScroll();
    window.requestAnimationFrame(() => {
      updateModalCommerce(product);
      modalClose?.focus();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.removeProperty('--modal-scroll-top');
    unlockPageBehindModal();
    const triggerToRestore = productModalTrigger;
    window.requestAnimationFrame(() => triggerToRestore?.focus({ preventScroll: true }));
  }

  function updateProductCardVariant(product, animateImage = true) {
    const card = productCards.find(item => item.dataset.id === product.id);
    if (!card || !Array.isArray(product.variants) || !product.variants.length) return;

    const selectedIndex = getSelectedVariantIndex(product);
    const selectedVariant = product.variants[selectedIndex];
    const commerce = getVariantCommerce(product, selectedVariant);
    const primaryImage = getVariantPrimaryImage(product, selectedVariant);
    const cardImage = card.querySelector(':scope > img');

    card.dataset.selectedVariant = selectedVariant.id;
    if (cardImage) {
      const applyImage = () => {
        cardImage.src = primaryImage.src;
        cardImage.alt = `${product.name} color ${selectedVariant.label}, ${primaryImage.label.toLowerCase()}`;
        window.requestAnimationFrame(() => cardImage.classList.remove('is-changing-variant'));
      };

      if (cardImage.getAttribute('src') !== primaryImage.src && animateImage) {
        cardImage.classList.add('is-changing-variant');
        const preload = new Image();
        preload.addEventListener('load', applyImage, { once: true });
        preload.addEventListener('error', applyImage, { once: true });
        preload.src = primaryImage.src;
      } else {
        applyImage();
      }
    }

    const selectedColorName = card.querySelector('.selected-color-name');
    if (selectedColorName) selectedColorName.textContent = commerce.isAvailable ? selectedVariant.label : `${selectedVariant.label} — Agotado`;
    renderStockStatus(card.querySelector('.badge.stock'), commerce);
    renderCardPrice(card.querySelector('.price-line'), product, selectedVariant);
    renderSoldOutState(card, commerce);
    card.querySelectorAll('.color-swatch').forEach((swatch, index) => {
      const isSelected = index === selectedIndex;
      swatch.classList.toggle('active', isSelected);
      swatch.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  function renderCardColorSwatches(card, product, title) {
    const existing = card.querySelector('.product-color-options');
    if (!Array.isArray(product.variants) || !product.variants.length) {
      existing?.remove();
      return;
    }

    const selectedIndex = getSelectedVariantIndex(product);
    const selectedVariant = product.variants[selectedIndex];
    const colorOptions = existing || document.createElement('div');
    colorOptions.className = 'product-color-options';
    colorOptions.innerHTML = `
      <span class="product-colors-label">Colores disponibles · <strong class="selected-color-name">${selectedVariant.label}</strong></span>
      <div class="product-color-swatches" role="group" aria-label="Colores disponibles para ${product.name}">
        ${product.variants.map((variant, index) => {
          const commerce = getVariantCommerce(product, variant);
          const stockText = commerce.isAvailable ? '' : ', agotado';
          return `
            <button class="color-swatch${index === selectedIndex ? ' active' : ''}${commerce.isAvailable ? '' : ' is-out-of-stock'}" type="button" data-variant-index="${index}" data-stock="${commerce.stockStatus}" style="--swatch-color:${variant.color || '#111'}" aria-label="Seleccionar ${product.name} color ${variant.label}${stockText}" aria-pressed="${index === selectedIndex ? 'true' : 'false'}"${commerce.isAvailable ? '' : ` title="${variant.label} — agotado"`}>
              <span aria-hidden="true"></span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    if (!existing) title.insertAdjacentElement('afterend', colorOptions);
    colorOptions.querySelectorAll('.color-swatch').forEach(button => {
      const selectCardVariant = event => {
        event.preventDefault();
        event.stopPropagation();
        const variantIndex = Number(button.dataset.variantIndex || 0);
        rememberSelectedVariant(product, variantIndex);
        updateProductCardVariant(product);
      };

      button.addEventListener('click', selectCardVariant);
      button.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') selectCardVariant(event);
      });
    });

    updateProductCardVariant(product, false);
  }

  function renderCardPrice(priceLine, product, selectedVariant = null) {
    if (!priceLine) return;
    priceLine.classList.remove('promo-price-line');
    renderProductPrice({ product, selectedVariant, target: priceLine });
  }

  function updateProductCards() {
    productCards.forEach(card => {
      const product = PRODUCTS.find(item => item.id === card.dataset.id);
      if (!product) return;

      card.querySelector('.urgency-line')?.remove();

      const selectedVariant = getSelectedVariant(product);
      const commerce = getVariantCommerce(product, selectedVariant);
      renderStockStatus(card.querySelector('.badge.stock'), commerce);
      renderSoldOutState(card, commerce);

      const body = card.querySelector('.product-body');
      const title = body?.querySelector('h3');
      if (body && title) renderCardColorSwatches(card, product, title);
      if (body && title && !body.querySelector('.quick-benefits')) {
        const benefits = document.createElement('ul');
        benefits.className = 'quick-benefits';
        benefits.innerHTML = (product.benefits || []).slice(0, 3).map(item => `<li>✓ ${item}</li>`).join('');
        const colorOptions = body.querySelector('.product-color-options');
        (colorOptions || title).insertAdjacentElement('afterend', benefits);
      }

      const priceLine = card.querySelector('.price-line');
      if (priceLine) renderCardPrice(priceLine, product, selectedVariant);

      const button = card.querySelector('.details-btn');
      if (button) button.textContent = 'Ver detalles';
    });
  }

  function applyBrandFilter(brand) {
    const selectedBrand = brand || 'all';
    let visibleCount = 0;

    productCards.forEach(card => {
      const product = PRODUCTS.find(item => item.id === card.dataset.id);
      if (!product) return;
      const isVisible = selectedBrand === 'all' || product.brand === selectedBrand;
      card.dataset.brand = product.brand;
      card.hidden = !isVisible;
      card.classList.toggle('is-filtered-out', !isVisible);
      card.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      if (isVisible) visibleCount += 1;
    });

    brandFilterButtons.forEach(button => {
      const isActive = button.dataset.brandFilter === selectedBrand;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    if (catalogFilterStatus) {
      if (selectedBrand === 'all') {
        catalogFilterStatus.textContent = `Mostrando ${visibleCount} productos.`;
      } else {
        catalogFilterStatus.textContent = `Mostrando ${visibleCount} productos ${selectedBrand}.`;
      }
    }
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.details-btn');
    if (button) {
      event.preventDefault();
      event.stopPropagation();
      const card = button.closest('.product-card, .featured-offer-card');
      const productId = card?.dataset.id || card?.dataset.productId;
      if (productId) openProduct(productId, button);
      return;
    }

    if (event.target.closest('button, a, input, select, textarea')) return;

    const card = event.target.closest('.product-card, .featured-offer-card');
    const productId = card?.dataset.id || card?.dataset.productId;
    if (productId) openProduct(productId, card);
  });

  brandFilterButtons.forEach(button => {
    button.addEventListener('click', () => applyBrandFilter(button.dataset.brandFilter));
    button.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      applyBrandFilter(button.dataset.brandFilter);
    });
  });

  initRealClientCarousels();
  updateProductCards();
  renderFeaturedOffers();
  applyBrandFilter('all');

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
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    modalMainImage.addEventListener('touchend', event => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const distanceX = touchEndX - touchStartX;
      const distanceY = touchEndY - touchStartY;
      if (Math.abs(distanceX) < 42 || Math.abs(distanceX) <= Math.abs(distanceY) * 1.15) return;
      setGalleryImage(distanceX > 0 ? currentGalleryIndex - 1 : currentGalleryIndex + 1);
    }, { passive: true });
  }

  productCards.forEach(card => {
    card.addEventListener('keydown', event => {
      if (event.target.closest('button, a, input, select, textarea')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProduct(card.dataset.id, card);
      }
    });
  });

  document.addEventListener('keydown', event => {
    const card = event.target.closest('.featured-offer-card');
    if (!card || event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
    event.preventDefault();
    openProduct(card.dataset.productId, card);
  });

  if (modal) modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });

  if (modal) modal.addEventListener('scroll', keepModalCloseVisible, { passive: true });

  document.addEventListener('keydown', event => {
    const isProductModalOpen = modal?.classList.contains('open');

    if (event.key === 'Escape') {
      if (isProductModalOpen) closeModal();
      return;
    }

    if (!modal || !modal.classList.contains('open')) return;

    if (trapModalFocus(event, modal)) return;

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






