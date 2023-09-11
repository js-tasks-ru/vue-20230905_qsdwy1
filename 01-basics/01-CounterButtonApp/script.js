import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const componentOptions = {
    data(){
        return {
            counter: 0,
        }
    },
    methods:{
        increaseCounter(){
            return this.counter++
        }
    },    
    template:`<button v-on:click='increaseCounter()'>{{counter}}</button>`    
    
}
const component = defineComponent(componentOptions)
const app = createApp(component)
const vs = app.mount('#app')