<template>
  <div v-show="visible" class="keyboard-wrapper" @click.stop>
    <div class="keyboard-container" ref="keyboardRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

const emit = defineEmits(['onChange'])

const keyboardRef = ref(null)
const visible = ref(false)
let keyboardInstance = null
let currentInput = ''

onMounted(async () => {
  await nextTick()
  
  if (!keyboardRef.value) {
    console.error('Keyboard ref not found')
    return
  }

  keyboardInstance = new Keyboard(keyboardRef.value, {
    onChange: (input) => {
      currentInput = input
      emit('onChange', input)
    },
    onKeyPress: (button) => {
      if (button === '{shift}') {
        const currentLayout = keyboardInstance.options.layoutName
        const layout = currentLayout === 'default' ? 'shift' : 'default'
        keyboardInstance.setOptions({ layoutName: layout })
      }
    },
    layout: {
      default: [
        "1 2 3 4 5 6 7 8 9 0",
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{shift} z x c v b n m {bksp}",
        "{space}"
      ],
      shift: [
        "1 2 3 4 5 6 7 8 9 0",
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "{shift} Z X C V B N M {bksp}",
        "{space}"
      ]
    },
    display: {
      "{bksp}": "🔙 Back",
      "{space}": "SPACE",
      "{shift}": "⬆️ SHIFT"
    }
  })
})

// Show keyboard
const showKeyboard = () => {
  visible.value = true
}

// Hide keyboard
const hideKeyboard = () => {
  visible.value = false
  currentInput = ''
}

// Set input value
const setInput = (value) => {
  currentInput = value
  if (keyboardInstance) {
    keyboardInstance.setInput(value)
  }
}

defineExpose({
  showKeyboard,
  hideKeyboard,
  setInput
})
</script>

<style scoped>
.keyboard-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, #2c3e50, #1a252f);
  padding: 12px 8px;
  z-index: 9999;
  border-top: 2px solid #34495e;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
}

.keyboard-container {
  width: 100%;
}

/* Customize Simple Keyboard */
:deep(.hg-row) {
  margin-bottom: 8px;
  display: flex;
  gap: 4px;
}

:deep(.hg-button) {
  padding: 12px 8px;
  background: #34495e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
  min-height: 42px;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.hg-button:active) {
  background: #2c3e50;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

:deep(.hg-button-shift),
:deep(.hg-button-bksp),
:deep(.hg-button-space) {
  background: #e67e22;
  color: white;
}

:deep(.hg-button-shift:active),
:deep(.hg-button-bksp:active),
:deep(.hg-button-space:active) {
  background: #d35400;
}

:deep(.hg-button-space) {
  flex: 5;
  min-width: 150px;
}

:deep(.simple-keyboard) {
  padding: 0;
  background: transparent;
  width: 100%;
}
</style>