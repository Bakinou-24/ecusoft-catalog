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
      navHome: 'الرئيسية', navCatalog: 'الكتالوج', navFeatures: 'لماذا ECUsoft', navPayment: 'الدفع', navContact: 'تواصل معنا', navWhatsapp: 'واتساب', navTerms: 'الشروط', navRefund: 'الاسترجاع', navPrivacy: 'الخصوصية',
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
      payKicker: 'الدفع / 03', payTitle: 'ادفع عبر MoonPay واستلم كريبتو',
      payText: 'رابط دفع مستضاف وآمن لمنتج محدد. إتمام العملية يتم بالكامل لدى MoonPay، ولا تُخزّن أي بيانات بطاقة أو تسجيل دخول في هذا الموقع.',
      payReady: 'روابط الدفع',
      pay1Title: 'صفحة دفع مستضافة', pay1Text: 'الدفع يتم لدى MoonPay على صفحة منفصلة. إن كان خيار البطاقة مفعّلاً في حساب البائع فسيظهر هناك، ولا يمرّ أي رقم بطاقة عبر كتالوج ECUsoft.',
      pay2Title: 'استلام USDC', pay2Text: 'يستلم البائع العملة على شبكة Base أو Polygon، ويمكن تحويلها لاحقاً إلى USDT TRC20 عبر منصة صرف. شبكة Tron (TRC20) غير متاحة في صفحة الدفع الحالية.',
      pay3Title: 'بدون PayPal أو Revolut', pay3Text: 'لا نستخدم PayPal ولا Revolut كوسيلة دفع. الأسعار المعروضة بالدولار واليورو للإرشاد، والمبلغ النهائي المعتمد هو ما يظهر في صفحة الدفع.',
      payNoteTitle: 'قبل الدفع:', payNoteText: 'الرابط الحالي يعرض $45 USDC على شبكة Solana ولا يحتوي خيار بطاقة بعد. بعد تفعيل Card payments في لوحة MoonPay واستلام رابط جديد سيظهر زر الدفع بالبطاقة تلقائياً. تأكد دائماً من اسم المنتج والمبلغ، ثم أرسل الإيصال على واتساب لتأكيد التفعيل يدوياً.',
      cardPay: 'ادفع عبر MoonPay', modalPayButton: 'افتح صفحة الدفع', checkoutLoading: 'جارٍ تجهيز الدفع…', priceLabel: 'السعر', approximate: 'تقريباً',
      legalKicker: 'Legal / 04', legalTitle: 'الشروط والسياسات', legalText: 'معلومات واضحة قبل إتمام الطلب أو الدفع.',
      termsTitle: 'شروط البيع', termsText: 'البرمجيات تُستخدم وفق ترخيصها الأصلي. يرجى التأكد من توافق الإصدار مع معداتك قبل الطلب. يتم تأكيد التوفر والتفعيل يدوياً عبر واتساب بعد الدفع.',
      refundTitle: 'الاسترجاع', refundText: 'لا استرجاع بعد تسليم ملفات التفعيل أو المفاتيح، إلا في حال ثبوت عدم تطابق المنتج مع ما تم الاتفاق عليه كتابياً عبر واتساب قبل الدفع.',
      privacyTitle: 'الخصوصية', privacyText: 'هذا الموقع ثابت ولا يجمع بيانات بطاقات أو معلومات تسجيل دخول. تفضيلات اللغة والثيم تُحفظ محلياً في متصفحك فقط. الدفع يتم بالكامل لدى مزوّد الدفع.',
      tagMap: { 'أونلاين': 'Online', 'Windows': 'Windows', 'محدّث': 'Updated', 'دعم عن بُعد': 'Remote support', 'شاحنات': 'Trucks', 'كتالوج': 'Catalog', 'واتساب': 'WhatsApp' }
    },
    en: {
      navHome: 'Home', navCatalog: 'Catalog', navFeatures: 'Why ECUsoft', navPayment: 'Payment', navContact: 'Contact', navWhatsapp: 'WhatsApp', navTerms: 'Terms', navRefund: 'Refund', navPrivacy: 'Privacy',
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
      payKicker: 'Payment / 03', payTitle: 'Pay via MoonPay, receive crypto',
      payText: 'A secure hosted checkout for one specific product. The whole flow happens at MoonPay; no card data or login details are stored on this site.',
      payReady: 'Pay links',
      pay1Title: 'Hosted checkout', pay1Text: 'Payment happens on a separate MoonPay page. If card payments are enabled in the seller account, the option will appear there; no card number passes through the ECUsoft catalog.',
      pay2Title: 'Receive USDC', pay2Text: 'The seller receives the funds on Base or Polygon and can convert them later to USDT TRC20 through an exchange. The Tron (TRC20) network is not available on the current checkout.',
      pay3Title: 'No PayPal or Revolut', pay3Text: 'We do not use PayPal or Revolut as a payment method. USD and EUR prices are indicative; the final amount is the one shown on the checkout page.',
      payNoteTitle: 'Before you pay:', payNoteText: 'The current link shows $45 USDC on Solana and does not offer a card option yet. After Card payments is enabled in MoonPay and a new link is provided, the card button will appear automatically. Always check the product name and amount, then send the receipt on WhatsApp for manual activation.',
      cardPay: 'Pay via MoonPay', modalPayButton: 'Open checkout', checkoutLoading: 'Preparing checkout…', priceLabel: 'Price', approximate: 'approx.',
      legalKicker: 'Legal / 04', legalTitle: 'Terms & policies', legalText: 'Clear information before you order or pay.',
      termsTitle: 'Terms of sale', termsText: 'Software is used under its original licence. Please confirm the version works with your equipment before ordering. Availability and activation are confirmed manually on WhatsApp after payment.',
      refundTitle: 'Refunds', refundText: 'No refund after activation files or keys are delivered, unless the product does not match what was agreed in writing on WhatsApp before payment.',
      privacyTitle: 'Privacy', privacyText: 'This is a static site and collects no card data or login details. Language and theme preferences are stored only in your browser. Payment is handled entirely by the payment provider.',
      tagMap: { 'أونلاين': 'Online', 'Windows': 'Windows', 'محدّث': 'Updated', 'دعم عن بُعد': 'Remote support', 'شاحنات': 'Trucks', 'كتالوج': 'Catalog', 'واتساب': 'WhatsApp' }
    }
  };

  var whatsapp = config.whatsapp || 'https://wa.me/message/WT6UZTLFOUE5E1';
  var categories = Array.isArray(config.categories) ? config.categories : [{ key: 'all', labelAr: 'الكل', labelEn: 'All', icon: 'grid' }];
  var payment = config.payment || {};
  var eurRate = Number(payment.eurRate) > 0 ? Number(payment.eurRate) : 0.92;

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
  var modalPrice = document.getElementById('modalPrice');
  var modalCheckout = document.getElementById('modalCheckout');
  var modalPay = document.getElementById('modalPay');
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
  var checkoutProductId = '';
  var checkoutLoading = null;

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

  function usdPrice(product) {
    var value = Number(product && product.price);
    return Number.isFinite(value) && value > 0 ? '$' + value : '';
  }

  function eurPrice(product) {
    var value = Number(product && product.price);
    return Number.isFinite(value) && value > 0 ? '€' + Math.round(value * eurRate) : '';
  }

  function priceMarkup(product, cls) {
    var usd = usdPrice(product);
    if (!usd) return '';
    return '<div class="' + (cls || 'card-price') + '"><strong>' + esc(usd) + '</strong>' +
      '<span>' + esc(t('approximate')) + ' ' + esc(eurPrice(product)) + '</span></div>';
  }

  function paylinkIdFromUrl(url) {
    try {
      var parts = new URL(String(url || '')).pathname.split('/').filter(Boolean);
      return parts[parts.length - 1] || '';
    } catch (e) { return ''; }
  }

  function cardCheckoutEnabled() {
    return payment.cardEnabled === true;
  }

  function loadCheckoutScript() {
    if (typeof window.helioCheckout === 'function') return Promise.resolve();
    if (checkoutLoading) return checkoutLoading;
    var src = payment.embedScript || 'https://embed.hel.io/assets/index-v1.js';
    // Only the official MoonPay embed URL may ever be injected into this page.
    if (src !== 'https://embed.hel.io/assets/index-v1.js') return Promise.reject(new Error('Unsupported checkout script'));
    checkoutLoading = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = function () { checkoutLoading = null; resolve(); };
      script.onerror = function () { checkoutLoading = null; reject(new Error('Checkout script failed to load')); };
      document.head.appendChild(script);
    });
    return checkoutLoading;
  }

  function resetCheckout() {
    checkoutProductId = '';
    if (!modalCheckout) return;
    modalCheckout.hidden = true;
    modalCheckout.innerHTML = '';
    modalCheckout.removeAttribute('data-mounted');
  }

  function mountCheckout(payUrl) {
    if (!modalCheckout || !payUrl) return;
    var id = paylinkIdFromUrl(payUrl) || payment.paylinkId || '';
    if (!id) return;
    modalCheckout.hidden = false;
    if (modalCheckout.getAttribute('data-mounted') === 'true') return;
    modalCheckout.innerHTML = '<span class="checkout-loading">' + esc(t('checkoutLoading')) + '</span>';
    loadCheckoutScript().then(function () {
      if (typeof window.helioCheckout !== 'function') throw new Error('Checkout unavailable');
      modalCheckout.innerHTML = '';
      window.helioCheckout(modalCheckout, {
        paylinkId: id,
        display: 'button',
        primaryPaymentMethod: 'fiat',
        showPayWithCard: true,
        themeMode: currentTheme === 'light' ? 'light' : 'dark'
      });
      modalCheckout.setAttribute('data-mounted', 'true');
    }).catch(function () {
      modalCheckout.innerHTML = '<a class="btn btn-pay" href="' + esc(payUrl) + '" target="_blank" rel="noopener noreferrer">' +
        icon('card') + ' ' + esc(t('modalPayButton')) + '</a>';
    });
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
      var langLabel = currentLang === 'ar' ? 'EN' : 'AR';
      langToggle.textContent = langLabel;
      langToggle.setAttribute('aria-label', langLabel + ' — ' + t('switchLanguage'));
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
    if (cardCheckoutEnabled() && modalCheckout && modal && !modal.hidden && currentProduct &&
        currentProduct.payUrl && modalCheckout.getAttribute('data-mounted') === 'true') {
      modalCheckout.innerHTML = '';
      modalCheckout.removeAttribute('data-mounted');
      mountCheckout(currentProduct.payUrl);
    }
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
        priceMarkup(product) +
        '<div class="card-tags">' + tags + '</div>' +
        '<div class="card-actions">' +
          '<button type="button" class="btn btn-ghost" data-open="' + esc(product.id) + '">' + icon('eye') + ' ' + esc(t('details')) + '</button>' +
          (product.payUrl
            ? '<a class="btn btn-pay" href="' + esc(product.payUrl) + '" data-pay="' + esc(product.id) + '" target="_blank" rel="noopener noreferrer">' + icon('card') + ' ' + esc(t('cardPay')) + '</a>'
            : '') +
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

  function openModal(id, withCheckout) {
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
    if (modalPrice) modalPrice.innerHTML = priceMarkup(product, 'modal-price');
    if (modalPay) {
      modalPay.hidden = !product.payUrl || cardCheckoutEnabled();
      if (product.payUrl) modalPay.href = product.payUrl;
      else modalPay.removeAttribute('href');
    }
    if (modalCheckout) {
      modalCheckout.hidden = true;
      modalCheckout.innerHTML = '';
      modalCheckout.removeAttribute('data-mounted');
    }
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

    if (withCheckout) checkoutProductId = product.id;
    else if (checkoutProductId !== product.id) checkoutProductId = '';
    if (checkoutProductId === product.id && cardCheckoutEnabled() && product.payUrl) mountCheckout(product.payUrl);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    currentProduct = null;
    resetCheckout();
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
      var payLink = event.target.closest('[data-pay]');
      if (payLink) {
        if (cardCheckoutEnabled()) {
          event.preventDefault();
          openModal(payLink.getAttribute('data-pay'), true);
        }
        return;
      }
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
