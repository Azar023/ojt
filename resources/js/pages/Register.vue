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
  lastName: '',
  email: '',
  office: '',
  agreed: false
})

const goBack = () => router.back()

const handleContinue = () => {
  if (formData.value.agreed) {
    router.push('/face-capture')
  }
}
</script>

<template>
  <main class="page-container">
    <PageHeader show-back @back="goBack" />

    <section class="form-body">
      <GlassCard>
        <h1 class="page-title white-text">Register</h1>

        <form @submit.prevent="handleContinue" class="register-form">
          <FormInput v-model="formData.firstName" placeholder="First Name" required />
          <FormInput v-model="formData.lastName" placeholder="Last Name" required />
          <FormInput v-model="formData.email" type="email" placeholder="Email" required />
          <FormInput
            v-model="formData.office"
            type="select"
            select-placeholder="What office are you planning to visit?"
            :options="OFFICE_OPTIONS"
            required
          />

          <label class="checkbox-group white-text">
            <input type="checkbox" v-model="formData.agreed" required />
            <span class="checkmark"></span>
            Agree with terms and conditions
          </label>

          <BaseButton
            variant="primary"
            :disabled="!formData.agreed"
            native-type="submit"
          >
            Continue
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
  margin-bottom: clamp(1.5vh, 3vh, 5vh);
  letter-spacing: -1px;
}

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1vh, 2.2vh, 3vh);
}

.checkbox-group {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 12px;
  font-size: clamp(0.9rem, 1.6vh, 1.1rem);
}

.checkbox-group input {
  width: clamp(18px, 2vh, 22px);
  height: clamp(18px, 2vh, 22px);
}

.checkmark {
  display: none;
}

@media (max-height: 750px) {
  .page-title { margin-bottom: 1vh; }
  .register-form { gap: 0.8vh; }
}
</style>
