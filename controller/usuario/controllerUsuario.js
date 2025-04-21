/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const UsuarioDAO = require('../../model/DAO/usuario.js')

 //Função para inserir uma nova empresa
 const inserirUsuario = async function(usuarios, contentType){
    try {
        if(contentType == 'application/json'){
        if(
            usuarios.nome                    == undefined || usuarios.nome == ''                  || usuarios.nome            == null   || usuarios.nome.length                       > 80 ||
            usuarios.email                   == undefined || usuarios.email == ''                 || usuarios.email           == null   || usuarios.email.length                      > 10 ||
            usuarios.username                == undefined || usuarios.username == ''              || usuarios.username        == null   || usuarios.username.length                   > 10 ||
            id                               == undefined || id == ''                             || id                       == null   || isNaN (id)                                      || id <=0
           
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultUsuario = await UsuarioDAO.insertUsuario(usuarios)

        if(resultUsuario)
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
 const atualizarUsuario = async function(usuarios, idUsuario, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                usuarios.nome                    == undefined || usuarios.nome == ''                  || usuarios.nome            == null   || usuarios.nome.length                       > 80 ||
                usuarios.email                   == undefined || usuarios.email == ''                 || usuarios.email        == null      || usuarios.email.length                      > 10 ||
                usuarios.username                == undefined || usuarios.username == ''              || usuarios.username        == null   || usuarios.username.length                   > 10 ||
                id                               == undefined || id == ''                             || id                       == null   || isNaN (id)                                      || id <=0 || id <=0
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultUsuario = await buscarUsuario(parseInt(idUsuario))

                if(resultUsuario.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    usuarios.id = parseInt(idUsuario)
                    let result = await UsuarioDAO.updateUsuario(usuarios)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultUsuario.status_code == 404){
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
const excluirUsuario = async function(idUsuario){
    try {

        if (id == undefined || id == '' || isNaN(idUsuario)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(id){
            let verificar = await UsuarioDAO.selectByIdUsuario(idUsuario);
            let resultUsuario = await UsuarioDAO.deleteUsuario(idUsuario);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultUsuario){
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
const listarUsuario = async function(){
    try {
        let dadosUsuario = {}

     //Chama a função para retornar os dados do jogo
     let resultUsuario = await UsuarioDAO.selectAllUsuarios()
     if(resultUsuario != false || typeof(resultUsuario) == 'object'){

     if(resultUsuario.length > 0){

     }

    //Cria um objeto do tipo JSON para retornar a lista de jogos
     if(resultUsuario.length > 0){
        dadosUsuario.status = true
        dadosUsuario.status_code = 200
        dadosUsuario.items = resultUsuario.length
        dadosUsuario.games = resultUsuario

        return dadosUsuario //200
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
const buscarUsuario = async function(idUsuario) {
    try {
        let dadosUsuario = {};

        if (id == undefined || id == '' || isNaN(idUsuario)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        let resultUsuario = await UsuarioDAO.selectByIdUsuario(idUsuario);

        if (resultUsuario && resultUsuario.length > 0) {
            dadosUsuario.status = true;
            dadosUsuario.status_code = 200;
            dadosUsuario.items = resultUsuario.length;
            dadosUsuario.games = resultUsuario;

            return dadosUsuario
        } else {
            return MESSAGE.ERROR_NOT_FOUND
        }
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}