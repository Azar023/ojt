<template>
  <header class="header">
    <div class="header-left">
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/5a3afbbe4e843961a0435fc6193e9b55da8c3ac5?width=790" 
        alt="CTA Seal" 
        class="header-logo"
      />
      <div class="header-text">
        <h1 class="header-title">COURT OF TAX APPEALS</h1>
        <p class="header-subtitle">Republic of the PHILIPPINES</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 1.5rem 2rem;
  background: transparent; /* No background as per the new design */
  width: 100%;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.header-logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns text to the left */
}

.header-title {
  color: white;
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  line-height: 1.1;
  font-family: 'Inter', sans-serif;
}

.header-subtitle {
  color: #E8E8E8;
  font-size: 15px;
  margin: 0;
  font-style: italic;
}
</style>