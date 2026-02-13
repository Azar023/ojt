<template>
  <main class="landing-page">
    <div class="landing-content">
      <h1 class="landing-title white-text">Court of Tax Appeals</h1>
      <p class="landing-subtitle white-text">Visitor Management System</p>

      <div class="action-buttons">
        <BaseButton variant="primary" size="lg" @click="goRegister">
          Register
        </BaseButton>
        <BaseButton variant="outline" size="lg" @click="goScan">
          Scan QR
        </BaseButton>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()

const goRegister = () => {
  router.push('/register')
}

const goScan = () => {
  router.push('/scan')
}
</script>

<style scoped>
.landing-page {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
}

.landing-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 480px;
}

.landing-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.5px;
}

.landing-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.9;
  text-align: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.action-buttons .base-btn {
  min-width: 220px;
}
</style>
