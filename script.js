document.addEventListener('DOMContentLoaded', () => {
  // Carrusel publicitario de escenarios de uso
  const promoTrack = document.getElementById('promoTrack');
  const promoDots = Array.from(document.querySelectorAll('#promoDots .promo-dot'));
  const promoPrev = document.querySelector('.promo-prev');
  const promoNext = document.querySelector('.promo-next');
  let promoIndex = 0;

  function setPromoSlide(i){
    if(!promoTrack || !promoDots.length) return;
    promoIndex = (i + promoDots.length) % promoDots.length;
    promoTrack.style.transform = `translateX(-${promoIndex * 100}%)`;
    promoDots.forEach((d,idx)=>d.classList.toggle('active', idx===promoIndex));
  }

  promoDots.forEach((dot,i)=>dot.addEventListener('click',()=>setPromoSlide(i)));
  if(promoPrev) promoPrev.addEventListener('click',()=>setPromoSlide(promoIndex-1));
  if(promoNext) promoNext.addEventListener('click',()=>setPromoSlide(promoIndex+1));
  if(promoTrack && promoDots.length) setInterval(()=>setPromoSlide(promoIndex+1), 6500);

  const PRODUCTS = [
    { id: "lg-grab", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM Grab", price: "S/ 269", oldPrice: "S/ 299", discount: "Ahorras S/30", urgency: "🎁 Incluye regalo por tu compra", benefits: ["30W de potencia", "IP67 agua y polvo", "Certificación militar"], short: "Promo Día del Padre: parlante portátil resistente y ligero, diseñado para acompañarte en cualquier aventura con gran autonomía y resistencia.", features: ["Potencia de 30W", "Certificación IP67 resistente al agua y polvo", "Certificación militar MIL-STD-810H para mayor durabilidad", "Hasta 20 horas de batería", "Diseño compacto con correa integrada para fácil transporte"], best: "playa, piscina, viajes, bicicleta y uso diario", img: "assets/images/productos/lg-xboom-grab.png" },
    { id: "lg-bounce", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM Bounce", price: "S/ 379", oldPrice: "S/ 399", discount: "Ahorras S/20", urgency: "🎁 Incluye regalo por tu compra", benefits: ["40W de potencia", "IP67 agua y polvo", "Hasta 30h de batería"], short: "Promo Día del Padre: más batería, más bajos y mayor resistencia para disfrutar la música durante todo el día.", features: ["Potencia de 40W", "Certificación IP67 resistente al agua y polvo", "Certificación militar MIL-STD-810H", "Hasta 30 horas de batería", "Graves potentes y sonido amplio"], best: "reuniones, terrazas, camping y actividades al aire libre", img: "assets/images/productos/lg-xboom-bounce.webp" },
    { id: "lg-xg8t", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM XG8T", price: "S/ 725", urgency: "⚠️ Stock limitado", benefits: ["120W de potencia", "Luces LED RGB", "IP67 resistente"], short: "Potencia, luces y resistencia extrema para llevar la fiesta a cualquier lugar.", features: ["Potencia de 120W", "Certificación IP67 resistente al agua y polvo", "Certificación militar MIL-STD-810H", "Luces LED RGB sincronizadas con la música", "Graves profundos y sonido potente"], best: "fiestas, reuniones y usuarios que buscan potencia y efectos visuales", img: "assets/images/productos/lg-xboom-xg8t.webp" },
    { id: "lg-stage301", brand: "LG XBOOM", category: "Fiesta", name: "LG XBOOM Stage 301", price: "S/ 899", urgency: "⚠️ Stock limitado", benefits: ["120W de potencia", "Karaoke integrado", "Micrófono y guitarra"], short: "El parlante más versátil de LG XBOOM, perfecto para eventos, presentaciones y diversión en grupo.", features: ["Potencia de 120W", "Entradas para micrófono y guitarra", "Función karaoke integrada", "Batería portátil y reemplazable", "Diseño ideal para eventos y entretenimiento"], best: "karaoke, eventos, animación, músicos y fiestas", img: "assets/images/productos/lg-xboom-stage-301.webp" },
    { id: "jbl-go4", brand: "JBL", category: "Portátil", name: "JBL Go 4", price: "S/ 129", oldPrice: "S/ 149", discount: "Ahorras S/20", urgency: "🎁 Incluye regalo por tu compra", benefits: ["JBL Pro Sound", "IP67 agua y polvo", "Hasta 7h de batería"], short: "Promo Día del Padre: el JBL más pequeño y práctico, ideal para disfrutar música en cualquier momento y lugar.", features: ["Diseño ultracompacto y ligero", "Certificación IP67 resistente al agua y polvo", "Sonido JBL Pro Sound con bajos mejorados", "Hasta 7 horas de batería", "Fácil de transportar a cualquier lugar"], best: "estudiantes, oficina, habitación y uso personal", img: "assets/images/productos/jbl-go-4.webp" },
    { id: "jbl-grip", brand: "JBL", category: "Portátil", name: "JBL Clip 5 (Grip)", price: "S/ 249", urgency: "⚠️ Stock limitado", benefits: ["7W de potencia", "Mosquetón integrado", "IP67 resistente"], short: "Música siempre contigo gracias a su práctico diseño para colgar en mochilas, bicicletas o equipaje.", features: ["Potencia de 7W", "Mosquetón integrado para colgarlo fácilmente", "Certificación IP67 resistente al agua y polvo", "Hasta 12 horas de batería", "Sonido JBL Pro Sound"], best: "deportistas, viajeros y actividades al aire libre", img: "assets/images/productos/jbl-grip.webp" },
    { id: "jbl-flip7", brand: "JBL", category: "Portátil", name: "JBL Flip 7", price: "S/ 349", urgency: "⚠️ Stock limitado", benefits: ["35W de potencia", "IP68 resistente", "Auracast"], short: "El equilibrio perfecto entre tamaño, potencia y resistencia, uno de los modelos más buscados de JBL.", features: ["Potencia de 35W", "Sonido JBL Pro Sound con graves potentes", "Certificación IP68 resistente al agua y polvo", "Tecnología Auracast para conectar múltiples parlantes", "Diseño portátil y resistente"], best: "playa, reuniones, viajes y uso diario", img: "assets/images/productos/jbl-flip-7.webp" },
    { id: "jbl-charge6", brand: "JBL", category: "Portátil", name: "JBL Charge 6", price: "S/ 515", urgency: "⚠️ Stock limitado", benefits: ["45W de potencia", "Powerbank integrado", "Hasta 24h batería"], short: "Potencia, batería y carga para tus dispositivos en un solo equipo.", features: ["Potencia de 45W", "Sonido potente con graves profundos", "Powerbank integrado para cargar celulares", "Certificación IP68 resistente al agua y polvo", "Hasta 24 horas de batería"], best: "viajes largos, reuniones y usuarios que buscan autonomía y potencia", img: "assets/images/productos/jbl-charge-6.webp" },
    { id: "jbl-boombox4", brand: "JBL", category: "Fiesta", name: "JBL Boombox 4", price: "S/ 1 605", urgency: "⚠️ Stock limitado", benefits: ["180W de potencia", "Graves profundos", "Sonido premium"], short: "El máximo nivel de potencia portátil de JBL para quienes buscan el mejor sonido y la mayor presencia.", features: ["Potencia de 180W", "Graves extremadamente profundos", "Certificación IP67 resistente al agua y polvo", "Batería de larga duración", "Sonido premium para espacios grandes y eventos"], best: "fiestas, eventos, terrazas y clientes exigentes", img: "assets/images/productos/jbl-boombox-4.webp" }
  ];

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalBack = document.getElementById('modalBack');
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;

  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p || !modal) return;
    document.getElementById('modalImg').src = p.img;
    document.getElementById('modalImg').alt = p.name;
    document.getElementById('modalBrand').textContent = p.brand + ' · ' + p.category;
    document.getElementById('modalTitle').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.short;
    document.getElementById('modalFeatures').innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
    document.getElementById('modalBest').innerHTML = '<strong>Ideal para:</strong> ' + p.best;
    const modalPrice = document.getElementById('modalPrice');
    if (p.oldPrice) {
      modalPrice.innerHTML = `<div class="modal-promo-price"><span class="modal-kicker">PROMO DÍA DEL PADRE</span><div class="modal-now-row"><span>Ahora</span><strong>${p.price}</strong></div><div class="modal-old-row"><span>Antes</span><del>${p.oldPrice}</del></div><small>${p.discount || 'Oferta especial'}</small></div>`;
    } else {
      modalPrice.innerHTML = `<strong>${p.price}</strong>`;
    }
    const msg = encodeURIComponent('Hola JOR STORE, quiero información sobre ' + p.name + ' (' + p.price + ')');
    document.getElementById('modalWhatsApp').href = 'https://wa.me/51925789830?text=' + msg;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  function filterProducts(filter) {
    productCards.forEach(card => {
      const p = PRODUCTS.find(x => x.id === card.dataset.id);
      if (!p) return;
      const show = filter === 'todos' || p.brand === filter || p.category === filter;
      card.hidden = !show;
      card.style.display = show ? '' : 'none';
    });
  }

  function activateFilterButton(btn) {
    if (!btn) return;
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts(btn.dataset.filter || 'todos');
  }

  function updateProductCards() {
    productCards.forEach(card => {
      const p = PRODUCTS.find(x => x.id === card.dataset.id);
      if (!p) return;

      const badgeRow = card.querySelector('.badge-row');
      if (badgeRow) {
        const stock = badgeRow.querySelector('.badge.stock');
        if (stock) stock.innerHTML = '✓ En stock';
        if (p.oldPrice && !badgeRow.querySelector('.badge.promo')) {
          const promoBadge = document.createElement('span');
          promoBadge.className = 'badge promo';
          promoBadge.textContent = 'Día del Padre';
          badgeRow.insertBefore(promoBadge, stock || null);
        }
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
      if (!priceLine) return;
      if (p.oldPrice) {
        priceLine.classList.add('promo-price-line');
        priceLine.innerHTML = `<div class="promo-price-main"><span class="promo-kicker">PROMO DÍA DEL PADRE</span><div class="promo-now"><small>Ahora</small><strong>${p.price}</strong></div><div class="promo-before"><span>Antes</span><del>${p.oldPrice}</del></div><span class="promo-save">${p.discount || 'Oferta especial'}</span></div>`;
      } else {
        priceLine.classList.remove('promo-price-line');
        priceLine.innerHTML = `<strong>${p.price}</strong><span>Precio JOR STORE</span>`;
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

  filterButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      activateFilterButton(btn);
    });
    btn.addEventListener('touchend', e => {
      e.preventDefault();
      e.stopPropagation();
      activateFilterButton(btn);
    }, { passive: false });
  });

  document.querySelectorAll('.product-card .details-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) openProduct(card.dataset.id);
    });
    btn.addEventListener('touchend', e => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) openProduct(card.dataset.id);
    }, { passive: false });
  });

  productCards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', e => {
      if (e.target.closest('.details-btn')) return;
      openProduct(card.dataset.id);
    });
    card.addEventListener('touchstart', e => {
      const t = e.changedTouches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchStartTime = Date.now();
    }, { passive: true });
    card.addEventListener('touchend', e => {
      if (e.target.closest('.details-btn')) return;
      const t = e.changedTouches[0];
      const dx = Math.abs(t.clientX - touchStartX);
      const dy = Math.abs(t.clientY - touchStartY);
      const dt = Date.now() - touchStartTime;
      const isTap = dx < 10 && dy < 10 && dt < 450;
      if (isTap) {
        e.preventDefault();
        openProduct(card.dataset.id);
      }
    }, { passive: false });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProduct(card.dataset.id);
      }
    });
  });

  updateProductCards();
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBack) modalBack.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
