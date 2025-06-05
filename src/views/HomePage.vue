<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟订阅表单提交
const newsletterEmail = ref('')
const handleNewsletterSubmit = () => {
  if (newsletterEmail.value.trim()) {
    console.log('Subscribing:', newsletterEmail.value)
    // 实际应发送到后端
    alert(`Thank you for subscribing, ${newsletterEmail.value}!`)
    newsletterEmail.value = ''
  } else {
    alert('Please enter a valid email address.')
  }
}
</script>

<template>
  <main>
    <HeroSection />
  </main>
</template>

<style scoped>
/* 全局样式已在 main.css 中，这里只添加页面特有的布局或覆盖样式 */
section {
  padding: var(--spacing-xl) 0;
}

section h2 {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: var(--spacing-sm);
}

section h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--color-accent);
}

.tutorial-grid,
.atelier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.view-all-link {
  text-align: center;
  margin-top: var(--spacing-md);
}

.call-to-action {
  background-color: #fff;
  color: #fff;
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.call-to-action h2 {
  color: #fff;
  margin-bottom: var(--spacing-md);
}
.call-to-action h2::after {
  background-color: var(--color-accent);
}

.call-to-action p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
}

.newsletter-form {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  max-width: 500px;
  margin: 0 auto;
}

/* Element Plus Input 和 Button 的定制样式 */
.newsletter-form .el-input {
  --el-input-bg-color: rgba(255, 255, 255, 0.1);
  --el-input-text-color: #fff;
  --el-input-border-color: var(--color-border);
  --el-input-hover-border-color: var(--color-accent);
  --el-input-placeholder-color: var(--color-text-light);
}
.newsletter-form .el-input__wrapper {
  background-color: var(--el-input-bg-color);
  box-shadow: none !important; /* Remove default shadow */
  border-radius: 3px;
  padding: 0; /* Let input handle padding */
}
.newsletter-form .el-input__inner {
  padding: 12px 15px; /* Manually set padding for input text */
}

.newsletter-form .el-button--primary {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
.newsletter-form .el-button--primary:hover {
  background-color: #fff;
  color: #fff;
  border-color: #fff;
}

/* 媒体查询 */
@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
    align-items: center;
  }
  .newsletter-form .el-input {
    width: 100%;
    margin-bottom: var(--spacing-sm);
  }
}
</style>
