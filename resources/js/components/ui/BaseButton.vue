<template>
  <button
    :type="nativeType"
    :disabled="disabled"
    :class="['base-btn', variant, size]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'success', 'light'].includes(v)
  },
  size: {
    type: String,
    default: 'default',
    validator: (v) => ['sm', 'default', 'lg'].includes(v)
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.base-btn {
  border: none;
  border-radius: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.primary {
  background: linear-gradient(180deg, #2b589e 0%, #1a3a6d 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

.secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
}

.outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.outline:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.ghost {
  background: transparent;
  color: white;
}

.ghost:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.success {
  background: #4ade80;
  color: #001a3d;
}

.success:hover:not(:disabled) {
  filter: brightness(1.05);
}

.light {
  background: white;
  color: var(--cta-blue, #003174);
}

.light:hover:not(:disabled) {
  filter: brightness(0.97);
}

/* Sizes */
.sm {
  padding: 10px 20px;
  font-size: 0.95rem;
}

.default {
  padding: clamp(12px, 2vh, 20px);
  font-size: clamp(1.1rem, 2.2vh, 1.5rem);
}

.lg {
  padding: 18px 40px;
  font-size: 1.5rem;
}
</style>
