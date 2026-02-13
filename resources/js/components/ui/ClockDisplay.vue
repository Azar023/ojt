<template>
  <div class="clock-display" :class="[size, variant]">
    <div class="time-text">{{ currentTime }}</div>
    <div class="date-text">{{ currentDate }}</div>
  </div>
</template>

<script setup>
import { useClock } from '../../composables/useClock'

defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'hero'].includes(v)
  },
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v)
  }
})

const { currentTime, currentDate } = useClock()
</script>

<style scoped>
.clock-display {
  text-align: center;
}

.time-text {
  font-weight: 700;
  line-height: 1;
}

.date-text {
  opacity: 0.9;
}

/* Size variants - class names must match size prop: sm, md, lg, hero */
.sm .time-text { font-size: clamp(1.8rem, 4vh, 2.4rem); }
.sm .date-text { font-size: clamp(0.9rem, 1.5vh, 1.1rem); }

.md .time-text { font-size: clamp(2.5rem, 6vh, 4rem); }
.md .date-text { font-size: clamp(1rem, 2vh, 1.4rem); }

.lg .time-text { font-size: clamp(3.5rem, 9vh, 6rem); }
.lg .date-text { font-size: clamp(1.2rem, 2.5vh, 1.8rem); }

.hero .time-text {
  font-size: clamp(4.5rem, 12vh, 7.5rem);
  font-weight: 800;
  letter-spacing: -2px;
}
.hero .date-text {
  font-size: clamp(1.2rem, 2.5vh, 1.8rem);
  margin-top: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Color variants */
.light .time-text,
.light .date-text {
  color: var(--cta-text-light, #fff);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.dark .time-text,
.dark .date-text {
  color: var(--cta-dark-blue, #001a3d);
}
</style>
