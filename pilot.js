const http = require('http');

const server = http.createServer((req,res) => { // () : defining a function inline
    res.statusCode = 200; // OK
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1> yeaa </h1>');
}); 

server.listen(3000, '127.0.0.1',()=>{
    console.log('Server running');
});