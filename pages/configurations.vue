<template>
    <div class="flex bg-color-base">
        <div class="flex flex-col h-screen items-center justify-around w-full">
            <NuxtLink to="/"
                class="bg-color-primary color-base p-2 text-4xl flex items-center gap-2 fixed left-[5vw] top-[5vh] rounded-md">
                <Icon name="material-symbols:arrow-left-alt-rounded" />
            </NuxtLink>
            <p class="text-7xl items-center color-primary font-semibold flex">
                Configurações
            </p>
            <form class="flex flex-col gap-8">
                <fieldset class="flex flex-col gap-5">
                    <p class="color-primary font-semibold text-4xl">Notas</p>
                    <div class="flex flex-wrap gap-6">
                        <div class="checkbox" v-for="(item, index) in items" v-bind:key="item.id">
                            <label class="color-base" :for="item.id">
                                <input class="input-check-notas" v-on:click="playNote(item.id)" :data-name="item.label"
                                    data-js="input-check-notas" type="checkbox" :id="item.id" :name="item.id"
                                    :value="index">
                                <span :class="[`bg-color-${item.id}`]" :id="'decorator-' + item.id"
                                    class="decorator-check-notas relative flex items-center justify-center rounded-lg text-4xl w-[75px] h-[75px]">
                                    {{ item.label }}
                                </span>
                            </label>
                        </div>
                    </div>
                </fieldset>

                <div class="flex flex-col gap-4">
                    <label for="questions" class="color-primary font-semibold text-4xl">Questões</label>
                    <div class="flex gap-2 items-center">
                        <input id="questions" class="rounded-2xl bg-color-primary color-base px-8 py-4 text-xl" min="1"
                            max="50" step="1" name="questionsQuantity" value="1" type="number">
                        <div class="flex flex-col text-4xl gap-2">
                            <button type="button" class="color-primary flex items-center" v-on:click="addQuestion()">
                                <Icon name="ic:round-arrow-upward" />
                            </button>
                            <button type="button" class="color-primary flex items-center" v-on:click="removeQuestion()">
                                <Icon name="ic:round-arrow-downward" />
                            </button>
                        </div>
                    </div>
                </div>

                <label class="switch flex items-center gap-3">
                    <input name="seguirAutomaticamente" type="checkbox" id="seguirAutomaticamente">
                    <span class="slider bg-color-base-alt"></span>
                    <span class="color-primary font-semibold text-2xl">Seguir automaticamente após acertar</span>
                </label>

                <label class="switch flex items-center gap-3">
                    <input name="notaReferencia" type="checkbox" id="notaReferencia">
                    <span class="slider bg-color-base-alt"></span>
                    <span class="color-primary font-semibold text-2xl">Ativar nota de referência</span>
                </label>

                <button type="button" v-on:click="setStorage()"
                    class="px-8 py-4 bg-color-primary color-base rounded-lg text-2xl w-48">Iniciar</button>
            </form>
        </div>
    </div>
</template>

<script setup>

const router = useRouter()

const items = ref([
    { id: 'c', label: 'Dó' },
    { id: 'd', label: 'Ré' },
    { id: 'e', label: 'Mi' },
    { id: 'f', label: 'Fá' },
    { id: 'g', label: 'Sol' },
    { id: 'a', label: 'Lá' },
    { id: 'b', label: 'Si' }])

const addQuestion = () => {
    document.querySelector('input[name=questionsQuantity]').stepUp()
}

const removeQuestion = () => {
    document.querySelector('input[name=questionsQuantity]').stepDown()
}

const setStorage = () => {
    let checklistArray = []
    let arrayNotasNomes = []
    document.querySelectorAll('[data-js="input-check-notas"]').forEach(check => {
        check.checked ? checklistArray.push(check.id) : ''
        check.checked ? arrayNotasNomes.push(check.dataset.name) : ''
    });
    let questionQuantity = document.querySelector('#questions').value;
    let seguirAutomaticamente = document.querySelector('#seguirAutomaticamente').checked;
    let notaReferencia = document.querySelector('#notaReferencia').checked;

    localStorage.setItem('notas', JSON.stringify(checklistArray));
    localStorage.setItem('notasNomes', JSON.stringify(arrayNotasNomes));
    localStorage.setItem('nNotas', checklistArray.length)
    localStorage.setItem('quantidadeQuestoes', questionQuantity);
    localStorage.setItem('seguirQuestoes', seguirAutomaticamente);
    localStorage.setItem('referencia', notaReferencia);
    localStorage.setItem('resultadoFinal', '0');
    localStorage.setItem('progresso', '1');
    localStorage.setItem('tentativas', '0');

    router.push('/questions')
};

// ---------- Toca a nota -----------------------------------------------------------
import * as Tone from 'tone'
let synth
const playNote = (nota) => {
    synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(nota + "4", "8n");
    document.querySelector("#decorator-" + nota).classList.toggle(`color-${nota}`)
}

onMounted(() => {
    JSON.parse(localStorage.getItem('notas')).forEach(nota => {
        document.querySelector('#' + nota).checked = true
        document.querySelector("#decorator-" + nota).classList.toggle(`color-${nota}`)
    })
    document.querySelector('#questions').value = localStorage.getItem('quantidadeQuestoes');
    document.querySelector('#seguirAutomaticamente').checked = localStorage.getItem('seguirQuestoes') == 'true' ? true : false;
    document.querySelector('#notaReferencia').checked = localStorage.getItem('referencia') == 'true' ? true : false;
})

</script>

<style lang="scss">
/* ---------------------------------------- estilo para os switchs ------------------------------------------------------------------------------ */

.slider {
    display: inline-block;
    width: 3.5em;
    height: 2em;
    border-radius: 1em;
    position: relative;
    transition: 0.3s all ease-in-out;
}

.slider::after {
    content: "";
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background-color: #fff;
    border-radius: calc(1.5em / 2);
    position: absolute;
    top: 0.25em;
    transform: translateX(0.25em);
    box-shadow: 10px 0 40px rgba(0, 0, 0, 0.1);
    transition: 0.3s all ease-in-out;
}

.switch input[type="checkbox"]:checked+.slider {
    background-color: var(--color-primary);
}

.switch input[type="checkbox"]:checked+.slider::after {
    transform: translateX(1.75em);
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.1);
}

.switch input[type="checkbox"] {
    display: none;
}

.switch input[type="checkbox"]:active+.slider::after {
    width: 3em;
}

.switch input[type="checkbox"]:checked:active+.slider::after {
    transform: translateX(calc(3.5em - 3em - 0.25em));
}


/* ---------------------------------------- estilo para a o checklist de notas ------------------------------------------------------------------ */

.input-check-notas {
    // Code to hide the input
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    &:checked+.decorator-check-notas {
        box-shadow: inset 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
        background-color: var(--color-base-alt);
    }
}

.decorator-check-notas {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: 0.6s ease;
    cursor: pointer;
}

/* ------------------------------------------ estilo para o input número para as questões ------------------------------------------------------ */

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
</style>