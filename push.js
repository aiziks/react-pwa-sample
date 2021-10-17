var push = require('web-push')

// let vapidkeys = push.generateVAPIDKeys();

let vapidKeys = {
    publicKey: 'BKKoeZ9jQI6lmlyAG0xvQ_a2f88KIPjpaYBNJly1zHxpyyrJJFPrXabULJ2ZQGe4E_Wb_8BERU0jFhQMVPrwrJY',
    privateKey: 'UNUC0G300pig0YBQkjjDgysOyjOL1Zr7DOyrY4aR_7E'
  }

// console.log(vapidKeys)

push.setVapidDetails('maito:isaacadedayo1@gmail.com' , vapidKeys.publicKey , vapidKeys.privateKey)

let sub = {};

push.sendNotification(sub, 'test message')