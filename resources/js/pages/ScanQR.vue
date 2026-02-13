<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Html5Qrcode } from 'html5-qrcode'
import ClockDisplay from '../components/ui/ClockDisplay.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()
const scannedData = ref('')
let html5QrCode = null

const goBack = async () => {
  if (html5QrCode && html5QrCode.isScanning) {
    await html5QrCode.stop()
  }
  router.push('/purpose')
}

onMounted(() => {
  html5QrCode = new Html5Qrcode('reader')

  const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  }

  html5QrCode
    .start(
      { facingMode: 'environment' },
      config,
      (decodedText) => {
        scannedData.value = decodedText
      },
      () => {}
    )
    .catch((err) => {
      console.error('Camera failed to start:', err)
    })
})

onUnmounted(async () => {
  if (html5QrCode && html5QrCode.isScanning) {
    await html5QrCode.stop()
  }
})
</script>

<template>
  <div class="page-container">
    <main class="content-wrapper">
      <ClockDisplay size="md" />

      <h2 class="scan-instruction white-text">Scan Your QR Code</h2>

      <div id="reader" class="qr-reader"></div>

      <div v-if="scannedData" class="result-box">
        <p>Success! Data: {{ scannedData }}</p>
      </div>

      <BaseButton variant="outline" @click="goBack">Go Back</BaseButton>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  position: relative;
  z-index: 2;
  flex: 1;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
}

.scan-instruction {
  font-size: 32px;
  font-weight: 500;
}

.qr-reader {
  width: 100%;
  max-width: 450px;
  border: 6px solid #ffffff;
  border-radius: 24px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.qr-reader :deep(video) {
  object-fit: cover !important;
}

.result-box {
  padding: 15px 30px;
  background: rgba(74, 222, 128, 0.2);
  border: 1px solid var(--cta-accent, #4ade80);
  color: white;
  border-radius: 12px;
  font-weight: 600;
}
</style>
