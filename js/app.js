// ════════════════════════════════════════════════════
//  app.js — LÓGICA DE LA APLICACIÓN
//
//  - Construye el menú dinámicamente desde menu.js
//  - Maneja los expandibles de producto (lazy)
//  - Scroll reveal con IntersectionObserver
// ════════════════════════════════════════════════════

const PLACEHOLDER  = 'media/producto_generico.png';
const DESC_DEFAULT = 'Elaborado con ingredientes seleccionados. Una experiencia diseñada para el momento justo.';

// ── Construye un elemento .item a partir de los datos ──
function buildItem(data) {
  const item = document.createElement('div');
  item.className = 'item';

  // Guarda los datos en data-attributes para usarlos al expandir
  if (data.src)  item.dataset.src  = data.src;
  if (data.type) item.dataset.type = data.type;
  if (data.desc) item.dataset.desc = data.desc;

  const nameSub = data.sub
    ? `${data.name} <span class="item-sub">${data.sub}</span>`
    : data.name;

  const priceHtml = data.price
    ? `<span class="item-dots"></span><span class="item-price">${data.price}</span>`
    : '';

  item.innerHTML = `
    <div class="item-row">
      <span class="item-name">${nameSub}</span>
      ${priceHtml}
      <span class="item-toggle">+</span>
    </div>`;

  return item;
}

// ── Construye el panel de detalle (llamado solo al primer clic) ──
function buildDetailPanel(item) {
  const src  = item.dataset.src  || PLACEHOLDER;
  const type = item.dataset.type || 'image';
  const desc = item.dataset.desc || DESC_DEFAULT;

  const mediaEl = type === 'video'
    ? `<video src="${src}" autoplay muted loop playsinline></video>`
    : `<img src="${src}" alt="">`;

  const panel = document.createElement('div');
  panel.className = 'item-detail';
  panel.innerHTML = `
    <div class="detail-inner">
      <div class="detail-media">${mediaEl}</div>
      <div class="detail-desc"><p>${desc}</p></div>
    </div>`;

  return panel;
}

// ── Construye una sección completa del menú ──
function buildSection(section) {
  const el = document.createElement('section');
  el.id = section.id;

  // Título (puede tener salto de línea)
  const titleHtml = section.title.replace('\n', '<br>');

  let header = `
    <div class="section-label reveal">
      <h2>${titleHtml}</h2>
      <div class="line"></div>
    </div>`;

  if (section.sub) {
    header += `<div class="section-sub reveal">${section.sub}</div>`;
  }

  // Layout: grid (2 col) o list (1 col)
  if (section.layout === 'grid') {
    const half = Math.ceil(section.items.length / 2);
    const col1 = section.items.slice(0, half);
    const col2 = section.items.slice(half);

    const listA = col1.map(buildItem).map(i => i.outerHTML).join('');
    const listB = col2.map(buildItem).map(i => i.outerHTML).join('');

    header += `
      <div class="item-grid reveal">
        <div class="item-list">${listA}</div>
        <div class="item-list">${listB}</div>
      </div>`;
  } else {
    const listHTML = section.items.map(buildItem).map(i => i.outerHTML).join('');
    header += `<div class="item-list reveal">${listHTML}</div>`;
  }

  if (section.nota) {
    header += `<div class="nota reveal">${section.nota}</div>`;
  }

  el.innerHTML = header;
  return el;
}

// ── Inicializa el menú completo ──
function initMenu() {
  const nav       = document.getElementById('main-nav');
  const container = document.getElementById('menu-container');

  MENU.forEach(section => {
    // Nav link
    const link = document.createElement('a');
    link.href        = `#${section.id}`;
    link.textContent = section.title.replace('\n', ' ').split('&')[0].trim()
                       || section.title;
    // Texto corto para el nav
    const navLabels = {
      calientes:   'Calientes',
      frias:       'Frías',
      batidos:     'Batidos',
      panaderia:   'Panadería',
      hotcakes:    'Hotcakes',
      wraps:       'Wraps',
      suplementos: 'Suplementos',
    };
    link.textContent = navLabels[section.id] || section.id;
    nav.appendChild(link);

    // Sección
    container.appendChild(buildSection(section));
  });
}

// ── Scroll reveal ──
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, _, arr) => {
    const section = el.closest('section');
    if (section) {
      section.querySelectorAll('.reveal').forEach((sib, j) => {
        sib.style.transitionDelay = (j * 80) + 'ms';
      });
    }
    observer.observe(el);
  });
}

// ── Expandibles — solo uno abierto a la vez ──
function initExpandables() {
  document.querySelectorAll('.item-row').forEach(row => {
    row.addEventListener('click', () => {
      const item   = row.closest('.item');
      const isOpen = item.classList.contains('open');

      // Cierra todos
      document.querySelectorAll('.item.open').forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        // Construye el panel solo la primera vez (lazy)
        if (!item.querySelector('.item-detail')) {
          item.appendChild(buildDetailPanel(item));
        }
        item.classList.add('open');
      }
    });
  });
}

// ── Punto de entrada ──
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initExpandables();
});
