<template>
    <div class="flex bg-color-two">
        <div class="flex w-[13.3vw]">
            <Column class="bg-color-base w-1/2" />
            <Column class="bg-color-one w-1/2" />
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-[80vw]">
            <NuxtLink to="/" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md">
                <Icon name="material-symbols:arrow-left-alt-rounded" /> Home
            </NuxtLink>
            <NuxtLink to="/configurations"
                class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md">
                <Icon name="material-symbols:arrow-left-alt-rounded" /> Configurações
            </NuxtLink>
            <p class="text-4xl items-center color-base font-semibold flex gap-3">
                <Icon name="material-symbols-light:menu-book" />Questões
            </p>

            <button type="button" v-on:click="revisao(item)" :id="item" v-for="(item, index) in items" v-bind:key="item">
                {{ item }} - {{ index }}
            </button>
        </div>
        <div class="flex w-[6.6vw]">
            <Column class="bg-color-three w-full" />
        </div>
    </div>
</template>

<script setup>
const router = useRouter()

const items = ref(JSON.parse(localStorage.getItem('notas')))

const revisao = (id) => {
    localStorage.getItem('notaNome') == id ? correto() : errado()
}

const correto = () => {
    console.log('Acertou')
}

const errado = () => {
    console.log('Errou')
}

onMounted(() => {
    localStorage.setItem('notaNome', 'd')
})
</script>

