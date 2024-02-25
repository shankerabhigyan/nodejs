const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url=='/'){
        res.end('Welcome to our homepage')
    }
    if(req.url=='/about'){
        res.end('Here is our short history')
    }
    res.end(`
    <h1>Oops!</h1>
    <p>We don't serve that yet</p>
    <a href="/"> Back to home </a>
    `)
})  

// res.end() is used to send the response to the client

server.listen(5000) // localhost:5000