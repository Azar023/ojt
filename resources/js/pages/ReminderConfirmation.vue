<script setup>
import { useRouter } from 'vue-router'
// 1. Import your unified UI components
import PageHeader from '../components/ui/PageHeader.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()



const goBack = () => {
  router.back()
}
</script>

<template>
  <main class="page-container">
    <PageHeader show-back @back="goBack" />

    <section class="content-body">
      <div class="glass-card">
        <div class="card-header">
          <div class="status-badge">
             <i class="pi pi-check-circle check-icon"></i>
             <span class="status-text">YOU'RE ALMOST FINISHED</span>
          </div>
        </div>

        <div class="card-content">
          <div class="reminder-title">
            <i class="pi pi-exclamation-triangle warn-icon"></i>
            <h2>IMPORTANT REMINDER</h2>
          </div>

          <div class="reminder-body">
            <p>All visitors are required to safeguard their issued Visitor Pass and surrender their ID to the Security Desk before entering.</p>
            <p>In case of <strong>loss, damage, or failure to return</strong> the Visitor Pass/Badge, please <strong>immediately report</strong> to the Security Desk.</p>
            <p>Failure to do so may result in <strong>delays in exit clearance</strong> and possible administrative action.</p>
            <p class="thanks-msg">Thank you for your cooperation.</p>
          </div>

          <BaseButton variant="primary" size="lg" @click="handleConfirm">
            CONFIRM & PRINT BADGE
          </BaseButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Aligning with your Register page container */
.page-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 100vh;
}

.content-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.status-text {
  font-weight: 600;
  font-size: 1.2rem;
}

.check-icon {
  color: #4ade80;
  font-size: 1.4rem;
}

.card-content {
  padding: 3rem 4rem;
  text-align: center;
}

.reminder-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 2rem;
  color: white;
}

.reminder-title h2 {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 0;
}

.warn-icon {
  color: #fbbf24;
  font-size: 2rem;
}

.reminder-body {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  line-height: 1.6;
  text-align: left;
  margin-bottom: 3rem;
}

.reminder-body p {
  margin-bottom: 1.5rem;
}

.thanks-msg {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .card-content {
    padding: 2rem;
  }
  .reminder-title h2 {
    font-size: 1.5rem;
  }
}
</style>