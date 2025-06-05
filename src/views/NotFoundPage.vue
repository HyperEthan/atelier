<script setup>
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <main class="not-found-page container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The beauty you seek is not here. Perhaps it's a hidden gem yet to be discovered?</p>
      <ElButton class="not-btn" type="primary" size="large" @click="goToHome"
        >Return to Éclat Atelier Home</ElButton
      >
    </div>
  </main>
</template>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Adjust as needed */
  text-align: center;
  padding: var(--spacing-xl);
}

.not-found-content h1 {
  font-size: 8rem;
  color: var(--color-accent);
  margin-bottom: var(--spacing-sm);
  line-height: 1;
}

.not-found-content h2 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: var(--spacing-md);
}

.not-found-content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
  color: #fff;
}

.not-found-content .el-button {
  margin-top: var(--spacing-md);
}

.not-btn {
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}

.not-btn:hover {
  background-color: #762239;
  border-color: #762239;
}

@media (max-width: 768px) {
  .not-found-content h1 {
    font-size: 5rem;
  }
  .not-found-content h2 {
    font-size: 2rem;
  }
  .not-found-content p {
    font-size: 1rem;
  }
}
</style>
