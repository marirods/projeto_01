/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const ClassificacaoDAO = require('../../model/DAO/classificacao_etaria.js')
const controllerJogo = require('../jogo/controllerJogo.js')
const {insertJogo} = require('../../model/DAO/jogo.js')

 //Função para inserir uma nova empresa
 const inserirClassificacao_Etaria = async function(classificacoes, contentType){
    try {
        if(contentType == 'application/json'){
            console.log(classificacoes);
            
        if(
            classificacoes.descricao                          == undefined || classificacoes.descricao     == ''                  || classificacoes.descricao                 == null   || classificacoes.descricao.length                       > 80 ||
            classificacoes.classificacao                      == undefined || classificacoes.classificacao == ''                  || classificacoes.classificacao             == null   || classificacoes.classificacao.length                   > 50 
           
    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultClassificacao = await ClassificacaoDAO.insertClassificacao_Etaria(classificacoes)

        if(resultClassificacao)
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
 const atualizarClassificacao_Etaria = async function(classificacoes, idClassificacao, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                classificacoes.descricao                         == undefined || classificacoes.descricao == ''                       || classificacoes.descricao              == null   || classificacoes.descricao.length                            > 45 ||
                classificacoes.classificacao                     == undefined || classificacoes.classificacao == ''                   || classificacoes.classificacao          == null   || classificacoes.classificacao.length                        > 50 
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultClassificacao = await buscarClassificacao_Etaria(parseInt(idClassificacao))

                if(resultClassificacao.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    classificacoes.id = parseInt(idClassificacao)
                    let result = await ClassificacaoDAO.updateClassificacao_Etaria(classificacoes)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultClassificacao.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

     } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500

     }
}

//Função para excluir um jogo
const excluirClassificacao_Etaria = async function(idClassificacao){
    try {

        if (idClassificacao == undefined || idClassificacao == '' || isNaN(idClassificacao)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(idClassificacao){
            let verificar = await ClassificacaoDAO.selectByIdClassificacoes(idClassificacao);
            let resultClassificacao = await ClassificacaoDAO.deleteClassificacao_Etaria(idClassificacao);

            if (verificar != false || typeof(verificar) == 'object') {
                if(verificar.length > 0){
                    if(resultClassificacao){
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
const listarClassificacao_Etaria = async function(){
    try {

        const arrayClassificacao = []
        let dadosClassificacao = {}

     //Chama a função para retornar os dados do jogo
     let resultClassificacao = await ClassificacaoDAO.selectAllClassificacoes()

     if(resultClassificacao != false || typeof(resultClassificacao) == 'object'){
     if(resultClassificacao.length > 0){


        dadosClassificacao.status = true
        dadosClassificacao.status_code = 200
        dadosClassificacao.items = resultClassificacao.length

        for(itemClassificacao of resultClassificacao){
            let dadosJogos = await controllerJogo.buscarJogo(itemClassificacao.id)
            itemClassificacao.jogo = dadosJogos.jogo

            delete itemClassificacao.id

            arrayClassificacao.push(itemClassificacao)
        }

        dadosClassificacao.games = arrayClassificacao

        return dadosClassificacao
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
const buscarClassificacao_Etaria = async function(idClassificacao) {
    try {
        let arrayClassificacao = []
        let dadosClassificacao = {};

        if (idClassificacao == undefined || idClassificacao == '' || isNaN(idClassificacao) || idClassificacao <= 0 ) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        let resultClassificacao = await ClassificacaoDAO.selectByIdClassificacoes(parseInt(idClassificacao));

        if (resultClassificacao != false && typeof (resultClassificacao) == 'object') {
            if(resultClassificacao.length > 0){
                dadosClassificacao.status = true;
                dadosClassificacao.status_code = 200;

                for(let itemJogo of resultClassificacao){
                    let dadosJogos = await controllerJogo.buscarJogo(itemJogo.id)
                    itemJogo.jogo = dadosJogos.jogo
                    delete itemJogo.id

                    arrayClassificacao.push(itemJogo)
                }
                dadosClassificacao.games = arrayClassificacao
                return dadosClassificacao
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
    inserirClassificacao_Etaria,
    atualizarClassificacao_Etaria,
    excluirClassificacao_Etaria,
    listarClassificacao_Etaria,
    buscarClassificacao_Etaria
}