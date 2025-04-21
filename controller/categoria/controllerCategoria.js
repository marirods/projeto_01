/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const CategoriaDAO = require('../../model/DAO/categoria.js')

 //Função para inserir uma nova empresa
 const inserirCategoria = async function(categorias, contentType){
    try {
        if(contentType == 'application/json'){
        if(
            categorias.nome                          == undefined || categorias.nome     == ''                  || categorias.nome                 == null   || categorias.nome.length                       > 80 ||
            categorias.genero                        == undefined || categorias.genero == ''                    || categorias.genero               == null   || categorias.genero.length                     > 10 ||
            id                                       == undefined || id                           == ''         || id                              == null   || isNaN (id)                                        || id <=0
           
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultCategoria = await CategoriaDAO.insertCategoria(categorias)

        if(resultCategoria)
            return MESSAGE.SUCCESS_CREATED_ITEM //201
        else
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }

}else{
    return MESSAGE.ERROR_CONTENT_TYPE //415
}
 } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
 }

}

 //Função para atualizar uma empresa
 const atualizarCategoria = async function(categorias, idCategoria, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                categorias.nome                         == undefined || categorias.nome == ''                       || categorias.nome              == null   || categorias.nome.length                            > 80 ||
                categorias.genero                       == undefined || categorias.genero == ''                     || categorias.genero            == null   || categorias.genero.length                          > 10 ||
                id                                      == undefined || id == ''                                    || id                           == null   || isNaN (id)                                             || id <=0 || id <=0
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultCategoria = await buscarCategoria(parseInt(id))

                if(resultCategoria.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    categorias.id = parseInt(idCategoria)
                    let result = await CategoriaDAO.updateCategoria(categorias)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultCategoria.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

     } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500

     }
}

//Função para excluir um jogo
const excluirCategoria = async function(idCategoria){
    try {

        if (id == undefined || id == '' || isNaN(idCategoria)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(id){
            let verificar = await CategoriaDAO.selectByIdCategoria(idCategoria);
            let resultCategoria = await CategoriaDAO.deleteCategoria(idCategoria);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultCategoria){
                        return MESSAGE.SUCCESS_DELETE_ID
                    }else{
                        return MESSAGE.ERROR_NOT_DELETE
                    }
                }else{
                    return MESSAGE.ERROR_NOT_FOUND
                }
                
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

        
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para retornar todos os jogos
const listarCategoria = async function(){
    try {
        let dadosCategoria = {}

     //Chama a função para retornar os dados do jogo
     let resultCategoria = await CategoriaDAO.selectAllCategoria()
     if(resultCategoria != false || typeof(resultCategoria) == 'object'){

     if(resultCategoria.length > 0){

     }

    //Cria um objeto do tipo JSON para retornar a lista de jogos
     if(resultCategoria.length > 0){
        dadosCategoria.status = true
        dadosCategoria.status_code = 200
        dadosCategoria.items = resultCategoria.length
        dadosCategoria.games = resultCategoria

        return dadosCategoria //200
     }else{
        return MESSAGE.ERROR_NOT_FOUND //404
     }

    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
} catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para buscar um jogo
const buscarCategoria = async function(idCategoria) {
    try {
        let dadosCategoria = {};

        if (id == undefined || id == '' || isNaN(idCategoria)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        let resultCategoria = await CategoriaDAO.selectByIdCategoria(idCategoria);

        if (resultCategoria && resultCategoria.length > 0) {
            resultCategoria.status = true;
            dadosCategoria.status_code = 200;
            dadosCategoria.items = resultCategoria.length;
            dadosCategoria.games = resultCategoria;

            return dadosCategoria
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}