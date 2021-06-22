console.warn('sw file name public folder')

let CACHE_NAME = "appV1"

// caching all our network routes [path to images/files/documents etc] on the network
const urlsToCache = ['/static/js/bootstrap.bundle.min.js','/static/css/bootstrap.min.css','/static/js/main.chunk.js','/static/js/0.chunk.js', '/static/js/bundle.js',
                    'index.html', '/users','/about' ,'/' , 'offline.html'] //array of the files to cache
// const urlsToCache = ['index.html', 'offline.html'] //array of the files to cache

//setting the file inside the file
this.addEventListener("install", (event) => {
    event.waitUntil(  //wait until something is done
        caches.open(CACHE_NAME) //we are opening the caches with the defined constant 'CACH_NAME'
            .then(cache => {
                console.log('open cache');
                cache.addAll(urlsToCache);
            })
    );

});




// fetching cached file 
this.addEventListener("fetch" , (event) => {

    // pushing notification
    


    if (!navigator.onLine) {  //checking if browser in online then fetch from online server else fetch from cache
        if(event.request.url === 'http://localhost:3000/static/js/main.chunk.js'){
            event.waitUntil(
                this.registration.showNotification('Hello',{
                    body : "Internet not working"
                })
            )
        }

    event.respondWith(
        caches.match(event.request) // we try to match all the caches to all request our wabpages is sending , then if there is a match the promise is resolved else promise failed
            .then(resp => {  
              if (resp){
                  return resp
              }  

              let requestUrl = event.request.clone()
              fetch(requestUrl)

            })
    );
        }else{
            //
        }

});