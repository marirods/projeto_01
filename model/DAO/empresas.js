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


 //Função para inserir no Banco de Dados uma nova empresa
 const insertEmpresas = async function(empresas){
    try {

     let sql = `insert into tbl_empresas(
                                        nome,
                                        segmento,
                                        pais_origem
        
                                    ) values (
                                        '${empresas.nome}',
                                        '${empresas.segmento}',
                                        '${empresas.pais_origem}'
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

//Função para atualizar no Banco de Dados uma empresa existente
 const updateEmpresas = async function(empresas){
    try {
        let sql = `update tbl_empresas set 
                                         nome                = '${empresas.nome}',
                                         segmento            = '${empresas.segmento}',
                                         pais_origem         = '${empresas.pais_origem}'             
                                    where id_empresas = ${empresas.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados uma empresa existente
const deleteEmpresas = async function(idEmpresas){
    try {
        let sql = `DELETE FROM tbl_empresas WHERE id_empresas = ${idEmpresas}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de empresas
const selectAllEmpresas = async function(){
    try {
        //Script SQL para retornar os dados do BD
        let sql = 'select * from tbl_empresas order by id_empresas desc'

        //Executa o script SQL e aguarda o retorno dos dados (select - query)
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error);
        
        return false
    }

}

//Função para buscar no Banco de Dados uma empresa pelo ID
const selectByIdEmpresas = async function(idEmpresas){
try {
    let sql = `SELECT * FROM tbl_empresas WHERE id_empresas = ${idEmpresas}`
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
    insertEmpresas,
    updateEmpresas,
    deleteEmpresas,
    selectAllEmpresas,
    selectByIdEmpresas
}
