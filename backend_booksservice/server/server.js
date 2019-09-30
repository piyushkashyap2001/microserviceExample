const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
//connect
require('./Book');
const Book = mongoose.model('Book');

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
//'mongodb://username:password@localhost:27017/books'    
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

app.get('/', (req, res) => {
    res.send('this is book main endpoint');
});

app.post('/book', (req, res) => {
    console.log('creating new book ==>' + req);
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
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
    console.log('getting all books ==>' + req);
    Book.find().then((books) => {
        console.log(books)
        res.json(books)
    }).catch(err => {
        throw err;
    });
});

app.get('/book/:id', (req, res) => {
    console.log('get particular book ==>' + req);
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
    console.log('delete a book ==>' + req);
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send('book deleted');
    }).catch(err => {
        throw err;
    });
})

app.put('/book/:id', (req, res) => {
    console.log('update a book ==>' + req);
    Book.findById(req.params.id).then((book) => {
        book.title = req.body.title,
            book.author = req.body.author,
            book.numberPages = req.body.numberPages,
            book.publisher = req.body.publisher
        book.save()
            .then(() => res.send('Book updated'))
            .catch((err) => {
                throw err;
            })
    });
});

app.get("/healthcheck", (req, res) => {
    res.send(200);
});

app.listen(4000, () => {
    console.log("up and running ! -- book service");
});