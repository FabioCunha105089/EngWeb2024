const http = require('http')
const url = require('url')
const axios = require('axios')

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)


    if (q.pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset:utf-8' })
        res.write(`
        <h1><b>Listas</b></h1>
        <ul>
        <li><a href="alunos">Lista de alunos</a></li>
        <li><a href="cursos">Lista de cursos</a></li>
        <li><a href="instrumentos">Lista de instrumentos</a></li>
        </ul>
        `)
        res.end()
    }

    else if (q.pathname == '/alunos') {
        axios.get("http://localhost:3000/alunos?_sort=nome")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<h1>Lista de alunos</h1>')
                res.write('<h3><a href="/">Voltar</a></h3>')
                res.write("<ul>")
                dados.data.forEach(a => {
                    res.write(`<li><a href='alunos/${a.id}'>${a.nome}</a></li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname == '/cursos') {
        axios.get("http://localhost:3000/cursos?_sort=designacao")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<h1>Lista de cursos</h1>')
                res.write('<h3><a href="/">Voltar</a></h3>')
                res.write("<ul>")
                dados.data.forEach(c => {
                    res.write(`<li><a href='cursos/${c.id}'>${c.designacao}</a></li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname == '/instrumentos') {
        axios.get("http://localhost:3000/instrumentos?_sort=text")
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write('<h1>Lista de instrumentos</h1>')
                res.write('<h3><a href="/">Voltar</a></h3>')
                res.write("<ul>")
                dados.data.forEach(i => {
                    res.write(`<li>${i.text}</li>`)
                });
                res.write("</ul>")
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname.match(/\/alunos\/\w+/)) {
        let id = q.pathname.substring(8)
        axios.get("http://localhost:3000/alunos?id=" + id)
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                a = dados.data[0]
                res.write(`
                <h2>${a.nome}</h2><br>
                <p><b>ID:</b> ${a.id}<br>
                <b>Data de nascimento:</b> ${a.dataNasc}<br>
                <b>Curso:</b> <a href ="/cursos/${a.curso}">${a.curso}</a><br>
                <b>Ano de curso:</b> ${a.anoCurso}<br>
                <b>Instrumento:</b> ${a.instrumento}</p>
                <h3><a href="/alunos">Voltar</a></h3>
                `)
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else if (q.pathname.match(/\/cursos\/\w+/)) {
        let id = q.pathname.substring(8)
        axios.get("http://localhost:3000/cursos?id=" + id)
            .then(dados => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                c = dados.data[0]
                res.write(`
                <h2>${c.designacao}</h2><br>
                <p><b>ID:</b> ${c.id}<br>
                <b>Duracao:</b> ${c.duracao}<br>
                <b>Instrumento:</b> ${c.instrumento.text}<br>
                <h3><a href="/cursos">Voltar</a></h3>
                `)
                res.end()
            })
            .catch(erro => {
                res.write("Erro: " + erro)
                res.end()
            })
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1>ERRO: 404 Not Found</h1>');
        res.end();
    }
}).listen(7777)

console.log("Servidor à escuta na porta 7777...")