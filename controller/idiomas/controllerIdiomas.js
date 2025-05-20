/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
// const MESSAGE = require('../../modulo/config.js')

const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const IdiomasDAO = require('../../model/DAO/idiomas.js')
const controllerJogo = require('../jogo/controllerJogo.js')
const {insertJogo} = require('../../model/DAO/jogo.js')

 //Função para inserir uma nova empresa
 const inserirIdiomas = async function(idioma, contentType){
    try {
        if(contentType == 'application/json'){
        if(
            idioma.idioma                            == undefined || idioma.idioma                == ''         || idioma.idioma                   == null   || idioma.idioma.length                       > 80
           
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultIdiomas = await IdiomasDAO.insertIdiomas(idioma)

        if(resultIdiomas)
            return MESSAGE.SUCCESS_CREATED_ITEM //201
        else
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }

}else{
    return MESSAGE.ERROR_CONTENT_TYPE //415
}
 } catch (error) {
    console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
 }

}

 //Função para atualizar uma empresa
 const atualizarIdiomas = async function(idioma, idIdioma, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                idioma.idioma                           == undefined || idioma.idioma == ''                         || idioma.idioma                == null   || idioma.idioma.length                                                 > 80                                                    
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultIdiomas = await buscarIdiomas(parseInt(idIdioma))

                if(resultIdiomas.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    idioma.id = parseInt(idIdioma)
                    let result = await IdiomasDAO.updateIdiomas(idioma)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultIdiomas.status_code == 404){
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
const excluirIdiomas = async function(idIdioma){
    try {

        if (idIdioma == undefined || idIdioma == '' || isNaN(idIdioma)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(idIdioma){
            let verificar = await IdiomasDAO.selectByIdIdiomas(idIdioma);
            let resultIdiomas = await IdiomasDAO.deleteIdiomas(idIdioma);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultIdiomas){
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
const listarIdiomas = async function(){
     try {
            const arrayIdiomas = []
            let dadosIdiomas = {}
    
         //Chama a função para retornar os dados do jogo
         let resultIdiomas = await IdiomasDAO.selectAllIdiomas()
    
         if(resultIdiomas != false || typeof(resultIdiomas) == 'object'){
    
         if(resultIdiomas.length > 0){
            dadosIdiomas.status = true
            dadosIdiomas.status_code = 200
            dadosIdiomas.items = resultIdiomas.length
    
            for(itemIdioma of resultIdiomas){
                let dadosJogos = await controllerJogo.buscarJogo(itemIdioma.id)
                itemIdioma.jogo = dadosJogos.jogo
    
                delete itemIdioma.id
    
                arrayIdiomas.push(itemIdioma)
            }
    
            dadosIdiomas.games = arrayIdiomas
            
            return dadosIdiomas 
         }else{
            return  MESSAGE.ERROR_NOT_FOUND 
         } 
    
         }else{
            return  MESSAGE.ERROR_INTERNAL_SERVER_MODEL//404
         }
    
    } catch (error) {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }
    
    }

//Função para buscar um jogo
const buscarIdiomas = async function(idIdioma) {

  try {
          let arrayIdiomas = []
          let dadosIdiomas = {};
  
          if (idIdioma == undefined || idIdioma == '' || isNaN(idIdioma) || idIdioma <= 0 ) {
              return MESSAGE.ERROR_REQUIRED_FIELDS;
          }
  
          let resultIdiomas = await IdiomasDAO.selectByIdIdiomas(parseInt(idIdioma));
  
          if (resultIdiomas != false && typeof(resultIdiomas) == 'object') {
              if(resultIdiomas.length > 0){
                  dadosIdiomas.status = true;
                  dadosIdiomas.status_code = 200;
  
                  for(let itemJogo of resultIdiomas){
                      let dadosJogos = await controllerJogo.buscarJogo(itemJogo.id)
                      itemJogo.jogo = dadosJogos.jogo
                      delete itemJogo.id
  
                      arrayIdiomas.push(itemJogo)
                  }
                  dadosIdiomas.games = arrayIdiomas
                  return dadosIdiomas
              }else{
                  return MESSAGE.ERROR_NOT_FOUND
              }
          } else {
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
          }
      } catch (error) {
          return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
      }
  }
module.exports = {
    inserirIdiomas,
    atualizarIdiomas,
    excluirIdiomas,
    listarIdiomas,
    buscarIdiomas
}