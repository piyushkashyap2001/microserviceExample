const express = require('express');
const router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = process.env.BOOKSERVICE;
const api = apiAdapter(BASE_URL)

router.get('/books', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.get('/book/:id', (req, res) => {
  api.get(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.post('/book', (req, res) => {
  api.post(req.path, req.body).then(resp => {
    res.send(resp.data)
  })
})

router.delete('/book/:id', (req, res) => {
  api.delete(req.path).then(resp => {
    res.send(resp.data)
  })
})

router.put('/book/:id', (req, res) => {
  api.put(req.path).then(resp => {
    res.send(resp.data)
  })
})


module.exports = router