const C="mes-bus-v2",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(new URL(e.request.url).origin!==location.origin)return; // les appels à l'API STIB ne sont jamais mis en cache
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
