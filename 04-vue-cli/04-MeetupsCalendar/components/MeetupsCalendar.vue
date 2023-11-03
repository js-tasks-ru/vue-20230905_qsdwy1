<template>
  <div class="calendar-view">
  <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button class="calendar-view__control-left" type="button" aria-label="Previous month" @click="setPrevMonth()"></button>
        <div class="calendar-view__date">{{ localDate }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="setNextMonth()"></button>
      </div>
    </div>
  <div  class="calendar-view__grid" v-for="week in getCalendar()">
    <div class="calendar-view__cell" tabindex="0" v-for="day in week" :class="{'calendar-view__cell_inactive': day.isAnotherMonth}">
        <div class="calendar-view__cell-day">{{ day.date.getDate() }}</div>
        <div class="calendar-view__cell-content">
          <a :href="'/meetups/' + meetup.id" class="calendar-event" v-for="meetup in getMeetupsForDay(day.date.getTime())">{{ meetup.title }}</a>
        </div>
      </div>
  </div>
</div>

</template>

<script>

export default {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data(){
    return {
      currentDate: new Date(),
    }
  },
  computed:{
    currentYear(){
      return this.currentDate.getFullYear()
    },

    currentMonth(){
      return this.currentDate.getMonth()
    },

    currentDay(){
      return this.currentDate.getDate()
    },

    lastDayInCurrentMonth(){
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
    },

    localDate(){
      return this.currentDate.toLocaleDateString(navigator.language,{
        month: 'long',
        year: 'numeric',
      });
    }
  },

  methods:{
    getCalendar(){
      let day = 1;
      let calendar = [];

      while(day < this.lastDayInCurrentMonth){
        let week = this.createWeekForDay(day);
        calendar.push(week);

        day = week[week.length-1].date.getDate() + 1;

        //если в недели есть последний день месяца и это не первая неделя месяца - выйти из цикла
        if(calendar.length > 1 && week.find(d=>d.date.getDate()===this.lastDayInCurrentMonth)){
          break;
        }

      }
      return calendar;
    },

    getIndexDayInWeek(day){
      return new Date(this.currentYear,this.currentMonth,day).getDay();
    },

    createWeekForDay(day){
      let week = [{
        // number: day,
        isAnotherMonth: false,
        date: new Date(this.currentYear, this.currentMonth, day),
      }];
      let indexDayInWeekToLeft = this.getIndexDayInWeek(day) == 0 ? 6 : this.getIndexDayInWeek(day) - 1; //если day == 0(воскресенье)
      let indexDayInWeekToRight = this.getIndexDayInWeek(day) + 1;

      let dayToLeft = day;
      let dayToRight = day;

      //получить дни недели слева от указанного дня
      while(indexDayInWeekToLeft > 0){
        --dayToLeft
        
        if(dayToLeft > 0){
          week.unshift({
            isAnotherMonth: false,
            date: new Date(this.currentYear, this.currentMonth, dayToLeft),
          });

        //если после декремента день становится 0 или отрицательный
        } else{
          week.unshift({
            isAnotherMonth: true,
            date: new Date(this.currentYear, this.currentMonth, dayToLeft),
          });
        }
        
        --indexDayInWeekToLeft;
      }

      //получить дни недели справа от указанного дня      
      while(indexDayInWeekToRight <= 7){
        ++dayToRight

        if(dayToRight <= this.lastDayInCurrentMonth){
          week.push({
            isAnotherMonth: false,
            date: new Date(this.currentYear, this.currentMonth, dayToRight),
          });

        //если после инкремента день становится больше самого большого дня в месяце
        } else{
          week.push({
            isAnotherMonth: true,
            date: new Date(this.currentYear, this.currentMonth, dayToRight),
          });
        }

        ++indexDayInWeekToRight;
      }
      return week;

    },

    setPrevMonth(){
      this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()-1);
    },

    setNextMonth(){
      this.currentDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth()+1);
    },

    //получить все митапы на определенный день
    getMeetupsForDay(dayTimestomp){
      let meetupsForDay = this.meetups.filter(m=>this.isMeetupAndDayHaveSameDate(m.date,dayTimestomp))
      return meetupsForDay;
    },

    isMeetupAndDayHaveSameDate(meetupTimestomp, dayTimestomp){
      let meetupDate = new Date(meetupTimestomp);
      let dayDate = new Date(dayTimestomp);

      return meetupDate.getFullYear() == dayDate.getFullYear() &&
             meetupDate.getMonth() == dayDate.getMonth() &&
             meetupDate.getDate() == dayDate.getDate();
    }
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
