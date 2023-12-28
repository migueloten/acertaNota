<template>
    <div class="flex bg-color-three">
        <div class="flex flex-col h-screen items-center justify-around w-full">
            <p class="text-4xl items-center color-base font-semibold flex gap-3">
                <Icon name="material-symbols-light:menu-book" />Resultados
            </p>
            <p class="color-base">Sua pontuação foi : {{ resultadoFinal }}</p>
            <div class="flex flex-col gap-6">
                <button type="button" class="p-5 bg-color-three color-base rounded-lg text-xl"
                    v-on:click="paginaInicial()">Página inicial</button>
                <button type="button" class="p-5 bg-color-three color-base rounded-lg text-xl"
                    v-on:click="voltarConfiguracoes()">Voltar para configurações</button>
                <button type="button" class="p-5 bg-color-three color-base rounded-lg text-xl"
                    v-on:click="refazerTeste()">Refazer o mesmo teste</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()

let resultadoFinal
if (process.browser) {
    resultadoFinal = parseInt(localStorage.getItem('resultadoFinal'))
}

const paginaInicial = () => {
    router.push('/')
}
const voltarConfiguracoes = () => {
    router.push('/configurations')
}
const refazerTeste = () => {
    localStorage.setItem('progresso', '1')
    localStorage.setItem('tentativas', '0')
    localStorage.setItem('resultadoFinal', '0')
    router.push('/questions')
}
</script>
