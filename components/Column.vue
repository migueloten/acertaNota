<template>
    <div class="column flex h-screen"></div>
</template>

<style lang="scss">
    .column{
        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);

        &:hover{
            transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }
    }

    /* animation: show-separator 0.6s ease-in-out forwards; */
    /* @keyframes show-separator {
        0%{
            width: calc(33.3% + 0px);
        }
        100%{
            width:calc(33.3% + 20px);
        }
    } */
</style>