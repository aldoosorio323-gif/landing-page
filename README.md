# JOR STORE Landing Page

Landing page de venta para **JOR STORE**, enfocada en parlantes originales **LG XBOOM** y **JBL** en Lima, Peru.

## Objetivo

Convertir visitantes en clientes por WhatsApp y llevarlos rapidamente al catalogo de parlantes disponibles.

La pagina debe comunicar en pocos segundos:

- Que JOR STORE vende parlantes originales LG XBOOM y JBL.
- Que el cliente puede elegir segun su uso: casa, reuniones, playa, viajes o eventos.
- Que la compra es segura, con asesoria honesta y entrega coordinada.
- Que la accion principal es ver catalogo o escribir por WhatsApp.

## Estado actual del proyecto

Version base recomendada: **v36 - banner principal con mas brillo**.

Cambios principales acumulados:

- Banner principal con imagen **El sonido que te falta**.
- Boton principal: **Ver catalogo de parlantes**.
- Catalogo con tarjetas limpias: imagen, nombre del modelo, precio, stock y boton **Ver detalles**.
- Seccion **Escenarios de uso** como banner/carrusel horizontal en orden estricto.
- Seccion **Sobre JOR STORE** premium debajo del catalogo interactivo.
- **JOR STORE** del encabezado en color negro.
- Precios de oferta y regulares centralizados en `script.js`, con descuento calculado, stock por producto/variante y orden ascendente.
- Ajustes mobile para evitar barra blanca u overflow horizontal.

## Campaña de septiembre 2026

- Carrusel principal de cinco promociones, en este orden: portada, JBL GO 4, JBL Grip, LG XBOOM Grab y LG XBOOM Buds Lite.
- Cada promoción usa una imagen WebP horizontal y una WebP móvil mediante `<picture>` con corte responsive a 640 px.
- La altura del carrusel sigue la proporción real de la imagen activa para evitar recortes, deformación y barras vacías.
- Ofertas destacadas: JBL GO 4, LG XBOOM Buds Lite, JBL Grip y LG XBOOM Grab.
- Los precios, descuentos, estados de stock, modales y mensajes de WhatsApp se generan desde los datos de `script.js`.

## Estructura sugerida

```text
jor-store-landing/
├─ index.html
├─ styles.css
├─ script.js
├─ assets/
│  └─ images/
├─ docs/
│  ├─ textos-landing.md
│  ├─ cambios-pendientes.md
│  └─ estructura-proyecto.md
└─ README.md
```

## Secciones de la landing

1. Header / navegacion
2. Hero principal
3. Escenarios de uso
4. Catalogo interactivo
5. Sobre JOR STORE
6. Contacto
7. Footer

## Estilo visual

- Fondo claro general: `#f4f5f7`
- Negro premium: `#050505`, `#111111`
- Naranja principal: `#ff4f1f`
- Azul tecnologico: `#0877ff`
- Verde WhatsApp / stock: `#20d366`
- Tarjetas blancas con bordes suaves y sombras ligeras.
- Botones negros, grandes y faciles de tocar.
- Diseno mobile-first, sin overflow horizontal.

## Productos incluidos

- JBL GO 4 — oferta S/109 — regular S/220
- LG XBOOM Buds Lite — oferta S/120 — regular S/299
- LG XBOOM Mini — oferta S/169 — regular S/319
- LG XBOOM Rock — oferta S/189 — regular S/399
- JBL Grip — desde S/180 — regular S/399
- LG XBOOM Grab — oferta S/249 — regular S/649
- JBL Flip 7 — oferta S/329 — regular S/599
- LG XBOOM Bounce — oferta S/379 — regular S/899
- JBL Charge 6 — oferta S/480 — regular S/799
- LG XBOOM XG8T — oferta S/830 — regular S/1,299 — agotado
- LG XBOOM Stage 301 — oferta S/899 — regular S/1,299 — agotado
- JBL Xtreme 5 — oferta S/1,050 — regular S/1,499
- JBL Boombox 4 — oferta S/1,440 — regular S/2,500
- JBL PartyBox 720 — oferta S/2,999 — regular S/5,499

Estados y variantes relevantes:

- JBL Grip: negro S/180; azul y camuflado S/199. El precio negro es especial para las primeras 7 unidades y se actualizará manualmente cuando corresponda.
- LG XBOOM Stage 301: agotado; se mantiene consultable en el catálogo, sin promoción ni regalo.
- JBL Flip 7: camuflado y morado agotados; los demás colores siguen disponibles.
- JBL Boombox 4: blanco disponible; azul y camuflado agotados. Todas las variantes cuestan S/1,440.
- LG XBOOM XG8T: agotado.

## CTA principal

**Ver catalogo de parlantes**  
Enlace interno: `#catalogo`

## Proximos pasos

Ver `docs/cambios-pendientes.md`.
