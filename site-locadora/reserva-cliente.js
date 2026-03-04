function fnLimparCampos() {
    document.getElementById("form-reserva").reset()
}

function fnFazerReserva() {

    let formReserva = {
        nome_cliente: document.getElementById("nome").value.trim(),
        email_cliente: document.getElementById("email").value.trim(),
        categoria: document.getElementById("categoria").value,
    }

    // VALIDAÇÃO
    if (!formReserva.nome_cliente || !formReserva.email_cliente) {
        alert("Nome e E-mail são obrigatórios!")
        return;
    }
    
    console.dir(formReserva)

    fetch('http://localhost:3000/reserva_cliente/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formReserva)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            alert("Reserva Feita com Sucesso!")
            fnLimparCampos()
            console.log(dados)
        })
        .catch(erro => console.log(erro.message))
}

let btn_salvar = document.getElementById("btn-fazer-reserva")


btn_salvar.addEventListener("click", function () {
    fnFazerReserva()
    console.log()
})

