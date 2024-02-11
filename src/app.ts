const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import Customer from './models/customers';
const cors = require('cors');

import {Request,Response} from 'express';

mongoose.set('strictQuery',false);

app.use(express.json()); // for parsing application/json 
app.use(express.urlencoded({extended:true})); // for parsing application/x-www-form-urlencoded
app.use(cors());

if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
};

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION; // fetches the connection string from .env file

const customers = [
    {
        name: 'John',
        age: 30,
        industry: 'IT'
    },
    {
        name: 'Doe',
        age: 40,
        industry: 'Finance'
    },
    {
        name: 'Jane',
        industry: 'Healthcare'
    },
];

const customer = new Customer({
    name: 'Wick',
    age: 30,
    industry: 'Defence'
});

app.get('/',(req:Request,res:Response)=>{
    res.send("welcome!");
});

app.get('/api/customers',async(req:Request,res:Response)=>{
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try{
        const result = await Customer.find();
        res.send({"customers":result}); // or res.json();
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:err.message});
    }
});


// http://localhost:3005/api/customers/65c32bbf6bb75eb1f63dae46/test?age=30&state=ohio`
app.get('/api/customers/:id',async(req:Request,res:Response)=>{
    console.log({
        requestParams:req.params,
        requestQuery:req.query
    });
    // const customerID = req.params.id;
    // console.log(customerID);
    // OR
    const {id: customerID} = req.params;
    console.log(customerID);
    try{
    const customer = await Customer.findById(customerID);
    console.log(customer);
    
        if(customer){
            res.send(customer);
        }
        else{
            res.status(404).send('Customer not found');
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({error:"Something went wrong"});
    }

});

app.get('/api/orders/:id',async(req:Request,res:Response)=>{
    const order_id = req.params.id;
    console.log(req.params);
    try{
        const result = await Customer.findOne({"orders._id":order_id},{orders:{$elemMatch:{_id:order_id}}});
        console.log(result);
        if(result){
            res.status(200).json(result);
        }
        else{
            res.status(404).json({error:"Order not found"});
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:"something went wrong"});
        // 500 : internal server error`
    }
});

app.put('/api/customers/:id',async(req:Request,res:Response)=>{
    try{
        const {id:CustomerID} = req.params;
        const result = await Customer.findOneAndReplace({_id:CustomerID},req.body, {new:true});
        console.log(result);
        res.status(201).json({customer:result});
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:"something went wrong"});
    }
});

app.delete('/api/customers/:id',async(req:Request,res:Response)=>{
    try{
        const result = await Customer.deleteOne({_id:req.params.id});
        console.log(result);
        res.status(200).json({deletedCount:result.deletedCount});
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:"something went wrong"});
    }
});

app.post('/',(req:Request,res:Response)=>{
    res.send('post request');
});

app.post('/api/customers',async(req:Request,res:Response)=>{
    console.log(req.body);
    const customer = new Customer({
        name: req.body.name,
        age: req.body.age,
        industry: req.body.industry,
        attributes: req.body.attributes,
        orders: req.body.orders
    });
    try{
        await customer.save();
        res.status(201).json({customer});
    }
    catch(err){
        console.error(err.message);
        res.status(400).json({error:err.message});
    }
});

app.patch('/api/customers/:id',async(req:Request,res:Response)=>{
    try{
        const customerID = req.params.id;
        const result = await Customer.findOneAndUpdate({_id:customerID},req.body,{new:true}); //  new : to return the new updated object
        console.log(result);
        res.status(201).json({customer:result});
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:"something went wrong"});
    }
});

app.patch('/api/orders/:id',async(req:Request,res:Response)=>{
    console.log(req.params);
    const order_id = req.params.id;
    try{
        req.body._id = order_id;
        const result = await Customer.findOneAndUpdate(
            {"orders._id":order_id},
            {$set:{"orders.$":req.body}},
            {new:true}
        );
        console.log(result);
        if(result){
            res.status(201).json({order:result});
        }
        else{
            res.status(404).json({error:"Order not found"});
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({error:"something went wrong"});
    }
});

const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        app.listen(PORT,()=>{
            console.log('App listening on '+ PORT);
        });
    }
    catch(err){
        console.error(err.message);
    }
};

start();