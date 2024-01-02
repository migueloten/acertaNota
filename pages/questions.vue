<template>
    <div class="flex bg-color-base overflow-y-auto">
        <div class="flex justify-center items-center absolute w-[100vw] h-[100vh] bg-color-base opacity-0.5" id="cortina">
            <p
                class="flex justify-center items-center font-bold bg-color-base-alt color-primary text-6xl w-40 h-40 rounded-full loading-note">
                <Icon name="material-symbols:music-note" />
            </p>
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-full p-5">
            <button type="button"
                class="bg-color-primary color-base p-2 text-4xl flex items-center gap-2 fixed left-[5vw] top-[5vh] rounded-md z-10"
                v-on:click="voltarConfiguracoes()">
                <Icon name="mynaui:config" />
            </button>
            <p class="text-5xl md:text-7xl mt-16 items-center color-primary font-semibold flex text-wrap">
                Questão {{ progressoTotal }} de {{ quantidadeQuestoes }}
            </p>
            <div class="flex flex-col gap-2">
                <button class="bg-color-primary color-base rounded-lg md:text-3xl text-2xl md:p-5 p-3" v-if="notaReferencia"
                    v-on:click="playReferencia()" type="button">Nota de referência</button>
                <button class="bg-color-primary color-base rounded-lg md:text-3xl text-2xl md:p-5 p-3"
                    v-on:click="playNote(randomOctave)" type="button">Ouvir a questão</button>
            </div>

            <div class="flex flex-col gap-10 items-center">
                <p class="text-4xl color-primary">Alternativas</p>
                <div class="flex gap-6 flex-wrap">
                    <button type="button" :class="[`bg-color-${item}`]"
                        class="w-[75px] h-[75px] color-base rounded-lg text-xl" data-js="alternative-button"
                        v-on:click="revisao(item)" :id="item" v-for="(item, index) in items" v-bind:key="item">
                        {{ itemsName[index] }}
                    </button>
                </div>
            </div>

            <div class="flex bg-color-base-alt w-[60vw] h-3 mb-8 md:mb-2 rounded-full">
                <div class="bg-color-primary h-full rounded-full" data-js="progress-bar">
                </div>
            </div>

            <button type="button" v-on:click="proximaQuestao()" id="btnProximaQuestao"
                class="bg-color-primary color-base flex items-center gap-2 fixed right-[2vw] bottom-[-15vh] rounded-md md:text-2xl text-1xl md:p-4 p-2">
                Próxima questão
            </button>

        </div>
    </div>
</template>

<script setup>
const router = useRouter()

let items = []
let itemsName = []
let progressoTotal
let quantidadeQuestoes
let seguirAutomaticamente
let notaReferencia
if (process.browser) {
    items = ref(JSON.parse(localStorage.getItem('notas')));
    itemsName = ref(JSON.parse(localStorage.getItem('notasNomes')));
    progressoTotal = parseInt(localStorage.getItem('progresso'));
    quantidadeQuestoes = parseInt(localStorage.getItem('quantidadeQuestoes'));
    seguirAutomaticamente = localStorage.getItem('seguirQuestoes') == 'true' ? true : false;
    notaReferencia = localStorage.getItem('referencia') == 'true' ? true : false;
}

// ---------- Voltar para as configurações ----------------------------------------------------------

const voltarConfiguracoes = () => {
    router.push('/configurations')
}

// ---------- Gera um valor aleatório baseado nas alterantivas disponibilizadas ---------------------
let indexValue
let randomNote
let randomNumber
let randomOctave
const randomNoteGenerator = () => {
    indexValue = Math.floor(Math.random() * localStorage.getItem('nNotas'))
    randomNote = JSON.parse(localStorage.getItem('notas'))[indexValue]
    randomNumber = Math.floor(Math.random() * 3) + 3
    randomOctave = `${randomNote}${randomNumber}`
    localStorage.setItem('notaNome', randomNote)
    console.log(randomOctave)
}

// ---------- Toca a nota -----------------------------------------------------------
import * as Tone from 'tone'
let synth
let numTentativas = 0
let resultadoFinal
let resultadoQuestao

