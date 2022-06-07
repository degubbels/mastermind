<template>
    <div class="title-bar">
        <h1>Mastermind</h1>
    </div>
</template>
<script lang="ts">

export default {
    name: 'MTitleBar'
}
</script>
<style>
:root {
    --base-shadow: 
        0 3px 1px -2px rgba(0,0,0,.2), 
        0 2px 2px 0 rgba(0,0,0,.14), 
        0 1px 5px 0 rgba(0,0,0,.12);
}

.title-bar {
    justify-self: start;

    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 3em;
    background-color: #eee;
    box-shadow: var( --base-shadow)
        
}
</style>