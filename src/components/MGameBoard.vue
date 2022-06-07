<template>
    <div
        class="m-game-board"
    >
        <div
        v-if="state==states.PLAYING"
        >
            <button class="m-button"
                @click="autoresolve"
            >Autoresolve</button>
        </div>
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
                :ref="`seq_${nSequences - i}`"
            />
        </div>

    </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

import { Mastermind } from '../logic/Mastermind';
import { AI } from '../logic/AI';

import MSequence from '@/components/MSequence.vue';

@Component({
    components: {
        MSequence
    }
})
export default class MGameBoard extends Vue {
    $refs!: {
        seq_0: MSequence[];
    }

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
        Mastermind.reset();
    }

    start() {
        this.state = this.states.PLAYING;
        this.nSequences = 1;
    }

    autoresolve() {
        const seqref = this.$refs.seq_0[0].set(AI.getMove());
    }
}
</script>
<style scoped>
.m-game-board {
    width: 480px;
    min-height: 600px;
  
    display: flex;
    flex-direction: column;

    background:#efefef;

    padding: 4pt;
    border-radius: 8pt;
    border-width: 2px;

    box-shadow: var( --base-shadow);
}

@media only screen and (max-device-width : 640px) {
    .m-game-board {
        width: 100vw;
        height: 100%;
        justify-self: start;

        border-radius: 0;
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