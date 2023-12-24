<template>
    <div class="flex bg-color-three">
        <div class="flex w-[20vw]">
            <Column class="bg-color-base w-1/3" />
            <Column class="bg-color-one w-1/3" />
            <Column class="bg-color-two w-1/3" />
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-[80vw]">
            <p class="text-4xl items-center color-base font-semibold flex gap-3"><Icon name="material-symbols-light:menu-book" />Resultados</p>
            <p class="color-base">Parabéns, você acertou 8 das 10 questões</p>
            <NuxtLink to="/" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-left-alt-rounded" /> Home</NuxtLink>
            <NuxtLink to="/configurations" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-left-alt-rounded" /> Configurações</NuxtLink>
            <NuxtLink to="/questions" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-left-alt-rounded" /> Refazer o mesmo teste</NuxtLink>
        </div>
    </div>
</template>