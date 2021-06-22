export default function swDev(){



    const vapidPublicKey = 'BE4vOuQQ67jfY1mcgfk3ZChgB6swUGf2jTDQd2ziyRtccMaZvvad2jJQbaCkAI3BKZZMgxp8PwOlTSfhzeMLA2U';
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
     

    // web push notification manager
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
       
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
       
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
       
    


      

      
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl).then( response => {
        console.warn("response" , response )

        console.log(response.pushManager.subscribe({
                            userVisibleOnly : true ,
                            applicationServerKey : convertedVapidKey
                    }))
        
        // subscribing push notification to service worker
    //    return response.pushManager.getSubscription()
    //     .then(function(subscription){
          return   response.pushManager.subscribe({
                    userVisibleOnly : true ,
                    applicationServerKey : convertedVapidKey
            })
        // })
    })


}