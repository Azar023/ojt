<template>
  <div class="dashboard">
    <!-- Summary Cards -->
    <section class="dashboard__summary">
      <SummaryCard title="Visitors Today" :value="128" variant="blue" />
      <SummaryCard title="Active Visitors" :value="21" variant="green" />
      <SummaryCard title="Lost Passes" :value="3" variant="red" />
      <SummaryCard title="Blacklisted" :value="1" variant="gray" />
    </section>

    <div class="dashboard__content">
      <!-- Main: Recent Visitor Log -->
      <section class="dashboard__main">
        <VisitorLogTable :rows="visitorLogRows" />
      </section>

      <!-- Sidebar -->
      <aside class="dashboard__sidebar">
        <VisitorCategoriesChart />
        <AdminActions
          @search="goToSearch"
          @generate-reports="goToReports"
          @manage-blacklist="goToBlacklist"
        />
        <PeakHoursChart />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SummaryCard from '../../components/admin/SummaryCard.vue'
import VisitorLogTable from '../../components/admin/VisitorLogTable.vue'
import VisitorCategoriesChart from '../../components/admin/VisitorCategoriesChart.vue'
import AdminActions from '../../components/admin/AdminActions.vue'
import PeakHoursChart from '../../components/admin/PeakHoursChart.vue'

const router = useRouter()

const visitorLogRows = ref([
  { name: 'Juan Dela Cruz', purpose: 'Filing Appeals', office: 'Clerk of Court', timeIn: '09:30 AM', status: 'checked-out', statusLabel: '• Checked Out' },
  { name: 'John Doe', purpose: 'Case Hearings and Proceedings', office: 'Records Office', timeIn: '10:45 AM', status: 'in-building', statusLabel: '• In Building' }
])

const goToSearch = () => {
  router.push('/admin/visitor-logbook')
}

const goToReports = () => {
  router.push('/admin/reports')
}

const goToBlacklist = () => {
  router.push('/admin/blacklist')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard__summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.dashboard__content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  align-items: start;
}

.dashboard__main {
  min-width: 0;
}

.dashboard__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .dashboard__summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dashboard__summary {
    grid-template-columns: 1fr;
  }
}
</style>
