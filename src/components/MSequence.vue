<template>
    <section class="m-sequence">
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

        
    </section>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

import MColourPin from '@/components/MColourPin.vue';
import { Sequence } from '../logic/Mastermind';

@Component({
    components: {
        MColourPin
    }
})
export default class MSequence extends Vue {

    sequence: Sequence = new Sequence([0, 0, 0, 0]);

    processColourSet(pin: number, colour: number) {
        this.sequence.set(pin, colour);
    }
}
</script>
<style scoped>

.m-sequence {
    margin: 1em;

    display: flex;
    justify-content: space-around;
}

</style>