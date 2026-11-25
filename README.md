# كتالوج ECUsoft

**الموقع الحي:** https://bakinou-24.github.io/ecusoft-catalog/

المستودع: https://github.com/Bakinou-24/ecusoft-catalog

هذا مجلد ثابت (Static site). انسخ محتوياته كما هي إلى جذر المستودع أو إلى مجلد `docs/`، ثم فعّل GitHub Pages.

## تحديث الموقع

    node scripts\publish-catalog.js "C:\Users\kl\Downloads\ECUsoft" --whatsapp-url=https://wa.me/message/WT6UZTLFOUE5E1

المولّد يقرأ `ECUsoft-Catalog.html` وينشئ واجهة حديثة في `index.html` مع `assets/` وينسخ الصور إلى `products/`.

## الدفع

روابط الدفع العامة تُضاف في `scripts/publish-catalog.js` داخل `PAYMENT_PRODUCTS` (تطابق دقيق على اسم المنتج → رابط MoonPay عام).
لا تُربط روابط الدفع بمبلغ فقط لأن أكثر من منتج قد يحمل السعر نفسه.
يمكن تعديل الرابط الحالي بالخيار `--payment-url=...` عند التوليد.
الرابط الحالي يعرض USDC على Solana ولا يحتوي خيار بطاقة؛ تفعيل Visa/Mastercard يتم من لوحة MoonPay، ثم يُحدَّث الرابط هنا.
الموقع جاهز لتضمين نافذة MoonPay داخل بطاقة المنتج، لكنه لا يفعّلها إلا بعد ضبط `cardEnabled: true` في المولّد؛ قبل ذلك يبقى الزر رابطاً مستضافاً.
لا تضع أبداً مفاتيح API أو العبارة السرية للمحفظة أو بيانات البطاقة داخل هذا المستودع.
المبلغ المعتمد للعميل هو ما يظهر في صفحة الدفع المستضافة، والأسعار المعروضة في الكتالوج للإرشاد.

## النشر على GitHub Pages

1. ادفع محتويات هذا المجلد إلى الفرع `main`.
2. من Settings ← Pages اختر `Deploy from a branch` ثم `main` و`/ (root)`.
3. الرابط: https://bakinou-24.github.io/ecusoft-catalog/

## ملاحظة

رابط الطلب الوحيد المستخدم في هذه النسخة: https://wa.me/message/WT6UZTLFOUE5E1
لا يتم استخدام أتمتة نشر فيسبوك للبيع؛ الطلب يتم يدوياً عبر واتساب من تطبيق أندرويد.
