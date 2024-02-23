const names = require('./names.js');
const sayHi = require('./printnames.js');
const data = require('./altexport.js');

console.log(names);

sayHi(names.jeff);
sayHi(names.sarah);
sayHi(names.billy);

console.log(data.singlePerson);