console.warn('sw file name public folder')

let CACHE_NAME = "app1"

// caching all our network routes [path to images/files/documents etc] on the network
const urlsToCache = ['/static/js/bootstrap.bundle.min.js','/static/css/bootstrap.min.css',
                        '/static/js/main.chunk.js','/static/js/0.chunk.js', '/static/js/bundle.js',
                    'index.html', '/users','/about' ,'/' , 'offline.html'] //array of the files to cache
// const urlsToCache = ['index.html', 'offline.html'] //array of the files to cache


//setting the file inside the file
this.addEventListener("install", (event) => {
  self.skipWaiting();

    event.waitUntil(  //wait until something is done
        caches.open(CACHE_NAME) //we are opening the caches with the defined constant 'CACH_NAME'
            .then(cache => {
                console.log('open cache');
              return cache.addAll(urlsToCache);
            })
    );

});







// fetching cached file 
// this.addEventListener("fetch" , (event) => {

    // pushing notification
    
    // if (!navigator.onLine) {  //checking if browser in online then fetch from online server else fetch from cache
    //     if(event.request.url === 'http://localhost:3000/static/js/main.chunk.js'){
    //         event.waitUntil(
    //             this.registration.showNotification('Hello',{
    //                 body : "Internet not working"
    //             })
    //         )
    //     }

    //   }else{
    

       
        // Cache falling back to the network
        // event.respondWith(
        //   caches.match(event.request).then(function(response) {
        //     return response || fetch(event.request);
        //   })
        // );

        // This caches the network responses as they are fetched.
        // self.addEventListener('fetch', function(event) {
        //   event.respondWith(
        //     caches.open('mysite-dynamic').then(function(cache) {
        //       return fetch(event.request).then(function(response) {
        //         cache.put(event.request, response.clone());
        //         return response;
        //       });
        //     })
        //   );
        // });


       



    // event.respondWith(
    //     caches.match(event.request) // we try to match all the caches to all request our wabpages is sending , then if there is a match the promise is resolved else promise failed
    //         .then(resp => {  
    //           if (resp){
    //               return resp
    //           }  

    //           let requestUrl = event.request.clone()
    //           fetch(requestUrl)

    //         })
    // );

    

        //
      // }

// });


 // Stale-while-revalidate 
 self.addEventListener('fetch', function (event) {


  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      })
       .catch(function() {
        // If both fail, show a generic fallback:
        return caches.match('/offline.html');
      });
    }) ,
  );
});





//activate the sw
self.addEventListener("activate", (event) => {

  const cacheWhiteLists = [];
  cacheWhiteLists.push(CACHE_NAME);

    event.waitUntil(
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhiteLists.includes(cacheName)) {
              console.log(
                "Updating the cache , deleting the cache not present in "
              );
              return caches.delete(cacheName);
            }
          })
        ).catch((err) => console.log("Prodmise Falied..."))
      )
    );
  
    event.waitUntil(self.clients.claim())

    
  });
  




self.addEventListener("beforeinstallprompt", function (e) {
  e.userChoice.then(function (result) {
    console.log(result.outcome);
    if (result.outcome == "dismissed") {
      // Send to analytics
      console.log("installation cancel");
    } else {
      // Send to analytics
      console.log("installed");
    }
  });
});




// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // Try the cache
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request).then(function(response) {
//         if (response.status === 404) {
//           return caches.match('pages/404.html');
//         }
//         return response
//       });
//     }).catch(function() {
//       // If both fail, show a generic fallback:
//       return caches.match('/offline.html');
//     })
//   );
// });





// Removing outdated caches
// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           // Return true if you want to remove this cache,
//           // but remember that caches are shared across
//           // the whole origin
//         }).map(function(cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });





// self.addEventListener('push', function(e) {
//   var body;

//   if (e.data) {
//     body = e.data.text();
//   } else {
//     body = 'Push message no payload';
//   }


//   var options = {
//     body: 'This notification was generated from a push!',
//     icon: 'images/example.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: '1'
//     },
//     actions: [
//       {action: 'explore', title: 'Explore this new world',
//         icon: 'images/checkmark.png'},
//       {action: 'close', title: 'Close',
//         icon: 'images/xmark.png'},
//     ]
//   };
//   e.waitUntil(
//     self.registration.showNotification('Hello world!', options)
//   );
// });




// self.addEventListener('notificationclick', function (event) {
//   if (event.notification.tag == 'new-email') {
//     // Assume that all of the resources needed to render
//     // /inbox/ have previously been cached, e.g. as part
//     // of the install handler.
//     new WindowClient('/inbox/');
//   }
// });







 //   from network fetch first with timeout
//  function fromNetwork(request, timeout) {
//   return new Promise(function (fulfill, reject) {

//     var timeoutId = setTimeout(reject , timeout );

//     fetch(request).then(function (response) {
//       clearTimeout(timeoutId);
//       fulfill(response);
//     }, reject );
//   });
// }


//  //  fetching from cache if their is delay in network wrt timeout 
//  function fromCache(request) {
//   return caches.open(CACHE_NAME).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//       return matching || Promise.reject('no-match');
//     });
//   });
// }


// // cache update function
// function update(request) {
//   return caches.open(CACHE).then(function (cache) {
//     return fetch(request).then(function (response) {
//       return cache.put(request, response.clone()).then(function () {
//         return response;
//       });
//     });
//   });
// }



// refresh data
// function refresh(response) {
//   return self.clients.matchAll().then(function (clients) {
//     clients.forEach(function (client) {
//       var message = {
//         type: 'refresh',
//         url: response.url,
//         eTag: response.headers.get('ETag')
//       };
//       client.postMessage(JSON.stringify(message));
//     });
//   });
// }