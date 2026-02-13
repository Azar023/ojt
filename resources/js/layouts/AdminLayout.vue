<template>
  <div class="admin-layout">
    <div class="background-image"></div>
    <div class="gradient-overlay"></div>
    <div class="admin-dark-overlay"></div>

    <div class="admin-content">
      <AdminHeader @logout="handleLogout" />
      <AdminNav />

      <main class="admin-main">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AdminHeader from '../components/admin/AdminHeader.vue'
import AdminNav from '../components/admin/AdminNav.vue'

const router = useRouter()

const handleLogout = () => {
  router.push('/')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.admin-dark-overlay {
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 15, 35, 0.7) 0%, rgba(0, 26, 61, 0.75) 50%, rgba(0, 15, 35, 0.7) 100%);
  pointer-events: none;
  z-index: 2;
}

.admin-content {
  position: relative;
  z-index: 3;
}

.admin-main {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
