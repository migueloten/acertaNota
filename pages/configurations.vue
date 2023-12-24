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
                    <legend class="legend-form">Notas</legend>
                    <div class="flex gap-5">
                        <div class="checkbox" v-for="(item, index) in items" v-bind:key="item.id">
                            <label class="label-check-notas" :for="item.id">
                                <input class="input-check-notas" type="checkbox" :id="item.id" :name="item.id"
                                    :value="index">
                                <span class="decorator-check-notas">{{ item.label }}</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
                <div class="flex gap-4">
                    <!-- <label for="questions" class="legend-form">Questões</label>
                    <input id="questions" type="number" step="1" max="50" min="1" value="1"> -->
                    <div class="number-input">
                        <input class="quantity" min="0" name="quantity" value="1" type="number">
                        <div class="flex flex-col">
                            <button type="button"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"></button>
                            <button type="button" onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                class="plus"></button>
                        </div>
                    </div>
                </div>
                <button type="submit" value="Submit">Submit</button>
            </form>

            <NuxtLink to="/questions" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md">
                <Icon name="material-symbols:arrow-right-alt-rounded" /> Questões
            </NuxtLink>
        </div>
        <div class="flex w-[13.3vw]">
            <Column class="bg-color-two w-1/2" />
            <Column class="bg-color-three w-1/2" />
        </div>
    </div>
</template>

<script setup>
const items = ref([
    { id: 'c', label: 'C' },
    { id: 'd', label: 'D' },
    { id: 'e', label: 'E' },
    { id: 'f', label: 'F' },
    { id: 'g', label: 'G' },
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' }])
</script>

<style lang="scss">
.legend-form {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-base);
}

input[type="number"] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

.number-input {
    border: 2px solid #ddd;
    display: inline-flex;
}

.number-input,
.number-input * {
    box-sizing: border-box;
}

.number-input button {
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    margin: 0;
    position: relative;
}

.number-input button:before,
.number-input button:after {
    display: inline-block;
    position: absolute;
    content: '';
    width: 1rem;
    height: 2px;
    background-color: #212121;
    transform: translate(-50%, -50%);
}

.number-input button.plus:after {
    transform: translate(-50%, -50%) rotate(90deg);
}

.number-input input[type=number] {
    font-family: sans-serif;
    max-width: 5rem;
    padding: .5rem;
    border: solid #ddd;
    border-width: 0 2px;
    font-size: 2rem;
    height: 3rem;
    font-weight: bold;
    text-align: center;
}

/* input:invalid + span::after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span::after {
  content: "✓";
  padding-left: 5px;
} */

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
</style>