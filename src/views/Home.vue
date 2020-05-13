<template>
    <MGameBoard/>
</template>

<script lang="ts">
import Vue from 'vue';
import MGameBoard from '@/components/MGameBoard.vue';

export default Vue.extend({
    name: 'Home',
    components: {
        MGameBoard
    }
})
</script>
<style scoped>

</style>