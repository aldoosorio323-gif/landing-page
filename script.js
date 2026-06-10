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
      category: 'PortÃ¡til',
      name: 'LG XBOOM Grab',
      price: 'S/ 259',
      oldPrice: 'S/ 299',
      discount: 'Ahorras S/40',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['30W de potencia', 'IP67 agua y polvo', 'CertificaciÃ³n militar'],
      short: 'Promo DÃ­a del Padre: parlante portÃ¡til resistente y ligero, diseÃ±ado para acompaÃ±arte en cualquier aventura con gran autonomÃ­a y resistencia.',
      features: [
        'Potencia de 30W',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'CertificaciÃ³n militar MIL-STD-810H para mayor durabilidad',
        'Hasta 20 horas de baterÃ­a',
        'DiseÃ±o compacto con correa integrada para fÃ¡cil transporte'
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
      category: 'PortÃ¡til',
      name: 'LG XBOOM Bounce',
      price: 'S/ 379',
      oldPrice: 'S/ 399',
      discount: 'Ahorras S/20',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['40W de potencia', 'IP67 agua y polvo', 'Hasta 30h de baterÃ­a'],
      short: 'Promo DÃ­a del Padre: mÃ¡s baterÃ­a, mÃ¡s bajos y resistencia para reuniones, viajes y planes al aire libre.',
      features: [
        'Potencia de 40W',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'CertificaciÃ³n militar MIL-STD-810H',
        'Hasta 30 horas de baterÃ­a',
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
      category: 'PortÃ¡til',
      name: 'LG XBOOM XG8T',
      price: 'S/ 699',
      discount: 'Ahorras S/26',
      oldPrice: 'S/ 725',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['120W de potencia', 'Luces LED RGB', 'IP67 resistente'],
      short: 'Potencia, luces y resistencia para llevar mÃºsica fuerte a reuniones, playa, viajes y planes al aire libre.',
      features: [
        'Potencia de 120W',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'CertificaciÃ³n militar MIL-STD-810H',
        'Luces LED RGB sincronizadas con la mÃºsica',
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
      price: 'S/ 869',
      discount: 'Ahorras S/30',
      oldPrice: 'S/ 899',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['120W de potencia', 'Karaoke integrado', 'MicrÃ³fono y guitarra'],
      short: 'Parlante potente para fiestas, reuniones, karaoke y eventos donde necesitas mÃ¡s presencia, luces y sonido envolvente.',
      features: [
        'Potencia de 120W',
        'Entradas para micrÃ³fono y guitarra',
        'FunciÃ³n karaoke integrada',
        'BaterÃ­a portÃ¡til y reemplazable',
        'DiseÃ±o ideal para eventos y entretenimiento'
      ],
      best: 'fiestas, karaoke, reuniones grandes, eventos y espacios donde necesitas mÃ¡s potencia',
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
      category: 'PortÃ¡til',
      name: 'JBL Go 4',
      price: 'S/ 129',
      oldPrice: 'S/ 149',
      discount: 'Ahorras S/20',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['JBL Pro Sound', 'IP67 agua y polvo', 'Hasta 7h de baterÃ­a'],
      short: 'Compacto, resistente y fÃ¡cil de llevar. Disponible en colores para elegir el estilo que mÃ¡s va contigo.',
      features: [
        'DiseÃ±o ultracompacto y ligero',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'Sonido JBL Pro Sound con bajos mejorados',
        'Hasta 7 horas de baterÃ­a',
        'FÃ¡cil de transportar a cualquier lugar'
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
      category: 'PortÃ¡til',
      name: 'JBL Clip 5 (Grip)',
      price: 'S/ 209',
      discount: 'Ahorras S/40',
      oldPrice: 'S/ 249',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['7W de potencia', 'MosquetÃ³n integrado', 'IP67 resistente'],
      short: 'Parlante portÃ¡til con diseÃ±o de agarre, resistente y fÃ¡cil de llevar para mÃºsica en viajes, playa, piscina y aventuras.',
      features: [
        'Potencia de 7W',
        'MosquetÃ³n integrado para colgarlo fÃ¡cilmente',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'Hasta 12 horas de baterÃ­a',
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
      category: 'PortÃ¡til',
      name: 'JBL Flip 7',
      price: 'S/ 339',
      discount: 'Ahorras S/60',
      oldPrice: 'S/ 399',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['35W de potencia', 'IP68 resistente', 'Auracast'],
      short: 'Sonido potente, diseÃ±o portÃ¡til y resistencia para llevar mÃºsica a la playa, piscina, viajes y reuniones.',
      features: [
        'Potencia de 35W',
        'Sonido JBL Pro Sound con graves potentes',
        'CertificaciÃ³n IP68 resistente al agua y polvo',
        'TecnologÃ­a Auracast para conectar mÃºltiples parlantes',
        'DiseÃ±o portÃ¡til y resistente'
      ],
      best: 'playa, piscina, viajes, reuniones, deportes acuÃ¡ticos y uso diario',
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
      category: 'PortÃ¡til',
      name: 'JBL Charge 6',
      price: 'S/ 489',
      discount: 'Ahorras S/60',
      oldPrice: 'S/ 549',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['45W de potencia', 'Powerbank integrado', 'Hasta 24h baterÃ­a'],
      short: 'Sonido potente, baterÃ­a de larga duraciÃ³n y asa resistente para llevar tu mÃºsica a cualquier plan.',
      features: [
        'Potencia de 45W',
        'Sonido potente con graves profundos',
        'Powerbank integrado para cargar celulares',
        'CertificaciÃ³n IP68 resistente al agua y polvo',
        'Hasta 24 horas de baterÃ­a'
      ],
      best: 'viajes largos, reuniones, playa, camping, terrazas y usuarios que buscan autonomÃ­a y potencia',
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
      price: 'S/ 1515',
      discount: 'Ahorras S/90',
      oldPrice: 'S/ 1605',
      urgency: 'ðŸ”¥ Oferta DÃ­a del Padre',
      benefits: ['180W de potencia', 'Graves profundos', 'Sonido premium'],
      short: 'Sonido masivo, graves profundos y presencia premium para fiestas, eventos, terrazas y aventuras al aire libre.',
      features: [
        'Potencia de 180W',
        'Graves extremadamente profundos',
        'CertificaciÃ³n IP67 resistente al agua y polvo',
        'BaterÃ­a de larga duraciÃ³n',
        'Sonido premium para espacios grandes y eventos'
      ],
      best: 'fiestas, eventos, terrazas, camping, playa y clientes que buscan el sonido mÃ¡s potente',
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
  const modalCard = document.querySelector('.modal-card');
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
    const msg = encodeURIComponent(`Hola JOR STORE, quiero informaciÃ³n sobre ${product.name}${colorText} (${product.price})`);
    wa.href = `https://wa.me/51925789830?text=${msg}`;
  }

  function openProduct(id) {
        const p = PRODUCTS.find(product => product.id === id);
    if (!p || !modal) return;

    renderProductGallery(p);
    document.getElementById('modalBrand').textContent = `${p.brand} Â· ${p.category}`;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.short;
    document.getElementById('modalFeatures').innerHTML = p.features.map(feature => `<li>${feature}</li>`).join('');
    document.getElementById('modalBest').innerHTML = `<strong>Ideal para:</strong> ${p.best}`;

    const modalPrice = document.getElementById('modalPrice');
    if (p.oldPrice) {
      modalPrice.innerHTML = `
        <div class="modal-promo-price">
          <span class="modal-kicker">PROMO DÃA DEL PADRE</span>
          <div class="modal-now-row"><span>Ahora</span><strong>${p.price}</strong></div>
          <div class="modal-old-row"><span>Antes</span><del>${p.oldPrice}</del></div>
          <small>${p.discount}</small>
        </div>
        <div class="modal-gift">ðŸŽ Promo especial: incluye regalo por tu compra</div>
      `;
    } else {
      modalPrice.innerHTML = `<strong>${p.price}</strong>`;
    }

    if (!p.variants || !p.variants.length) {
      const msg = encodeURIComponent(`Hola JOR STORE, quiero informaciÃ³n sobre ${p.name} (${p.price})`);
      document.getElementById('modalWhatsApp').href = `https://wa.me/51925789830?text=${msg}`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
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
        if (stock) stock.innerHTML = 'âœ“ En stock';

        
      }

      if (p.oldPrice && !card.querySelector('.offer-ribbon')) {
        const ribbon = document.createElement('div');
        ribbon.className = 'offer-ribbon';
        ribbon.textContent = 'ðŸ”¥ Oferta DÃ­a del Padre';
        card.insertAdjacentElement('afterbegin', ribbon);
      }

      const body = card.querySelector('.product-body');
      const title = body?.querySelector('h3');

      if (body && title && !body.querySelector('.quick-benefits')) {
        const benefits = document.createElement('ul');
        benefits.className = 'quick-benefits';
        benefits.innerHTML = (p.benefits || []).slice(0, 3).map(item => `<li>âœ“ ${item}</li>`).join('');
        title.insertAdjacentElement('afterend', benefits);
      }

      const priceLine = card.querySelector('.price-line');
      if (priceLine) {
        if (p.oldPrice) {
          priceLine.classList.add('promo-price-line');
          priceLine.innerHTML = `
            <div class="promo-price-main">
              <span class="promo-kicker">PROMO DÃA DEL PADRE</span>
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
        urgency.textContent = p.urgency || 'âš ï¸ Stock limitado';
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

