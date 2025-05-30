<script setup>
import TutorialCard from '../components/TutorialCard.vue' // Reusing TutorialCard for blog posts
import { ref } from 'vue'

// 模拟文章数据
const atelierContent = ref([
  {
    id: 'interview-artist-1',
    title: 'Behind the Brush: An Interview with [Artist Name]',
    description: 'Delve into the philosophy and techniques of a visionary makeup artist.',
    image: '/images/atelier-interview.jpg',
  },
  {
    id: 'seasonal-trends-spring',
    title: 'Spring Awakening: Beauty Trends for the Season',
    description: 'Discover the freshest colors and styles for a radiant spring look.',
    image: '/images/atelier-trend-report.jpg',
  },
  {
    id: 'iconic-looks',
    title: 'Deconstructing Icons: The Story Behind Famous Faces',
    description: 'A detailed breakdown of legendary celebrity and runway makeup looks.',
    image: '/images/atelier-iconic-looks.jpg',
  },
  {
    id: 'product-spotlight',
    title: 'Product Spotlight: The Miracle Elixir',
    description: 'An in-depth review of a revolutionary high-end skincare product.',
    image: '/images/atelier-product-spotlight.jpg',
  },
  // 添加更多内容
])
</script>

<template>
  <main class="atelier-page container">
    <h1 class="page-title">The Atelier: Editorial & Inspiration</h1>
    <p class="page-intro">
      Immerse yourself in the world of beauty artistry with exclusive interviews, trend reports, and
      captivating editorials.
    </p>

    <div class="atelier-grid">
      <TutorialCard v-for="post in atelierContent" :key="post.id" :tutorial="post" />
    </div>
  </main>
</template>

<style scoped>
.atelier-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background-color: var(--color-accent);
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-text-dark);
}

.atelier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .atelier-grid {
    grid-template-columns: 1fr;
  }
}
</style>
