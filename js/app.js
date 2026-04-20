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
  item.dataset.name = data.name;

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

  const hasDetail = !!(data.src || data.desc || data.srcs);
  const toggleHtml = hasDetail ? `<span class="item-toggle" aria-hidden="true">+</span>` : '';

  if (hasDetail) {
    const detailId = 'd-' + Math.random().toString(36).slice(2, 9);
    item.innerHTML = `
      <button class="item-row" type="button" aria-expanded="false" aria-controls="${detailId}">
        <span class="item-name">${nameSub}</span>
        ${priceHtml}
        ${toggleHtml}
      </button>`;
    item.dataset.detailId = detailId;
  } else {
    item.innerHTML = `
      <div class="item-row no-detail">
        <span class="item-name">${nameSub}</span>
        ${priceHtml}
      </div>`;
  }

  return item;
}

// ── Efecto máquina de escribir (con skip) ──
function typewrite(p) {
  const text = p.dataset.text || '';
  p.textContent = '';
  p.classList.add('typing');
  // Ritmo más rápido en móviles
  const delay = window.matchMedia('(max-width: 640px)').matches ? 7 : 14;
  let i = 0;
  let timer = null;
  const tick = () => {
    if (i < text.length) {
      p.textContent += text[i++];
      timer = setTimeout(tick, delay);
    } else {
      finish();
    }
  };
  const finish = () => {
    if (timer) { clearTimeout(timer); timer = null; }
    p.textContent = text;
    p.classList.remove('typing');
    p.dataset.done = '1';
  };
  p._skipTypewriter = finish;
  tick();
}

// ── Construye el panel de detalle (llamado solo al primer clic) ──
function buildDetailPanel(item) {
  const desc = item.dataset.desc || DESC_DEFAULT;
  const name = item.dataset.name || '';

  let mediaEl;
  let dotsEl = '';
  if (item.dataset.srcs) {
    const srcs = JSON.parse(item.dataset.srcs);
    const slides = srcs.map((s, i) =>
      `<img src="${s}" alt="${name} ${i + 1}" width="1080" height="1080" loading="lazy" decoding="async" class="carousel-slide${i === 0 ? ' active' : ''}">`
    ).join('');
    mediaEl = `<div class="detail-carousel">${slides}</div>`;
    if (srcs.length > 1) {
      const dots = srcs.map((_, i) =>
        `<button type="button" class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Imagen ${i + 1}" data-idx="${i}"></button>`
      ).join('');
      dotsEl = `<div class="carousel-dots" role="tablist">${dots}</div>`;
    }
  } else {
    const src  = item.dataset.src  || PLACEHOLDER;
    const type = item.dataset.type || 'image';
    mediaEl = type === 'video'
      ? `<video src="${src}" muted loop playsinline preload="metadata" width="1080" height="1080" aria-label="${name}"></video>`
      : `<img src="${src}" alt="${name}" width="1080" height="1080" loading="lazy" decoding="async">`;
  }

  const panel = document.createElement('div');
  panel.className = 'item-detail';
  panel.id = item.dataset.detailId || '';
  panel.innerHTML = `
    <div class="detail-inner">
      <div class="detail-media">${mediaEl}${dotsEl}</div>
      <div class="detail-desc"><p data-text="${desc}"></p></div>
    </div>`;

  // Fade-in en imágenes al cargar
  panel.querySelectorAll('img').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  });

  return panel;
}

// ── Muestra el slide N (imágenes + dots) ──
function showSlide(item, idx) {
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots   = item.querySelectorAll('.carousel-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  carousel.dataset.current = String(idx);
}

// ── Inicia rotación del carrusel respetando abrir/cerrar ──
function startCarousel(item) {
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel || carousel.dataset.intervalId) return;
  const slides = carousel.querySelectorAll('.carousel-slide');
  if (slides.length < 2) return;
  const id = setInterval(() => {
    if (!item.classList.contains('open')) return;
    const current = Number(carousel.dataset.current || 0);
    const next = (current + 1) % slides.length;
    showSlide(item, next);
  }, 2800);
  carousel.dataset.intervalId = String(id);
}

function stopCarousel(item) {
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel || !carousel.dataset.intervalId) return;
  clearInterval(Number(carousel.dataset.intervalId));
  delete carousel.dataset.intervalId;
}

// ── Wire up dots + swipe del carrusel (una sola vez por item) ──
function wireCarouselControls(item) {
  if (item.dataset.carouselWired) return;
  const carousel = item.querySelector('.detail-carousel');
  if (!carousel) return;
  item.dataset.carouselWired = '1';

  item.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(dot.dataset.idx);
      showSlide(item, idx);
      stopCarousel(item);
      startCarousel(item);
    });
  });

  // Swipe
  let startX = null;
  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) < 40) return;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const current = Number(carousel.dataset.current || 0);
    const next = dx < 0
      ? (current + 1) % slides.length
      : (current - 1 + slides.length) % slides.length;
    showSlide(item, next);
    stopCarousel(item);
    startCarousel(item);
  });
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

      // Segundo tap mientras está escribiendo → salta al texto completo
      if (isOpen) {
        const p = item.querySelector('.detail-desc p');
        if (p && p.classList.contains('typing') && p._skipTypewriter) {
          p._skipTypewriter();
          return;
        }
      }

      // Cierra todos (y detiene sus carruseles / videos)
      document.querySelectorAll('.item.open').forEach(i => {
        i.classList.remove('open');
        stopCarousel(i);
        const btn = i.querySelector('.item-row');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        const v = i.querySelector('.detail-media video');
        if (v) { try { v.pause(); } catch (_) {} }
      });

      if (!isOpen) {
        // Construye el panel solo la primera vez (lazy)
        if (!item.querySelector('.item-detail')) {
          item.appendChild(buildDetailPanel(item));
        }
        item.classList.add('open');
        row.setAttribute('aria-expanded', 'true');
        wireCarouselControls(item);
        startCarousel(item);

        const v = item.querySelector('.detail-media video');
        if (v) { try { v.play(); } catch (_) {} }

        const p = item.querySelector('.detail-desc p');
        if (p && !p.dataset.done) typewrite(p);
        else if (p) p.textContent = p.dataset.text || '';
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

// ── Botón "volver arriba" ──
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  const toggle = () => {
    const show = window.scrollY > window.innerHeight * 0.8;
    btn.classList.toggle('visible', show);
    if (show) btn.hidden = false;
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

// ── Punto de entrada ──
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initReveal();
  initExpandables();
  initActiveNav();
  initBackToTop();
});
