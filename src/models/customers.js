"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
const customerSchema = new mongoose_1.Schema({
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
            item: String,
            price: Number
        }
    ]
});
const Customer = (0, mongoose_1.model)('customers', customerSchema); // creates a model called 'Customer' from the schema
const c = new Customer({
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
exports.default = Customer;
