var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')


const BASE_URL = process.env.ORDERSERVICE;
const api = apiAdapter(BASE_URL)

router.get('/orders', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.get('/order/:id', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.post('/order', (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

router.delete('/order/:id', (req, res) => {
  api.delete(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.put('/order/:id', (req, res) => {
  api.put(req.path).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router