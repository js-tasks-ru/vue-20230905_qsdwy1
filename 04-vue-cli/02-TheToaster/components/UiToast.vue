<template>
    <div class="toast" :class="toastClass">
        <slot/>
    </div>
</template>

<script>

export default {
    name: 'UiToast',

    props:{
      id:{
        type: Number,
        requie: true
      },
      type: {
        type: String,
        require: true,
      },
      lifeTime: {
        type: Number,
        require: false,
        default: 5000,
      }
    },
    emits:['delete'],

    computed:{
        toastClass(){
            return `toast_${this.type}`;
        }
    },

    
    // mounted(){
    //   setTimeout(()=>{
    //     console.log('emit deleted id:', this.id);
    //     this.$emit('delete', this.id); //это событие всегда срабатывает
    //   }, this.lifeTime);
    // }
}
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>