<template>
  <div class="glass-card" :class="{ 'glass-card--compact': compact }">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: clamp(20px, 4vh, 40px);
  width: 90%;
  max-width: 550px;
  padding: clamp(2vh, 5vh, 6vh) clamp(20px, 4vw, 50px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glass-card--compact {
  max-width: 450px;
  padding: 40px 20px;
}

@media (max-height: 750px) {
  .glass-card {
    padding: 3vh 4vw;
  }
}
</style>
