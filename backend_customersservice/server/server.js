const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
//connect
require('./Customer');
const Customer = mongoose.model('Customer');

const dbURI =
    'mongodb://' +
    process.env.USER_NAME +
    ':' +
    process.env.PASSWORD +
    '@' +
    process.env.MONGO_HOST +
    ':' +
    process.env.MONGO_PORT +
    '/' +
    process.env.DB_NAME;

mongoose.connect(dbURI, (err) => {
    if (err) {
        console.log('Error connecting to mongoDB: ' + err, {
            'component': 'MONGODB'
        });
    } else {
        console.log('Connected to mongoDB successfully: ' + dbURI, {
            'component': 'MONGODB'
        });
    }
});
app.post('/customer', (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var customer = new Customer(newCustomer);
    customer.save().then(() => {
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

app.put('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        customer.name = req.body.customername,
            customer.age = req.body.age,
            customer.address = req.body.address
        customer.save()
            .then(() => res.send('Customer updated'))
            .catch((err) => {
                throw err;
            })
    });
});

app.get("/healthcheck", (req, res) => {
    res.send(200);
});

app.listen('5000', () => {
    console.log('Up and running - Customer service');
});