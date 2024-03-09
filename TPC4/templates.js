
exports.mainPage = (d) => {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
            <link rel="icon" href="favicon.png">
            <title>Gestão de compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Gestão de compositores</h1>
                </header>
                <div class="w3-container w3-sand">
                    <ul>
                        <li><h2><a href="compositores">Lista de Compositores</a></h2></li>
                        <li><h2><a href="periodos">Lista de Períodos</a></h2></li>
                    </ul>
                </div>

            </div>
            <footer class="w3-container w3-blue">
                <h5>Gerado por EngWeb2024 in ${d}</h5>
            </footer>
        </body>
    </html>`

    return pagHTML
}

exports.composerPage = function( c, d ){
    console.log(c)
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${c.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Compositor ${c.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome:</b> ${c.nome}</li>
                    <li><b>Bio:</b> ${c.bio}</li>
                    <li><b>Data de Nascimento:</b> ${c.dataNasc}</li>
                    <li><b>Data de Óbito:</b> ${c.dataObito}</li>
                    <li><b>Periodo:</b>${c.periodo}</li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por EngWeb2024 in ${d} - [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}


exports.composersListPage = (clist, d) => {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
            <link rel="icon" href="favicon.png">
            <title>Gestão de compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de compositores
                        <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Periodo</th>
                            <th>Actions</th>
                        </tr>`
    for(let i = 0; i < clist.length; i++){
        pagHTML += `
                        <tr>
                            <td>${clist[i].id}</td>
                            <td>
                                <a href="/compositores/${clist[i].id}">${clist[i].nome}</a>
                            </td>
                            <td><a href="/compositores/${clist[i].periodo}">${clist[i].periodo}</a></td>
                            <td>
                                [<a href="/compositores/edit/${clist[i].id}">Editar</a>]
                                [<a href="/compositores/delete/${clist[i].id}">Apagar</a>]    
                            </td>
                        </tr>`
    }
    pagHTML += `
                    </table>
                </div>

            </div>
            <footer class="w3-container w3-blue">
                <h5>Gerado por EngWeb2024 in ${d}</h5>
            </footer>
        </body>
    </html>`

    return pagHTML
}

exports.composerFormPage = (d) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composer Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Composer Form
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>

                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/compositores">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.composerFormEditPage = function(c, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Composer Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Composer Form
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label><b>Id:</b></label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${c.id}"/>
                        <label><b>Nome:</b></label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${c.nome}"/>
                        <label><b>Bio:</b></label>
                        <input class="w3-input w3-round" type="textarea" name="bio" value="${c.bio}"/>
                        <label><b>Data Nascimento:</b></label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${c.dataNasc}"/>
                        <label><b>Data Óbito:</b></label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${c.dataObito}"/>
                        <label><b>Período:</b></label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${c.periodo}"/>
                    </fieldset>
                    `              

    pagHTML += `
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/compositores">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------

exports.periodPage = function( p, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Período: ${p.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Período ${p.id}
                    <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                </h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${p.nome}</li>
                    <li><b>Compositores:</b>`
                    
    for(const id in p.compositores)
        pagHTML +=`<a href="/compositores/${id}">${p.compositores[id]}</a> `

    pagHTML +=`
                    </li>
                </ul>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por EngWeb2024 in ${d} - [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}


exports.periodsListPage = (plist, d) => {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css">
            <link rel="icon" href="favicon.png">
            <title>Gestão de Períodos</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1>Lista de períodos
                        <a class="w3-btn w3-round w3-grey" href="/periodos/registo">+</a>
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Actions</th>
                        </tr>`
    for(let i = 0; i < plist.length; i++){
        pagHTML += `
                        <tr>
                            <td>${plist[i].id}</td>
                            <td>
                                <a href="/periodos/${plist[i].id}">
                                ${plist[i].nome}
                                </a>
                            </td>
                            <td>
                                [<a href="/periodos/edit/${plist[i].id}">Editar</a>]
                                [<a href="/periodos/delete/${plist[i].id}">Apagar</a>]    
                            </td>
                        </tr>`
    }
    pagHTML += `
                    </table>
                </div>

            </div>
            <footer class="w3-container w3-blue">
                <h5>Gerado por EngWeb2024 in ${d}</h5>
            </footer>
        </body>
    </html>`

    return pagHTML
}

exports.periodFormPage = (d) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Period Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Period Form
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Compositores</label>
                        <input class="w3-input w3-round" type="text" name="compositores"/>
                    </fieldset>

                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/periodos">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.periodFormEditPage = function(p, d){
    console.log(p.compositores)
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Period Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Period Form
                        <a class="w3-btn w3-round w3-khaki" href="/">Início</a>
                    </h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label><b>Id:</b></label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${p.id}"/>
                        <label><b>Nome:</b></label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${p.nome}"/>
                        <label><b>Bio:</b></label>
                        <input class="w3-input w3-round" type="textarea" name="bio" value="${JSON.stringify(p.compositores).replace(/\n/g, "")}"/>
                    </fieldset>
                    `              

    pagHTML += `
                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/periodos">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}
