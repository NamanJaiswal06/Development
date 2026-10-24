const WebSocket = require('ws');

const server = new WebSocket.Server({port: 3000});

server.on("connection" , (socket)=>{
    console.log('client connected');
    socket.send('Chai aur code web socket')
    socket.on("message" , (message)=>{
        console.log(message)
        socket.send("hello from server")
    });

} );

// const socket = new WebSocket("ws://localhost:3000") //frontend side

// socket.onmessage = (event)=>{
//     console.log(`Message from server: ${event.data}`);
// }

