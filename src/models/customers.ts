import {Schema,model,HydratedDocument} from 'mongoose';
// const mongoose = require('mongoose');

interface IOrder{
    item:String,
    price:Number
};

interface ICustomer{
    name:String,
    age?:Number,
    industry?:String,
    attributes?:Object,
    orders?:IOrder[]
};

const customerSchema = new Schema<ICustomer>({ // generic
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    industry: {
        type: String,
        required: false
    },
    attributes: {
        type: Object,
        required: false
    },
    orders: [
        {
            item:String,
            price:Number
        }
    ]
});

const Customer = model('customers',customerSchema); // creates a model called 'Customer' from the schema

const c:HydratedDocument<ICustomer> = new Customer({
    name: "test",
    age: 20,
    industry: "test",
    attributes: {
        test: "test"
    },
    orders: [
        {
            item: "test",
            price: 20
        }
    ]
});

console.log(c.name); // test

export default Customer;


