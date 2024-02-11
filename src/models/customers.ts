import {Schema,model} from 'mongoose';
// const mongoose = require('mongoose');
const customerSchema = new Schema({
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
        required: true
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
export default Customer;