<template>
    <section class="m-sequence">

        <button v-if="open" @click="processGo"
            class="sequence-confirm"
        >Go</button>
        <div v-else class="sequence-confirm empty"></div>
        
        <MColourPin
            v-on:colour-set="processColourSet(0, $event)"
            :open="open"
            :mandatedColour="mandatedColours[0]"
        />
        <MColourPin
            v-on:colour-set="processColourSet(1, $event)"
            :open="open"
            :mandatedColour="mandatedColours[1]"
        />
        <MColourPin
            v-on:colour-set="processColourSet(2, $event)"
            :open="open"
            :mandatedColour="mandatedColours[2]"
        />
        <MColourPin
            v-on:colour-set="processColourSet(3, $event)"
            :open="open"
            :mandatedColour="mandatedColours[3]"
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
    },
})
export default class MSequence extends Vue {

    open = true;

    score: any = {
        black: 0,
        white: 0
    }

    mandatedColours: number[] = [0,0,0,0];

    sequence: Sequence = new Sequence([0, 0, 0, 0]);

    processColourSet(pin: number, colour: number) {
        this.sequence.set(pin, colour);
    }

    processGo() {
        this.score = Mastermind.calcPins(this.sequence);
        this.open = false;
        this.$emit('go', this.score);
    }

    public set(seq: Sequence) {
        this.mandatedColours = seq.seq;
        this.sequence = seq;
    }
}
</script>
<style scoped>

.m-sequence {
    margin: 1em;

    display: flex;
    justify-content: space-around;
}

.empty {
    background-color: transparent !important;
    width: 2.5em;
}

.m-sequence .sequence-confirm {
    background-color: white;
    width: 2.5em;
    height: 2.5em;
    border-radius: 2pt;
}
</style>