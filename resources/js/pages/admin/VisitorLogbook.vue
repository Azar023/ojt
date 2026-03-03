<script setup>
import { ref } from 'vue'
import VisitorCategoriesChart from '../../components/admin/VisitorCategoriesChart.vue'
import AdminActions from '../../components/admin/AdminActions.vue'
import PeakHoursChart from '../../components/admin/PeakHoursChart.vue'

const rows = ref([
  {
    name: 'Juan Dela Cruz',
    purpose: 'Filing Appeals',
    office: 'Clerk of Court',
    timeIn: '09:30 AM',
    timeOut: '01:45 PM'
  },
  {
    name: 'John Doe',
    purpose: 'Case Hearings and Proceedings',
    office: 'Records Office',
    timeIn: '10:45 AM',
    timeOut: '01:56 PM'
  }
])
</script>

<template>
  <div class="logbook-page">
    <header class="logbook-header">
      <div>
        <h1 class="page-title">Visitor Logbook</h1>
        <p class="page-subtitle">View and track all visitor entries.</p>
      </div>
    </header>

    <div class="logbook-layout">
      <!-- Main visitor logbook table -->
      <section class="logbook-main">
        <div class="panel">
          <div class="panel-header">
            <h2 class="panel-title">Visitor Logbook</h2>
          </div>

          <div class="table-wrapper">
            <table class="logbook-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Office Visited</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in rows" :key="index">
                  <td>{{ row.name }}</td>
                  <td>{{ row.purpose }}</td>
                  <td>{{ row.office }}</td>
                  <td>{{ row.timeIn }}</td>
                  <td>{{ row.timeOut }}</td>
                </tr>
                <!-- Empty rows to visually match the reference design -->
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
      </section>

      <!-- Right sidebar -->
      <aside class="logbook-sidebar">
        <VisitorCategoriesChart />
        <AdminActions />
        <PeakHoursChart />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.logbook-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.logbook-header {
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

.logbook-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
  align-items: flex-start;
}

.logbook-main {
  min-width: 0;
}

.logbook-sidebar {
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

.table-wrapper {
  overflow-x: auto;
}

.logbook-table {
  width: 100%;
  border-collapse: collapse;
}

.logbook-table th {
  text-align: left;
  padding: 0.75rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.logbook-table td {
  padding: 0.75rem 0.9rem;
  font-size: 0.9rem;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.logbook-table tbody tr:hover {
  background: #f9fafb;
}

@media (max-width: 1200px) {
  .logbook-layout {
    grid-template-columns: 1fr;
  }
}
</style>
