import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props:{
    count:{
      require:true, 
      default: 0,     
    }
  },
  emits:['update:count'],
  // Компонент должен иметь входной параметр и порождать событие
  template: `<button type="button" @click='$emit("update:count",count+1)'>{{count}}</button>`,
});
