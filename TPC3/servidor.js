const http = require('http')
const url = require('url')
const axios = require('axios')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (q.pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write(`
        <h1><b>Listas</b></h1>
        <ul>
        <li><a href="filmes">Lista de filmes</a></li>
        <li><a href="generos">Lista de géneros</a></li>
        <li><a href="atores">Lista de atores</a></li>
        </ul>
        `)
        res.end()
    }
    else if (q.pathname == '/filmes') {
        axios.get("http://localhost:3000/filmes?_sort=title")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(`
                <head><style>ul { column-count: 4; }</style></head>
                <h1>Lista de filmes</h1>
                <h3><a href="/">Voltar</a></h3>
                <ul>`)
                dados.data.forEach(f => {
                    res.write(`<li><a href='filmes/${f.id}'>${f.title}</a></li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname == '/generos') {
        axios.get("http://localhost:3000/generos?_sort=nome")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(`
                <head><style>ul { column-count: 4; }</style></head>
                <h1>Lista de generos</h1>
                <h3><a href="/">Voltar</a></h3>
                <ul>`)
                dados.data.forEach(g => {
                    res.write(`<li><a href="generos/${g.id}">${g.nome}</a></li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname == '/atores') {
        axios.get("http://localhost:3000/atores?_sort=nome")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write(`
                <head><style>ul { column-count: 4; }</style></head>
                <h1>Lista de atores</h1>
                <h3><a href="/">Voltar</a></h3>
                <ul>`)
                dados.data.forEach(a => {
                    res.write(`<li><a href="atores/${a.id}">${a.nome}</a></li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname.match(/\/filmes\/\w+/)) {
        let id = q.pathname.substring(8)
        axios.get("http://localhost:3000/filmes?id=" + id)
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                f = dados.data[0]
                res.write(`
                <h1>${f.title}</h1>
                <p><b>ID:</b> ${f.id}<br>
                <b>Ano:</b> ${f.year}<br>
                <b>Atores:</b> ${f.cast}<br>
                <b>Generos:</b> ${f.genres}<br>
                <h3><a href="/filmes">Voltar</a></h3>
                `)
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname.match(/\/generos\/\w+/)) {
        let id = q.pathname.substring(9)
        axios.get("http://localhost:3000/generos?id=" + id)
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                g = dados.data[0]
                res.write(`
                <head><style>ul { column-count: 4; }</style></head>
                <h1>${g.nome}</h1>
                <h3><a href="/generos">Voltar</a></h3>
                <ul>
                `)
                g.filmes.forEach(f => {
                    res.write(`<li>${f}</li>`)
                })
                res.write('</ul>')
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname.match(/\/atores\/\w+/)) {
        let id = q.pathname.substring(8)
        axios.get("http://localhost:3000/atores?id=" + id)
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                a = dados.data[0]
                res.write(`
                <h1>${a.nome}</h1>
                <h3><a href="/atores">Voltar</a></h3>
                <ul>
                `)
                a.filmes.forEach(filme => {
                    res.write(`<li>${filme}</li>`)
                })
                res.write('</ul>')
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>ERRO: 404 Not Found</h1>');
        res.end();
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")