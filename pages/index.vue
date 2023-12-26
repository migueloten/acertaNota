<template>
    <div class="flex">
        <div class="flex flex-col h-screen items-center justify-center gap-40 w-[80vw]">
            <p class="text-8xl flex">
                <Icon name="fluent:headphones-sound-wave-48-filled" />AcertaNota
            </p>
            <button v-on:click="redirectConfig()"
                class="bg-color-one color-base px-4 py-2 text-xl flex items-center gap-2 rounded-md">
                <Icon name="material-symbols:play-arrow-rounded" class="text-4xl" />Começar o teste
            </button>
        </div>
        <div class="flex w-[20vw]">
            <Column class="bg-color-one w-1/3" />
            <Column class="bg-color-two w-1/3" />
            <Column class="bg-color-three w-1/3" />
        </div>
    </div>
</template>

<script setup>

const router = useRouter()

const redirectConfig = () => {
    localStorage.setItem('notas', JSON.stringify([]));
    localStorage.setItem('nNotas', '0')
    localStorage.setItem('quantidadeQuestoes', '1');
    localStorage.setItem('seguirQuestoes', 'false');
    localStorage.setItem('referencia', 'false');
    localStorage.setItem('resultado', '0')
    localStorage.setItem('progresso', '0')

    router.push('/configurations')
}

</script>
