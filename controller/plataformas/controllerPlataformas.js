/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const PlataformasDAO = require('../../model/DAO/plataformas.js')

 //Função para inserir uma nova empresa
 const inserirPlataformas = async function(plataformas, contentType){
    try {
        if(contentType == 'application/json'){
        if(
            plataformas.nome                         == undefined || plataformas.nome == ''                  || plataformas.nome              == null   || plataformas.nome.length                       > 45 ||
            plataformas.fabricante                   == undefined || plataformas.fabricante == ''            || plataformas.fabricante        == null   || plataformas.fabricante.length                 > 45 ||
            plataformas.dispositivo                  == undefined || plataformas.dispositivo == ''              || plataformas.dispositivo       == null   || plataformas.dispositivo.length                   > 50 
           
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultPlataformas = await PlataformasDAO.insertPlataformas(plataformas)

        if(resultPlataformas)
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
 const atualizarPlataformas = async function(plataformas, idPlataformas, contentType){
     try {        
        if(contentType == 'application/json'){
            if(
                plataformas.nome                         == undefined || plataformas.nome == ''                       || plataformas.nome              == null   || plataformas.nome.length                            > 45||
                plataformas.fabricante                   == undefined || plataformas.fabricante == ''                 || plataformas.fabricante        == null   || plataformas.fabricante.length                      > 45||
                plataformas.dispositivo                  == undefined || plataformas.dispositivo == ''                || plataformas.dispositivo       == null   || plataformas.dispositivo.length                     > 50 
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultPlataformas = await buscarPlataformas(parseInt(idPlataformas))
                console.log(resultPlataformas.status_code === 200);
                

                if(resultPlataformas.status_code === 200 ){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    plataformas.id = parseInt(idPlataformas)
                    let result = await PlataformasDAO.updatePlataformas(plataformas)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultPlataformas.status_code == 404){
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
const excluirPlataformas = async function(idPlataformas){
    try {

        if (idPlataformas == undefined || idPlataformas == '' || isNaN(idPlataformas)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(idPlataformas){
            let verificar = await PlataformasDAO.selectByIdPlataformas(idPlataformas);
            let resultPlataformas = await PlataformasDAO.deletePlataformas(idPlataformas);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultPlataformas){
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
const listarPlataformas = async function(){
    try {
        let dadosPlataformas = {}

     //Chama a função para retornar os dados do jogo
     let resultPlataformas = await PlataformasDAO.selectAllPlataformas()
     if(resultPlataformas != false || typeof(resultPlataformas) == 'object'){

     if(resultPlataformas.length > 0){

     }

    //Cria um objeto do tipo JSON para retornar a lista de jogos
     if(resultPlataformas.length > 0){
        dadosPlataformas.status = true
        dadosPlataformas.status_code = 200
        dadosPlataformas.items = resultPlataformas.length
        dadosPlataformas.games = resultPlataformas

        return dadosPlataformas //200
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
const buscarPlataformas = async function(idPlataformas) {
    try {
        let dadosPlataformas = {};

        if (idPlataformas == undefined || idPlataformas == '' || isNaN(idPlataformas)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        let resultPlataformas = await PlataformasDAO.selectByIdPlataformas(idPlataformas);

        if (resultPlataformas && resultPlataformas.length > 0) {
            dadosPlataformas.status = true;
            dadosPlataformas.status_code = 200;
            dadosPlataformas.items = resultPlataformas.length;
            dadosPlataformas.games = resultPlataformas;

            return dadosPlataformas
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirPlataformas,
    atualizarPlataformas,
    excluirPlataformas,
    listarPlataformas,
    buscarPlataformas
}