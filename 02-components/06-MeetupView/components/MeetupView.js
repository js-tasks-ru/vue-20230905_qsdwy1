import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import CounterButtonComponent from '../../01-CounterButtonComponent/CounterButton.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';




export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    CounterButtonComponent,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <!-- meetup cover-->

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <MeetupCover :title='meetup.title' :image='meetup.image'/>
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description"/>

            <h3>Программа</h3>
            <MeetupAgenda v-if='meetup.agenda && meetup.agenda.length > 0' :agenda="meetup.agenda"/>
            <UiAlert v-else></UiAlert>
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer='meetup.organizer' :place='meetup.place' :date='meetup.date'/>
          </div>
        </div>
      </UiContainer>
    </div>`,
});
