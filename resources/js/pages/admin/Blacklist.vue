<template>
  <div class="admin-page">
    <h1 class="admin-page__title">Blacklist</h1>
    <p class="admin-page__subtitle">Manage blacklisted visitors.</p>
    <div class="admin-page__content admin-page__placeholder">
      <p>Coming soon</p>
    </div>
  </div>
</template>

<style scoped>
.admin-page { display: flex; flex-direction: column; gap: 1rem; }
.admin-page__title { font-size: 1.5rem; font-weight: 700; color: white; margin: 0; }
.admin-page__subtitle { font-size: 0.95rem; color: rgba(255,255,255,0.8); margin: 0; }
.admin-page__placeholder {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  color: #64748b;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
</style>
