function fnExcluirReserva(id, elemento) {

    if (!confirm("Tem certeza que deseja excluir esta reserva?")) {
        return;
    }

    fetch('http://localhost:3000/reserva_cliente/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    .then(resposta => resposta.json())
    .then((dados) => {
        elemento.closest("tr").remove()
        alert("Reserva excluida com sucesso!")
    })
    .catch(erro => console.log(erro.message))
}