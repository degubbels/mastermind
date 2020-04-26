<template>
    <div class="MCheckPins">

        <template v-for="i in score.black">
            <div class="check-pin pin-black"
                :key="'check-pin-black-'+i"
            ></div>
        </template>

        <template v-for="i in score.white">
            <div class="check-pin pin-white"
                :key="'check-pin-white-'+i"
            ></div>
        </template>

    </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue'

@Component({
    props: ['score']
})
export default class MCheckPins extends Vue {

}
</script>
<style scoped>
.MCheckPins {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;

    width: 2.5em;
    height: 2.5em;
}

.check-pin {
    width: 1em;
    height: 1em;
    shape-outside: circle();
    clip-path: circle();
}

.pin-white {
    background: #ffffff;
}

.pin-black {
    background: #1f1f1f;
}
</style>