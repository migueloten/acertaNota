<template>
    <div class="flex bg-color-two">
        <div class="flex justify-center items-center absolute w-[100vw] h-[100vh] bg-color-two opacity-0.5" id="cortina">
            <p
                class="flex justify-center items-center font-bold bg-color-base color-three text-6xl w-40 h-40 rounded-full loading-note">
                <Icon name="material-symbols:music-note" />
            </p>
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-full">
            <button type="button" class="p-5 bg-color-three color-base rounded-lg text-xl"
                v-on:click="voltarConfiguracoes()">Voltar para configurações</button>
            <p class="text-4xl items-center color-base font-semibold flex gap-3">
                <Icon name="material-symbols-light:menu-book" />Questão {{ progressoTotal }} de {{ quantidadeQuestoes }}
            </p>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <button class="p-5 bg-color-three color-base rounded-lg text-xl" v-if="notaReferencia"
                        v-on:click="playReferencia()" type="button">Nota de referência</button>
                    <button class="p-5 bg-color-three color-base rounded-lg text-xl" v-on:click="playNote(randomOctave)"
                        type="button">Ouvir a questão</button>
                </div>
                <div class="flex gap-4">
                    <button type="button" class="w-16 h-16 bg-color-three color-base rounded-lg text-xl uppercase"
                        data-js="alternative-button" v-on:click="revisao(item)" :id="item" v-for="(item) in items"
                        v-bind:key="item">
                        {{ item }}
                    </button>
                </div>
                <button type="button" v-on:click="proximaQuestao()" id="btnProximaQuestao"
                    class="hidden p-5 bg-color-three color-base rounded-lg text-xl">
                    Próxima questão
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()

let items = []
let progressoTotal
let quantidadeQuestoes
let seguirAutomaticamente
let notaReferencia
if (process.browser) {
    items = ref(JSON.parse(localStorage.getItem('notas')));
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

    progressoTotal <= quantidadeQuestoes ? setTimeout(passaPagina, seguirAutomaticamente ? 1500 : 0) : router.push("/results")
}

const passaPagina = () => {
    location.reload(true);
}

const showButtonNext = () => {
    progressoTotal == quantidadeQuestoes ? document.querySelector('#btnProximaQuestao').innerHTML = 'Ver resultado final' : ''
    document.querySelector('#btnProximaQuestao').style.display = 'flex'
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

    seguirAutomaticamente ? proximaQuestao() : showButtonNext()
}

const errado = (id) => {
    document.querySelector('#' + id).disabled = true
    document.querySelector('#' + id).classList.add('errado')
    numTentativas++
}

onMounted(() => {
    randomNoteGenerator()
})
</script>

<style lang="scss">
#cortina {
    animation: abrirCortina 2s forwards;
}

.correto {
    color: #fff;
    background-color: #479762;
    animation: jump-shaking 0.83s forwards;
}

.errado {
    color: #000;
    background-color: #802f2f;
    animation: horizontal-shaking 0.3s forwards;
}

.loading-note {
    animation: rotate-loading 1s infinite;
}

@keyframes abrirCortina {
    0% {
        opacity: 1;
        display: flex;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        display: none;
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

