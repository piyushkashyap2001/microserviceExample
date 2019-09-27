const express = require('express');
const router = express.Router()
const apiAdapter = require('./apiAdapter')


const BASE_URL = process.env.CUSTOMERSERVICE;
const api = apiAdapter(BASE_URL)

router.get('/customers', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.get('/customer/:id', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.post('/customer', (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

router.delete('/customer/:id', (req, res) => {
  api.delete(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.put('/customer/:id', (req, res) => {
  api.put(req.path).then(resp => {
    res.send(resp.data)
  })
})

module.exports = router