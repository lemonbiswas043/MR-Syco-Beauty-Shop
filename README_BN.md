# MR Syco — শুরু করার গাইড (বাংলা)

## গুরুত্বপূর্ণ
এটি একটি **starter project**, এখনো লাইভ ওয়েবসাইট নয়। iPhone দিয়ে কিছু কাজ করা যাবে, কিন্তু প্রথমবার GitHub/Vercel/Supabase সেটআপ তুলনামূলক সহজ হয় কম্পিউটারে। এই starter-এ storefront ও basic admin login/product list আছে। বাস্তব checkout/payment এখনো সম্পূর্ণ নয়।

## iPhone থেকে শুরু
1. ZIP ফাইলটি Files অ্যাপে Save করো এবং Extract করো।
2. Safari-তে GitHub account খুলো: https://github.com/
3. GitHub-এ নতুন repository বানিয়ে extracted project-এর ফাইলগুলো আপলোড করতে হবে। GitHub mobile-এ ফাইল আপলোড সীমিত/ঝামেলার হতে পারে; প্রয়োজনে GitHub website-এর Desktop Website ব্যবহার করো।
4. Supabase account: https://supabase.com/ — নতুন project বানাও।
5. Supabase Dashboard → SQL Editor → New query → `supabase/schema.sql`-এর সব SQL paste করে Run করো।
6. Supabase → Project Settings → API থেকে Project URL, anon/public key, service_role key নাও।
7. Vercel: https://vercel.com/ → GitHub দিয়ে sign in → Import Project → Deploy।
8. Vercel Project Settings → Environment Variables-এ যোগ করো:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - ADMIN_EMAILS (তোমার admin email)
   তারপর Redeploy করো।
9. Supabase Authentication → Users থেকে admin email/password user তৈরি করো। একই email `ADMIN_EMAILS`-এ দাও।
10. লাইভ URL-এর শেষে `/admin` লিখে admin login করো।

## নিরাপত্তা
- `SUPABASE_SERVICE_ROLE_KEY` কখনো `NEXT_PUBLIC_` নামে রাখবে না।
- এই key কাউকে পাঠাবে না, chat-এ paste করবে না, GitHub-এ commit করবে না।
- Admin email allowlist ছাড়া অন্য email দিয়ে dashboard access হওয়া উচিত নয়।
- আসল customer/order/payment চালুর আগে security review, privacy/return policy, order API, stock transaction, spam protection এবং end-to-end test দরকার।

## এখনো যা অসম্পূর্ণ
- Customer checkout এবং order submission
- bKash/Nagad/card payment gateway
- Delivery/courier integration
- Product image upload (এখন HTTPS image URL দিতে হয়)
- Order status update UI, customer account/order tracking
- Production-grade validation, rate limiting, atomic stock handling, automated backups

## দরকারি লিংক
- GitHub: https://github.com/
- Supabase: https://supabase.com/
- Vercel: https://vercel.com/
