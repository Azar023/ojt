<template>
  <div class="chart-panel">
    <h3 class="chart-panel__title">Peak Visit Hours</h3>
    <div class="bar-chart">
      <div
        v-for="(item, idx) in normalizedData"
        :key="idx"
        class="bar-row"
      >
        <span class="bar-label">{{ item.time }}</span>
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="{ width: `${item.percent}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { time: '9:00 AM', value: 18 },
      { time: '10:00 AM', value: 45 },
      { time: '11:00 AM', value: 32 },
      { time: '1:00 PM', value: 12 }
    ]
  }
})

const maxValue = computed(() =>
  Math.max(...props.data.map((d) => d.value), 1)
)

const normalizedData = computed(() =>
  props.data.map((d) => ({
    ...d,
    percent: (d.value / maxValue.value) * 100
  }))
)
</script>

<style scoped>
.chart-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.chart-panel__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0 0 1rem 0;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bar-row {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  gap: 1rem;
}

.bar-label {
  font-size: 0.9rem;
  color: #475569;
  font-weight: 500;
}

.bar-track {
  height: 24px;
  background: #f1f5f9;
  border-radius: 6px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--cta-blue, #003174);
  border-radius: 6px;
  transition: width 0.5s ease;
}
</style>
