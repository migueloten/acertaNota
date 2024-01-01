<template>
    <div class="flex bg-color-base">
        <div class="flex flex-col h-screen items-center justify-around w-full">
            <p class="text-7xl items-center color-primary font-semibold flex">
                Resultados
            </p>
            <p class="color-primary text-4xl">Sua pontuação foi : {{ resultadoFinal }}</p>
            <div class="flex flex-col gap-6">
                <button type="button" class="p-5 bg-color-primary color-base rounded-lg text-xl"
                    v-on:click="paginaInicial()">Página inicial</button>
                <button type="button" class="p-5 bg-color-primary color-base rounded-lg text-xl"
                    v-on:click="voltarConfiguracoes()">Voltar para as configurações</button>
                <button type="button" class="p-5 bg-color-primary color-base rounded-lg text-xl"
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
