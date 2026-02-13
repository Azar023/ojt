<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '../components/ui/PageHeader.vue'
import GlassCard from '../components/ui/GlassCard.vue'
import FormInput from '../components/ui/FormInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { OFFICE_OPTIONS } from '../constants/officeOptions.js'

const router = useRouter()
const formData = ref({
  firstName: '',
  email: '',
  office: ''
})

const goBack = () => router.back()

const handleLookup = () => {
  if (formData.value.firstName && formData.value.email && formData.value.office) {
    router.push('/face-capture')
  }
}

const isValid = () =>
  formData.value.firstName && formData.value.email && formData.value.office
</script>

<template>
  <main class="page-container">
    <PageHeader show-back @back="goBack" />

    <section class="form-body">
      <GlassCard>
        <h1 class="page-title white-text">Welcome Back</h1>
        <p class="subtitle white-text">Please verify your details to check-in</p>

        <form @submit.prevent="handleLookup" class="register-form">
          <FormInput v-model="formData.firstName" placeholder="First Name" required />
          <FormInput
            v-model="formData.email"
            type="email"
            placeholder="Registered Email Address"
            required
          />
          <FormInput
            v-model="formData.office"
            type="select"
            select-placeholder="What office are you planning to visit?"
            :options="OFFICE_OPTIONS"
            required
          />

          <BaseButton
            variant="primary"
            :disabled="!isValid()"
            native-type="submit"
          >
            Quick Check-In
          </BaseButton>
        </form>
      </GlassCard>
    </section>
  </main>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 0;
  overflow-y: auto;
}

.form-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vh 0 4vh 0;
}

.page-title {
  font-size: clamp(2rem, 5vh, 4rem);
  font-weight: 800;
  margin-bottom: 1vh;
  letter-spacing: -1px;
}

.subtitle {
  font-size: clamp(1rem, 1.6vh, 1.1rem);
  opacity: 0.8;
  margin-bottom: clamp(2vh, 4vh, 5vh);
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1vh, 2.2vh, 3vh);
}

@media (max-height: 800px) {
  .page-title { font-size: 2.5rem; }
}
</style>
