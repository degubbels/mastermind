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
            <h2>Welcome to Mastermind</h2>
            <button class="m-button"
                @click="start"
            >Start</button>
            <p>
                Try to guess the hidden sequence by trying combinations.
                Click or tap a coloured pin to change the colour.
            </p>

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
    width: 480px;
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

@media only screen and (max-device-width : 640px) {
    .m-game-board {
        width: 100vw;
        height: 100%;
        justify-self: start;
    }
}

.m-button {
    width: 10rem;
    background-color: white;
    padding: 2pt;
}

.m-game-control {
    align-self: center;
}

.m-game-control > * {
    margin: 8pt;
}
</style>