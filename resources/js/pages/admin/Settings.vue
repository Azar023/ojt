<script setup>
import { ref } from 'vue'
import VisitorCategoriesChart from '../../components/admin/VisitorCategoriesChart.vue'
import AdminActions from '../../components/admin/AdminActions.vue'
import PeakHoursChart from '../../components/admin/PeakHoursChart.vue'

const retentionPeriod = ref('180')

const userFilters = ref({
  name: '',
  email: ''
})

const users = ref([
  {
    name: 'Juan Dela Cruz',
    email: 'juandc@gmail.com'
  }
])

const handleUpdateSettings = () => {
  // Placeholder for backend integration
  alert(`Settings saved. Data retention: ${retentionPeriod.value} days`)
}

const handleAddUser = () => {
  alert('Add User will be implemented with backend.')
}

const handleSearchUsers = () => {
  // Placeholder for backend / filtering
}
</script>

<template>
  <div class="settings-page">
    <header class="settings-header">
      <div>
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Configure system preferences and user management.</p>
      </div>
      <button type="button" class="btn-outline" @click="handleAddUser">
        + Add User
      </button>
    </header>

    <div class="settings-layout">
      <!-- Main settings content -->
      <section class="settings-main">
        <div class="panel">
          <!-- System Settings -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">System Settings</h2>
            </div>
            <div class="section-body">
              <label class="field-label">Data Retention Period</label>
              <select v-model="retentionPeriod" class="select-input">
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">365 days</option>
              </select>
            </div>
            <div class="section-footer">
              <button type="button" class="btn-primary" @click="handleUpdateSettings">
                Update Settings
              </button>
            </div>
          </div>

          <!-- Backup placeholder -->
          <div class="section">
            <div class="section-header simple-header">
              <h2 class="section-title">Back up</h2>
              <button type="button" class="btn-secondary" @click="handleUpdateSettings">
                Update Settings
              </button>
            </div>
          </div>

          <!-- User Management -->
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">User Management</h2>
            </div>
            <div class="section-body">
              <div class="user-filters">
                <input
                  v-model="userFilters.name"
                  type="text"
                  placeholder="Name"
                  class="filter-input"
                />
                <input
                  v-model="userFilters.email"
                  type="text"
                  placeholder="Email"
                  class="filter-input"
                />
                <button
                  type="button"
                  class="btn-dark"
                  @click="handleSearchUsers"
                >
                  <i class="pi pi-search" />&nbsp; Search
                </button>
              </div>

              <div class="table-wrapper">
                <table class="users-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th style="width: 96px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td class="actions-cell">
                        <button
                          type="button"
                          class="icon-btn icon-btn--edit"
                          title="Edit"
                        >
                          <i class="pi pi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          class="icon-btn icon-btn--delete"
                          title="Remove"
                        >
                          <i class="pi pi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right sidebar -->
      <aside class="settings-sidebar">
        <VisitorCategoriesChart />
        <AdminActions />
        <PeakHoursChart />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.page-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.25rem 0 0;
}

.settings-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: flex-start;
}

.settings-main {
  min-width: 0;
}

.settings-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 1.75rem 1.75rem;
}

.section {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 0 1rem;
}

.section:last-of-type {
  border-bottom: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-footer {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.simple-header {
  padding-top: 0.25rem;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
}

.select-input {
  width: 260px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.btn-outline {
  border-radius: 6px;
  padding: 0.55rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid #1f2937;
  background: #ffffff;
  color: #1f2937;
  cursor: pointer;
}

.btn-outline:hover {
  background: #f3f4f6;
}

.btn-primary,
.btn-secondary,
.btn-dark {
  border-radius: 6px;
  padding: 0.55rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--cta-dark-blue, #001a3d);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--cta-blue, #003174);
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-dark {
  background: #1f2937;
  color: #ffffff;
}

.btn-dark:hover {
  background: #111827;
}

.user-filters {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr auto;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.filter-input {
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  text-align: left;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.actions-cell {
  display: flex;
  gap: 0.35rem;
}

.icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-btn--edit {
  color: #4b5563;
}

.icon-btn--delete {
  color: #dc2626;
}

@media (max-width: 1200px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }

  .user-filters {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
