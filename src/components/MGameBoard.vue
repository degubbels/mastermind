<template>
    <div
        class="m-game-board v-card"
    >
        <div 
            v-if="state==states.WON"
            class="m-game-control"
        >
            <h2>You Win!</h2>

            <button class="m-button"
                @click="reset"
            >Reset</button>
        </div>

        <div 
            v-if="state==states.PRE"
            class="m-game-control"
        >

            <button class="m-button"
                @click="start"
            >Start</button>
        </div>

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

    states = {
        PRE: 0,
        PLAYING: 1,
        WON: 2
    }

    state = this.states.PRE;
    nSequences = 0
    
    processSequenceGo(score: any) {
        if (score.black == 4) {
            this.state = this.states.WON;
        } else {
            this.nSequences++;
        }
    }

    reset() {
        this.state = this.states.PRE;
        this.nSequences = 0;
    }

    start() {
        this.state = this.states.PLAYING;
        this.nSequences = 1;
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

.m-button {
    width: 10rem;
    background-color: white;
    background-color: white;
}

.m-game-control {
    align-self: center;
}
</style>