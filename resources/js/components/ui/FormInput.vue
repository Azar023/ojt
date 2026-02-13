<template>
  <div class="input-group">
    <input
      v-if="type !== 'select'"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="form-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <select
      v-else
      :value="modelValue"
      :required="required"
      class="form-input form-select"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>{{ selectPlaceholder || placeholder }}</option>
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
    <i v-if="type === 'select'" class="pi pi-chevron-down select-icon"></i>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Boolean],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'email', 'password', 'select'].includes(v)
  },
  placeholder: {
    type: String,
    default: ''
  },
  selectPlaceholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-group {
  position: relative;
  width: 100%;
}

.form-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.5);
  padding: clamp(8px, 1.5vh, 15px) 0;
  color: white;
  font-size: clamp(0.95rem, 1.8vh, 1.2rem);
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-select {
  appearance: none;
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  pointer-events: none;
}
</style>
