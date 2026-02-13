<template>
  <main class="loading-page">
    <ClockDisplay size="hero" class="white-text" />

    <div class="interaction-area">
      <p v-if="isLoading" class="white-text">Initializing...</p>

      <div v-else class="touch-prompt">
        <p class="click-prompt white-text">Touch the Screen to Continue</p>
        <div class="touch-icon-wrapper">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 11V5.5C14 4.11929 12.8807 3 11.5 3C10.1193 3 9 4.11929 9 5.5V12.5L7.44853 11.9182C6.46321 11.5487 5.35223 11.8383 4.67503 12.6421L4 13.4456L8.85195 19.3444C9.28424 19.8703 9.92348 20.176 10.6027 20.176H16.2166C17.1593 20.176 17.9625 19.5034 18.1252 18.5721L18.8241 14.5721C19.043 13.3204 18.1884 12.1557 16.9367 11.9368L14 11.4231V11Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ClockDisplay from '../components/ui/ClockDisplay.vue'

const router = useRouter()
const isLoading = ref(false)

const handleInteraction = () => {
  isLoading.value = true
  setTimeout(() => router.push('/purpose'), 1500)
}

onMounted(() => {
  window.addEventListener('click', handleInteraction)
  window.addEventListener('touchstart', handleInteraction)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleInteraction)
  window.removeEventListener('touchstart', handleInteraction)
})
</script>

<style scoped>
.loading-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  width: 100%;
}

.interaction-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.touch-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.click-prompt {
  font-size: 1.6rem;
  font-weight: 500;
}

.touch-icon-wrapper {
  display: flex;
  justify-content: center;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
</style>
