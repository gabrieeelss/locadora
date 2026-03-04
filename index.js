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

    const { nome_cliente, email_cliente, categoria } = req.body;
    const sqlVeiculo = "SELECT id FROM veiculos WHERE categoria = ? LIMIT 1";
    conexao.query(sqlVeiculo, [categoria], function (erro, resultado) {

        if (erro) {
            res.json(erro);
            return;
        }
        if (resultado.length === 0) {
            res.json({ mensagem: "Nenhum veículo disponível nessa categoria" });
            return;
        }
        const veiculo_id = resultado[0].id;
        const reserva = {
            nome_cliente: nome_cliente,
            email_cliente: email_cliente,
            veiculo_id: veiculo_id
        };
        conexao.query("INSERT INTO agendamentos SET ?", reserva,
            function (erro2, resultado2) {

                if (erro2) {
                    res.json(erro2);
                } else {
                    res.json({ id_reserva: resultado2.insertId });
                }

            });

    });

});

// Read All - [GET] /RESERVAS
app.get("/reserva_cliente", function (req, res) {

    const sql = `
    SELECT
    agendamentos.id,
    agendamentos.nome_cliente,
    agendamentos.email_cliente,
    agendamentos.data_reserva,
    veiculos.categoria,
    veiculos.modelo
    FROM agendamentos
    JOIN veiculos
    ON agendamentos.veiculo_id = veiculos.id
    `;
    conexao.query(sql, function (erro, lista_reservas, campos) {
        if (erro) {
            res.json(erro);
        } else {
            res.json(lista_reservas);
        }
    });
});

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
app.delete("/reserva_cliente/:id", function (req, res) {
    const id = req.params.id
    conexao.query(`DELETE FROM agendamentos where id = ${id}`, function (erro, resultado) {
        if (erro) {
            res.send(erro)
        }
        res.send({ "status": 200, "message": "Reserva excluida com sucesso!" })
    })
})

// LOGIN
app.post("/login/", function (req, res) {
    const usuario = req.body.usuario
    const senha = req.body.senha
    conexao.query(`select * from usuarios where usuario = '${usuario}' and senha = 
'${senha}'`, function (erro, resultado, campos) {
        if (erro) {
            res.send(erro)
        } else {
            if (resultado.length > 0) {
                res.sendStatus(200)
            } else {
                res.sendStatus(401)
            }
        }
    })
})

app.listen(3000)