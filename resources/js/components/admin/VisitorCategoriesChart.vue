<template>
  <div class="chart-panel">
    <h3 class="chart-panel__title">Visitor Categories</h3>
    <div class="pie-wrapper">
      <div
        class="pie-chart"
        :style="{ background: conicGradient }"
      ></div>
      <div class="pie-legend">
        <div
          v-for="(item, idx) in data"
          :key="idx"
          class="legend-item"
        >
          <span class="legend-dot" :style="{ background: item.color }"></span>
          <span class="legend-label">{{ item.label }}</span>
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
      { label: 'Filing Appeals', value: 45, color: '#003174' },
      { label: 'Legal Action', value: 25, color: '#334155' },
      { label: 'Case Hearings', value: 20, color: '#22c55e' },
      { label: 'Returning', value: 10, color: '#ef4444' }
    ]
  }
})

const total = computed(() =>
  props.data.reduce((sum, d) => sum + d.value, 0)
)

const conicGradient = computed(() => {
  let percent = 0
  const parts = props.data.map((d) => {
    const p = (d.value / total.value) * 100
    const start = percent
    percent += p
    return `${d.color} ${start}% ${percent}%`
  })
  return `conic-gradient(${parts.join(', ')})`
})
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

.pie-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pie-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #475569;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-label {
  flex: 1;
}
</style>
