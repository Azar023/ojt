<template>
  <section class="form-body">
    <ClockDisplay size="hero" class="clock-section" />

    <div class="glass-card">
      <div v-if="showInstructions" class="instruction-view">
        <h1 class="register-title white-text">Face Capture</h1>
        
        <div class="prohibited-container">
          <div class="icon-stack">
            <i class="bi bi-incognito main-icon"></i>
            <i class="bi bi-slash-circle ban-icon-white"></i>
          </div>
        </div>

        <div class="instruction-text white-text">
          <p class="subtitle">Please remove any accessories for a clear scan</p>
          <div class="tags-row">
            <span class="p-tag">No Hats</span>
            <span class="p-tag">No Glasses</span>
            <span class="p-tag">No Mask</span>
          </div>
        </div>

        <BaseButton variant="light" @click="startCamera">
          Get Started
        </BaseButton>
      </div>

      <template v-else>
        <h1 class="register-title white-text">
          {{ isCaptured ? 'Captured' : (countdown > 0 ? 'Get Ready!' : 'Scanning...') }}
        </h1>
        <p class="subtitle white-text">
          {{ isCaptured ? 'Review your photo' : 'Position your face inside the guide' }}
        </p>
        
        <div class="camera-wrapper">
          <video 
            v-if="!isCaptured" 
            ref="videoPlayer" 
            autoplay 
            playsinline 
            class="video-feed"
          ></video>
          
          <img 
            v-else 
            :src="capturedImageUrl" 
            class="video-feed" 
            alt="Captured face"
          />
          
          <div v-if="countdown > 0" class="countdown-overlay">
            {{ countdown }}
          </div>

          <div class="face-guide-overlay" v-if="!isCaptured && countdown === 0">
            <div class="face-oval"></div>
          </div>

          <div v-if="!isCaptured && countdown === 0" class="scanner-overlay">
            <div class="scan-line"></div>
          </div>

          <canvas ref="canvas" v-show="false"></canvas>
        </div>

        <div class="controls">
          <button 
            v-if="!isCaptured" 
            @click="handleCaptureClick" 
            class="capture-btn"
            :disabled="countdown > 0"
            :class="{ 'timer-active': countdown > 0 }"
          >
            <div class="inner-circle"></div>
          </button>
          
          <div v-else class="action-buttons">
            <BaseButton variant="secondary" @click="retake">Retake</BaseButton>
            <BaseButton variant="success" @click="confirmPhoto">Confirm & Finish</BaseButton>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ClockDisplay from '../components/ui/ClockDisplay.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()

const showInstructions = ref(true)
const isCaptured = ref(false)
const countdown = ref(0)
const capturedImageUrl = ref(null)
const videoPlayer = ref(null)
const canvas = ref(null)
let stream = null

const startCamera = async () => {
  showInstructions.value = false
  setTimeout(async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user", 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      })
      if (videoPlayer.value) {
        videoPlayer.value.srcObject = stream
      }
    } catch (err) {
      console.error("Camera error:", err)
      alert("Camera access denied. Please check permissions.")
      showInstructions.value = true
    }
  }, 100)
}

const handleCaptureClick = () => {
  if (countdown.value > 0) return
  
  countdown.value = 3
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
      executeCapture()
    }
  }, 1000)
}

const executeCapture = () => {
  if (videoPlayer.value && canvas.value) {
    const context = canvas.value.getContext('2d')
    if (!context) return

    canvas.value.width = videoPlayer.value.videoWidth
    canvas.value.height = videoPlayer.value.videoHeight
    
    // Maintain the mirrored look for the image
    context.translate(canvas.value.width, 0)
    context.scale(-1, 1)
    context.drawImage(videoPlayer.value, 0, 0)
    
    // Convert canvas data to a URL for the <img> tag
    capturedImageUrl.value = canvas.value.toDataURL('image/png')
    
    isCaptured.value = true
    
    // Stop the camera stream to save resources
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
  }
}

const retake = () => {
  isCaptured.value = false
  countdown.value = 0
  capturedImageUrl.value = null
  startCamera()
}

const confirmPhoto = () => {
  router.push('/confirm')
}

onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
})
</script>

<style scoped>
.form-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
}

.clock-section {
  margin-bottom: 10px;
}

.form-body .glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  width: 90%;
  max-width: 450px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.prohibited-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
}

.icon-stack {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
}

.main-icon {
  font-size: 5rem;
  color: white;
  z-index: 1;
}

.ban-icon-white {
  position: absolute;
  font-size: 8rem;
  color: white;
  z-index: 2;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.1);
}

.tags-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 30px;
}

.p-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.camera-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  margin: 20px 0;
  background: #000;
}

.video-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); /* Keep the mirrored preview/image */
}

.countdown-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  font-weight: 900;
  color: white;
  z-index: 10;
  text-shadow: 0 0 20px rgba(0,0,0,0.5);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

.face-guide-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.face-oval {
  width: 160px;
  height: 220px;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.scan-line {
  position: absolute;
  width: 100%;
  height: 3px;
  background: #4ade80;
  box-shadow: 0 0 12px #4ade80;
  animation: scan-move 3s infinite ease-in-out;
}

@keyframes scan-move {
  0%, 100% { top: 20%; }
  50% { top: 80%; }
}

.white-text { color: white; }
.register-title { font-size: 2.5rem; font-weight: 800; }
.subtitle { font-size: 1rem; opacity: 0.85; }

.controls { margin-top: 10px; }

.capture-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid white;
  background: transparent;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
}

.capture-btn.timer-active {
  border-color: #4ade80;
  transform: scale(0.9);
}

.inner-circle {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50%;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

@media (max-height: 850px) {
  .time-text-hero { font-size: 3rem; }
  .register-title { font-size: 2rem; }
  .camera-wrapper { width: 240px; height: 240px; }
}
</style>