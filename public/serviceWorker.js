console.warn('Service worker ready to work asap! Lets go Mobile....')
const CACHE_NAME = "version-1"; //we can load our resources from our saved cahed on our browser
const urlsToCache = ['index.html' , 'offline.html'] //array of the files to cache

const self = this //this in the service worker file represent the serviceWorker

//install sw
self.addEventListener('install' , (event) => {
    event.waitUntil(  //wait until something is done
        caches.open(CACHE_NAME) //we are opening the caches with the defined constant 'CACH_NAME'
            .then(cache => {
                console.log('open cache');
                return cache.addAll(urlsToCache);
            })
    );

});

//listen for request
self.addEventListener('fetch' , (event) => {
    event.respondWith(
        caches.match(event.request) // we try to match all the caches to all request our wabpages is sending , then if there is a match the promise is resolved else promise failed
            .then(() => {   
                console.log('fetching requests');   
                 return fetch(event.request) //if matches exists then return fetch(event.request) of the webpage requests (img , icon etc)
                    .catch(() => caches.match('offline.html'))
            })
    );


});



//activate the sw
self.addEventListener('activate' , (event) => {
    const cacheWhiteLists = [];
    cacheWhiteLists.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhiteLists.includes(cacheName)){
                    console.log('Updating the cache , deleting the cache not present in ');
                    return caches.delete(cacheName);

                }
            })
        ).catch(err => console.log("Prodmise Falied...")) )

    )
     

});

