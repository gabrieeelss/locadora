function fnCarregarReservas(reserva) {
    let linha = `
                            <tr>
                                <td>${reserva.id}</td>
                                <td>${reserva.nome_cliente}</td>
                                <td>${reserva.email_cliente}</td>
                                <td>${reserva.categoria}</td>
                                <td>${reserva.data_reserva}</td>
                                <td>
                                <button type="button" class="btn" onclick="fnExcluirReserva(${reserva.id}, event.target)" title="Excluir">❌</button>
                            </tr>
    `

    document.querySelector("#lista-reservas").innerHTML += linha
}

function fnCarregarDados() {
    fetch('http://localhost:3000/reserva_cliente', { method: 'GET' })

        .then(resposta => resposta.json())
        .then((reservas) => {
            reservas.forEach(reserva => {
                fnCarregarReservas(reserva)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()