function fnLimparCampos() {
    document.getElementById("form-cad-veiculo").reset()
}

function fnCadastrarVeiculo() {

    let dadosVeiculo = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        placa: document.getElementById("placa").value,
        categoria: document.getElementById("categoria").value,
        valor_diaria: document.getElementById("valor_diaria").value
    }
    console.dir(dadosVeiculo)

    fetch('http://localhost:3000/cad-veiculo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosVeiculo)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnLimparCampos()
            console.log(dados)
            alert("Veículo cadastrado com sucesso!")
        })
        .catch(erro => console.log(erro.message))
}

let btn_salvar = document.getElementById("btn-cad-veiculo")

btn_salvar.addEventListener("click", function () {
    fnCadastrarVeiculo()
})