import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',
  props:{
    organizer:{
      require:true,
      type: String,
    },
    place:{
      require:true,
      type: String,
    },
    date:{
      require:true,
      type: Number,
    }
  },
  computed:{
    getDate(){
      let dateOfOrganization = new Date(this.date);
      let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return dateOfOrganization.toLocaleDateString(navigator.language,options);
    },
    getDateForDateTime(){
      let d = new Date(this.date);
      let options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }
      return d.toLocaleDateString('en-GB',options).split('/').reverse().join('-');
    }
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="getDateForDateTime">
          {{ getDate }}
        </time>
      </li>
    </ul>`,
});
