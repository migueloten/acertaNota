<template>
    <div class="flex bg-color-two">
        <div class="flex w-[13.3vw]">
            <Column class="bg-color-base w-1/2" />
            <Column class="bg-color-one w-1/2" />
        </div>
        <div class="flex flex-col h-screen items-center justify-around w-[80vw]">
            <NuxtLink to="/" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-left-alt-rounded" /> Home</NuxtLink>
            <NuxtLink to="/configurations" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-left-alt-rounded" /> Configurações</NuxtLink>
            <p class="text-4xl items-center color-base font-semibold flex gap-3"><Icon name="material-symbols-light:menu-book" />Questões</p>
            <NuxtLink to="/results" class="bg-color-three color-base p-2 text-4xl flex items-center gap-2 rounded-md"><Icon name="material-symbols:arrow-right-alt-rounded" /> Terminei</NuxtLink>
        </div>
        <div class="flex w-[6.6vw]">
            <Column class="bg-color-three w-full" />
        </div>djefhi jvnjj
    </div>
</template>
