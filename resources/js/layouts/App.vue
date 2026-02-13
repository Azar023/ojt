<template>
  <div class="app-shell">
    <div class="background-image"></div>
    <div class="gradient-overlay"></div>

    <div class="content-layer">
      <AppHeader />
      <router-view />
    </div>

    <div v-if="showCountdown" class="idle-warning">
      Returning to home in {{ countdown }} seconds...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'

const router = useRouter()
const route = useRoute()

const IDLE_TIME = 60000 
const countdown = ref(60)
const showCountdown = ref(false)
let idleTimer = null
let countdownTimer = null

const clearAllTimers = () => {
  clearTimeout(idleTimer)
  clearInterval(countdownTimer)
}

const resetTimer = () => {
  clearAllTimers()
  showCountdown.value = false
  countdown.value = 60

  // Only start the idle logic if we aren't on the loading screen
  if (route.path === '/') return

  idleTimer = setTimeout(() => {
    showCountdown.value = true
    countdownTimer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearAllTimers()
        showCountdown.value = false // Crucial: hide before navigating
        sessionStorage.clear()
        localStorage.clear()
        router.push('/').catch(() => {})
      }
    }, 1000)
  }, IDLE_TIME)
}

// FIX: Force clear warnings whenever the route changes
watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    showCountdown.value = false
    clearAllTimers()
  } else {
    resetTimer()
  }
})

onMounted(() => {
  const events = ['mousemove', 'keydown', 'touchstart', 'mousedown', 'click']
  events.forEach(e => window.addEventListener(e, resetTimer))
  resetTimer()
})

onBeforeUnmount(() => {
  const events = ['mousemove', 'keydown', 'touchstart', 'mousedown', 'click']
  events.forEach(e => window.removeEventListener(e, resetTimer))
  clearAllTimers()
})
</script>

<style>
.app-shell {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #001a3d;
}

.content-layer {
  position: relative;
  z-index: 2;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Allow scrolling if the laptop screen is tiny */
}

.idle-warning {
  position: fixed;
  bottom: 40px;
  inset-inline: 0;
  margin: auto;
  width: fit-content;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 18px 30px;
  border-radius: 12px;
  z-index: 9999;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>