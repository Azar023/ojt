<template>
  <div class="visitor-log">
    <h2 class="visitor-log__title">Recent Visitor Log</h2>
    <div class="visitor-log__table-wrapper">
      <table class="visitor-log__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Office Visited</th>
            <th>Time In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in rows" :key="idx">
            <td>{{ row.name }}</td>
            <td>{{ row.purpose }}</td>
            <td>{{ row.office }}</td>
            <td>{{ row.timeIn }}</td>
            <td>
              <span class="status" :class="`status--${row.status}`">
                {{ row.statusLabel }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.visitor-log {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.visitor-log__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cta-dark-blue, #001a3d);
  margin: 0 0 1rem 0;
}

.visitor-log__table-wrapper {
  overflow-x: auto;
}

.visitor-log__table {
  width: 100%;
  border-collapse: collapse;
}

.visitor-log__table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
}

.visitor-log__table td {
  padding: 1rem;
  font-size: 0.95rem;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}

.visitor-log__table tbody tr:hover {
  background: #f8fafc;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status--checked-out::before {
  background: var(--cta-dark-blue, #001a3d);
}

.status--in-building::before {
  background: #22c55e;
}
</style>
