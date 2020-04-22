<template>
    <div id="app">
        <v-app>
            <MTitleBar/>

            <v-content>
                <Home/>
            </v-content>

        </v-app>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import MTitleBar from '@/components/MTitleBar.vue'
import Home from '@/views/Home.vue';

@Component({
    components: {
        MTitleBar,
        Home
    }
})
export default class App extends Vue { }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
