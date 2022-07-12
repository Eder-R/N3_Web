const mysql = require('mysql2/promise')


async function conectarBD()
{
    if (global.connection && global.connection.state !== 'disconnected')
    {
        return global.connection
    }

    const connection = await mysql.createConnection(
        {
            host     : 'localhost',
            port     : 3306,
            user     : 'root',
            password : '',
            database : 'cadastros'
        }
    );

    global.connection = connection
    return global.connection
}


async function listarPessoas()
{
    const conexao = await conectarBD()
    const [registros] = await conexao.query('select * from pessoas;')
    return registros
}

async function inserirPessoa(pessoa)
{
    const conexao = await conectarBD()
    const sql = "insert into pessoas (pernome, peridade, percpf) values (?,?,?);"
    return await conexao.query(sql, [pessoa.nome, pessoa.idade, pessoa.cpf])
}

async function apagarPessoa(codigo)
{
    const conexao = await conectarBD()
    const sql = "delete from pessoas where id=?;"
    return await conexao.query(sql,[codigo])
}

async function recuperarPessoa(codigo)
{
    const conexao = await conectarBD()
    const sql = "select * from pessoas where id=?;"
    const [pessoa] = await conexao.query(sql,[codigo])
    return pessoa [0]
}

async function alterarPessoa(pessoa){
    const conexao = await conectarBD()
    const sql = "UPDATE pessoas SET pernome=?,peridade=?, percpf=? WHERE id=?;"
    return await conexao.query(sql,[pessoa.nome, pessoa.idade, pessoa.cpf, pessoa.id])
}

module.exports = { listarPessoas, inserirPessoa, apagarPessoa, recuperarPessoa, alterarPessoa }