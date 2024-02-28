const {createReadStream} = require('fs');

const stream = createReadStream('./content/big.txt',{highWaterMark:90000,encoding:'utf8'});
// highWaterMark is the buffer size in bytes

stream.on('data',(result)=>{
    console.log(result);
});

stream.on('error',(err)=>{
    console.log(err);
});