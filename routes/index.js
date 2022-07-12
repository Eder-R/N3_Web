var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
  try {
    if(!global.usuario || global.usuario == 0){
      res.redirect('/login');
    }
    const registros = await global.db.listarLivros()
    res.render('index', { registros });
  } catch(err){
    res.redirect('/?erro='+err)
  }
});

router.get('/login', async function(req, res) {
  res.render('login');
})

router.post('/login', async function(req, res) {
  const usuario = req.body.edtUsuario
  const senha = req.body.edtSenha 
  const user = await global.db.buscarUsuario({usuario, senha})

})


router.get('/novaPessoa', function(req, res){
  res.render('formPessoas', { titulo:'Novo cadastro', acao:'/novaPessoa', pessoas:{}})
})

router.post('/novaPessoa', async function(req, res) {
  const nome = req.body.edtNome
  const idade = parseInt(req.body.edtIdade)
  const cpf = parseInt(req.body.edtCpf)

  await global.db.inserirLivro({nome, idade, cpf})
  res.redirect('/')
} )

router.get('/alterarPessoa/:id', async function(req, res) {
  const codigo = parseInt(req.params.id)
  const pessoa = await global.db.recuperarPessoa(codigo)
  res.render('formPessoas',{ titulo:'Alteração de pessoa', acao:'/alterarPessoa/'+codigo,pessoa})
})

router.post('/alteraLivro/:id', async function(req, res) {
  const codigo = parseInt(req.params.id)
  const titulo = req.body.edtTitulo
  const ano = parseInt(req.body.edtAno)
  const genero = parseInt(req.body.selGenero)
  await global.db.alterarLivro({codigo, titulo, ano, genero})
  res.redirect('/')
})

router.get('/apagaLivro/:id', async function(req, res){
  const codigo = parseInt(req.params.id)
  await global.db.apagarLivro(codigo)
  res.redirect('/')
})



module.exports = router;
