/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoCategoriaDAO = require('../../model/DAO/jogo_categoria.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirJogoCategoria = async function(jogoCategoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    jogoCategoria.id_jogo              == ''              || jogoCategoria.id_jogo     == undefined        || jogoCategoria.id_jogo  == null || isNaN(jogoCategoria.id_jogo)  || jogoCategoria.id_jogo <=0 ||
                    jogoCategoria.id_categoria            == ''           || jogoCategoria.id_categoria    == undefined    || jogoCategoria.id_categoria == null || isNaN(jogoCategoria.id_categoria) || jogoCategoria.id_categoria<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultcategoria = await jogoCategoriaDAO.insertJogoCategoria(jogoCategoria)

                    if(resultcategoria)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarJogoCategoria = async function(id, jogoCategoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                           == undefined    || id                            == null || isNaN(id)                          || id                          <= 0   ||
                jogoCategoria.id_jogo                 == ''           || jogoCategoria.id_jogo        == undefined    || jogoCategoria.id_jogo         == null || isNaN(jogoCategoria.id_jogo)       || jogoCategoria.id_jogo       <=0 ||
                jogoCategoria.id_categoria            == ''           || jogoCategoria.id_categoria   == undefined    || jogoCategoria.id_categoria    == null || isNaN(jogoCategoria.id_categoria)  || jogoCategoria.id_categoria  <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultcategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id))

                    if(resultcategoria != false || typeof(resultcategoria) == 'object'){
                        if(resultcategoria.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            categoria.id = parseInt(id)

                            let result = await jogoCategoriaDAO.updateJogoCategoria(jogoCategoria)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirJogoCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultcategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id))

            if(resultcategoria != false || typeof(resultcategoria) == 'object'){
                //Se existir, faremos o delete
                if(resultcategoria.length > 0){
                    //delete
                    let result = await jogoCategoriaDAO.deleteJogoCategoria(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarJogoCategoria = async function(){
    try {
        //Objeto do tipo JSON
        let dadoscategoria = {}
        //Chama a função para retornar os generos cadastrados
        let resultcategoria = await jogoCategoriaDAO.selectAllJogoCategoria()

        if(resultcategoria != false || typeof(resultcategoria) == 'object'){
            if(resultcategoria.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadoscategoria.status = true
                dadoscategoria.status_code = 200
                dadoscategoria.items = resultcategoria.length
                dadoscategoria.jogos = resultcategoria

                return dadoscategoria
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarJogoCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadoscategoria = {}

            let resultcategoria = await jogoCategoriaDAO.selectByIdJogoCategoria(parseInt(id))
            
            if(resultcategoria != false || typeof(resultcategoria) == 'object'){
                if(resultcategoria.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadoscategoria.status = true
                     dadoscategoria.status_code = 200
                     dadoscategoria.categoria = resultcategoria

                    return dadoscategoria //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarCategoriaPorJogo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadoscategoria = {}

            let resultgenero = await filmeGeneroDAO.selectGeneroByIdFilme(parseInt(idFilme))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}







module.exports = {
    inserirJogoCategoria,
    atualizarJogoCategoria,
    excluirJogoCategoria,
    listarJogoCategoria,
    buscarJogoCategoria,
    buscarCategoriaPorJogo
} 