const playNote = (nota) => {
    synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.triggerAttackRelease(nota, "2n");
}

// ---------- Toca a referência -----------------------------------------------------
const playReferencia = () => {
    synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.triggerAttackRelease("c4", "2n");
}

//------------ Passar a questão ---------------------------------------------------

const proximaQuestao = () => {
    resultadoQuestao = (1 - ((1 / parseInt(localStorage.getItem('nNotas'))) * numTentativas)) * (100 / quantidadeQuestoes)
    console.log(resultadoQuestao)
    resultadoFinal = parseFloat(localStorage.getItem('resultadoFinal'))
    resultadoFinal += resultadoQuestao
    console.log(resultadoFinal)
    localStorage.setItem('resultadoFinal', resultadoFinal)

    progressoTotal++
    localStorage.setItem('progresso', progressoTotal)

    progressoTotal <= quantidadeQuestoes ? setTimeout(passaQuestao, seguirAutomaticamente ? 1500 : 0) : setTimeout(passaPagina, seguirAutomaticamente ? 1500 : 0)
}

const passaQuestao = () => {
    location.reload(true);
}

const passaPagina = () => {
    router.push("/results");
}

const showButtonNext = () => {
    progressoTotal == quantidadeQuestoes ? document.querySelector('#btnProximaQuestao').innerHTML = 'Ver resultado final' : ''
    document.querySelector('#btnProximaQuestao').classList.toggle('active-next')
}

// ----------- Verificação da resposta --------------------------------------------
const revisao = (id) => {
    localStorage.getItem('notaNome') == id ? correto(id) : errado(id)
}

const correto = (id) => {
    document.querySelector('#' + id).classList.add('correto')
    document.querySelectorAll('button[data-js="alternative-button"]').forEach(btn => {
        btn.classList.contains('correto') ? '' : btn.disabled = true
    })

    document.querySelector('[data-js="progress-bar"]').style.width = ((progressoTotal / quantidadeQuestoes) * 100) + '%'

    seguirAutomaticamente ? proximaQuestao() : showButtonNext()
}

const errado = (id) => {
    document.querySelector('#' + id).disabled = true
    document.querySelector('#' + id).classList.add('errado')
    numTentativas++
}

onMounted(() => {
    randomNoteGenerator()
    document.querySelector('[data-js="progress-bar"]').style.width = (((progressoTotal - 1) / quantidadeQuestoes) * 100) + '%'
})
</script>

<style lang="scss">
#cortina {
    animation: abrirCortina 1.6s forwards;
}

#btnProximaQuestao {
    transition: all 0.6s ease-in-out;

    &.active-next {
        bottom: 3vh;
    }
}

button[data-js="alternative-button"] {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.correto {
    animation: jump-shaking 0.83s forwards;
}

.errado {
    color: var(--color-primary);
    background-color: var(--color-base-alt);
    animation: horizontal-shaking 0.3s forwards;
}

.loading-note {
    animation: rotate-loading 1s infinite;
}

[data-js="progress-bar"] {
    width: 0%;
    transition: all 1s ease;
}

@keyframes abrirCortina {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    99% {
        width: 100vw;
        height: 100vh;
    }

    100% {
        opacity: 0;
        width: 0px;
        height: 0px;
    }
}

@keyframes horizontal-shaking {
    0% {
        transform: translateX(0)
    }

    25% {
        transform: translateX(5px)
    }

    50% {
        transform: translateX(-5px)
    }

    75% {
        transform: translateX(5px)
    }

    100% {
        transform: translateX(0)
    }
}

@keyframes jump-shaking {
    0% {
        transform: translateX(0)
    }

    25% {
        transform: translateY(-9px)
    }

    35% {
        transform: translateY(-9px) rotate(17deg)
    }

    55% {
        transform: translateY(-9px) rotate(-17deg)
    }

    65% {
        transform: translateY(-9px) rotate(17deg)
    }

    75% {
        transform: translateY(-9px) rotate(-17deg)
    }

    100% {
        transform: translateY(0) rotate(0)
    }
}

@keyframes rotate-loading {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>

