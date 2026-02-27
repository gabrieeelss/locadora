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
app.post("/reserva_cliente", function (req, res) {
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
app.get("/reserva_cliente", function (req, res) {
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

// Read All - [GET] /VEICULOS
app.get("/veiculos", function (req, res) {
    conexao.query("SELECT * FROM veiculos", function (erro, dados) {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao buscar veículos" })
        }
        res.json(dados)
    })
})

// Delete - [DELETE] /RESERVA/:id
app.delete("/reserva_cliente/:id", function(req, res) {
    const id = req.params.id
    conexao.query(`DELETE FROM agendamentos where id = ${id}`, function (erro, resultado){
        if (erro) {
            res.send(erro)
        }
        res.send({ "status": 200, "message": "Reserva excluida com sucesso!"})
    })
})

// Update - [PUT] /RESERVA/:id
app.put("/reserva_cliente/:id", function (req, res) {
    const id = req.params.id
    const data = req.body
    conexao.query(`UPDATE agendamentos set ? where id = ${id}`, [data], function (erro, resultado) {
        if (erro) {
            res.send(erro)
        }
        res.send({ "status": 200, "message": "Reserva atualizada com sucesso!" })
    })
})
app.listen(3000)