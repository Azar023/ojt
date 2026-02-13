<template>
  <nav class="admin-nav">
    <router-link
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      class="nav-tab"
      :class="{ 'nav-tab--active': isActive(tab.path) }"
    >
      {{ tab.label }}
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { path: '/admin', label: 'Dashboard' },
  { path: '/admin/visitor-logbook', label: 'Visitor Logbook' },
  { path: '/admin/reports', label: 'Reports' },
  { path: '/admin/blacklist', label: 'Blacklist' },
  { path: '/admin/settings', label: 'Settings' }
]

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin' || route.path === '/admin/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.admin-nav {
  display: flex;
  gap: 0;
  background: #e8eef4;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid #d0d9e2;
}

.nav-tab {
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a5568;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-tab:hover {
  color: var(--cta-blue, #003174);
  background: rgba(0, 49, 116, 0.06);
}

.nav-tab--active {
  background: var(--cta-dark-blue, #001a3d);
  color: white;
}
</style>
