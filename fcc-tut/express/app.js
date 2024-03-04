const express = require('express');
const {products} = require('./data');   //importing data from data.js
const logger = require('./logger');

const app = express();

app.use(logger);

app.get('/',(req,res)=> {
    res.send('Home')
});

app.get('/about',(req,res)=> {
    res.send('About')
});

app.get('/api/items',(req,res)=> {
    res.send('Items')
});

app.get('/api/products',(req,res)=> {
    res.send('Products')
});

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});