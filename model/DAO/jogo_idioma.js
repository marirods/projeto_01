/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertJogoIdioma = async function(JogoIdioma){
  try {

      let sql = `insert into tbl_jogo_idioma  ( 
                                          id_jogo,
                                          id_idioma
                                        ) 
                                          values 
                                        (
                                          ${JogoIdioma.id_jogo},
                                          ${JogoIdioma.id_idioma}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateJogoIdioma = async function(JogoIdioma){
  try {
      let sql = `update tbl_jogo_idioma set         id_jogo,       = ${JogoIdioma.id_jogo},
                                                    id_idioma      = ${JogoIdioma.id_idioma}
                                        
                            where id = ${JogoIdioma.id}                
                            `
      let resultJogoIdioma = await prisma.$executeRawUnsafe(sql)

      if(resultJogoIdioma)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoIdioma = async function(id){
  try {
    let sql = `delete from tbl_jogo_idioma where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoIdioma = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_idioma order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoIdioma = async function(id){
  try {
    let sql = `select * from tbl_jogo_idioma where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados do genero filtrando pelo Filme
const selectIdiomaByIdJogo = async function(id_jogo){
  try {
      let sql = `select tbl_idiomas.* from tbl_jogo
                          inner join tbl_jogo_idioma
                            on tbl_jogo.id = tbl_jogo_idioma.id
                          inner join tbl_idiomas
                            on tbl_idiomas.id_idioma =  tbl_jogo_idioma.id_idioma
                      where tbl_jogo.id = ${id_jogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados do filme filtrando pelo Genero
const selectJogoByIdIdioma = async function(id_idioma){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_jogo_idioma
                            on tbl_jogo.id = tbl_jogo_idioma.id
                          inner join tbl_idiomas
                            on tbl_idiomas.id_idioma = tbl_jogo_idioma.id_idioma
                      where tbl_idiomas.id_idioma = ${id_idioma}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}




module.exports = {
    insertJogoIdioma,
    updateJogoIdioma,
    deleteJogoIdioma,
    selectAllJogoIdioma,
    selectByIdJogoIdioma,
    selectIdiomaByIdJogo,
    selectJogoByIdIdioma
} 