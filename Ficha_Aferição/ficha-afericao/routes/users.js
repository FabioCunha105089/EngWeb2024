module.exports = router;
var express = require('express')
var router = express.Router()
var User = require('../controllers/user')

router.get('/', (req, res, next) => {
    User.list()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
})

router.post('/', (req, res, next) => {
    User.insert(req.body)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
})

router.put('/:id', (req, res, next) => {
    User.update(req.params.id, req.body)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
})

router.delete('/:id', (req, res, next) => {
    User.delete(req.params.id)
        .then(data => {
            console.log('Deleted ' + req.params.id)
            res.json(data)
        })
        .catch(erro => res.jsonp(erro))
})

module.exports = router