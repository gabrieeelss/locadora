function fnCarregarReserva(frota){
    document.getElementById("id").innerHTML = frota.id
    document.getElementById("marca").innerHTML = frota.marca
    document.getElementById("modelo").innerHTML = frota.modelo
    document.getElementById("placa").innerHTML = frota.placa
    document.getElementById("categoria").innerHTML = frota.categoria
    document.getElementById("valorDiaria").innerHTML = frota.valorDiaria.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

}

function fnCarregarDados() {
 
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get('id') + "/"
        fetch('http://localhost:3000/reservas/' + id, { method: 'GET'})
 
        .then(resposta => resposta.json())
        .then((reservas) => {
            reservas.forEach(frota => {
                fnCarregarReserva(frota)
            });
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()