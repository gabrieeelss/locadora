function fnCarregarVeiculos(veiculo) {
    let linha = `
                            <tr>
                                <td>${veiculo.id}</td>
                                <td>${veiculo.marca}</td>
                                <td>${veiculo.modelo}</td>
                                <td>${veiculo.placa}</td>
                                <td>${veiculo.categoria}</td>
                                <td>${veiculo.valor_diaria.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</td>
                                <td>
                                
                            </tr>
    `

    document.querySelector("#lista-veiculos").innerHTML += linha
}

// function fnCarregarDados() {
//     fetch('http://localhost:3000/veiculos', { method: 'GET', credentials: 'include' })

//         .then(resposta => resposta.json())
//         .then((veiculos) => {
//             veiculos.forEach(veiculo => {
//                 fnCarregarVeiculos(veiculo)
//             });
//         })
//         .catch(erro => console.log(erro.message))
// }

// fnCarregarDados()

function fnCarregarDados() {
    fetch('http://127.0.0.1:3000/veiculos', { method: 'GET', credentials: 'include' })

        .then(resposta => {
            if (!resposta.ok) {
                return resposta.json().then(err => {
                throw new Error(err.erro || "Erro " + resposta.status)
                })
            }
            return resposta.json()
        })
        .then(veiculos => {
            if (Array.isArray(veiculos)) {
            veiculos.forEach(fnCarregarVeiculos)
            }else{
                console.log("Falha ao carregar veiculos:", veiculos)
            }
        })
        .catch(erro => console.log(erro.message))
}

fnCarregarDados()