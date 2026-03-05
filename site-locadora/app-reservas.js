function fnCarregarReservas(reserva) {
    let linha = `
                            <tr>
                                <td>${reserva.id}</td>
                                <td>${reserva.nome_cliente}</td>
                                <td>${reserva.email_cliente}</td>
                                <td>${reserva.categoria}</td>
                                <td>${reserva.modelo}</td>
                                <td>${reserva.data_reserva}</td>
                                <td>
                                <button type="button" class="btn" onclick="fnExcluirReserva(${reserva.id}, event.target)" title="Excluir">❌</button>
                            </tr>
    `

    document.querySelector("#lista-reservas").innerHTML += linha
}

function fnCarregarDados() {
    fetch('http://127.0.0.1:3000/reserva_cliente', { method: 'GET', credentials: 'include' })

        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(err => {
                throw new Error(err.erro || "Erro " + resposta.status)
                })
            }
            return resposta.json()
        })
        .then(reservas => {
            if (Array.isArray(reservas)) {
            reservas.forEach(fnCarregarReservas)
            }else{
                console.log("Falha ao carregar reservas:", reservas)
            }
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()






