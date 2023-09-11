import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const componentProperties = {
    data(){
        return {
            valueX : 0,
            valueY: 0,
            currentOperator: null
        }
    },
    computed:{
        calculatedValue(){
            if(Number.isNaN(this.valueX) || Number.isNaN(this.valueY))
                return NaN
            
            switch (this.currentOperator) {
                case 'sum':
                    return this.valueX + this.valueY
                case 'subtract':
                    return this.valueX - this.valueY
                case 'multiply':
                    return this.valueX * this.valueY
                case 'divide':
                    return this.valueY != 0 ? this.valueX / this.valueY : NaN
                case null:
                    return 0
            }            
        },
    },
    template:`<div class="row">
        <div class="col">
          <input type="number" v-model='valueX' />
        </div>

        <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
          <label><input v-model='currentOperator' type="radio" name="operator" value='sum' /> ➕</label>
          <label><input v-model='currentOperator' type="radio" name="operator" value='subtract' /> ➖</label>
          <label><input v-model='currentOperator' type="radio" name="operator" value='multiply' /> ✖</label>
          <label><input v-model='currentOperator' type="radio" name="operator" value='divide' /> ➗</label>
        </div>

        <div class="col">
          <input type="number" v-model='valueY' />
        </div>

        <div class="col">=</div>

        <output class="col">{{calculatedValue}}</output>
    </div>`
}

const component = defineComponent(componentProperties)
const app = createApp(component)
const vm = app.mount('#app')