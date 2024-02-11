"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const customers_1 = __importDefault(require("./models/customers"));
const cors = require('cors');
mongoose.set('strictQuery', false);
app.use(express.json()); // for parsing application/json 
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
;
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
const customer = new customers_1.default({
    name: 'Wick',
    age: 30,
    industry: 'Defence'
});
app.get('/', (req, res) => {
    res.send("welcome!");
});
app.get('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(await mongoose.connection.db.listCollections().toArray());
    try {
        const result = yield customers_1.default.find();
        res.send({ "customers": result }); // or res.json();
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}));
// http://localhost:3005/api/customers/65c32bbf6bb75eb1f63dae46/test?age=30&state=ohio`
app.get('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({
        requestParams: req.params,
        requestQuery: req.query
    });
    // const customerID = req.params.id;
    // console.log(customerID);
    // OR
    const { id: customerID } = req.params;
    console.log(customerID);
    try {
        const customer = yield customers_1.default.findById(customerID);
        console.log(customer);
        if (customer) {
            res.send(customer);
        }
        else {
            res.status(404).send('Customer not found');
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
}));
app.get('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = req.params.id;
    console.log(req.params);
    try {
        const result = yield customers_1.default.findOne({ "orders._id": order_id }, { orders: { $elemMatch: { _id: order_id } } });
        console.log(result);
        if (result) {
            res.status(200).json(result);
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "something went wrong" });
        // 500 : internal server error`
    }
}));
app.put('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: CustomerID } = req.params;
        const result = yield customers_1.default.findOneAndReplace({ _id: CustomerID }, req.body, { new: true });
        console.log(result);
        res.status(201).json({ customer: result });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "something went wrong" });
    }
}));
app.delete('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customers_1.default.deleteOne({ _id: req.params.id });
        console.log(result);
        res.status(200).json({ deletedCount: result.deletedCount });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "something went wrong" });
    }
}));
app.post('/', (req, res) => {
    res.send('post request');
});
app.post('/api/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const customer = new customers_1.default({
        name: req.body.name,
        age: req.body.age,
        industry: req.body.industry,
        attributes: req.body.attributes,
        orders: req.body.orders
    });
    try {
        yield customer.save();
        res.status(201).json({ customer });
    }
    catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
    }
}));
app.patch('/api/customers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerID = req.params.id;
        const result = yield customers_1.default.findOneAndUpdate({ _id: customerID }, req.body, { new: true }); //  new : to return the new updated object
        console.log(result);
        res.status(201).json({ customer: result });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "something went wrong" });
    }
}));
app.patch('/api/orders/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const order_id = req.params.id;
    try {
        req.body._id = order_id;
        const result = yield customers_1.default.findOneAndUpdate({ "orders._id": order_id }, { $set: { "orders.$": req.body } }, { new: true });
        console.log(result);
        if (result) {
            res.status(201).json({ order: result });
        }
        else {
            res.status(404).json({ error: "Order not found" });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "something went wrong" });
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect(CONNECTION);
        app.listen(PORT, () => {
            console.log('App listening on ' + PORT);
        });
    }
    catch (err) {
        console.error(err.message);
    }
});
start();
