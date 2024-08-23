const express = require('express')
const bookController = require('./controllers/book')

const router = express.Router()

router.post('/book', bookController.create)
router.get('/book', bookController.findAll)
router.get('/book:id', bookController.findOne)
router.put('/book:id', bookController.update)
router.delete('/book/:id', bookController.destroy)
router.get('/:author',bookController.findAuthor)
router.get('/order',bookController.ascending)
router.get('/order',bookController.descending)
 


module.exports = router
