const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

app.use(cors());
app.use(bodyParser.json());
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

require('./Order')
const Order = mongoose.model('Order');

app.post('/order', (req, res) => {
    var newOrder = {
        customerName: req.body.customername,
        bookTitle: req.body.booktitle,
        issueDate: req.body.issuedate,
        endDate: req.body.enddate
    }

    var order = new Order(newOrder);

    order.save().then(() => {
        res.send('Order created with success');
    }).catch(err => {
        throw err;
    });
});
app.get('/orders', (req, res) => {
    Order.find().then((books) => {
        res.json(books);
    }).catch(err => {
        throw err;
    })
});

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            // axios.get('http://localhost:5555/customer/' + order.CustomerID)
            //     .then((response) => {
            //         var orderObject = {
            //             customerName: response.data.name,
            //             bookTitle: ''
            //         }
            //         axios.get('http://localhost:4545/book/' + order.BookID).then((response) => {
            //             orderObject.bookTitle = response.data.title
            //             res.json(orderObject)
            //         })
            //     })
            res.json(order);
        } else {
            res.send('Invalid Order')
        }

    }).catch((err) => {
        throw err;
    })
});

app.delete('/order/:id', (req, res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send('Order deleted');
    }).catch(err => {
        throw err;
    });
})
app.put('/order/:id', (req, res) => {
    console.log('put called ==> ' + req.body.booktitle);
    Order.findById(req.params.id).then((order) => {
        order.customerName = req.body.customername,
            order.bookTitle = req.body.booktitle,
            order.issueDate = req.body.issuedate,
            order.endDate = req.body.enddate
        order.save()
            .then(() => res.send('Order updated'))
            .catch((err) => {
                throw err;
            })
    });
});

app.get("/healthcheck", (req, res) => {
    res.send(200);
});

app.listen(6000, () => {
    console.log('up and running - Orders service');
});