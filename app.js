/*******************************************************************************************************************
 * Objetivo : API referente ao projeto de controle de jogos
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * Observação: 
 ************** Para configurar e instalar a API, precisamos das seguintes bibliotecas:
*                             express          npm install express --save
*                             cors             npm install cors --save
*                              body-parser      npm install body-parser --save 
*                              
************* Para configurar e Instalar o acesso ao Banco de Dados precisamos:
*                    prisma           npm install prisma --save (conexão com o BD)
*                    prisma/client    npm install @prisma/client --save (Executa scripts no BD)

* ***************************** Após a instalação do prisma e do prisma client, devemos:
                                    npx prisma init (Inicializar o prisma no projeto)
Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
npx prisma migrate dev
*****************************************************************************************************************/

//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo o formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Comfigurações do cors
app.use((request, response, next) =>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')


    app.use(cors())
    next()
})


//jogo

//Endpoint para inserir um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})



app.get('/v1/controle-jogos/jogo/:id', cors(), async function(request, response){
    let id = request.params.id
    let resultJogo = await controllerJogo.buscarJogo(id)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.delete('/v1/controle-jogos/jogo/delete/:id', cors(), async function(request, response){
    let id = request.params.id
    let resultJogo = await controllerJogo.excluirJogo(id)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idJogo = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

// *****************************************************************************************************************/
// Empresas

const controllerEmpresas = require('./controller/empresas/controllerEmpresas.js')


//Endpoint para inserir uma empresa no BD
app.post('/v1/controle-empresas/empresas', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultEmpresas = await controllerEmpresas.inserirEmpresas(dadosBody, contentType)

    response.status(resultEmpresas.status_code)
    response.json(resultEmpresas)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-empresas/empresas',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultEmpresas = await controllerEmpresas.listarEmpresas()

    response.status(resultEmpresas.status_code)
    response.json(resultEmpresas)
})


//buscar pelo id
app.get('/v1/controle-empresas/empresas/:id', cors(), async function(request, response){
    let idEmpresas = request.params.id
    let resultEmpresas = await controllerEmpresas.buscarEmpresas(idEmpresas)

    response.status(resultEmpresas.status_code)
    response.json(resultEmpresas)
})


//deletar
app.delete('/v1/controle-empresas/empresas/delete/:id', cors(), async function(request, response){
    let idEmpresas = request.params.id
    let resultEmpresas = await controllerEmpresas.excluirEmpresas(idEmpresas)

    response.status(resultEmpresas.status_code)
    response.json(resultEmpresas)
})

app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idEmpresas = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultEmpresas = await controllerEmpresas.atualizarEmpresas(dadosBody, idEmpresas, contentType)

    response.status(resultEmpresas.status_code)
    response.json(resultEmpresas)
})


//*****************************************************************************************************************/
//Usuário

const controllerUsuario = require('./controller/usuario/controllerUsuario.js')


app.post('/v1/controle-usuario/usuario', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultUsuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-usuario/usuario',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultUsuario = await controllerUsuario.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})


//buscar pelo id
app.get('/v1/controle-usuario/usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})


//deletar
app.delete('/v1/controle-usuario/usuario/delete/:id', cors(), async function(request, response){
    let idUsuario = request.params.id
    let resultUsuario = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-usuario/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idUsuario = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultUsuario = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

//*****************************************************************************************************************/
//Plataformas



const controllerPlataformas = require('./controller/plataformas/controllerPlataformas.js')


app.post('/v1/controle-plataformas/plataformas', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultPlataformas = await controllerPlataformas.inserirPlataformas(dadosBody, contentType)

    response.status(resultPlataformas.status_code)
    response.json(resultPlataformas)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-plataformas/plataformas',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultPlataformas = await controllerPlataformas.listarPlataformas()

    response.status(resultPlataformas.status_code)
    response.json(resultPlataformas)
})


//buscar pelo id
app.get('/v1/controle-plataformas/plataformas/:id', cors(), async function(request, response){
    let idPlataformas = request.params.id
    let resultPlataformas = await controllerPlataformas.buscarPlataformas(idPlataformas)

    response.status(resultPlataformas.status_code)
    response.json(resultPlataformas)
})


//deletar
app.delete('/v1/controle-plataformas/plataformas/delete/:id', cors(), async function(request, response){
    let idPlataformas = request.params.id
    let resultPlataformas = await controllerPlataformas.excluirPlataformas(idPlataformas)

    response.status(resultPlataformas.status_code)
    response.json(resultPlataformas)
})

app.put('/v1/controle-plataformas/plataformas/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idPlataformas = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultPlataformas = await controllerPlataformas.atualizarPlataformas(dadosBody, idPlataformas, contentType)

    response.status(resultPlataformas.status_code)
    response.json(resultPlataformas)
})

//*****************************************************************************************************************/
//Classificação Etária


const controllerClassificacao = require('./controller/classificacao_etaria/controllerClassificacaoEtaria.js')


app.post('/v1/controle-classificacoes/classificacoes', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultClassificacao = await controllerClassificacao.inserirClassificacao_Etaria(dadosBody, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-classificacoes/classificacoes',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultClassificacao = await controllerClassificacao.listarClassificacao_Etaria()

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})


//buscar pelo id
app.get('/v1/controle-classificacoes/classificacoes/:id', cors(), async function(request, response){
    let idClassificacao = request.params.id
    let resultClassificacao = await controllerClassificacao.buscarClassificacao_Etaria(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})


//deletar
app.delete('/v1/controle-classificacoes/classificacoes/delete/:id', cors(), async function(request, response){
    let idClassificacao = request.params.id
    let resultClassificacao = await controllerClassificacao.excluirClassificacao_Etaria(idClassificacao)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

app.put('/v1/controle-classificacoes/classificacoes/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idClassificacao = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultClassificacao = await controllerClassificacao.atualizarClassificacao_Etaria(dadosBody, idClassificacao, contentType)

    response.status(resultClassificacao.status_code)
    response.json(resultClassificacao)
})

//*****************************************************************************************************************/
//Categoria

const controllerCategoria = require('./controller/categoria/controllerCategoria.js')


app.post('/v1/controle-categorias/categorias', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultCategoria = await controllerCategoria.inserirCategoria(dadosBody, contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-categorias/categorias',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultCategoria = await controllerCategoria.listarCategoria()

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})


//buscar pelo id
app.get('/v1/controle-categorias/categorias/:id', cors(), async function(request, response){
    let idCategoria = request.params.id
    let resultCategoria = await controllerCategoria.buscarCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})


//deletar
app.delete('/v1/controle-categorias/categorias/delete/:id', cors(), async function(request, response){
    let idCategoria = request.params.id
    let resultCategoria = await controllerCategoria.excluirCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.put('/v1/controle-categorias/categorias/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idCategoria = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultCategoria = await controllerCategoria.atualizarCategoria(dadosBody, idCategoria, contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})


//*****************************************************************************************************************/
//Idiomas

const controllerIdiomas = require('./controller/idiomas/controllerIdiomas.js')


app.post('/v1/controle-idioma/idioma', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content type para validar o tipo de dados da requisição
   let contentType = request.headers['content-type']

    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultIdiomas = await controllerIdiomas.inserirIdiomas(dadosBody, contentType)

    response.status(resultIdiomas.status_code)
    response.json(resultIdiomas)
})




//Endpoint para retornar uma lista de jogos
app.get('/v1/controle-idioma/idioma',  cors(), async function(request, response){
    //Chama a função para listar os jogos
    let resultIdiomas = await controllerIdiomas.listarIdiomas()

    response.status(resultIdiomas.status_code)
    response.json(resultIdiomas)
})


//buscar pelo id
app.get('/v1/controle-idioma/idioma/:id', cors(), async function(request, response){
    let idIdioma = request.params.id
    let resultIdiomas = await controllerIdiomas.buscarIdiomas(idIdioma)

    response.status(resultIdiomas.status_code)
    response.json(resultIdiomas)
})


//deletar
app.delete('/v1/controle-idioma/idioma/delete/:id', cors(), async function(request, response){
    let idIdioma = request.params.id
    let resultIdiomas = await controllerIdiomas.excluirIdiomas(idIdioma)

    response.status(resultIdiomas.status_code)
    response.json(resultIdiomas)
})

app.put('/v1/controle-idioma/idioma/:id', cors(), bodyParserJSON, async function(request, response){

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Recebe o ID do jogo
    let idIdioma = request.params.id

    //Recebe os dados do jogo encaminhando no body da requisição
    let dadosBody = request.body

    let resultIdiomas = await controllerIdiomas.atualizarIdiomas(dadosBody, idIdioma, contentType)

    response.status(resultIdiomas.status_code)
    response.json(resultIdiomas)
})




app.listen(8080, function(){
    console.log('API aguardando requisições ...')
})