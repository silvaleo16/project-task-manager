//seletores do formulario
const form = document.querySelector('#formulario-nova-tarefa')
const textarea = document.getElementById("descricao")
const contador = document.getElementById("contador")


//ação de contar caracteres do textarea
textarea.addEventListener("input", () => {
    contador.textContent = `${textarea.value.length}/${textarea.maxLength}`
})


form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('enviou formulario')
}) 