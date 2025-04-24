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
 const insertUsuario = async function(usuario){
    try {

     let sql = `insert into tbl_usuario(
                                        nome,
                                        email,
                                        username
        
                                    ) values (
                                        '${usuario.nome}',
                                        '${usuario.email}',
                                        '${usuario.username}'
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

//Função para atualizar no Banco de Dados um usuário existente
 const updateUsuario = async function(usuario){
    try {
        let sql = `update tbl_usuario set 
                                         nome                = '${usuario.nome}',
                                         email               = '${usuario.email}',
                                         username            = '${usuario.username}'             
                                    where id_usuario = ${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados um usuario existente
const deleteUsuario = async function(idUsuario){
    try {
        let sql = `DELETE FROM tbl_usuario WHERE id_usuario = ${idUsuario}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de usuarios
const selectAllUsuario = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_usuario order by id_usuario desc'

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

//Função para buscar no Banco de Dados um usuario pelo ID
const selectByIdUsuario = async function(idUsuario){
try {
    let sql = `SELECT * FROM tbl_usuario WHERE id_usuario = ${idUsuario}`
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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}
