const mongoose = require('mongoose');

mongoose.model('Order', {
    customerName: {
        type: String,
        require: true
    },
    bookTitle: {
        type: String,
        require: true
    },
    issueDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    }

});