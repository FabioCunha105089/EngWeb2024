var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
    .then(resp => {
      var compositores = resp.data
      res.status(200).render("composersListPage", { "lCompositores": compositores, "date": d })
    })
    .catch(erro => {
      res.status(501).render("error", { "error": erro })
    })
});

router.get('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("composerFormPage", { "date": d })
});

router.post('/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var result = req.body
  axios.post("http://localhost:3000/compositores", result)
    .then(resp => {
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(502).render("error", { "error": erro })

    })
});

router.get(/\/C[0-9]+$/, function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.url.substring(1))
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("composerPage", { "compositor": compositor, "date": d })
    })
    .catch(erro => {
      res.status(503).render("error", { "error": erro })
    })
});

router.get('/:periodo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?periodo=" + req.params.periodo)
    .then(resp => {
      var compositores = resp.data
      res.status(200).render('composersListPage', { "lCompositores": compositores, "date": d })
      res.end()
    })
    .catch(erro => {
      res.status(520).render("error", { "error": erro })
    })
});

router.get('/edit/:idCompositor', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then(resp => {
      var compositor = resp.data
      res.status(200).render("composerFormEditPage", { "compositor": compositor, "date": d })
    })
    .catch(erro => {
      res.status(504).render("error", { "error": erro })
    })
});

router.post('/edit/:idCompositor', function (req, res, next) {
  var compositor = req.body
  axios.put("http://localhost:3000/compositores/" + req.params.idCompositor, compositor)
    .then(resp => {
      res.status(201).redirect('/')
    })
    .catch(erro => {
      res.status(506).render("error", { "error": erro })
    })
});

router.get('/delete/:idCompositor', function (req, res, next) {
  axios.delete("http://localhost:3000/compositores/" + req.params.idCompositor)
    .then(resp => {
      res.redirect('/compositores')
    })
    .catch(erro => {
      res.status(505).render("error", { "error": erro })
    })
});

module.exports = router;
