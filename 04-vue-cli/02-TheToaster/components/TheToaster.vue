<template>
  <div class="toasts">
    <Toast 
      v-for="toast in toasts"
      :id="toast.id"
      :type="toast.type"
      @delete="deleteToast"
    >
      <UiIcon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </Toast>
  </div>
</template>

<script>
import Toast from './Toast.vue';
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToaster',
  components: {
    Toast,
    UiIcon,
  },

  data(){
    return {
      toasts:[],
    }
  },

  methods:{
    success(message){
      let toast = {   
        id: this.toasts.length > 0 ? this.toasts[this.toasts.length-1].id+1 : 0,
        message,
        type:'success',
        icon: 'check-circle',
      }
      this.addToast(toast);
    },

    error(message){
      let toast = {
        id: this.toasts.length > 0 ? this.toasts[this.toasts.length-1].id+1 : 0,
        message,
        type: 'error',
        icon: 'alert-circle',
      }
      this.addToast(toast);
    },

    addToast(toast){
      this.toasts.push(toast);
      setTimeout(() => {
        this.deleteToast(toast.id);
      }, 5000);
    },

    deleteToast(idToast){
      console.log('deleted');
      this.toasts = this.toasts.filter(t=> t.id != idToast); 
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}


</style>
