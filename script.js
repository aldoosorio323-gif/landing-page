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
  { id: "lg-grab", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM Grab", price: "S/ 299", short: "Parlante portátil ideal para reuniones, paseos y uso diario.", features: ["Portátil", "Buen sonido", "Ideal para uso diario"], best: "portabilidad y confianza", img: "assets/images/productos/lg-xboom-grab.png" },
  { id: "lg-bounce", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM Bounce", price: "S/ 399", short: "Buen equilibrio entre batería, tamaño y precio.", features: ["Buen equilibrio", "Uso diario", "Ideal para reuniones"], best: "batería y precio", img: "assets/images/productos/lg-xboom-bounce.webp" },
  { id: "lg-xg8t", brand: "LG XBOOM", category: "Portátil", name: "LG XBOOM XG8T", price: "S/ 725", short: "Parlante de mayor potencia para reuniones y exteriores.", features: ["Mayor potencia", "Ideal para exteriores", "Sonido fuerte"], best: "portátil grande", img: "assets/images/productos/lg-xboom-xg8t.webp" },
  { id: "lg-stage301", brand: "LG XBOOM", category: "Fiesta", name: "LG XBOOM Stage 301", price: "S/ 899", short: "Parlante tipo torre ideal para karaoke, reuniones y eventos.", features: ["Tipo torre", "Ideal para karaoke", "Eventos pequeños"], best: "eventos pequeños", img: "assets/images/productos/lg-xboom-stage-301.webp" },
  { id: "jbl-go4", brand: "JBL", category: "Portátil", name: "JBL Go 4", price: "S/ 125", short: "Parlante compacto, fácil de llevar y perfecto como regalo.", features: ["Compacto", "Fácil de llevar", "Ideal como regalo"], best: "compra por impulso", img: "assets/images/productos/jbl-go-4.webp" },
  { id: "jbl-grip", brand: "JBL", category: "Portátil", name: "JBL Grip", price: "S/ 249", short: "Modelo práctico para salidas, viajes y planes diarios.", features: ["Portátil", "Práctico", "Para viajes"], best: "portabilidad", img: "assets/images/productos/jbl-grip.webp" },
  { id: "jbl-flip7", brand: "JBL", category: "Portátil", name: "JBL Flip 7", price: "S/ 349", short: "Parlante versátil para casa, reuniones y exteriores.", features: ["Versátil", "Buen diseño", "Uso en casa o exterior"], best: "modelo grande", img: "assets/images/productos/jbl-flip-7.webp" },
  { id: "jbl-charge6", brand: "JBL", category: "Portátil", name: "JBL Charge 6", price: "S/ 515", short: "Parlante con batería superior para planes largos.", features: ["Batería superior", "Buen volumen", "Ideal para planes largos"], best: "batería superior", img: "assets/images/productos/jbl-charge-6.webp" },
  { id: "jbl-boombox4", brand: "JBL", category: "Fiesta", name: "JBL Boombox 4", price: "S/ 1 605", short: "Modelo grande y potente para fiestas y sonido premium.", features: ["Alta potencia", "Sonido premium", "Ideal para fiestas"], best: "premium de JBL", img: "assets/images/productos/jbl-boombox-4.webp" }
];

const modal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalBack = document.getElementById('modalBack');
const grid = document.getElementById('productGrid');

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
  document.getElementById('modalPrice').textContent = p.price;
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

if (grid) {
  grid.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) openProduct(card.dataset.id);
  });
  grid.addEventListener('keydown', e => {
    const card = e.target.closest('.product-card');
    if ((e.key === 'Enter' || e.key === ' ') && card) { e.preventDefault(); openProduct(card.dataset.id); }
  });
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBack) modalBack.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

const productCards = Array.from(document.querySelectorAll('.product-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

function filterProducts(filter) {
  productCards.forEach(card => {
    const p = PRODUCTS.find(x => x.id === card.dataset.id);
    if (!p) return;
    const show = filter === 'todos' || p.brand === filter || p.category === filter;
    card.style.display = show ? '' : 'none';
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts(btn.dataset.filter);
  });
});
