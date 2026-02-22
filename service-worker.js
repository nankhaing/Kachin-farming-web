const CACHE_NAME = 'k-farm-v3'; // Update လုပ်တိုင်း version နံပါတ် ပြောင်းပေးပါ
const ASSETS_TO_CACHE = [
  '/', 
  'index.html',
  'fertilizer.html',
  'ai.html',
  'weather.html',
  'crops.html',
  'manifest.json',
  'https://cdn.tailwindcss.com' // Tailwind ကိုပါ cache လုပ်ထားရင် ပိုမြန်ပါတယ်
];

// Install Event: ဖိုင်တွေကို ဖုန်းထဲမှာ သိမ်းဆည်းခြင်း
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cache အဟောင်းတွေကို ရှင်းထုတ်ခြင်း (App ကို update ဖြစ်နေစေဖို့)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: အင်တာနက်မရှိရင် သိမ်းထားတဲ့ဖိုင်တွေကို ပြန်ထုတ်ပြခြင်း
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
