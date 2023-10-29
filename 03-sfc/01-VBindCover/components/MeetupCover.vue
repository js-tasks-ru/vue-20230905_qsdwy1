<template>
  <div class="meetup-cover">
    <h1 class="meetup-cover__title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'MeetupCover',

  props:{
    title:{
      type: String,
      require: false,
    },
    image: {
      type: String,
      require: false
    }
  },

  computed:{
    getBackgroundImage(){
      return this.image ?
        `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.image})`:
        'var(--default-cover)';
    }
  }
};
</script>

<style scoped setup>
:root{
  --default-cover: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://course-vue.javascript.ru/api/images/2");
}
.meetup-cover {
  background-size: cover;
  background-position: center;
  background-image: v-bind('getBackgroundImage');
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
