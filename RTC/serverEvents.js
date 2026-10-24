const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url === '/events'){
        res.writeHead(200 , {
            'Content-Type':'text/event-stream',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            //important
        });

        const interval = setInterval(()=>{
            res.write(`data: ${new Date().toISOString()}`)
        },2000);

        req.on('close', ()=>{
            clearInterval(interval)
            console.log('Client disconnected')
            res.end();
        });
    } else {
        res.writeHead(200)
        res.end("Server is running")
    }
});

server.listen(3000,()=>{
    console.log('Server is running on port 3000')
});