const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
//connect
require('./Customer');
const Customer = mongoose.model('Customer');
mongoose.connect('mongodb://', () => {
    console.log('Database connected-  Customer service');
});

app.post('/customer', (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var Customer = new Customer(newCustomer);
    Customer.save().then(() => {
        res.send('Customer created');
    }).catch(err => {
        if (err) {
            throw err
        }
    });
});

app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        console.log(customers)
        res.json(customers)
    }).catch(err => {
        throw err;
    });
});

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer)
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        throw err;
    });
})

app.delete('/customer/:id', (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send('customer deleted');
    }).catch(err => {
        throw err;
    });
})

app.listen('5555', () => {
    console.log('Up and running - Customer service');
});