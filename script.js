document.addEventListener('DOMContentLoaded', () => {
  const promoTrack = document.getElementById('promoTrack');
  const promoDots = Array.from(document.querySelectorAll('#promoDots .promo-dot'));
  const promoPrev = document.querySelector('.promo-prev');
  const promoNext = document.querySelector('.promo-next');
  let promoIndex = 0;

  function setPromoSlide(i) {
    if (!promoTrack || !promoDots.length) return;
    promoIndex = (i + promoDots.length) % promoDots.length;
    promoTrack.style.transform = `translateX(-${promoIndex * 100}%)`;
    promoDots.forEach((dot, index) => dot.classList.toggle('active', index === promoIndex));
  }

  promoDots.forEach((dot, index) => dot.addEventListener('click', () => setPromoSlide(index)));
  if (promoPrev) promoPrev.addEventListener('click', () => setPromoSlide(promoIndex - 1));
  if (promoNext) promoNext.addEventListener('click', () => setPromoSlide(promoIndex + 1));
  if (promoTrack && promoDots.length) setInterval(() => setPromoSlide(promoIndex + 1), 6500);

  const PRODUCTS = [
    {
      id: 'lg-grab',
      brand: 'LG XBOOM',
      category: 'Portátil',
      name: 'LG XBOOM Grab',
      price: 'S/ 269',
      oldPrice: 'S/ 299',
      discount: 'Ahorras S/30',
      urgency: '🎁 Incluye regalo por tu compra',
      benefits: ['30W de potencia', 'IP67 agua y polvo', 'Certificación militar'],
      short: 'Promo Día del Padre: parlante portátil resistente y ligero, diseñado para acompañarte en cualquier aventura con gran autonomía y resistencia.',
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
      price: 'S/ 379',
      oldPrice: 'S/ 399',
      discount: 'Ahorras S/20',
      urgency: '🎁 Incluye regalo por tu compra',
      benefits: ['40W de potencia', 'IP67 agua y polvo', 'Hasta 30h de batería'],
      short: 'Promo Día del Padre: más batería, más bajos y resistencia para reuniones, viajes y planes al aire libre.',
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
      ],},
    {
      id: 'lg-xg8t',
      brand: 'LG XBOOM',
      category: 'Portátil',
      name: 'LG XBOOM XG8T',
      price: 'S/ 725',
      urgency: '⚠️ Stock limitado',
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
      ],},
    {
      id: 'lg-stage301',
      brand: 'LG XBOOM',
      category: 'Fiesta',
      name: 'LG XBOOM Stage 301',
      price: 'S/ 899',
      urgency: '⚠️ Stock limitado',
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
      ],},
    {
      id: 'jbl-go4',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Go 4',
      price: 'S/ 129',
      oldPrice: 'S/ 149',
      discount: 'Ahorras S/20',
      urgency: '🎁 Incluye regalo por tu compra',
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
      ],},
    {
      id: 'jbl-grip',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Clip 5 (Grip)',
      price: 'S/ 249',
      urgency: '⚠️ Stock limitado',
      benefits: ['7W de potencia', 'Mosquetón integrado', 'IP67 resistente'],
      short: 'Parlante portátil con diseño de agarre, resistente y fácil de llevar para música en viajes, playa, piscina y aventuras.',
      features: [
        'Potencia de 7W',
        'Mosquetón integrado para colgarlo fácilmente',
        'Certificación IP67 resistente al agua y polvo',
        'Hasta 12 horas de batería',
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
      ],},
    {
      id: 'jbl-flip7',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Flip 7',
      price: 'S/ 349',
      urgency: '⚠️ Stock limitado',
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
      ],},
    {
      id: 'jbl-charge6',
      brand: 'JBL',
      category: 'Portátil',
      name: 'JBL Charge 6',
      price: 'S/ 515',
      urgency: '⚠️ Stock limitado',
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
      ],},
    {
      id: 'jbl-boombox4',
      brand: 'JBL',
      category: 'Fiesta',
      name: 'JBL Boombox 4',
      price: 'S/ 1 605',
      urgency: '⚠️ Stock limitado',
      benefits: ['180W de potencia', 'Graves profundos', 'Sonido premium'],
      short: 'Sonido masivo, graves profundos y presencia premium para fiestas, eventos, terrazas y aventuras al aire libre.',
      features: [
        'Potencia de 180W',
        'Graves extremadamente profundos',
        'Certificación IP67 resistente al agua y polvo',
        'Batería de larga duración',
        'Sonido premium para espacios grandes y eventos'
      ],
      best: 'fiestas, eventos, terrazas, camping, playa y clientes que buscan el sonido más potente',
      img: 'assets/images/productos/jbl-boombox-4.webp',
      gallery: [
        { src: 'assets/images/productos/jbl-boombox-4/01-frontal.webp', label: 'Vista frontal' },
        { src: 'assets/images/productos/jbl-boombox-4/02-lateral.webp', label: 'Vista lateral' },
        { src: 'assets/images/productos/jbl-boombox-4/03-superior.webp', label: 'Vista superior' },
        { src: 'assets/images/productos/jbl-boombox-4/04-trasera.webp', label: 'Vista trasera' },
        { src: 'assets/images/productos/jbl-boombox-4/05-inferior.webp', label: 'Vista inferior' },
        { src: 'assets/images/productos/jbl-boombox-4/06-uso-exterior.webp', label: 'Uso exterior' }
      ],}
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

  function renderProductGallery(product) {
    const fallbackGallery = [{ src: product.img, label: 'Vista principal' }];
    currentGallery = Array.isArray(product.gallery) && product.gallery.length ? product.gallery : fallbackGallery;
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

        thumb.addEventListener('mouseenter', () => {
          if (window.matchMedia('(hover: hover)').matches) setGalleryImage(index);
        });
      });
    }

    currentGallery.slice(1).forEach(item => {
      const preload = new Image();
      preload.src = item.src;
    });

    setGalleryImage(0);
  }


  let activeProduct = null;
  let activeVariantIndex = 0;

  function getActiveGallery(product) {
    if (product && Array.isArray(product.variants) && product.variants.length) {
      return product.variants[activeVariantIndex]?.gallery || [];
    }
    return product?.gallery || [{ src: product?.img, label: 'Vista principal' }];
  }

  function getActiveVariant(product) {
    if (product && Array.isArray(product.variants) && product.variants.length) {
      return product.variants[activeVariantIndex];
    }
    return null;
  }

  function renderVariantSelector(product) {
    const modalInfo = document.querySelector('.modal-info');
    if (!modalInfo) return;

    let selector = document.getElementById('modalVariantSelector');
    if (!selector) {
      selector = document.createElement('div');
      selector.id = 'modalVariantSelector';
      selector.className = 'modal-variant-selector';
      const title = document.getElementById('modalTitle');
      if (title) title.insertAdjacentElement('afterend', selector);
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
        updateVariantWhatsApp(product);
      });
    });
  }

  function updateVariantWhatsApp(product) {
    const wa = document.getElementById('modalWhatsApp');
    if (!wa || !product) return;
    const variant = getActiveVariant(product);
    const colorText = variant ? ` color ${variant.label}` : '';
    const msg = encodeURIComponent(`Hola JOR STORE, quiero información sobre ${product.name}${colorText} (${product.price})`);
    wa.href = `https://wa.me/51925789830?text=${msg}`;
  }

  function renderProductGallery(product) {
    const gallery = getActiveGallery(product);
    const img = document.getElementById('modalImg');
    if (!img || !gallery.length) return;

    let galleryWrap = document.getElementById('modalGalleryWrap');
    if (!galleryWrap) {
      const modalImage = document.querySelector('.modal-image');
      if (!modalImage) return;
      modalImage.innerHTML = `
        <button class="gallery-arrow gallery-prev" type="button" aria-label="Vista anterior">‹</button>
        <img alt="" id="modalImg" src="">
        <button class="gallery-arrow gallery-next" type="button" aria-label="Vista siguiente">›</button>
        <span class="gallery-label" id="galleryLabel"></span>
        <div class="modal-thumbnails" id="modalThumbnails"></div>
        <p class="gallery-help">En computadora puedes pasar el mouse o hacer clic. En celular toca una vista o desliza la imagen.</p>
      `;
    }

    const modalImg = document.getElementById('modalImg');
    const label = document.getElementById('galleryLabel');
    const thumbs = document.getElementById('modalThumbnails');
    const prev = document.querySelector('.gallery-prev');
    const next = document.querySelector('.gallery-next');
    let galleryIndex = 0;

    function setGalleryImage(index) {
      galleryIndex = (index + gallery.length) % gallery.length;
      const item = gallery[galleryIndex];
      modalImg.src = item.src;
      modalImg.alt = `${product.name} - ${item.label}`;
      if (label) label.textContent = item.label || 'Vista del producto';
      if (thumbs) {
        thumbs.querySelectorAll('.gallery-thumb').forEach((thumb, idx) => thumb.classList.toggle('active', idx === galleryIndex));
      }
    }

    if (thumbs) {
      thumbs.innerHTML = gallery.map((item, index) => `
        <button type="button" class="gallery-thumb ${index === 0 ? 'active' : ''}" data-gallery-index="${index}">
          <img src="${item.src}" alt="${item.label}">
          <span>${item.label}</span>
        </button>
      `).join('');

      thumbs.querySelectorAll('.gallery-thumb').forEach(button => {
        button.addEventListener('click', () => setGalleryImage(Number(button.dataset.galleryIndex || 0)));
        button.addEventListener('mouseenter', () => setGalleryImage(Number(button.dataset.galleryIndex || 0)));
      });
    }

    if (prev) prev.onclick = () => setGalleryImage(galleryIndex - 1);
    if (next) next.onclick = () => setGalleryImage(galleryIndex + 1);

    let startX = 0;
    modalImg.ontouchstart = event => { startX = event.touches[0].clientX; };
    modalImg.ontouchend = event => {
      const diff = event.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 45) setGalleryImage(galleryIndex + (diff < 0 ? 1 : -1));
    };

    setGalleryImage(0);
  }


  function openProduct(id) {
    const p = PRODUCTS.find(product => product.id === id);
    if (!p || !modal) return;

    renderProductGallery(p);
    document.getElementById('modalBrand').textContent = `${p.brand} · ${p.category}`;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.short;
    document.getElementById('modalFeatures').innerHTML = p.features.map(feature => `<li>${feature}</li>`).join('');
    document.getElementById('modalBest').innerHTML = `<strong>Ideal para:</strong> ${p.best}`;

    const modalPrice = document.getElementById('modalPrice');
    if (p.oldPrice) {
      modalPrice.innerHTML = `
        <div class="modal-promo-price">
          <span class="modal-kicker">PROMO DÍA DEL PADRE</span>
          <div class="modal-now-row"><span>Ahora</span><strong>${p.price}</strong></div>
          <div class="modal-old-row"><span>Antes</span><del>${p.oldPrice}</del></div>
          <small>${p.discount}</small>
        </div>
        <div class="modal-gift">🎁 Promo especial: incluye regalo por tu compra</div>
      `;
    } else {
      modalPrice.innerHTML = `<strong>${p.price}</strong>`;
    }

    if (!p.variants || !p.variants.length) {
      const msg = encodeURIComponent(`Hola JOR STORE, quiero información sobre ${p.name} (${p.price})`);
      document.getElementById('modalWhatsApp').href = `https://wa.me/51925789830?text=${msg}`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.scrollTop = 0;
    const modalCard = modal.querySelector('.modal-card');
    if (modalCard) modalCard.scrollTop = 0;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function updateProductCards() {
    productCards.forEach(card => {
      const p = PRODUCTS.find(product => product.id === card.dataset.id);
      if (!p) return;

      const badgeRow = card.querySelector('.badge-row');
      if (badgeRow) {
        const stock = badgeRow.querySelector('.badge.stock');
        if (stock) stock.innerHTML = '✓ En stock';

        
      }

      if (p.oldPrice && !card.querySelector('.offer-ribbon')) {
        const ribbon = document.createElement('div');
        ribbon.className = 'offer-ribbon';
        ribbon.textContent = '🔥 Oferta Día del Padre';
        card.insertAdjacentElement('afterbegin', ribbon);
      }

      const body = card.querySelector('.product-body');
      const title = body?.querySelector('h3');

      if (body && title && !body.querySelector('.quick-benefits')) {
        const benefits = document.createElement('ul');
        benefits.className = 'quick-benefits';
        benefits.innerHTML = (p.benefits || []).slice(0, 3).map(item => `<li>✓ ${item}</li>`).join('');
        title.insertAdjacentElement('afterend', benefits);
      }

      const priceLine = card.querySelector('.price-line');
      if (priceLine) {
        if (p.oldPrice) {
          priceLine.classList.add('promo-price-line');
          priceLine.innerHTML = `
            <div class="promo-price-main">
              <span class="promo-kicker">PROMO DÍA DEL PADRE</span>
              <div class="promo-now"><small>Ahora</small><strong>${p.price}</strong></div>
              <div class="promo-before"><span>Antes</span><del>${p.oldPrice}</del></div>
              <span class="promo-save">${p.discount}</span>
            </div>
          `;
        } else {
          priceLine.classList.remove('promo-price-line');
          priceLine.innerHTML = `<strong>${p.price}</strong><span>Precio JOR STORE</span>`;
        }
      }

      const btn = card.querySelector('.details-btn');
      if (btn) btn.textContent = p.oldPrice ? 'Ver oferta' : 'Comprar ahora';

      if (body && !body.querySelector('.urgency-line')) {
        const urgency = document.createElement('div');
        urgency.className = 'urgency-line';
        urgency.textContent = p.urgency || '⚠️ Stock limitado';
        body.appendChild(urgency);
      }
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
  if (modalBack) modalBack.addEventListener('click', closeModal);

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
