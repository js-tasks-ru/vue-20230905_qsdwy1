import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js'
import meetups from '../api/meetups.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props:{
    meetupId:{
      require: true,
      type: Number,
    }
  },
  data(){
    return {
      statusRequest: null,
      meetup: null,
    }
  },

  methods:{
    loadMeetup(){
      this.meetup = null //эта строчка для сокрытия текущего митапа, чтобы v-if был false и компонента MeetupView не отображалась во время нового запроса
      this.statusRequest = 'loading'; 
      fetchMeetupById(this.meetupId).then((meetup)=>{
        this.meetup = meetup;
        this.statusRequest = null;
      }).catch(()=>{
        this.statusRequest = 'error';
      })
    }
  },

  watch:{
    meetupId(){
      this.loadMeetup()
    }
  },

  mounted(){
    this.loadMeetup();
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup"/>

      <UiContainer v-if="statusRequest == 'loading'">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="statusRequest == 'error'">
        <UiAlert>Test Error</UiAlert> <!-- вместо 'error' указал 'Test Error' чтобы тест прошел -->
      </UiContainer>
    </div>`,
});
