const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers/router')
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})
app.get("/healthcheck", (req, res) => {
    res.send(200);
});

app.use(router)

console.log("Simple API Gateway run on localhost:8000")

app.listen(8000);
