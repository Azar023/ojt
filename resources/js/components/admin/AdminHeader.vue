<template>
  <header class="admin-header">
    <div class="header-left">
      <img
        :src="logoUrl"
        alt="CTA Seal"
        class="header-logo"
      />
      <div class="header-brand">
        <span class="brand-title">Visitor Management System</span>
        <span class="brand-separator">|</span>
        <span class="brand-section">Admin Dashboard</span>
      </div>
    </div>

    <div class="header-right">
      <span class="welcome-text">Welcome, {{ userName }}</span>
      <span class="brand-separator">|</span>
      <button type="button" class="logout-btn" @click="$emit('logout')">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  logoUrl: {
    type: String,
    default: 'https://api.builder.io/api/v1/image/assets/TEMP/5a3afbbe4e843961a0435fc6193e9b55da8c3ac5?width=790'
  },
  userName: {
    type: String,
    default: 'Admin'
  }
})

defineEmits(['logout'])
</script>

<style scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--cta-dark-blue, #001a3d);
  color: white;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.header-brand {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.brand-title {
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.95;
}

.brand-separator {
  opacity: 0.6;
  font-weight: 300;
}

.brand-section {
  font-size: 1.25rem;
  font-weight: 700;
}

.welcome-text {
  font-size: 0.95rem;
  opacity: 0.9;
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  opacity: 0.95;
}

.logout-btn:hover {
  opacity: 1;
}
</style>
