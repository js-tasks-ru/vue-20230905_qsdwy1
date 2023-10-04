import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  components:{
    MeetupAgendaItem
  },
  props:{
    agenda:{
      require: true,
      type: Array,
    }
  },

  template: `  
    <ul v-for='item in agenda' class="agenda">
      <li class="agenda__item">
        <MeetupAgendaItem :agendaItem="item"/>
      </li>
    </ul>`,
});
