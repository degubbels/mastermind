<template>
    <v-app id=app>
        <header>
            <MTitleBar/>
        </header>
        <content>
            <MGameBoard/>
        </content>
    </v-app>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MTitleBar from '@/components/MTitleBar.vue'
import MGameBoard from '@/components/MGameBoard.vue';

@Component({
    components: {
        MTitleBar,
        MGameBoard
    }
})
export default class App extends Vue { }
</script>
<style>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Overwrite Vuetify stupidness */
.v-application--wrap {
    width: 100% !important;
    height: 100% !important;
}

header {
    width: 100%;

    display: flex;
    flex-direction: column;
}

content {
    width: 100%;
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
