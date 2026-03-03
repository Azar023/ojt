<script setup>
import { ref } from 'vue'
import AdminActions from '../../components/admin/AdminActions.vue'

const reportType = ref('daily')
const dateRange = ref('Date Range')
const selectedDate = ref('02/04/2026')

const rows = ref([
  {
    name: 'Juan Dela Cruz',
    purpose: 'Filing Appeals',
    office: 'Clerk of Court',
    timeIn: '09:30 AM',
    status: 'Checked Out'
  },
  {
    name: 'John Doe',
    purpose: 'Case Hearings and Proceedings',
    office: 'Records Office',
    timeIn: '10:45 AM',
    status: 'In Building'
  }
])

const handleGenerate = () => {
  // Placeholder for future backend integration
  alert('Generate report will be implemented with backend.');
}

const handleExportExcel = () => {
  // Placeholder for future export logic
  alert('Excel export will be implemented with backend.');
}
</script>

<template>
  <div class="reports-page">
    <header class="reports-header">
      <div>
        <h1 class="page-title">Reports</h1>
        <p class="page-subtitle">Generate and export visitor reports.</p>
      </div>
    </header>

    <div class="reports-layout">
      <!-- Left: Admin actions sidebar -->
      <aside class="reports-sidebar">
        <AdminActions />
      </aside>

      <!-- Right: Reports content -->
      <section class="reports-main">
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Generate reports</h2>
            <button type="button" class="btn-outline" @click="handleGenerate">
              + Generate Report
            </button>
          </div>

          <!-- Filters row -->
          <div class="filters-card">
            <div class="filters-grid">
              <div class="field">
                <label class="field-label">Report Type</label>
                <div class="field-control">
                  <select v-model="reportType" class="select-input">
                    <option value="daily">Daily Visitor Report</option>
                    <option value="monthly">Monthly Visitor Report</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label class="field-label">Date Range</label>
                <div class="field-control">
                  <select v-model="dateRange" class="select-input">
                    <option value="Date Range">Date Range</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                  </select>
                </div>
              </div>

              <div class="field">
                <label class="field-label">Date</label>
                <div class="field-control">
                  <input
                    v-model="selectedDate"
                    type="text"
                    class="text-input"
                  />
                </div>
              </div>

              <div class="field field-actions">
                <button
                  type="button"
                  class="btn-dark"
                  @click="handleExportExcel"
                >
                  <i class="pi pi-search" />&nbsp; Excel
                </button>
                <button type="button" class="btn-primary" @click="handleGenerate">
                  Generate
                </button>
              </div>
            </div>
          </div>

          <!-- Results table -->
          <div class="results-section">
            <h3 class="results-title">
              Daily Reports Visitor - February 4, 2026
            </h3>

            <div class="table-wrapper">
              <table class="reports-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Purpose</th>
                    <th>Office Visit</th>
                    <th>Time In</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in rows" :key="index">
                    <td>{{ row.name }}</td>
                    <td>{{ row.purpose }}</td>
                    <td>{{ row.office }}</td>
                    <td>{{ row.timeIn }}</td>
                    <td>{{ row.status }}</td>
                  </tr>
                  <tr v-for="n in 10" :key="'empty-' + n">
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.reports-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.reports-header {
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

.reports-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  align-items: flex-start;
}

.reports-sidebar {
  min-width: 0;
}

.reports-main {
  min-width: 0;
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
  margin-bottom: 1.25rem;
}

.panel-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0;
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

.filters-card {
  background: #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
}

.filters-grid {
  display: grid;
  grid-template-columns: 1.4fr 1.2fr 1fr 1.1fr;
  gap: 1rem;
  align-items: flex-end;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 0.35rem;
  display: block;
}

.select-input,
.text-input {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
}

.field-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btn-dark,
.btn-primary {
  border-radius: 6px;
  padding: 0.55rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  color: #ffffff;
}

.btn-dark {
  background: #1f2937;
}

.btn-dark:hover {
  background: #111827;
}

.btn-primary {
  background: var(--cta-dark-blue, #001a3d);
}

.btn-primary:hover {
  background: var(--cta-blue, #003174);
}

.results-section {
  margin-top: 1.75rem;
}

.results-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0 0 0.75rem 0;
}

.table-wrapper {
  overflow-x: auto;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
}

.reports-table th {
  text-align: left;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.reports-table td {
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.reports-table tbody tr:hover {
  background: #f9fafb;
}

@media (max-width: 1200px) {
  .reports-layout {
    grid-template-columns: 1fr;
  }

  .filters-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
