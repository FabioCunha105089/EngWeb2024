module.exports = router;
var express = require('express')
var router = express.Router()
var Modalidade = require('../controllers/modalidade')

router.get('/', (req, res, next) => {
    Modalidade.listSports()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
})

router.get('/:mod', (req, res, next) => {
    Modalidade.listPeople(req.params.mod)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
})

module.exports = router