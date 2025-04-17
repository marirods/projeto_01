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


 //Função para inserir no Banco de Dados uma nova categoria
 const insertCategoria = async function(categorias){
    try {

     let sql = `insert into tbl_categoria(
                                        nome,
                                        genero
        
                                    ) values (
                                        '${categorias.nome}',
                                        '${categorias.genero}'
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

//Função para atualizar no Banco de Dados uma categoria existente
 const updateCategoria = async function(categorias){
    try {
        let sql = `update tbl_categoria set 
                                         nome                       = '${categorias.nome}',
                                         genero                     = '${categorias.genero}'           
                                    where id = ${categorias.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados uma categoria existente
const deleteCategoria = async function(idCategoria){
    try {
        let sql = `DELETE FROM tbl_categoria WHERE id = ${idCategoria}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de categorias
const selectAllCategoria = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_classificacao_etaria order by id desc'

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

//Função para buscar no Banco de Dados uma categoria pelo ID
const selectByIdCategoria = async function(idCategoria){
try {
    let sql = `SELECT * FROM tbl_categoria WHERE id = ${idCategoria}`
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
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategoria,
    selectByIdCategoria
}
