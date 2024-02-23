const os = require('os'); // built in module

const user = os.userInfo();
console.log(user);
console.log(`The system uptime is ${os.uptime()} seconds`);

const currOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
};
console.log(currOS);