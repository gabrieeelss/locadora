const express = require('express')
const app = express()
// necessário para permitir requisições de diferentes origens(dominios/servidores)
const cors = require('cors')
app.use(cors())

app.use(express.json())

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('Locadora')
})

let mysql = require('mysql')
let conexao = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "locadora"
})

conexao.connect(function (erro) {
    if (erro) {
        console.log("Deu ruim na conexão \n");
        throw erro;
    } else {
        console.log("Conexão deu BOM \n")
    }
})

//RESERVA DE VEICULO
app.post("/reservas", function (req, res) {
    const data = req.body
    conexao.query('INSERT INTO agendamentos set?', [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            res.send(resultado.insertId);
        });
})

// Read All - [GET] /RESERVAS
app.get("/reservas", function (req, res) {
    conexao.query("SELECT * FROM agendamentos", function (erro, lista_reservas, campos) {
        console.log(lista_reservas);
        res.send(lista_reservas)
    })
})

// CADASTRO DE VEICULO
app.post("/cad-veiculo", function (req, res) {
    const data = req.body
    conexao.query('INSERT INTO veiculos set?', [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            res.send(resultado.insertId);
        });
})

app.listen(3000)