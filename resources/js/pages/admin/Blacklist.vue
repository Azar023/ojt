<script setup>
import { ref, computed } from 'vue'
import VisitorCategoriesChart from '../../components/admin/VisitorCategoriesChart.vue'
import AdminActions from '../../components/admin/AdminActions.vue'
import PeakHoursChart from '../../components/admin/PeakHoursChart.vue'

const filters = ref({
  name: '',
  email: '',
  reason: ''
})

const rows = ref([
  {
    name: 'Juan Dela Cruz',
    id: 'juanedc@gmail.com',
    reason: 'Security Violation',
    dateListed: '02/04/2026'
  },
  {
    name: 'John Doe',
    id: 'johndoe@gmail.com',
    reason: 'Misuse of Visitor Pass',
    dateListed: '01/03/2026'
  }
])

const filteredRows = computed(() => {
  const nameF = filters.value.name.toLowerCase()
  const emailF = filters.value.email.toLowerCase()
  const reasonF = filters.value.reason.toLowerCase()

  return rows.value.filter((row) => {
    const matchesName = !nameF || row.name.toLowerCase().includes(nameF)
    const matchesEmail = !emailF || row.id.toLowerCase().includes(emailF)
    const matchesReason = !reasonF || row.reason.toLowerCase().includes(reasonF)
    return matchesName && matchesEmail && matchesReason
  })
})

const handleSearch = () => {
  // Filtering happens reactively via computed; this is here for future backend hook
}

const handleAdd = () => {
  // Placeholder for future modal / backend integration
  alert('Add to Blacklist functionality will be implemented with backend.')
}
</script>

<template>
  <div class="blacklist-page">
    <header class="blacklist-header">
      <div>
        <h1 class="page-title">Blacklist</h1>
        <p class="page-subtitle">Manage visitors who are restricted from entry.</p>
      </div>
    </header>

    <div class="blacklist-layout">
      <!-- Main blacklist table area -->
      <section class="blacklist-main">
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Blacklist</h2>
            <button type="button" class="btn-primary" @click="handleAdd">
              + Add to Blacklist
            </button>
          </div>

          <!-- Filters -->
          <div class="filter-row">
            <input
              v-model="filters.name"
              type="text"
              placeholder="Name"
              class="filter-input"
            />
            <input
              v-model="filters.email"
              type="text"
              placeholder="Email"
              class="filter-input"
            />
            <input
              v-model="filters.reason"
              type="text"
              placeholder="Reason"
              class="filter-input"
            />
            <button type="button" class="btn-secondary" @click="handleSearch">
              Search
            </button>
          </div>

          <!-- Table -->
          <div class="table-wrapper">
            <table class="blacklist-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID Type/ No.</th>
                  <th>Reason</th>
                  <th>Date Listed</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in filteredRows" :key="index">
                  <td>{{ row.name }}</td>
                  <td>{{ row.id }}</td>
                  <td>{{ row.reason }}</td>
                  <td>{{ row.dateListed }}</td>
                  <td class="actions-cell">
                    <button type="button" class="icon-btn icon-btn--edit" title="Edit">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button type="button" class="icon-btn icon-btn--delete" title="Remove">
                      <i class="pi pi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredRows.length === 0">
                  <td colspan="5" class="empty-cell">
                    No blacklisted visitors match your search.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Right sidebar: reuse dashboard components -->
      <aside class="blacklist-sidebar">
        <VisitorCategoriesChart />
        <AdminActions />
        <PeakHoursChart />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.blacklist-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blacklist-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

.blacklist-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: flex-start;
}

.blacklist-main {
  min-width: 0;
}

.blacklist-sidebar {
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

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0;
}

.filter-row {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.2fr auto;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.filter-input {
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.btn-primary,
.btn-secondary {
  border-radius: 6px;
  padding: 0.55rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-primary {
  background: var(--cta-dark-blue, #001a3d);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--cta-blue, #003174);
}

.btn-secondary {
  background: #1f2937;
  color: #ffffff;
}

.btn-secondary:hover {
  background: #111827;
}

.table-wrapper {
  overflow-x: auto;
}

.blacklist-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

.blacklist-table th {
  text-align: left;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.blacklist-table td {
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.blacklist-table tbody tr:hover {
  background: #f9fafb;
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

.empty-cell {
  text-align: center;
  padding: 1.5rem 0.9rem;
  color: #9ca3af;
  font-size: 0.9rem;
}

@media (max-width: 1200px) {
  .blacklist-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .filter-row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
