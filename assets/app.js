(function () {
  'use strict';

  var productsNode = document.getElementById('catalog-data');
  var configNode = document.getElementById('site-config');

  var products = [];
  var config = {};

  try { products = JSON.parse(productsNode && productsNode.textContent || '[]'); } catch (e) { products = []; }
  try { config = JSON.parse(configNode && configNode.textContent || '{}'); } catch (e) { config = {}; }

  var I18N = {
    ar: {
      navHome: 'الرئيسية', navCatalog: 'الكتالوج', navFeatures: 'لماذا ECUsoft', navContact: 'تواصل معنا', navWhatsapp: 'واتساب',
      orderNow: 'اطلب الآن', menu: 'القائمة', switchLanguage: 'تغيير اللغة', navAria: 'التنقل الرئيسي', searchAria: 'البحث في الكتالوج',
      themeToLight: 'التبديل إلى الوضع الفاتح', themeToDark: 'التبديل إلى الوضع الداكن',
      pageTitle: 'ECUsoft | كتالوج برمجيات السيارات والشاحنات',
      pageDescription: 'كتالوج ECUsoft لبرمجيات تشخيص السيارات، ضبط ECU، المفاتيح والأنظمة، ومراجع الصيانة. تصفح البرامج وشاهد الصور ثم اطلب عبر واتساب.',
      heroBadge: 'كتالوج 2026 · جاهز للطلب',
      heroTitle1: 'برمجيات سيارات', heroTitle2: 'احترافية', heroTitle3: 'في مكان واحد',
      heroText: 'تشخيص، ضبط ECU، برمجة المفاتيح، ومراجع صيانة لأحدث السيارات والشاحنات. تصفح الكتالوج واختر ما تحتاجه، ثم أرسل طلبك مباشرة عبر واتساب.',
      heroOrder: 'اطلب عبر واتساب', heroBrowse: 'تصفح الكتالوج',
      trust1: 'صور حقيقية للمنتجات', trust2: 'دعم تركيب عن بُعد', trust3: 'طلب سريع وخاص',
      dash1: 'وحدات التشخيص', dash2: 'قاعدة بيانات ECU', dash3: 'حزمة المفاتيح',
      floatPrograms: 'برنامج متاح', floatShots: 'لقطة شاشة',
      stat1: 'برنامج ونسخة برمجية', stat2: 'صورة توضيحية حقيقية', stat3: 'تصنيف متخصص',
      catalogKicker: 'Catalog / 01', catalogTitle: 'استكشف الكتالوج',
      catalogText: 'ابحث بالاسم أو اختر التصنيف، ثم اضغط «التفاصيل» لمشاهدة كل الصور.', loading: 'جارٍ التحميل…',
      searchPlaceholder: 'ابحث عن Diagbox، HPT، Alldata، ODIS…', filter: 'التصنيفات',
      emptyTitle: 'لا توجد نتائج مطابقة', emptyText: 'جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.',
      featuresKicker: 'Why ECUsoft / 02', featuresTitle: 'موثوقية قبل الوعود',
      featuresText: 'كل منتج في الكتالوج موثّق بصور حقيقية ووصف واضح قبل الطلب.',
      feature1Title: 'صور حقيقية', feature1Text: 'معرض كامل لكل برنامج يوضح الواجهة والإصدارات والمحتوى قبل الشراء.',
      feature2Title: 'طلب خلال دقائق', feature2Text: 'اضغط زر واتساب وأرسل اسم البرنامج، وسنرد لك بتفاصيل التوفر والسعر.',
      feature3Title: 'دعم التركيب', feature3Text: 'مساعدة عن بُعد عبر TeamViewer أو AnyDesk للبرامج التي تحتاج إعداداً.',
      ctaKicker: 'Order / 03', ctaTitle: 'تحتاج برنامجاً غير موجود؟',
      ctaText: 'أرسل لنا اسم البرنامج أو صورة الواجهة التي تبحث عنها وسنساعدك في إيجاده وتأكيد التوفر قبل الدفع.',
      ctaButton: 'تواصل معنا الآن', footerCopy: '© ECUsoft — كتالوج برمجيات السيارات', footerPermalink: 'الرابط الدائم',
      details: 'التفاصيل', productOne: 'منتج', productMany: 'منتج',
      screenshot: 'لقطة شاشة', screenshots: 'لقطات شاشة',
      metaImages: 'عدد الصور', metaCategory: 'التصنيف', metaFolder: 'المرجع', metaOrder: 'الطلب', metaViaWhatsapp: 'عبر واتساب',
      modalOrderButton: 'اطلب هذا البرنامج عبر واتساب', modalImageAlt: 'صورة المنتج',
      close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية', orderBarLabel: 'اطلب عبر واتساب',
      tagMap: { 'أونلاين': 'Online', 'Windows': 'Windows', 'محدّث': 'Updated', 'دعم عن بُعد': 'Remote support', 'شاحنات': 'Trucks', 'كتالوج': 'Catalog', 'واتساب': 'WhatsApp' }
    },
    en: {
      navHome: 'Home', navCatalog: 'Catalog', navFeatures: 'Why ECUsoft', navContact: 'Contact', navWhatsapp: 'WhatsApp',
      orderNow: 'Order now', menu: 'Menu', switchLanguage: 'Change language', navAria: 'Main navigation', searchAria: 'Search catalog',
      themeToLight: 'Switch to light theme', themeToDark: 'Switch to dark theme',
      pageTitle: 'ECUsoft | Automotive Software Catalog',
      pageDescription: 'ECUsoft catalog for automotive diagnostics, ECU tuning, key systems and repair references. Browse programs, view screenshots and order on WhatsApp.',
      heroBadge: '2026 catalog · Ready to order',
      heroTitle1: 'Professional', heroTitle2: 'automotive', heroTitle3: 'software in one place',
      heroText: 'Diagnostics, ECU tuning, key programming and repair references for the latest cars and trucks. Browse the catalog, pick what you need and send your request directly on WhatsApp.',
      heroOrder: 'Order on WhatsApp', heroBrowse: 'Browse catalog',
      trust1: 'Real product screenshots', trust2: 'Remote installation support', trust3: 'Fast private ordering',
      dash1: 'Diagnostic modules', dash2: 'ECU database', dash3: 'Immobiliser suite',
      floatPrograms: 'programs available', floatShots: 'screenshots',
      stat1: 'programs & software builds', stat2: 'real preview images', stat3: 'specialised categories',
      catalogKicker: 'Catalog / 01', catalogTitle: 'Explore the catalog',
      catalogText: 'Search by name or pick a category, then open Details to view every screenshot.', loading: 'Loading…',
      searchPlaceholder: 'Search Diagbox, HPT, Alldata, ODIS…', filter: 'Categories',
      emptyTitle: 'No matching results', emptyText: 'Try another keyword or choose a different category.',
      featuresKicker: 'Why ECUsoft / 02', featuresTitle: 'Reliability before promises',
      featuresText: 'Every product in the catalog is documented with real screenshots and a clear description before you order.',
      feature1Title: 'Real screenshots', feature1Text: 'A full gallery for every program showing the interface, versions and content before purchase.',
      feature2Title: 'Request in minutes', feature2Text: 'Tap the WhatsApp button, send the program name and we will reply with availability and price.',
      feature3Title: 'Installation support', feature3Text: 'Remote help via TeamViewer or AnyDesk for software that needs setup.',
      ctaKicker: 'Order / 03', ctaTitle: 'Need a program that is not listed?',
      ctaText: 'Send us the program name or a screenshot of the interface you are looking for and we will help you find it and confirm availability before payment.',
      ctaButton: 'Contact us now', footerCopy: '© ECUsoft — Automotive Software Catalog', footerPermalink: 'Permalink',
      details: 'Details', productOne: 'product', productMany: 'products',
      screenshot: 'screenshot', screenshots: 'screenshots',
      metaImages: 'Screenshots', metaCategory: 'Category', metaFolder: 'Reference', metaOrder: 'Order', metaViaWhatsapp: 'Via WhatsApp',
      modalOrderButton: 'Order this program on WhatsApp', modalImageAlt: 'Product screenshot',
      close: 'Close', prev: 'Previous image', next: 'Next image', orderBarLabel: 'Order on WhatsApp',
      tagMap: { 'أونلاين': 'Online', 'Windows': 'Windows', 'محدّث': 'Updated', 'دعم عن بُعد': 'Remote support', 'شاحنات': 'Trucks', 'كتالوج': 'Catalog', 'واتساب': 'WhatsApp' }
    }
  };

  var whatsapp = config.whatsapp || 'https://wa.me/message/WT6UZTLFOUE5E1';
  var categories = Array.isArray(config.categories) ? config.categories : [{ key: 'all', labelAr: 'الكل', labelEn: 'All', icon: 'grid' }];

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
  var langToggle = document.getElementById('langToggle');
  var themeToggle = document.getElementById('themeToggle');
  var themeIconUse = document.getElementById('themeIconUse');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var descriptionMeta = document.querySelector('meta[name="description"]');

  var activeCategory = 'all';
  var query = '';
  var currentProduct = null;
  var currentImage = 0;
  var currentLang = 'ar';
  var currentTheme = 'dark';

  function store(key, value) {
    try {
      if (value == null) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
    return null;
  }

  function t(key) {
    var dict = I18N[currentLang] || I18N.ar;
    return dict[key] != null ? dict[key] : (I18N.ar[key] != null ? I18N.ar[key] : key);
  }

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
      if (categories[i].key === key) {
        return currentLang === 'en'
          ? (categories[i].labelEn || categories[i].label || categories[i].labelAr || key)
          : (categories[i].labelAr || categories[i].label || categories[i].labelEn || key);
      }
    }
    return key;
  }

  function categoryIcon(key) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].key === key) return categories[i].icon || 'grid';
    }
    return 'grid';
  }

  function translateTag(tag) {
    var dict = I18N[currentLang] || I18N.ar;
    return dict.tagMap && dict.tagMap[tag] ? dict.tagMap[tag] : tag;
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }

  function imageMarkup(image, alt) {
    if (!image || !image.src) return '<div class="no-image">' + icon('image') + '</div>';
    return '<img src="' + esc(image.src) + '" alt="' + esc(alt || '') + '" loading="lazy">';
  }

  function applyStaticTranslations() {
    var nodes = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(nodes, function (el) { el.textContent = t(el.getAttribute('data-i18n')); });

    var placeholders = document.querySelectorAll('[data-i18n-ph]');
    Array.prototype.forEach.call(placeholders, function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });

    var alts = document.querySelectorAll('[data-i18n-alt]');
    Array.prototype.forEach.call(alts, function (el) { el.alt = t(el.getAttribute('data-i18n-alt')); });

    document.title = t('pageTitle');
    if (descriptionMeta) descriptionMeta.content = t('pageDescription');
    if (search) search.setAttribute('aria-label', t('searchAria'));
    if (nav) nav.setAttribute('aria-label', t('navAria'));
    if (menuToggle) menuToggle.setAttribute('aria-label', t('menu'));
    if (langToggle) {
      langToggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
      langToggle.setAttribute('aria-label', t('switchLanguage'));
    }
    if (modal) {
      var close = modal.querySelector('.modal-close');
      var prev = modal.querySelector('[data-gallery="prev"]');
      var next = modal.querySelector('[data-gallery="next"]');
      if (close) close.setAttribute('aria-label', t('close'));
      if (prev) prev.setAttribute('aria-label', t('prev'));
      if (next) next.setAttribute('aria-label', t('next'));
    }
  }

  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    store('ecu-lang', currentLang);
    applyStaticTranslations();
    renderChips();
    render();
    if (modal && !modal.hidden && currentProduct) {
      var imageIndex = currentImage;
      openModal(currentProduct.id);
      setImage(imageIndex);
    }
    applyTheme(currentTheme);
  }

  function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    store('ecu-theme', currentTheme);
    if (themeIconUse) themeIconUse.setAttribute('href', currentTheme === 'dark' ? '#i-sun' : '#i-moon');
    if (themeMeta) themeMeta.content = currentTheme === 'light' ? '#ffffff' : '#070b12';
    if (themeToggle) themeToggle.setAttribute('aria-label', currentTheme === 'light' ? t('themeToDark') : t('themeToLight'));
  }

  function renderChips() {
    if (!chips) return;
    var counts = {};
    products.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
    chips.innerHTML = categories.map(function (cat) {
      var count = cat.key === 'all' ? products.length : (counts[cat.key] || 0);
      if (!count && cat.key !== 'all') return '';
      return '<button type="button" class="chip' + (activeCategory === cat.key ? ' active' : '') + '" data-category="' + esc(cat.key) + '">' +
        icon(cat.icon || 'grid') + '<span>' + esc(categoryLabel(cat.key)) + '</span><b>' + count + '</b></button>';
    }).join('');
  }

  function getFiltered() {
    var q = norm(query);
    return products.filter(function (p) {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (!q) return true;
      return norm(p.title + ' ' + p.description + ' ' + (p.tags || []).join(' ') + ' ' + categoryLabel(p.category)).indexOf(q) !== -1;
    });
  }

  function cardMarkup(product, index) {
    var cover = product.images && product.images[0];
    var tags = (product.tags || []).slice(0, 3).map(function (tag) {
      return '<span class="tag">' + esc(translateTag(tag)) + '</span>';
    }).join('');

    return '<article class="product-card reveal" data-id="' + esc(product.id) + '">' +
      '<div class="card-media">' +
        imageMarkup(cover, product.title) +
        '<span class="card-badge">' + esc(categoryLabel(product.category)) + '</span>' +
        '<span class="card-count">' + icon('image') + ' ' + (product.images ? product.images.length : 0) + '</span>' +
        '<button type="button" class="expand" data-open="' + esc(product.id) + '" aria-label="' + esc(t('details')) + '">' + icon('expand') + '</button>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-meta"><span>#' + String(index + 1).padStart(2, '0') + '</span><span>ECUsoft</span></div>' +
        '<h3 title="' + esc(product.title) + '">' + esc(product.title) + '</h3>' +
        '<p>' + esc(excerpt(product.description, 115)) + '</p>' +
        '<div class="card-tags">' + tags + '</div>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-open="' + esc(product.id) + '">' + icon('eye') + ' ' + esc(t('details')) + '</button>' +
          '<a class="btn btn-wa" href="' + esc(whatsapp) + '" target="_blank" rel="noopener noreferrer">' + icon('whatsapp') + ' ' + esc(t('orderNow')) + '</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var list = getFiltered();
    if (!grid) return;
    grid.innerHTML = list.map(cardMarkup).join('');
    if (resultCount) resultCount.textContent = list.length + ' ' + t(list.length === 1 ? 'productOne' : 'productMany');
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
    if (modalImage) {
      modalImage.src = images[currentImage].src;
      modalImage.alt = t('modalImageAlt');
    }
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
    var shotWord = images.length === 1 ? t('screenshot') : t('screenshots');

    if (modalTitle) modalTitle.textContent = product.title;
    if (modalBadge) modalBadge.innerHTML = icon(categoryIcon(product.category)) + ' ' + esc(categoryLabel(product.category));
    if (modalDesc) modalDesc.textContent = product.description || '';
    if (modalOrder) modalOrder.href = whatsapp;
    if (modalMeta) {
      modalMeta.innerHTML =
        '<div><small>' + esc(t('metaImages')) + '</small><strong>' + images.length + ' ' + esc(shotWord) + '</strong></div>' +
        '<div><small>' + esc(t('metaCategory')) + '</small><strong>' + esc(categoryLabel(product.category)) + '</strong></div>' +
        '<div><small>' + esc(t('metaFolder')) + '</small><strong>' + esc(product.folder || 'ECUsoft') + '</strong></div>' +
        '<div><small>' + esc(t('metaOrder')) + '</small><strong>' + esc(t('metaViaWhatsapp')) + '</strong></div>';
    }
    if (modalThumbs) {
      modalThumbs.innerHTML = images.map(function (image, i) {
        return '<button type="button" class="thumb' + (i === 0 ? ' active' : '') + '" data-thumb="' + i + '" aria-label="' + esc(t('modalImageAlt')) + ' ' + (i + 1) + '">' +
          '<img src="' + esc(image.src) + '" alt="' + esc(t('modalImageAlt')) + ' ' + (i + 1) + '"></button>';
      }).join('');
    }
    if (modalImage) {
      modalImage.src = images.length ? images[0].src : '';
      modalImage.alt = t('modalImageAlt');
    }

    var prev = modal.querySelector('[data-gallery="prev"]');
    var next = modal.querySelector('[data-gallery="next"]');
    var single = images.length < 2;
    if (prev) { prev.hidden = single; prev.setAttribute('aria-label', t('prev')); }
    if (next) { next.hidden = single; next.setAttribute('aria-label', t('next')); }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    applyStaticTranslations();
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
      var galleryNav = event.target.closest('[data-gallery]');
      if (galleryNav) setImage(currentImage + (galleryNav.getAttribute('data-gallery') === 'next' ? 1 : -1));
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
    if (modal && modal.hidden) return;
    if (event.key === 'ArrowLeft') setImage(currentImage + 1);
    if (event.key === 'ArrowRight') setImage(currentImage - 1);
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (filterToggle && chips) {
    filterToggle.addEventListener('click', function () { chips.classList.toggle('open'); });
  }

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  currentLang = store('ecu-lang') === 'en' ? 'en' : 'ar';
  currentTheme = store('ecu-theme') === 'light' ? 'light' : 'dark';
  applyLanguage(currentLang);
})();
