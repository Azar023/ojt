import { ref, onMounted, onUnmounted } from 'vue'

export function useClock() {
  const currentTime = ref('')
  const currentDate = ref('')

  const updateClock = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    currentDate.value = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  let interval
  onMounted(() => {
    updateClock()
    interval = setInterval(updateClock, 1000)
  })
  onUnmounted(() => clearInterval(interval))

  return { currentTime, currentDate }
}