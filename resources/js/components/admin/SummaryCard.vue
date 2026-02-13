<template>
  <div class="summary-card" :class="[`summary-card--${variant}`]">
    <h3 class="summary-card__title">{{ title }}</h3>
    <p class="summary-card__value">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  variant: {
    type: String,
    default: 'blue',
    validator: (v) => ['blue', 'green', 'red', 'gray'].includes(v)
  }
})
</script>

<style scoped>
.summary-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-top: 4px solid;
}

.summary-card--blue {
  border-top-color: var(--cta-blue, #003174);
}

.summary-card--blue .summary-card__title {
  color: var(--cta-blue, #003174);
}

.summary-card--blue .summary-card__value {
  color: var(--cta-dark-blue, #001a3d);
}

.summary-card--green {
  border-top-color: #22c55e;
}

.summary-card--green .summary-card__title {
  color: #16a34a;
}

.summary-card--green .summary-card__value {
  color: #15803d;
}

.summary-card--red {
  border-top-color: #ef4444;
}

.summary-card--red .summary-card__title {
  color: #dc2626;
}

.summary-card--red .summary-card__value {
  color: #b91c1c;
}

.summary-card--gray {
  border-top-color: #64748b;
}

.summary-card--gray .summary-card__title {
  color: #475569;
}

.summary-card--gray .summary-card__value {
  color: var(--cta-dark-blue, #001a3d);
}

.summary-card__title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.summary-card__value {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}
</style>
