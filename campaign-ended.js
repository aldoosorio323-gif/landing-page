document.addEventListener('DOMContentLoaded', () => {
  const modalFixStyles = document.createElement('link');
  modalFixStyles.rel = 'stylesheet';
  modalFixStyles.href = 'modal-mobile-fix.css?v=20260704-scroll-2';
  document.head.appendChild(modalFixStyles);

  const finalProducts = [
    { id: 'lg-mini', name: 'LG XBOOM Mini', price: 'S/ 169', },
    { id: 'lg-rock', name: 'LG XBOOM Rock', price: 'S/ 199' },
    { id: 'lg-grab', name: 'LG XBOOM Grab', price: 'S/ 275' },
    { id: 'lg-bounce', name: 'LG XBOOM Bounce', price: 'S/ 389' },
    { id: 'lg-xg8t', name: 'LG XBOOM XG8T', price: 'S/ 760' },
    { id: 'lg-stage301', name: 'LG XBOOM Stage 301', price: 'S/ 889' },
    { id: 'jbl-go4', name: 'JBL Go 4', price: 'S/ 129' },
    { id: 'jbl-grip', name: 'JBL Clip 5 (Grip)', price: 'S/ 199' },
    { id: 'jbl-flip7', name: 'JBL Flip 7', price: 'S/ 349' },
    { id: 'jbl-charge6', name: 'JBL Charge 6', price: 'S/ 499' },
    { id: 'jbl-boombox4', name: 'JBL Boombox 4', price: 'S/ 1499' }
  ];

  const priceById = Object.fromEntries(finalProducts.map(product => [product.id, product.price]));
  const productByName = Object.fromEntries(finalProducts.map(product => [product.name, product]));

  function cleanPromoText(text = '') {
    return text
      .replace(/^Promo Día del Padre:\s*/i, '')
      .replace(/Promo Día del Padre/gi, 'JOR STORE')
      .replace(/Oferta Día del Padre/gi, 'Disponible en JOR STORE')
      .trim();
  }

  function getCurrentModalProduct() {
    const title = document.getElementById('modalTitle')?.textContent?.trim();
    return title ? productByName[title] : null;
  }

  function updateWhatsAppLink(product) {
    const wa = document.getElementById('modalWhatsApp');
    if (!wa || !product) return;
    const msg = encodeURIComponent(`Hola JOR STORE, quiero información sobre ${product.name} (${product.price})`);
    wa.href = `https://wa.me/51925789830?text=${msg}`;
  }

  function applyFinalCardPrices() {
    document.querySelectorAll('.product-card').forEach(card => {
      const price = priceById[card.dataset.id];
      if (!price) return;

      card.querySelector('.offer-ribbon')?.remove();
      card.querySelector('.urgency-line')?.remove();

      const priceLine = card.querySelector('.price-line');
      if (priceLine) {
        priceLine.classList.remove('promo-price-line');
        priceLine.innerHTML = `<strong>${price}</strong><span>Precio JOR STORE</span>`;
      }

      const button = card.querySelector('.details-btn');
      if (button) button.textContent = 'Ver detalles';
    });
  }

  function applyFinalModalPrice() {
    const product = getCurrentModalProduct();
    if (!product) return;

    const modalPrice = document.getElementById('modalPrice');
    if (modalPrice) {
      modalPrice.classList.remove('promo-price-line');
      modalPrice.innerHTML = `<strong>${product.price}</strong>`;
    }

    const desc = document.getElementById('modalDesc');
    if (desc) desc.textContent = cleanPromoText(desc.textContent);

    updateWhatsAppLink(product);
  }

  function applyFinalCampaignState() {
    applyFinalCardPrices();
    applyFinalModalPrice();
  }

  let observer;

  function startObserver() {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class', 'aria-hidden']
    });
  }

  observer = new MutationObserver(() => {
    observer.disconnect();
    applyFinalCampaignState();
    startObserver();
  });

  applyFinalCampaignState();
  startObserver();
});
