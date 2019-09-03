const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
//connect
require('./Book');
const Book = mongoose.model('Book');
mongoose.connect('mongodb://', () => {
    console.log('database is connected');
});

app.get('/', (req, res) => {
    res.send('this is our main endpoint');
});

app.post('/book', (req, res) => {
    console.log(req.body);
    res.send('Testing our book route');
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.bodt.numberPages,
        publisher: req.body.publisher
    }

    var book = new Book(newBook);
    book.save().then(() => {
        console.log('new book created');
    }).catch((err) => {
        throw err;
    });
    res.send('new book created');
});

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        console.log(books)
        res.json(books)
    }).catch(err => {
        throw err;
    });
});

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        throw err;
    });
})

app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send('book deleted');
    }).catch(err => {
        throw err;
    });
})

app.listen(4545, () => {
    console.log("up and running ! -- THis is book service");
});