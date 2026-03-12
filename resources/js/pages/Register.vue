<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '../components/ui/PageHeader.vue'
import GlassCard from '../components/ui/GlassCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const videoRef = ref(null)
let stream = null
const router = useRouter()

// UI State
const isScanned = ref(false)
const selectedOffice = ref('')

// Extracted Data (Mocked)
const userData = ref({
  lastName: 'Doe',
  firstName: 'John',
  dob: '11/11/95'
})

const offices = [
  "Office of the Presiding Justice",
  "Office of Associate Justice Jean Marie Bacorro-Villena",
  "Office of Associate Justice Maria Rowena Modesto-San Pedro",
  "Office of Associate Justice Marian Ivy F. Reyes-Fajardo",
  "Office of Associate Justice Lanee S. Cui-David",
  "Office of Associate Justice Corazon G. Ferrer-Flores",
  "Office of Associate Justice Henry S. Angeles",
  "Office of the Clerk of Court En Banc",
  "Office of the Division Clerk of Court First",
  "Office of the Division Clerk of Court Second",
  "Office of the Division Clerk of Court Third",
  "Internal Audit Service",
  "Judicial Records Division",
  "Office of Legal and Technical Services",
  "Tax Specialist Division",
  "Office of Administrative and Finance Services",
  "Cash Division",
  "Property and Supply Management Division",
  "General Services Division",
  "Human Resource Division",
  "Procurement Management Division",
  "Accounting Division",
  "Budget Division",
  "Medical Division",
  "Security Services Unit",
  "Commission on Audit Field Office",
  "Management Information Systems Division",
  "En Banc Conference Room",
  "Office of the Division Clerk of Court First Courtroom",
  "Office of the Division Clerk of Court Second Courtroom",
  "Office of the Division Clerk of Court Third Courtroom",
  "Medical Division"
]

const goBack = () => {
  if (isScanned.value) {
    isScanned.value = false
    startCamera()
  } else {
    router.back()
  }
}

const startCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    })
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
  } catch (err) {
    console.error('Camera error:', err)
  }
}

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop())
    stream = null
  }
}

const handleScan = () => {
  stopCamera()
  isScanned.value = true
}

const handleContinue = () => {
  if (!selectedOffice.value) {
    alert('Please select an office to visit.')
    return
  }
  router.push('/face-capture')
}

onMounted(() => {
  startCamera()
})

onBeforeUnmount(() => {
  stopCamera()
})
</script>

<template>
  <main class="page-container">
    <PageHeader show-back @back="goBack" />

    <section class="scan-body">
      <GlassCard>
        <div class="wrapper-inner">
          
          <div v-if="!isScanned" class="content-centered">
            <h2 class="scan-title white-text">
              Place the <span class="highlight">front of your ID</span> on the Scanner
            </h2>
            <div class="scanner-frame">
              <div class="scanner-viewport">
                <video ref="videoRef" autoplay playsinline muted class="scanner-video"></video>
                <div class="corner tl"></div>
                <div class="corner tr"></div>
                <div class="corner bl"></div>
                <div class="corner br"></div>
              </div>
            </div>
            <BaseButton variant="primary" size="lg" @click="handleScan">
              Scan
            </BaseButton>
          </div>

          <div v-else class="content-centered">
            <div class="results-container">
              <div class="info-row">
                <div class="id-graphic">
                  <div class="avatar-box"></div>
                  <div class="id-lines">
                    <div class="id-line"></div>
                    <div class="id-line"></div>
                    <div class="id-line half"></div>
                  </div>
                </div>

                <div class="personal-info">
                  <h3 class="label-heading">Personal Information</h3>
                  <div class="field-group">
                    <label>Last Name</label>
                    <input type="text" v-model="userData.lastName" readonly />
                  </div>
                  <div class="field-group">
                    <label>First Name</label>
                    <input type="text" v-model="userData.firstName" readonly />
                  </div>
                  <div class="field-group">
                    <label>Date of Birth</label>
                    <div class="date-wrapper">
                      <input type="text" v-model="userData.dob" readonly />
                      <span class="cal-icon">📅</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="office-picker">
                <p class="picker-label">Select the office you wish to visit</p>
                <select v-model="selectedOffice" class="office-select">
                  <option disabled value="">Select an office</option>
                  <option v-for="office in offices" :key="office" :value="office">
                    {{ office }}
                  </option>
                </select>
              </div>

              <BaseButton variant="primary" size="lg" @click="handleContinue">
                Continue
              </BaseButton>
            </div>
          </div>

        </div>
      </GlassCard>
    </section>
  </main>
</template>

<style scoped>
/* YOUR ORIGINAL STYLES */
.page-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 0;
  overflow-y: auto;
}

.scan-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 0 4vh 0;
}

/* CENTERING FIXES */
.wrapper-inner {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers children horizontally */
  justify-content: center;
  width: 100%;
}

.content-centered {
  display: flex;
  flex-direction: column;
  align-items: center; /* Ensures button and elements stay in center */
  width: 100%;
}

.scan-title {
  font-size: clamp(1.3rem, 3vh, 2rem);
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
}

.highlight {
  font-weight: 800;
}

.scanner-frame {
  display: flex; 
  align-items: center;
  justify-content: center;
  width: min(480px, 80vw);
  height: min(260px, 40vh);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.95), #000000);
  margin-bottom: 2rem; /* Simplified margin */
}

.scanner-viewport {
  width: 80%;
  height: 70%;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.scanner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 3px solid #ffffff;
}

.tl { top: 10px; left: 12px; border-right: none; border-bottom: none; }
.tr { top: 10px; right: 12px; border-left: none; border-bottom: none; }
.bl { bottom: 10px; left: 12px; border-right: none; border-top: none; }
.br { bottom: 10px; right: 12px; border-left: none; border-top: none; }

/* RESULTS STYLES (MATCHING IMAGE) */
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #334155;
  width: 100%;
}

.info-row {
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;
}

.id-graphic {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  width: 320px; /* Increased from 240px */
  height: 190px; /* Increased from 150px */
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.avatar-box { width: 60px; height: 60px; background: #94a3b8; border-radius: 50%; }
.id-lines { flex: 1; }
.id-line { height: 6px; background: #94a3b8; margin-bottom: 8px; border-radius: 3px; }
.id-line.half { width: 50%; }

.personal-info { text-align: left; }
.label-heading { font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem; color: #1e293b; }

.field-group { margin-bottom: 12px; }
.field-group label { display: block; font-size: 0.75rem; color:rgb(20, 21, 21); font-weight: 600; margin-bottom: 2px; }
.field-group input { 
  width: 240px; 
  padding: 8px 12px; 
  border: 1px solid #cbd5e1; 
  border-radius: 6px; 
  background: #f1f5f9;
}

.date-wrapper { position: relative; width: 240px; }
.cal-icon { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }

.office-picker { width: 100%; text-align: center; margin-bottom: 2rem; }
.picker-label { 
  font-weight: 600; 
  margin-bottom: 0.5rem; 
  color: #000000; /* This sets the text color to pure black */
}
.office-select {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  background: white;
  cursor: pointer;
}
</style>