document.addEventListener('DOMContentLoaded', () => {
  // Retira el hero anterior del perro para que el carrusel sea la primera sección.
  document.querySelector('.hero-sales-banner')?.remove();

  const modalFixStyles = document.createElement('link');
  modalFixStyles.rel = 'stylesheet';
  modalFixStyles.href = 'modal-mobile-fix.css?v=20260704-scroll-2';
  document.head.appendChild(modal