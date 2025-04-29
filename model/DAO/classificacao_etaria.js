/*******************************************************************************************************************
 * Objetivo : Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ********************************/

 //Import da biblioteca do prisma client para executar scripts no BD
 const { PrismaClient } = require('@prisma/client')


 //Instancia da classe do prisma client, para gerar um objeto
 const prisma = new PrismaClient()


 //Função para inserir no Banco de Dados uma nova classificacao etária
 const insertClassificacao_Etaria = async function(classificacoes){
    try {

     let sql = `insert into tbl_classificacao_etaria(
                                        descricao,
                                        classificacao
        
                                    ) values (
                                        '${classificacoes.descricao}',
                                        '${classificacoes.classificacao}'
                                    )`

    //Executa o script SQL no BD e AGUARDA o retorno do BD (insert, update, delete -execute)
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
 }  catch (error) {
    console.log(error)
    return false
}

 }

//Função para atualizar no Banco de Dados uma classificacao etária existente
 const updateClassificacao_Etaria = async function(classificacoes){
    try {
        let sql = `update tbl_classificacao_etaria set 
                                         descricao                       = '${classificacoes.descricao}',
                                         classificacao                   = '${classificacoes.classificacao}'           
                                    where id_faixa_etaria = ${classificacoes.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        console.log(error)
        return false
    }

}

//Função para excluir no Banco de Dados uma classificacao etária existente
const deleteClassificacao_Etaria = async function(idClassificacao){
    try {
        let sql = `DELETE FROM tbl_classificacao_etaria WHERE id_faixa_etaria = ${idClassificacao}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de classificações
const selectAllClassificacoes = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_classificacao_etaria order by id_faixa_etaria desc'

    //Executa o script SQL e aguarda o retorno dos dados (select - query)
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
    return false

} catch (error) {
    return false
}

}

//Função para buscar no Banco de Dados uma classificação pelo ID
const selectByIdClassificacoes = async function(idClassificacao){
try {
    let sql = `SELECT * FROM tbl_classificacao_etaria WHERE id_faixa_etaria = ${idClassificacao}`
    let result = await prisma.$queryRawUnsafe(sql)

    if(result.length > 0)
        return result
    else
    return false

} catch (error) {
    return false
}

}


module.exports = {
    insertClassificacao_Etaria,
    updateClassificacao_Etaria,
    deleteClassificacao_Etaria,
    selectAllClassificacoes,
    selectByIdClassificacoes
}
