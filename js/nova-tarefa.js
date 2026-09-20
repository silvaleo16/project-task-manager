//seletores do formulario
const form = document.querySelector('#formulario-nova-tarefa')
const inputTitulo = document.querySelector("#titulo-da-tarefa")
const textarea = document.getElementById("descricao")
const contador = document.getElementById("contador")
const inputData = document.getElementById("data-tarefa")
//elementos da tag
const inputTags = document.querySelector("#tags")
const sugestoesTags = document.querySelector(".sugestoes-tags")
const tagsSelecionadasContainer =
    document.querySelector(".tags-selecionadas")


//validação das datas
const hoje = new Date().toISOString().split('T')[0]
inputData.min = hoje

//ação de contar caracteres do textarea
textarea.addEventListener("input", () => {
    contador.textContent = `${textarea.value.length}/${textarea.maxLength}`
})


function validarCampo(elemento) {

    //seletores de error
    const elementoError = elemento
        .closest('fieldset')
        .querySelector('.mensagem-erro')

    // ao sair do foco faz a validação
    elemento.addEventListener('blur', () => {
        //validação do campo obrigatorio vazio
        if (elemento.validity.valueMissing) {
            elementoError.innerHTML = `campo obrigatorio`
        } else if (elemento.validity.rangeUnderflow) {
            elementoError.innerHTML = `Data anterior ao permitido`
        } else {
            elementoError.innerHTML = ``
        }
    })
}


validarCampo(inputTitulo)
validarCampo(inputData)

//tags

//listas já cadastradas - em preve deve vir da API
const tagsCadastradas = [
    "frontend",
    "backend",
    "backup",
    "bug",
    "melhoria",
    "urgente",
    "documentação"
]

const tagsSelecionadas = []

function adicionarTag(tag) {

    // Impede tag duplicada
    if (tagsSelecionadas.includes(tag)) {
        return
    }

    // Adiciona a tag à tarefa
    tagsSelecionadas.push(tag)


    // Cria o elemento visual da tag
    const tagElemento = document.createElement("div")
    tagElemento.classList.add("tag")


    // Texto da tag
    const tagTexto = document.createElement("span")
    tagTexto.textContent = tag


    // Botão para remover
    const botaoRemover = document.createElement("button")

    botaoRemover.type = "button"
    botaoRemover.textContent = "x"


    // Remover tag
    botaoRemover.addEventListener("click", () => {
        removeTag(tag, tagElemento)
    })
    // Monta a tag
    tagElemento.appendChild(tagTexto)
    tagElemento.appendChild(botaoRemover)


    // Adiciona na tela
    tagsSelecionadasContainer.appendChild(tagElemento)
}

function removeTag(tag, tagElemento) {
    // Remover tag
    const indice = tagsSelecionadas.indexOf(tag)

    if (indice !== -1) {
        tagsSelecionadas.splice(indice, 1)
    }

    tagElemento.remove()
}

// BUSCAR TAGS


inputTags.addEventListener("input", () => {

    // Captura e normaliza o texto
    const textoDigitado = inputTags.value
        .trim()
        .toLowerCase()


    // Limpa sugestões anteriores
    sugestoesTags.innerHTML = ""


    // Não pesquisa caso esteja vazio
    if (textoDigitado === "") {
        return
    }



    // FILTRAR TAGS


    const resultado = tagsCadastradas.filter(tag =>
        tag.toLowerCase().includes(textoDigitado) &&
        !tagsSelecionadas.includes(tag)
    )


    // MOSTRAR SUGESTÕES

    resultado.forEach(tag => {

        const sugestao = document.createElement("div")

        sugestao.textContent = tag


        sugestao.addEventListener("click", () => {

            adicionarTag(tag)

            inputTags.value = ""

            sugestoesTags.innerHTML = ""
        })


        sugestoesTags.appendChild(sugestao)
    })


    // VERIFICAR SE A TAG EXISTE

    const tagExiste = tagsCadastradas.some(tag =>
        tag.toLowerCase() === textoDigitado
    )


    // CRIAR NOVA TAG

    if (!tagExiste) {

        const opcaoCriar = document.createElement("div")

        opcaoCriar.classList.add("criar-tag")

        opcaoCriar.textContent = `+ Criar "${textoDigitado}"`

        opcaoCriar.addEventListener("click", () => {
            // Adiciona a nova tag às tags cadastradas
            tagsCadastradas.push(textoDigitado)

            // Adiciona a tag à tarefa atual
            adicionarTag(textoDigitado)

            // Limpa o input
            inputTags.value = ""

            // Fecha as sugestões
            sugestoesTags.innerHTML = ""
        })

        sugestoesTags.appendChild(opcaoCriar)
    }
})



form.addEventListener('submit', (event) => {

    event.preventDefault();
}) 