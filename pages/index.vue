<template>
    <div class="flex">
        <div class="flex flex-col h-screen items-center justify-center gap-40 w-full">
            <p class="text-8xl color-primary flex">AcertaNota</p>
            <button v-on:click="redirectConfig()"
                class="bg-color-primary color-base px-16 py-8 text-5xl flex items-center rounded-xl">
                Começar o teste
            </button>
        </div>
    </div>
</template>

<script setup>

const router = useRouter()

const redirectConfig = () => {
    localStorage.setItem('notas', JSON.stringify([]));
    localStorage.setItem('notasNomes', JSON.stringify([]));
    localStorage.setItem('nNotas', '0')
    localStorage.setItem('quantidadeQuestoes', '1');
    localStorage.setItem('seguirQuestoes', 'false');
    localStorage.setItem('referencia', 'false');
    localStorage.setItem('resultado', '0')
    localStorage.setItem('progresso', '0')

    router.push('/configurations')
}

</script>
