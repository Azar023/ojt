<template>
  <div class="admin-actions">
    <h3 class="admin-actions__title">Admin Actions</h3>
    <div class="admin-actions__list">
      <button
        type="button"
        class="action-btn"
        @click="$emit('search')"
      >
        Search Visitors
      </button>
      <button
        type="button"
        class="action-btn"
        @click="$emit('generate-reports')"
      >
        Generate Reports
      </button>
      <button
        type="button"
        class="action-btn"
        @click="$emit('manage-blacklist')"
      >
        Manage Blacklist
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['search', 'generate-reports', 'manage-blacklist'])
</script>

<style scoped>
.admin-actions {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.admin-actions__title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0 0 1rem 0;
}

.admin-actions__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  width: 100%;
  padding: 0.875rem 1rem;
  background: var(--cta-dark-blue, #001a3d);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: var(--cta-blue, #003174);
}
</style>
