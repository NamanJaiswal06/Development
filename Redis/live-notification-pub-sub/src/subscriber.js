import Redis from 'ioredis'

const subscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

subscriber.subscribe('notifications' , (err) =>{
    if(err){
        console.log('failed to subscribe : %s' , err.message);
        return;
    }
    console.log('subscribed to notification channel');
});


subscriber.on('message', (channel , message)=>{
  console.log("Recieved on " , channel , ":" , JSON.parse(message))
})