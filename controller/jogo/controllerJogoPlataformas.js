/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoPlataformasDAO = require('../../model/DAO/jogo_plataformas.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirJogoPlataformas = async function(jogoPlataformas, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    jogoPlataformas.id_jogo                 == ''                || jogoPlataformas.id_jogo         == undefined          || jogoPlataformas.id_jogo  == null       || isNaN(jogoPlataformas.id_jogo)        || jogoPlataformas.id_jogo          <=0 ||
                    jogoPlataformas.id_plataformas            == ''              || jogoPlataformas.id_plataformas    == undefined        || jogoPlataformas.id_plataformas == null || isNaN(jogoPlataformas.id_plataformas) || jogoPlataformas.id_plataformas   <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultplataformas = await jogoPlataformasDAO.selectByIdJogoPlataformas

                    if(resultplataformas)
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
const atualizarJogoPlataformas = async function(id, jogoPlataformas, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                           == undefined    || id                            == null || isNaN(id)                          || id                          <= 0   ||
                jogoPlataformas.id_jogo                 == ''           || jogoPlataformas.id_jogo        == undefined    || jogoPlataformas.id_jogo         == null || isNaN(jogoPlataformas.id_jogo)       || jogoPlataformas.id_jogo       <=0 ||
                jogoPlataformas.id_plataformas            == ''           || jogoPlataformas.id_plataformas   == undefined    || jogoPlataformas.id_plataformas    == null || isNaN(jogoPlataformas.id_plataformas)  || jogoPlataformas.id_plataformas  <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultplataformas = await jogoPlataformasDAO.selectByIdJogoPlataformas(parseInt(id))

                    if(resultplataformas != false || typeof(resultplataformas) == 'object'){
                        if(resultplataformas.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            plataformas.id = parseInt(id)

                            let result = await jogoPlataformasDAO.updateJogoPlataformas(jogoPlataformas)

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
const excluirJogoPlataformas = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultplataformas = await jogoPlataformasDAO.selectByIdJogoPlataformas(parseInt(id))

            if(resultplataformas != false || typeof(resultplataformas) == 'object'){
                //Se existir, faremos o delete
                if(resultplataformas.length > 0){
                    //delete
                    let result = await jogoPlataformasDAO.deleteJogoPlataformas(parseInt(id))

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
const listarJogoPlataformas = async function(){
    try {
        //Objeto do tipo JSON
        let dadosplataformas = {}
        //Chama a função para retornar os generos cadastrados
        let resultplataformas = await jogoPlataformasDAO.selectAllJogoPlataformas()

        if(resultplataformas != false || typeof(resultplataformas) == 'object'){
            if(resultplataformas.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosplataformas.status = true
                dadosplataformas.status_code = 200
                dadosplataformas.items = resultplataformas.length
                dadosplataformas.jogo = resultplataformas

                return dadosplataformas
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
const buscarJogoPlataformas = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosplataformas = {}

            let resultplataformas = await jogoPlataformasDAO.selectByIdJogoPlataformas(parseInt(id))
            
            if(resultplataformas != false || typeof(resultplataformas) == 'object'){
                if(resultplataformas.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosplataformas.status = true
                     dadosplataformas.status_code = 200
                     dadosplataformas.plataforma = resultplataformas

                    return dadosplataformas //200
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

const buscarPlataformasPorJogo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosplataformas = {}

            let resultplataformas = await jogoPlataformasDAO.selectPlataformasByIdJogo(parseInt(id))
            
            if(resultplataformas != false || typeof(resultplataformas) == 'object'){
                if(resultplataformas.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosplataformas.status = true
                    dadosplataformas.status_code = 200
                    dadosplataformas.plataforma = resultplataformas

                    return dadosplataformas //200
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
    inserirJogoPlataformas,
    atualizarJogoPlataformas,
    excluirJogoPlataformas,
    listarJogoPlataformas,
    buscarJogoPlataformas,
    buscarPlataformasPorJogo
} 