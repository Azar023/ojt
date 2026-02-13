<template>
  <button type="button" class="purpose-card white-text" @click="$emit('click')">
    <div class="icon-circle">
      <i :class="['pi', icon, 'main-icon-pi']"></i>
      <i class="pi pi-pointer-finger touch-hint-pi"></i>
    </div>
    <span class="card-text" v-html="label"></span>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.purpose-card {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  min-height: clamp(150px, 22vh, 280px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  outline: none;
}

.purpose-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.card-text {
  font-size: clamp(1rem, 2.2vh, 1.4rem);
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}

.icon-circle {
  width: clamp(70px, 10vh, 110px);
  height: clamp(70px, 10vh, 110px);
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2vh;
}

.main-icon-pi {
  font-size: clamp(30px, 5vh, 55px);
}

.pi {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
</style>
