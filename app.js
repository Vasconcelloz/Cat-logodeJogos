const express = require('express')
const bodyParser = require('body-parser')                        
const Handlebars = require('express-handlebars')
const { response } = require('express')
const mysql= require('mysql2')

const app = express();

const urlencodeParser = bodyParser.urlencoded({extended:false});
const sql = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"uzumymwx1kel",
    port:3306,
    database:"jogos",
})
sql.query("use jogos")

app.engine("handlebars",Handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use('/css',express.static('css'))
app.use('/img',express.static('img'))

/*app.post("/controllerForm",urlencodeParser,function(req,res){
    sql.query("insert into usuario values (?,?,?)",[req.body.id,req.body.name,req.body.ida])
    res.render('controllerForm.handlebars')
})
*/

app.post("/controllerForm",urlencodeParser,function(req,res){
   sql.query("insert into usuario values (?,?,?,?)",[req.body.nome,req.body.email,req.body.end,req.body.senha])
    res.render('controllerForm.handlebars')
    
})


app.get("/select/:id?", function(req,res){
    if (!req.params.id){
        sql.query("select * from pessoa",function(err,data){
        res.render('select.handlebars',{data})
        })
    }else{
        sql.query("select * from pessoa where id=?",[req.params.id],function(err,data){
            res.render('select.handlebars',{data})
        })
    }
})

//deletar
 app.get('/deletar/:id',function(req,res){
    sql.query("delete from pessoa where id=?",[req.params.id])
    res.render('deletar.handlebars')
})

//explicar hoje 
app.get("/update/:id",urlencodeParser,function(req,res){
    sql.query("select * from pessoa where id=?",[req.params.id],function(err,results,fields){
    res.render('update.handlebars',{id:req.params.id,name:results[0].nome,ida:results[0].idade})  
    })
})

app.post("/update/controllerUpdate",urlencodeParser,function(req,res){
    sql.query("update pessoa set nome=?,idade=? where id=?",[req.body.name,req.body.ida,req.body.id])
    res.send("Dados Atualizados")
})


app.get("/Login", function(req,res){
    res.render("Login.handlebars")
})

app.get("/loginerro", function(req,res){
    res.render("LoginErro.handlebars")
})


app.get("/inserir", function(req,res){
    res.render("inserir.handlebars")
})

/*
app.get("/",function(req,res){
    res.render('index.handlebars');
})
*/

app.get("/",function(req,res){
    res.render('Cadastro.handlebars');
})


//app.post("/Home", function(req,res){
   // dadosRender;
//})

app.post("LoginErro", function(req,res){
    res.render('LoginErro.handlebars');
})

app.get('/Catalogos', (req, res) => {
    res.render('Catalogos.handlebars');
})
// Adicione estas linhas para analisar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    // Simulação de validação de login
    if (usuario === "julia@gmail.com" && senha === "123") {
        // Login válido
        res.redirect('/Home'); // Certifique-se de ter uma rota definida para /home
    } else {
        // Login inválido
        res.redirect('/LoginErro'); // Redireciona para a página de erro
    }
});
// Rota para a próxima página (exemplo)
app.get('/Home', (req, res) => {
    res.render('Home.handlebars');
});

app.listen(8087,function (req,res)  {
    console.log(`Servidor está rodando`);
});
    
//app.listen(8081,function(req,res){
  //  console.log("servidor rodando")
//})