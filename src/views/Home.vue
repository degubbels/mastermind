<template>
    <div class="m-game-board-parent">
        <MGameBoard/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MGameBoard from '@/components/MGameBoard.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        MGameBoard
    }
})
</script>
<style scoped>
.m-game-board-parent {
    height: 100%;
    display: grid;
}
</style>