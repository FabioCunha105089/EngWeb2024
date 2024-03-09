// compositores_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)) {
        static.serveStaticResource(req, res)
    }
    else {
        switch (req.method) {
            case "GET":
                if (req.url == '/') {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(templates.mainPage(d))
                    res.end()
                }
                // GET /compositores --------------------------------------------------------------------
                else if (req.url == '/compositores') {
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then(resp => {
                            var compositores = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.composersListPage(compositores, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter a lista de compositores</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }
                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/C[0-9]+$/i.test(req.url)) {
                    var idCompositor = req.url.split('/')[2]
                    axios.get("http://localhost:3000/compositores/" + idCompositor)
                        .then(resp => {
                            var compositor = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.composerPage(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter o compositor ${idCompositor}</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }             
                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == '/compositores/registo') {
                    res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                    res.write(templates.composerFormPage(d))
                    res.end()
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)) {
                    var idCompositor = req.url.split('/')[3]
                    axios.get("http://localhost:3000/compositores/" + idCompositor)
                        .then(resp => {
                            var compositor = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.composerFormEditPage(compositor, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter o compositor ${idCompositor}</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/C[0-9]+$/i.test(req.url)) {
                    var idCompositor = req.url.split('/')[3];
                    axios.delete("http://localhost:3000/compositores/" + idCompositor)
                        .then(() => {
                            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
                            res.write(`<p>Compositor ${idCompositor} apagado com sucesso.</p>`);
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { 'Content-type': 'text/html; charset=utf-8' });
                            res.write(`<p>Erro ao apagar o compositor ${idCompositor}:</p>`);
                            res.write(`<p>${error}</p>`);
                            res.end();
                        });
                }
                // GET /compositores/:periodo --------------------------------------------------------------------
                else if (/\/compositores\/\w+$/i.test(req.url)) {
                    var periodo = req.url.split('/')[2]
                    console.log(periodo)
                    axios.get("http://localhost:3000/compositores?periodo=" + periodo)
                        .then(resp => {
                            var compositores = resp.data
                            console.log(compositores)
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.composersListPage(compositores, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }                   
                //------------------------------------------------------------------------------------------------
                //---------------------------------------------------------------------------------------------

                // GET /periodos --------------------------------------------------------------------
                else if (req.url == '/periodos') {
                    axios.get("http://localhost:3000/periodos?_sort=nome")
                        .then(resp => {
                            var periodos = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.periodsListPage(periodos, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter a lista de periodos</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }
                // GET /periodos/:id --------------------------------------------------------------------
                else if (/\/periodos\/P[0-9]+$/i.test(req.url)) {
                    var idPeriodo = req.url.split('/')[2]
                    axios.get("http://localhost:3000/periodos/" + idPeriodo)
                        .then(resp => {
                            console.log(resp.data)
                            var periodo = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.periodPage(periodo, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter o periodo ${idPeriodo}</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }
                // GET /periodos/registo --------------------------------------------------------------------
                else if (req.url == '/periodos/registo') {
                    res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                    res.write(templates.periodFormPage(d))
                    res.end()
                }
                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P[0-9]+$/i.test(req.url)) {
                    var idPeriodo = req.url.split('/')[3]
                    axios.get("http://localhost:3000/periodos/" + idPeriodo)
                        .then(resp => {
                            var periodo = resp.data
                            res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                            res.write(templates.periodFormEditPage(periodo, d))
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(501, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter o periodo ${idPeriodo}</p>`)
                            res.write(`<p>Erro: ${erro}</p>`)
                            res.end()
                        })
                }
                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if (/\/periodos\/delete\/P[0-9]+$/i.test(req.url)) {
                    var idPeriodo = req.url.split('/')[3];
                    axios.delete("http://localhost:3000/periodos/" + idPeriodo)
                        .then(() => {
                            res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
                            res.write(`<p>Período ${idPeriodo} apagado com sucesso.</p>`);
                            res.end();
                        })
                        .catch(error => {
                            res.writeHead(500, { 'Content-type': 'text/html; charset=utf-8' });
                            res.write(`<p>Erro ao apagar o período ${idPeriodo}:</p>`);
                            res.write(`<p>${error}</p>`);
                            res.end();
                        });
                }
                // GET ? -> Lancar um erro
                else {
                    res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                    res.write(`<p>Método GET não suportado: ${req.url}</p>`)
                    res.write(`<p><a href="/">Return</a></p>`)
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == '/compositores/registo') {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores", result)
                                .then(resp => {
                                    console.log(resp.data)
                                    res.writeHead(201, { 'Content-type': 'charset="utf-8"' })
                                    res.end(`<p>Registo inserido: ${JSON.stringify(resp.data)}</p>`)

                                })
                                .catch(erro => {
                                    res.writeHead(503, { 'Content-type': 'charset="utf-8"' })
                                    res.write(`<p>Não foi possível inserir o registo</p>`)
                                    res.write(`Erro: ${erro}`)
                                    res.end()
                                })
                        }
                        else {
                            res.writeHead(502, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter os dados do body</p>`)
                            res.end()
                        }
                    })
                }
                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/C[0-9]+$/i.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/compositores/" + result.id, result)
                                .then(resp => {
                                    res.writeHead(201, { 'Content-type': 'charset="utf-8"' })
                                    res.end(`<p>Registo inserido: ${JSON.stringify(resp.data)}</p>`)

                                })
                                .catch(erro => {
                                    res.writeHead(503, { 'Content-type': 'charset="utf-8"' })
                                    res.write(`<p>Não foi inserir o registo</p>`)
                                    res.write(`Erro: ${erro}`)
                                    res.end()
                                })
                        }
                        else {
                            res.writeHead(507, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter os dados do body</p>`)
                            res.end()
                        }
                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                if (req.url == '/periodos/registo') {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/periodos", result)
                                .then(resp => {
                                    res.writeHead(201, { 'Content-type': 'charset="utf-8"' })
                                    res.end(`<p>Registo inserido: ${JSON.stringify(resp.data)}</p>`)

                                })
                                .catch(erro => {
                                    res.writeHead(503, { 'Content-type': 'charset="utf-8"' })
                                    res.write(`<p>Não foi possível inserir o registo</p>`)
                                    res.write(`Erro: ${erro}`)
                                    res.end()
                                })
                        }
                        else {
                            res.writeHead(502, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter os dados do body</p>`)
                            res.end()
                        }
                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if (/\/periodos\/edit\/P[0-9]+$/i.test(req.url)) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.put("http://localhost:3000/periodos/" + result.id, result)
                                .then(resp => {
                                    res.writeHead(201, { 'Content-type': 'charset="utf-8"' })
                                    res.end(`<p>Registo inserido: ${JSON.stringify(resp.data)}</p>`)

                                })
                                .catch(erro => {
                                    res.writeHead(503, { 'Content-type': 'charset="utf-8"' })
                                    res.write(`<p>Não foi inserir o registo</p>`)
                                    res.write(`Erro: ${erro}`)
                                    res.end()
                                })
                        }
                        else {
                            res.writeHead(507, { 'Content-type': 'charset="utf-8"' })
                            res.write(`<p>Não foi possível obter os dados do body</p>`)
                            res.end()
                        }
                    })
                }
                // POST ? -> Lancar um erro
                else {
                    res.writeHead(506, { 'Content-type': 'charset="utf-8"' })
                    res.write(`<p>Método POST não suportado: ${req.url}</p>`)
                    res.write(`<p><a href="/">Return</a></p>`)
                    res.end()
                }
                break
            default:
                // Outros metodos nao sao suportados
                res.writeHead(200, { 'Content-type': 'charset="utf-8"' })
                res.write(`<p>Método não suportado: ${req.method}</p>`)
                res.end()
                break
        }
    }
})

compositoresServer.listen(7778, () => {
    console.log("Servidor à escuta na porta 7777...")
})
