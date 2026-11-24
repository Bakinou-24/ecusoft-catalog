# نشر الكتالوج أونلاين

**الموقع منشور ويعمل الآن:** https://bakinou-24.github.io/ecusoft-catalog/

المستودع: https://github.com/Bakinou-24/ecusoft-catalog (عام، Pages مفعّل من الفرع `main`، المجلد `/`).

مجلد `site/` جاهز للنشر كما هو. انسخ **محتويات** المجلد (وليس المجلد نفسه).

## GitHub Pages — فرع `gh-pages`

1. أنشئ مستودعاً على GitHub أو استخدم مستودعاً موجوداً.
2. من داخل `site/`:

    git init
    git checkout --orphan gh-pages
    git add -A
    git commit -m "Publish ECUsoft catalog"
    git remote add origin https://github.com/<username>/<repo>.git
    git push origin gh-pages

3. افتح Settings ← Pages ← Build and deployment، اختر `Deploy from a branch`، ثم الفرع `gh-pages` والمجلد `/ (root)`، ثم Save.
4. الرابط: `https://<username>.github.io/<repo>/`.

## GitHub Pages — مجلد `/docs` بدلاً من ذلك

1. انسخ محتويات `site/` إلى `docs/` في الفرع الرئيسي ثم ارفع التغييرات.
2. من Settings ← Pages اختر الفرع `main` والمجلد `/docs` ثم Save.

## Netlify

1. افتح https://app.netlify.com/drop
2. اسحب مجلد `site/` وأفلته في المساحة المخصصة، أو اضغط `Browse to upload` واختر المجلد.
3. الرابط يظهر فوراً. للربط بنطاقك: Site settings ← Domain management.

## تذكير مهم

غيّر رابط واتساب قبل النشر باستخدام الـ flag:

    node scripts\publish-catalog.js "C:\Users\kl\Downloads\ECUsoft" --whatsapp-url=https://wa.me/message/WT6UZTLFOUE5E1

الرابط المستخدم في هذه النسخة: https://wa.me/message/WT6UZTLFOUE5E1

## English

This folder is a static catalog site only; publish the contents of `site/`.
- GitHub Pages: push these files as the root of a `gh-pages` branch, or copy them into `docs/` on `main`, then enable Pages.
- Netlify: drag and drop the `site/` folder at https://app.netlify.com/drop.
- Set the WhatsApp link with `--whatsapp-url=URL` before publishing.
- Facebook posting automation is not used for selling anymore; sales happen from the Android app and WhatsApp.
