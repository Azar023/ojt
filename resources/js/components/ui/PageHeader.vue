<template>
  <header class="page-header">
    <div class="header-content">
      <button
        v-if="showBack"
        type="button"
        class="back-button white-text"
        aria-label="Go back"
        @click="$emit('back')"
      >
        <i class="pi pi-arrow-left"></i>
      </button>

      <div class="clock-slot">
        <slot name="clock">
          <ClockDisplay size="md" />
        </slot>
      </div>
    </div>
  </header>
</template>

<script setup>
import ClockDisplay from './ClockDisplay.vue'

defineProps({
  showBack: {
    type: Boolean,
    default: false
  }
})

defineEmits(['back'])
</script>

<style scoped>
.page-header {
  width: 100%;
  padding: clamp(1vh, 2vh, 4vh) 0;
  z-index: 10;
}

.header-content {
  position: relative;
  width: 92%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-button {
  position: absolute;
  left: 0;
  background: none;
  border: none;
  font-size: clamp(1.5rem, 3vh, 2.2rem);
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.back-button:hover {
  opacity: 0.85;
}

.clock-slot {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>
