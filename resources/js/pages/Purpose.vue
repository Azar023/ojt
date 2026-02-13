<script setup>
import { useRouter } from 'vue-router'
import ClockDisplay from '../components/ui/ClockDisplay.vue'
import PurposeCard from '../components/ui/PurposeCard.vue'

const router = useRouter()

const selectPurpose = (purpose) => {
  sessionStorage.setItem('visitPurpose', purpose)

  if (purpose === 'Returning Visitor') {
    router.push('/existing-visitor')
  } else {
    router.push('/register')
  }
}

const goToScanner = () => {
  router.push('/scan')
}
</script>

<template>
  <main class="purpose-container flex-grow-1">
    <div class="selection-side">
      <div class="clock-section">
        <ClockDisplay size="lg" />
      </div>

      <h2 class="section-title white-text">What is your purpose of visiting today?</h2>

      <div class="purpose-grid">
        <PurposeCard
          icon="pi-file-edit"
          label="Filing Appeals"
          @click="selectPurpose('Filing Appeals')"
        />
        <PurposeCard
          icon="pi-shield"
          label="Administrative and<br>Legal Action"
          @click="selectPurpose('Administrative and Legal Action')"
        />
        <PurposeCard
          icon="pi-briefcase"
          label="Case Hearings and<br>Proceedings"
          @click="selectPurpose('Case Hearings and Proceedings')"
        />
        <PurposeCard
          icon="pi-users"
          label="Returning Visitor"
          @click="selectPurpose('Returning Visitor')"
        />
      </div>
    </div>

    <div class="qr-side">
      <h2 class="section-title white-text">Fast Check-In</h2>

      <div class="qr-panel">
        <div class="qr-container" @click="goToScanner">
          <h3 class="scan-label white-text">Scan QR</h3>
          <div class="qr-frame">
            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>
            <div class="qr-bg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CTA&format=svg"
                class="qr-image"
                alt="QR Code"
              />
            </div>
            <div class="scan-line"></div>
          </div>
          <div class="qr-footer white-text">
            <i class="pi pi-pointer-finger footer-touch-icon-pi"></i>
            <p>For those with advance appointment booking</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.purpose-container {
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 0;
  padding: 2vh 4vw 6vh 4vw;
  box-sizing: border-box;
  gap: 3rem;
  overflow-y: auto;
}

.pi {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.selection-side {
  flex: 1.4;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.qr-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2vh;
}

.clock-section {
  text-align: center;
  margin-bottom: 2vh;
  width: 100%;
}

.section-title {
  font-size: clamp(1.4rem, 3.8vh, 2.5rem);
  font-weight: 700;
  margin: 3vh 0;
  text-align: center;
  line-height: 1.2;
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1rem, 2vh, 1.5rem);
  width: 100%;
}

.qr-container {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  padding: 4vh 2.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 450px;
  cursor: pointer;
}

.scan-label {
  font-size: clamp(2rem, 5vh, 3.5rem);
  font-weight: 800;
  margin-bottom: 3vh;
}

.qr-frame {
  position: relative;
  width: clamp(180px, 25vh, 280px);
  height: clamp(180px, 25vh, 280px);
  padding: 15px;
}

.qr-bg {
  background: white;
  padding: 12px;
  border-radius: 16px;
  height: 100%;
  width: 100%;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.corner {
  position: absolute;
  width: 35px;
  height: 35px;
  border: 6px solid white;
  z-index: 10;
}

.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.br { bottom: 0; right: 0; border-left: none; border-top: none; }

.scan-line {
  position: absolute;
  left: 15px;
  right: 15px;
  height: 4px;
  background: var(--cta-accent, #4ade80);
  box-shadow: 0 0 15px var(--cta-accent, #4ade80);
  animation: scan 3s ease-in-out infinite;
}

@keyframes scan {
  0%, 100% { top: 15px; opacity: 0; }
  10%, 90% { opacity: 1; }
  50% { top: calc(100% - 20px); }
}

.qr-footer {
  margin-top: 2vh;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.footer-touch-icon-pi {
  font-size: 1.2rem;
}

@media (max-width: 1024px) {
  .purpose-container {
    flex-direction: column;
    padding: 2vh 5vw;
    align-items: center;
  }
  .selection-side,
  .qr-side {
    width: 100%;
    flex: none;
  }
}

@media (max-height: 750px) {
  .section-title { margin: 1.5vh 0; }
  .clock-section { margin-bottom: 1vh; }
}
</style>
