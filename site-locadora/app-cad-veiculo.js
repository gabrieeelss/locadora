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

    fetch('http://127.0.0.1:3000/cad-veiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosVeiculo),
        credentials: 'include'
    })
    .then(resposta => {
        if (!resposta.ok) {
            return resposta.json().then(err => { 
                throw new Error(err.erro || "Erro " + resposta.status) 
            })
        }
        return resposta.json()
    })
    .then(dados => {
        fnLimparCampos()
        console.log(dados)
        alert("Veículo cadastrado com sucesso! ID: " + dados)
    })
    .catch(erro => alert("Falha ao cadastrar veículo: " + erro.message))
}

let btn_salvar = document.getElementById("btn-cad-veiculo")
btn_salvar.addEventListener("click", fnCadastrarVeiculo)
