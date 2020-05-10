<template>
    <div
        class="m-game-board v-card"
    >
        <h2>Board</h2>

        <div v-for="i in nSequences" :key="i">
            <MSequence
                v-on:go="processSequenceGo($event)"
            />
        </div>
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

    won = false;
    nSequences = 1
    
    processSequenceGo(score: any) {
        if (score.black == 4) {
            this.won = true;
        } else {
            this.nSequences++;
        }
    }

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