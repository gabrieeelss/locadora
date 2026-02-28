function fnFazerLogin() {
let formDados = {
usuario: document.getElementById("_________").value,
senha: document.getElementById("_________").value
}
fetch('http://localhost:3000/login/', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formDados)
})
.then(resposta => resposta.status)
.then((dados) => {
fnLimparCampos()
console.log(dados)
})
.catch(erro => console.log(erro.message))
}
