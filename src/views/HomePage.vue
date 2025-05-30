<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import TutorialCard from '../components/TutorialCard.vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模拟教程数据
const featuredTutorials = [
  {
    id: 'red-carpet',
    title: 'Red Carpet Radiance',
    description: 'Unlock the secrets to a dazzling evening look.',
    image: '/images/tutorial-red-carpet.jpg',
  },
  {
    id: 'everyday-eclat',
    title: 'The Everyday Éclat',
    description: 'Effortless sophistication for your daily routine.',
    image: '/images/tutorial-everyday-eclat.jpg',
  },
  {
    id: 'flawless-canvas',
    title: 'Flawless Canvas',
    description: 'Perfect your base with expert foundation techniques.',
    image: '/images/tutorial-flawless-canvas.jpg',
  },
]

const atelierPosts = [
  {
    id: 'interview-artist',
    title: 'Interview: The Vision of [Artist Name]',
    description: 'A deep dive into the philosophy of a renowned beauty innovator.',
    image: '/images/atelier-interview.jpg',
  },
  {
    id: 'seasonal-trends',
    title: 'Seasonal Beauty Trends: Autumn Opulence',
    description: 'Discover the must-try looks for the new season.',
    image: '/images/atelier-trend-report.jpg',
  },
]

const goToAllTutorials = () => {
  router.push('/tutorials')
}

const goToAtelier = () => {
  router.push('/atelier')
}

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

    <section class="featured-tutorials container">
      <h2>Featured Tutorials</h2>
      <div class="tutorial-grid">
        <TutorialCard
          v-for="tutorial in featuredTutorials"
          :key="tutorial.id"
          :tutorial="tutorial"
        />
      </div>
      <div class="view-all-link">
        <el-button
          type="primary"
          size="large"
          @click="goToAllTutorials"
          color="white"
          style="padding: 18px 24px; border: 1px solid #b08d57"
          >VIEW ALL TUTORIALS</el-button
        >
      </div>
    </section>

    <section class="the-atelier container">
      <h2>The Atelier: Editorial & Inspiration</h2>
      <div class="atelier-grid">
        <TutorialCard v-for="post in atelierPosts" :key="post.id" :tutorial="post" />
      </div>
      <div class="view-all-link">
        <el-button
          type="primary"
          size="large"
          @click="goToAtelier"
          color="white"
          style="padding: 18px 24px; border: 1px solid #b08d57"
          >EXPOLRE THE ATELIER</el-button
        >
      </div>
    </section>

    <section class="call-to-action">
      <div class="container">
        <h2>Elevate Your Beauty Journey</h2>
        <p>
          Sign up for exclusive content, early access to new collections, and personalized
          recommendations.
        </p>
        <div class="newsletter-form">
          <el-input
            v-model="newsletterEmail"
            placeholder="Your Email Address"
            size="large"
            clearable
            @keyup.enter="handleNewsletterSubmit"
          ></el-input>
          <el-button type="primary" size="large" @click="handleNewsletterSubmit"
            >Subscribe</el-button
          >
        </div>
      </div>
    </section>
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
  background-color: var(--color-primary-dark);
  color: var(--color-primary-light);
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.call-to-action h2 {
  color: var(--color-primary-light);
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
  --el-input-text-color: var(--color-primary-light);
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
  color: var(--color-primary-light);
}
.newsletter-form .el-button--primary:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
  border-color: var(--color-primary-light);
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
