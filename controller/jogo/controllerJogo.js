/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/
//Import do arquivo  de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')
const controllerEmpresas = require('../empresas/controllerEmpresas.js')
const { insertEmpresas } = require('../../model/DAO/empresas.js')

 //Função para inserir um novo jogo
 const inserirJogo = async function(jogo, contentType){
    try {
        if(contentType == 'application/json'){
        if(
            jogo.nome                    == undefined || jogo.nome == ''                  || jogo.nome            == null   || jogo.nome.length                       > 80 ||
            jogo.data_lancamento         == undefined || jogo.data_lancamento == ''       || jogo.data_lancamento == null   || jogo.data_lancamento.length            > 10 ||
            jogo.versao                  == undefined || jogo.versao == ''                || jogo.versao          == null   || jogo.versao.length                     > 10 ||
            jogo.tamanho                 == undefined || jogo.tamanho.length   > 10       ||
            jogo.descricao               == undefined || 
            jogo.foto_capa               == undefined || jogo.foto_capa.length > 200      ||
            jogo.link                    == undefined || jogo.link.length      > 200  ||
            jogo.id_empresas                           == undefined || jogo.id_empresas == ''      || jogo.id_empresas == null      || isNaN (jogo.id_empresas) || jogo.id_empresas <=0   ||
            jogo.id_faixa_etaria                           == undefined || jogo.id_faixa_etaria == ''      || jogo.id_faixa_etaria == null      || isNaN (jogo.id_faixa_etaria) || jogo.id_faixa_etaria <=0     


    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultJogo = await jogoDAO.insertJogo(jogo)

        if(resultJogo)
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

 //Função para atualizar um jogo
 const atualizarJogo = async function(jogo, id, contentType){
     try {
        if(contentType == 'application/json'){
            if(
                jogo.nome                    == undefined || jogo.nome == ''                  || jogo.nome            == null   || jogo.nome.length                       > 80 ||
                jogo.data_lancamento         == undefined || jogo.data_lancamento == ''       || jogo.data_lancamento == null   || jogo.data_lancamento.length            > 10 ||
                jogo.versao                  == undefined || jogo.versao == ''                || jogo.versao          == null   || jogo.versao.length                     > 10 ||
                jogo.tamanho                 == undefined || jogo.tamanho.length   > 10       ||
                jogo.descricao               == undefined || 
                jogo.foto_capa               == undefined || jogo.foto_capa.length > 200      ||
                jogo.link                    == undefined || jogo.link.length      > 200      ||
                id                           == undefined || id == ''      || id == null      || isNaN (id) || id <=0 ||
                jogo.id_empresas                           == undefined || jogo.id_empresas == ''      || jogo.id_empresas == null      || isNaN (jogo.id_empresas) || jogo.id_empresas <=0   ||
                jogo.id_faixa_etaria                           == undefined || jogo.id_faixa_etaria == ''      || jogo.id_faixa_etaria == null      || isNaN (jogo.id_faixa_etaria) || jogo.id_faixa_etaria <=0     
    
        ){
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
            }else{
                //Validar se o ID existe no BD
                let resultJogo = await buscarJogo(parseInt(id))

                if(resultJogo.status_code == 200){
                    //Update
                    //Adiciona um atributo id no JSON para encaminhar id da requisição
                    jogo.id = parseInt(id)
                    let result = await jogoDAO.updateJogo(jogo)
                    
                    if(result){
                        return MESSAGE.SUCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }


                }else if(resultJogo.status_code == 404){
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
const excluirJogo = async function(id){
    try {

        if (id == undefined || id == '' || isNaN(id)) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }
        if(id){
            let verificar = await jogoDAO.selectByIdJogo(id);
            let resultJogo = await jogoDAO.deleteJogo(id);

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
const listarJogo = async function(){
    try {

        const arrayJogos = []
        let dadosJogos = {}

     //Chama a função para retornar os dados do jogo
     let resultJogo = await jogoDAO.selectAllJogo()

     if(resultJogo != false || typeof(resultJogo) == 'object'){
     if(resultJogo.length > 0){

        dadosJogos.status = true
        dadosJogos.status_code = 200
        dadosJogos.items = resultJogo.length

        for(itemJogo of resultJogo){

            let dadosEmpresas = await controllerEmpresas.buscarEmpresas(itemJogo.id_empresas)
            itemJogo.empresas = dadosEmpresas.empresas
            
            delete itemJogo.id_empresas


           arrayJogos.push(itemJogo)
        }
        
        dadosJogos.games = arrayJogos
        

        return dadosJogos //200
     }else{
        return MESSAGE.ERROR_NOT_FOUND //404
     }

    }else{
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
} catch (error) {
    console.log(error);
    
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Função para buscar um jogo
const buscarJogo = async function(id) {
    try {
        let arrayJogos = []
        let dadosJogos = {} // <-- Move para fora do if

        if (id == undefined || id == '' || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS;
        }

        console.log(parseInt(id));
        

        let resultJogo = await jogoDAO.selectByIdJogo(parseInt(id));
        
        
        if (resultJogo != false && typeof(resultJogo) == 'object') {
            if (resultJogo.length > 0) {
                dadosJogos.status = true;
                dadosJogos.status_code = 200;

                for (let itemEmpresas of resultJogo) {
                    let dadosEmpresas = await controllerEmpresas.buscarEmpresas(itemEmpresas.id_empresas);
                    itemEmpresas.empresas = dadosEmpresas.empresas;
                    delete itemEmpresas.id_empresas;

                    arrayJogos.push(itemEmpresas);
                }

                dadosJogos.games = arrayJogos;
                return dadosJogos;
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}