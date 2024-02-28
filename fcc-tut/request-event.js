const EventEmitter = require('events');

const customEmitter =  new EventEmitter();

/////////////////////////////////////////////////////
customEmitter.on('response',()=>{
    console.log(`data recieved`);
});

customEmitter.on('response',()=>{
    console.log(`data recieved again`);
});
// we can have multiple listeners for the same event

customEmitter.emit('response');

/////////////////////////////////////////////////////
// emit() before on() does not work
customEmitter.emit('call');
customEmitter.on('call',()=>{
    console.log(`data recieved again`);
});
////////////////////////////////////////////////////
// passing arguments
customEmitter.on('proc',(name,id)=>{
    console.log(`data recieved : ${name} ${id}`);
});
customEmitter.emit('proc','john',23);