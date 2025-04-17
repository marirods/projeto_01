/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const EmpresasDAO = require('../../model/DAO/empresas.js')

 //Função para inserir uma nova empresa
 const inserirEmpresas = async function(empresas, contentType){
    try {
        
        if(contentType == 'application/json'){
        if(
            empresas.nome                    == undefined || empresas.nome == ''                  || empresas.nome            == null   || empresas.nome.length                       > 100 ||
            empresas.segmento                == undefined || empresas.segmento == ''              || empresas.segmento        == null   || empresas.segmento.length                   > 40 ||
            empresas.pais_origem             == undefined || empresas.pais_origem == ''           || empresas.pais_origem     == null   || empresas.pais_origem.length                > 50 
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultEmpresas = await EmpresasDAO.insertEmpresas(empresas)

        if(resultEmpresas)
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
 const atualizarEmpresas = async function(empresas, id, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                empresas.nome                    == undefined || empresas.nome == ''                  || empresas.nome         == null              || empresas.nome.length                       > 100 ||
                empresas.segmento                == undefined || empresas.segmento == ''              || empresas.segmento     == null              || empresas.segmento.length                   > 40 ||
                empresas.pais_origem             == undefined || empresas.pais_origem == ''           || empresas.pais_origem  == null              || empresas.pais_origem.length                > 50 ||
                id                               == undefined || id == ''                             || id                    == null              || isNaN (id)                                      || id <=0
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultEmpresas = await buscarEmpresas(parseInt(idEmpresas))

                if(resultEmpresas.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    empresas.id = parseInt(idEmpresas)
                    let result = await EmpresasDAO.updateEmpresas(empresas)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultEmpresas.status_code == 404){
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
const excluirEmpresas = async function(idEmpresas){
    try {

        if (idEmpresas == undefined || idEmpresas == '' || isNaN(idEmpresas)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(idEmpresas){
            let verificar = await EmpresasDAO.selectByIdEmpresas(idEmpresas);
            let resultJogo = await EmpresasDAO.deleteEmpresas(idEmpresas);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultJogo){
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
const listarEmpresas = async function(){
    try {
        let dadosEmpresas = {}

     //Chama a função para retornar os dados do jogo
     let resultEmpresas = await EmpresasDAO.selectAllEmpresas()
    //  console.log(resultEmpresas);
     
     if(resultEmpresas != false || typeof(resultEmpresas) == 'object'){

        if(resultEmpresas.length > 0){

        }

        //Cria um objeto do tipo JSON para retornar a lista de jogos
        if(resultEmpresas.length > 0){
            dadosEmpresas.status = true
            dadosEmpresas.status_code = 200
            dadosEmpresas.items = resultEmpresas.length
            dadosEmpresas.games = resultEmpresas

            return dadosEmpresas //200
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
const buscarEmpresas = async function(idEmpresas) {
    try {
        let dadosEmpresas = {};

        if (idEmpresas == undefined || idEmpresas == '' || isNaN(idEmpresas)) {
            
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        let resultEmpresas = await EmpresasDAO.selectByIdEmpresas(idEmpresas);

        if (resultEmpresas && resultEmpresas.length > 0) {
            dadosEmpresas.status = true;
            dadosEmpresas.status_code = 200;
            dadosEmpresas.items = resultEmpresas.length;
            dadosEmpresas.games = resultEmpresas;

            return dadosEmpresas
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {
        console.log(error);
        
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirEmpresas,
    atualizarEmpresas,
    excluirEmpresas,
    listarEmpresas,
    buscarEmpresas
}