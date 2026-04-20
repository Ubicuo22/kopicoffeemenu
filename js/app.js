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
  if (data.srcs) item.dataset.srcs = JSON.stringify(data.srcs);

  const nameSub = data.sub
    ? `${data.name} <span class="item-sub">${data.sub}</span>`
    : data.name;

  const priceHtml = data.price
    ? `<span class="item-dots"></span><span class="item-price">${data.price}</span>`
    : '';

  // Solo mostrar toggle si el producto tiene media o descripción propia
  const hasDetail = data.src || data.desc || data.srcs;
  const toggleHtml = hasDetail ? `<span class="item-toggle">+</span>` : '';

  item.innerHTML = `
    <div class="item-row${hasDetail ? '' : ' no-detail'}">
      <span class="item-name">${nameSub}</span>
      ${priceHtml}
      ${toggleHtml}
    </div>`;

  return item;
}

// ── Efecto máquina de escribir ──
function typewrite(p) {
  const text = p.dataset.text || '';
  p.textContent = '';
  p.classList.add('typing');
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      p.textContent += text[i++];
      setTimeout(tick, 14);
    } else {
      p.classList.remove('typing');
    }
  };
  tick();
}

// ── Construye el panel de detalle (llamado solo al primer clic) ──
function buildDetailPanel(item) {
  const desc = item.dataset.desc || DESC_DEFAULT;

  let mediaEl;
  if (item.dataset.srcs) {
    const srcs = JSON.parse(item.dataset.srcs);
    const slides = srcs.map((s, i) =>
      `<img src="${s}" alt="" width="1080" height="1080" loading="lazy" decoding="async" class="carousel-slide${i === 0 ? ' active' : ''}">`
    ).join('');
    mediaEl = `<div class="detail-carousel">${slides}</div>`;
  } else {
    const src  = item.dataset.src  || PLACEHOLDER;
    const type = item.dataset.type || 'image';
    mediaEl = type === 'video'
      ? `<video src="${src}" muted loop playsinline preload="metadata" width="1080" height="1080"></video>`
      : `<img src="${src}" alt="" width="1080" height="1080" loading="lazy" decoding="async">`;
  }

  const panel = document.createElement('div');
  panel.className = 'item-detail';
  panel.innerHTML = `
    <div class="detail-inner">
      <div class="detail-media">${mediaEl}</div>
      <div class="detail-desc"><p data-text="${desc}"></p></div>
    </div>`;

  return panel;
}

// ── Inicia rotación del carrusel respetando abrir/cerrar ──
function startCarousel(item) {
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel || carousel.dataset.intervalId) return;
  const slides = carousel.querySelectorAll('.carousel-slide');
  if (slides.length < 2) return;
  let current = 0;
  const id = setInterval(() => {
    if (!item.classList.contains('open')) return;
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2800);
  carousel.dataset.intervalId = String(id);
}

function stopCarousel(item) {
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel || !carousel.dataset.intervalId) return;
  clearInterval(Number(carousel.dataset.intervalId));
  delete carousel.dataset.intervalId;
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
  }, { threshold: 0.05 });

  // rAF garantiza que el layout esté calculado antes de observar
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach((el) => {
      const section = el.closest('section');
      if (section) {
        section.querySelectorAll('.reveal').forEach((sib, j) => {
          sib.style.transitionDelay = (j * 80) + 'ms';
        });
      }
      observer.observe(el);
    });
  });
}

// ── Expandibles — solo uno abierto a la vez ──
function initExpandables() {
  document.querySelectorAll('.item-row:not(.no-detail)').forEach(row => {
    row.addEventListener('click', () => {
      const item   = row.closest('.item');
      const isOpen = item.classList.contains('open');

      // Cierra todos (y detiene sus carruseles / videos)
      document.querySelectorAll('.item.open').forEach(i => {
        i.classList.remove('open');
        stopCarousel(i);
        const v = i.querySelector('.detail-media video');
        if (v) { try { v.pause(); } catch (_) {} }
      });

      if (!isOpen) {
        // Construye el panel solo la primera vez (lazy)
        if (!item.querySelector('.item-detail')) {
          item.appendChild(buildDetailPanel(item));
        }
        item.classList.add('open');
        startCarousel(item);

        // Reproducir video si existe
        const v = item.querySelector('.detail-media video');
        if (v) { try { v.play(); } catch (_) {} }

        // Animar descripción como máquina de escribir
        const p = item.querySelector('.detail-desc p');
        if (p) typewrite(p);
      }
    });
  });
}

// ── Nav activo — resalta el link de la sección visible ──
function initActiveNav() {
  const navLinks = document.querySelectorAll('#main-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`#main-nav a[href="#${entry.target.id}"]`);
        if (active) {
          active.classList.add('active');
          active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  }, {
    // Sección activa = la que ocupa la franja central de la pantalla
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  });

  document.querySelectorAll('#menu-container section').forEach(s => observer.observe(s));
}

// ── Punto de entrada ──
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initExpandables();
  initActiveNav();
});
