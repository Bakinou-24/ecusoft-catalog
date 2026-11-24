(function () {
  'use strict';

  var productsNode = document.getElementById('catalog-data');
  var configNode = document.getElementById('site-config');

  var products = [];
  var config = {};

  try { products = JSON.parse(productsNode && productsNode.textContent || '[]'); } catch (e) { products = []; }
  try { config = JSON.parse(configNode && configNode.textContent || '{}'); } catch (e) { config = {}; }

  var whatsapp = config.whatsapp || 'https://wa.me/message/WT6UZTLFOUE5E1';
  var categories = Array.isArray(config.categories) ? config.categories : [{ key: 'all', label: 'الكل', icon: 'grid' }];

  var grid = document.getElementById('productGrid');
  var chips = document.getElementById('categoryChips');
  var search = document.getElementById('searchInput');
  var resultCount = document.getElementById('resultCount');
  var emptyState = document.getElementById('emptyState');
  var filterToggle = document.getElementById('filterToggle');
  var nav = document.getElementById('nav');
  var menuToggle = document.getElementById('menuToggle');
  var modal = document.getElementById('productModal');
  var modalImage = document.getElementById('modalImage');
  var modalTitle = document.getElementById('modalTitle');
  var modalBadge = document.getElementById('modalBadge');
  var modalDesc = document.getElementById('modalDesc');
  var modalMeta = document.getElementById('modalMeta');
  var modalThumbs = document.getElementById('modalThumbs');
  var modalOrder = document.getElementById('modalOrder');

  var activeCategory = 'all';
  var query = '';
  var currentProduct = null;
  var currentImage = 0;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function norm(value) {
    return String(value == null ? '' : value)
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي');
  }

  function excerpt(text, max) {
    var clean = String(text || '').replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
  }

  function categoryLabel(key) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].key === key) return categories[i].label;
    }
    return 'برمجيات';
  }

  function categoryIcon(key) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].key === key) return categories[i].icon || 'grid';
    }
    return 'grid';
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  function imageMarkup(image, alt, className) {
    if (!image || !image.src) {
      return '<div class="no-image">' + icon('image') + '</div>';
    }
    return '<img class="' + (className || '') + '" src="' + esc(image.src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }

  function renderChips() {
    if (!chips) return;
    var counts = {};
    products.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
    chips.innerHTML = categories.map(function (cat) {
      var count = cat.key === 'all' ? products.length : (counts[cat.key] || 0);
      if (!count && cat.key !== 'all') return '';
      return '<button type="button" class="chip' + (activeCategory === cat.key ? ' active' : '') + '" data-category="' + esc(cat.key) + '">' +
        icon(cat.icon || 'grid') + '<span>' + esc(cat.label) + '</span><b>' + count + '</b></button>';
    }).join('');
  }

  function getFiltered() {
    var q = norm(query);
    return products.filter(function (p) {
      var categoryOk = activeCategory === 'all' || p.category === activeCategory;
      if (!categoryOk) return false;
      if (!q) return true;
      return norm(p.title + ' ' + p.description + ' ' + (p.tags || []).join(' ') + ' ' + categoryLabel(p.category)).indexOf(q) !== -1;
    });
  }

  function cardMarkup(product, index) {
    var cover = product.images && product.images[0];
    var tags = (product.tags || []).slice(0, 3).map(function (tag) {
      return '<span class="tag">' + esc(tag) + '</span>';
    }).join('');

    return '<article class="product-card reveal" data-id="' + esc(product.id) + '">' +
      '<div class="card-media">' +
        imageMarkup(cover, product.title) +
        '<span class="card-badge">' + esc(categoryLabel(product.category)) + '</span>' +
        '<span class="card-count">' + icon('image') + ' ' + (product.images ? product.images.length : 0) + '</span>' +
        '<button type="button" class="expand" data-open="' + esc(product.id) + '" aria-label="عرض تفاصيل ' + esc(product.title) + '">' + icon('expand') + '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta"><span>#' + String(index + 1).padStart(2, '0') + '</span><span>ECUsoft</span></div>' +
        '<h3 title="' + esc(product.title) + '">' + esc(product.title) + '</h3>' +
        '<p>' + esc(excerpt(product.description, 115)) + '</p>' +
        '<div class="card-tags">' + tags + '</div>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-open="' + esc(product.id) + '">' + icon('eye') + ' التفاصيل</button>' +
          '<a class="btn btn-wa" href="' + esc(whatsapp) + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' اطلب الآن</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var list = getFiltered();
    if (!grid) return;
    grid.innerHTML = list.map(cardMarkup).join('');
    if (resultCount) resultCount.textContent = list.length + ' ' + (list.length === 1 ? 'منتج' : 'منتج');
    if (emptyState) emptyState.hidden = list.length !== 0;
    observeReveals();
  }

  function observeReveals() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    Array.prototype.forEach.call(items, function (el) { observer.observe(el); });
  }

  function setImage(index) {
    if (!currentProduct || !currentProduct.images || !currentProduct.images.length) return;
    var images = currentProduct.images;
    currentImage = (index + images.length) % images.length;
    if (modalImage) modalImage.src = images[currentImage].src;
    if (modalThumbs) {
      Array.prototype.forEach.call(modalThumbs.children, function (el, i) {
        el.classList.toggle('active', i === currentImage);
      });
    }
  }

  function openModal(id) {
    var product = null;
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === id) { product = products[i]; break; }
    }
    if (!product || !modal) return;

    currentProduct = product;
    currentImage = 0;
    var images = product.images || [];

    if (modalTitle) modalTitle.textContent = product.title;
    if (modalBadge) modalBadge.innerHTML = icon(categoryIcon(product.category)) + ' ' + esc(categoryLabel(product.category));
    if (modalDesc) modalDesc.textContent = product.description || '';
    if (modalOrder) modalOrder.href = whatsapp;
    if (modalMeta) {
      modalMeta.innerHTML =
        '<div><small>عدد الصور</small><strong>' + images.length + ' لقطة شاشة</strong></div>' +
        '<div><small>التصنيف</small><strong>' + esc(categoryLabel(product.category)) + '</strong></div>' +
        '<div><small>المرجع</small><strong>' + esc(product.folder || 'ECUsoft') + '</strong></div>' +
        '<div><small>الطلب</small><strong>عبر واتساب</strong></div>';
    }
    if (modalThumbs) {
      modalThumbs.innerHTML = images.map(function (image, i) {
        return '<button type="button" class="thumb' + (i === 0 ? ' active' : '') + '" data-thumb="' + i + '" aria-label="صورة ' + (i + 1) + '">' +
          '<img src="' + esc(image.src) + '" alt="صورة ' + (i + 1) + '"></button>';
      }).join('');
    }
    if (modalImage) modalImage.src = images.length ? images[0].src : '';

    var prev = modal.querySelector('[data-gallery="prev"]');
    var next = modal.querySelector('[data-gallery="next"]');
    var single = images.length < 2;
    if (prev) prev.hidden = single;
    if (next) next.hidden = single;

    modal.hidden = false;
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    currentProduct = null;
    document.body.classList.remove('modal-open');
  }

  if (chips) {
    chips.addEventListener('click', function (event) {
      var button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.getAttribute('data-category');
      renderChips();
      render();
    });
  }

  if (search) {
    search.addEventListener('input', function () {
      query = search.value || '';
      render();
    });
  }

  if (grid) {
    grid.addEventListener('click', function (event) {
      var button = event.target.closest('[data-open]');
      if (button) openModal(button.getAttribute('data-open'));
    });
  }

  if (modal) {
    modal.addEventListener('click', function (event) {
      if (event.target.closest('[data-close]')) { closeModal(); return; }
      var thumb = event.target.closest('[data-thumb]');
      if (thumb) { setImage(Number(thumb.getAttribute('data-thumb'))); return; }
      var nav = event.target.closest('[data-gallery]');
      if (nav) { setImage(currentImage + (nav.getAttribute('data-gallery') === 'next' ? 1 : -1)); }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
    if (modal && modal.hidden) return;
    if (event.key === 'ArrowLeft') setImage(currentImage + 1);
    if (event.key === 'ArrowRight') setImage(currentImage - 1);
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') nav.classList.remove('open');
    });
  }

  if (filterToggle && chips) {
    filterToggle.addEventListener('click', function () { chips.classList.toggle('open'); });
  }

  renderChips();
  render();
})();
