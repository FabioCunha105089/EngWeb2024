var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET periods listing. */
router.get('/', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos?_sort=nome")
    .then(resp => {
      var periodos = resp.data
      res.status(200).render("periodsListPage", { "lPeriodos": periodos, "date": d })
    })
    .catch(erro => {
      res.status(501).render("error", { "error": erro })
    })
});

router.get('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("periodFormPage", {"date": d})
});

router.post('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/periodos", result)
  .then(resp => {
    res.status(201).redirect('/')
  })
  .catch(erro => {
    res.status(502).render("error", { "error": erro })

  })
});

router.get('/:idPeriodo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      var periodo = resp.data
      res.status(200).render("periodPage", { "periodo": periodo, "date": d })
    })
    .catch(erro => {
      res.status(503).render("error", { "error": erro })
    })
});

router.get('/edit/:idPeriodo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      var periodo = resp.data
      res.status(200).render("periodFormEditPage", { "periodo": periodo, "date": d })
    })
    .catch(erro => {
      res.status(504).render("error", { "error": erro })
    })
});

router.post('/edit/:idPeriodo', function (req, res, next) {
  var periodo = req.body
  axios.put("http://localhost:3000/periodos/" + req.params.idPeriodo, periodo)
    .then(resp => {
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", { "error": erro })
    })
});

router.get('/delete/:idPeriodo', function (req, res, next) {
  axios.delete("http://localhost:3000/periodos/" + req.params.idPeriodo)
    .then(resp => {
      res.redirect('/periodos')
    })
    .catch(erro => {
      res.status(505).render("error", { "error": erro })
    })
});

module.exports = router;
