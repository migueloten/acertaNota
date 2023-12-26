<template>
    <div class="flex bg-color-one">
        <div class="flex w-[6.6vw]">
            <Column class="bg-color-base w-full" />
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-[80vw]">
            <NuxtLink to="/" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md">
                <Icon name="material-symbols:arrow-left-alt-rounded" />
            </NuxtLink>
            <p class="text-4xl items-center color-base font-semibold flex gap-3">
                <Icon name="mynaui:config" />Configurações
            </p>
            <form class="flex flex-col gap-8">
                <fieldset class="flex flex-col gap-5">
                    <p class="legend-form">Notas</p>
                    <div class="flex gap-5">
                        <div class="checkbox" v-for="(item, index) in items" v-bind:key="item.id">
                            <label class="label-check-notas" :for="item.id">
                                <input class="input-check-notas" data-js="input-check-notas" type="checkbox" :id="item.id"
                                    :name="item.id" :value="index">
                                <span class="decorator-check-notas">{{ item.label }}</span>
                            </label>
                        </div>
                    </div>
                </fieldset>

                <div class="flex flex-col gap-4">
                    <label for="questions" class="legend-form">Questões</label>
                    <div class="flex gap-2 items-center">
                        <input id="questions" class="rounded-2xl bg-color-three color-base px-8 py-4 text-xl" min="1"
                            max="50" step="1" name="questionsQuantity" value="1" type="number">
                        <div class="flex flex-col text-4xl gap-2">
                            <button type="button" class="color-base flex items-center" v-on:click="addQuestion()">
                                <Icon name="ic:round-arrow-upward" />
                            </button>
                            <button type="button" class="color-base flex items-center" v-on:click="removeQuestion()">
                                <Icon name="ic:round-arrow-downward" />
                            </button>
                        </div>
                    </div>
                </div>

                <label class="switch flex items-center gap-3">
                    <input name="seguirAutomaticamente" type="checkbox" id="seguirAutomaticamente">
                    <span class="slider"></span>
                    <span class="legend-form">Seguir automaticamente após acertar</span>
                </label>

                <label class="switch flex items-center gap-3">
                    <input name="notaReferencia" type="checkbox" id="notaReferencia">
                    <span class="slider"></span>
                    <span class="legend-form">Ativar nota de referência</span>
                </label>

                <button type="button" v-on:click="setStorage()"
                    class="px-8 py-4 bg-color-three color-base rounded-lg text-2xl w-48">Iniciar</button>
            </form>
        </div>
        <div class="flex w-[13.3vw]">
            <Column class="bg-color-two w-1/2" />
            <Column class="bg-color-three w-1/2" />
        </div>
    </div>
</template>

<script setup>

const router = useRouter()

const items = ref([
    { id: 'c', label: 'C' },
    { id: 'd', label: 'D' },
    { id: 'e', label: 'E' },
    { id: 'f', label: 'F' },
    { id: 'g', label: 'G' },
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' }])

const addQuestion = () => {
    document.querySelector('input[name=questionsQuantity]').stepUp()
}

const removeQuestion = () => {
    document.querySelector('input[name=questionsQuantity]').stepDown()
}

const setStorage = () => {

    let checklistArray = []
    document.querySelectorAll('[data-js="input-check-notas"]').forEach(check => {
        check.checked ? checklistArray.push(check.id) : ''
    });
    let questionQuantity = document.querySelector('#questions').value;
    let seguirAutomaticamente = document.querySelector('#seguirAutomaticamente').checked;
    let notaReferencia = document.querySelector('#notaReferencia').checked;

    localStorage.setItem('notas', JSON.stringify(checklistArray));
    localStorage.setItem('nNotas', checklistArray.length)
    localStorage.setItem('quantidadeQuestoes', questionQuantity);
    localStorage.setItem('seguirQuestoes', seguirAutomaticamente);
    localStorage.setItem('referencia', notaReferencia);
    localStorage.setItem('resultado', '0')
    localStorage.setItem('progresso', '0')

    // console.log('Notas: ' + localStorage.getItem('notas'))
    // console.log('Quantidade de questões: ' + localStorage.getItem('quantidadeQuestoes'))
    // console.log('Seguir Automaticamente: ' + localStorage.getItem('seguirQuestoes'))
    // console.log('Nota de referência: ' + localStorage.getItem('referencia'))

    router.push('/questions')
};

onMounted(() => {
    JSON.parse(localStorage.getItem('notas')).forEach(nota => {
        document.querySelector('#' + nota).checked = true
    })
    document.querySelector('#questions').value = localStorage.getItem('quantidadeQuestoes');
    document.querySelector('#seguirAutomaticamente').checked = localStorage.getItem('seguirQuestoes') == 'true' ? true : false;
    document.querySelector('#notaReferencia').checked = localStorage.getItem('referencia') == 'true' ? true : false;
})

</script>

<style lang="scss">
.legend-form {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-base);
}

/* ---------------------------------------- estilo para os switchs ------------------------------------------------------------------------------ */

.slider {
    display: inline-block;
    width: 3.5em;
    height: 2em;
    background-color: var(--color-base);
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
    background-color: var(--color-three);
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

.label-check-notas {
    color: var(--color-base);
}

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
        background-color: var(--color-base);
        color: var(--color-three);
    }
}

.decorator-check-notas {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    min-height: 5rem;
    border-radius: 0.5rem;
    background-color: var(--color-three);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    transition: 0.6s ease;
    cursor: pointer;
    position: relative;
    font-size: 40px;
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

/* input:invalid + span::after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span::after {
  content: "✓";
  padding-left: 5px;
} */
</style>