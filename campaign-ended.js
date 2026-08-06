document.addEventListener('DOMContentLoaded', () => {
  // Retira el hero anterior del perro para que el carrusel sea la primera sección.
  document.querySelector('.hero-sales-banner')?.remove();

  const modalFixStyles = document.createElement('link');
  modalFixStyles.rel = 'stylesheet';
<<<<<<< HEAD
  modalFixStyles.href = 'modal-mobile-fix.css?v=20260704-scroll-2';
<<<<<<< HEAD
  document.head.appendChild(modal
=======
=======
  modalFixStyles.href = 'modal-mobile-fix.css?v=20260716-shared-product-modal-3';
>>>>>>> 63eb22d (Subir landing page inicial)
  document.head.appendChild(modalFixStyles);

  const productModal = document.getElementById('productModal');

  function cleanPromoText(text = '') {
    return text
      .replace(/^Promo Día del Padre:\s*/i, '')
      .replace(/Promo Día del Padre/gi, 'JOR STORE')
      .replace(/Oferta Día del Padre/gi, 'Disponible en JOR STORE')
      .trim();
  }

  function syncProductModal() {
    const desc = document.getElementById('modalDesc');
    if (desc) desc.textContent = cleanPromoText(desc.textContent);
  }

  if (productModal) {
    new MutationObserver(syncProductModal).observe(productModal, {
      attributes: true,
      attributeFilter: ['class', 'aria-hidden']
    });
  }
});
>>>>>>> 09ea477 (feat: agregar nuevos modelos y actualizar landing page)
