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
- Stage 301 con precio actualizado: **S/ 899**.
- Ajustes mobile para evitar barra blanca u overflow horizontal.

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

- LG XBOOM Grab — S/ 299
- LG XBOOM Bounce — S/ 399
- LG XBOOM XG8T — S/ 725
- LG XBOOM Stage 301 — S/ 899
- JBL Go 4
- JBL Grip
- JBL Flip 7
- JBL Charge 6
- JBL Boombox 4

## CTA principal

**Ver catalogo de parlantes**  
Enlace interno: `#catalogo`

## Proximos pasos

Ver `docs/cambios-pendientes.md`.
