<template>
    <div
        v-bind:class="colourClassName"
        class="MColourPin"
    >
        
        <v-select
            v-model="colour"
            :items="colours"
            @change="processColourSelect"
        />
    </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({

})
export default class MColourPin extends Vue {

    colour = 0;
    colourClassName = 'pin-white';

    colours = [
        { text: "White",    value: 0, cssClass: 'pin-white' },
        { text: "Black",    value: 1, cssClass: 'pin-black'},
        { text: "Red",      value: 2, cssClass: 'pin-red'},
        { text: "Yellow",   value: 3, cssClass: 'pin-yellow'},
        { text: "Green",    value: 4, cssClass: 'pin-green'},
        { text: "Blue",     value: 5, cssClass: 'pin-blue'}
    ];

    processColourSelect() {

        this.colourClassName = this.colours[this.colour].cssClass;

        this.$emit('colour-set', this.colour);
    }
}
</script>
<style scoped>

.MColourPin {
    width: 2.5em;
    height: 2.5em;
    /* Really wish I knew a better way to hide the label text... */
    text-indent: -99999px;
    shape-outside: circle();
    clip-path: circle();
    background: lightblue;
}

.pin-white {
    background: #ffffff;
}

.pin-black {
    background: #1f1f1f;
}

.pin-red {
    background: #df3f3f;
}

.pin-yellow {
    background: #dfdf3f;
}

.pin-green {
    background: #3f7f3f;
}

.pin-blue {
    background: #3f3fdf;
}


</style>