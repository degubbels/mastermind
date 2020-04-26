<template>
    <section class="m-sequence">

        <button @click="processGo"
            class="sequence-confirm"
        >Go</button>
        
        <MColourPin
            v-on:colour-set="processColourSet(0, $event)"
        />
        <MColourPin
            v-on:colour-set="processColourSet(1, $event)"
        />
        <MColourPin
            v-on:colour-set="processColourSet(2, $event)"
        />
        <MColourPin
            v-on:colour-set="processColourSet(3, $event)"
        />

        <MCheckPins
            :score="score"
        />
        
    </section>
</template>
<script lang="ts">
// Base
import Component from 'vue-class-component';
import Vue from 'vue';

// Logic
import { Sequence, Mastermind } from '../logic/Mastermind';

// Components
import MColourPin from '@/components/MColourPin.vue';
import MCheckPins from '@/components/MCheckPins.vue';


@Component({
    components: {
        MColourPin,
        MCheckPins
    }
})
export default class MSequence extends Vue {

    score: any = {
        black: 0,
        white: 0
    }

    sequence: Sequence = new Sequence([0, 0, 0, 0]);

    processColourSet(pin: number, colour: number) {
        this.sequence.set(pin, colour);
    }

    processGo() {
        this.score = Mastermind.calcPins(this.sequence);
    }
}
</script>
<style scoped>

.m-sequence {
    margin: 1em;

    display: flex;
    justify-content: space-around;
}

.m-sequence .sequence-confirm {
    background-color: white;
    width: 2.5em;
    height: 2.5em;
    border-radius: 2pt;
}
</style>