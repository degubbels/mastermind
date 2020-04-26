<template>
    <div
        class="m-game-board v-card"
    >
        <h2>Board</h2>

        <MSequence></MSequence>
    </div>
</template>
<script lang="ts">
import {Mastermind, Sequence} from '@/logic/Mastermind.ts';
import Component from 'vue-class-component';
import Vue from 'vue';
import MSequence from '@/components/MSequence.vue';

@Component({
    components: {
        MSequence
    }
})
export default class MGameBoard extends Vue {
    
}
</script>
<style scoped>
.m-game-board {
    width: 400px;
    height: 600px;
    border-radius: 8pt;
    border-width: 2px;
    display: flex;
    flex-direction: column;
    padding: 4pt;
    justify-self: center;
    align-self: center;
    background:#efefef;
}
</style>