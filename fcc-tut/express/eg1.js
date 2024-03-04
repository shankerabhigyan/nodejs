
const express = require('express');
const {products} = require('./data');   //importing data from data.js

const app = express();
app.get('/',(req,res)=>{
    res.send('<h1>homepage</h1><a href="/api/products">products</a>');
});

app.get('/api/products',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image} = product;
        return {id,name,image};
    })
    res.json(newProducts);
});

app.get('/api/products/:productID',(req,res)=>{
    // console.log(req.params);
    const productID = req.params.productID;
    const singleProduct = products.find((product)=>product.id === Number(productID));
    if(!singleProduct){
        return res.status(404).send('Product does not exist');
    }
    res.status(200).json(singleProduct);
});

app.get('/api/v1/query',(req,res)=>{
    // console.log(req.query);
    const {search,limit} = req.query
    let sortedProducts = [...products]
    if(search){
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search);
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit));
    }
    if(sortedProducts.length < 1){
        // res.status(200).send('No products matched your search');
        return res.status(200).json({success:true,data:[]});
    }  
    res.status(200).json(sortedProducts);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});