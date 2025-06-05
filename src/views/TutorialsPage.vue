<script setup>
import TutorialCard from '../components/TutorialCard.vue'
import { ref } from 'vue'

// 模拟所有教程数据 - 在实际项目中，这会从API获取
const allTutorials = ref([
  {
    id: 'red-carpet',
    title: 'Red Carpet Radiance: The Ultimate Glam',
    description: 'Master breathtaking looks for your most dazzling events.',
    image: '/images/tutorial-red-carpet.jpg',
  },
  {
    id: 'everyday-eclat',
    title: 'The Everyday Éclat: Effortless Chic',
    description: 'Unlock sophisticated beauty routines for your daily life.',
    image: '/images/tutorial-everyday-eclat.jpg',
  },
  {
    id: 'flawless-canvas',
    title: 'Flawless Canvas: Foundation Mastery',
    description: 'Achieve a perfect base with expert techniques for every skin type.',
    image: '/images/tutorial-flawless-canvas.jpg',
  },
  {
    id: 'smoky-eyes',
    title: 'Beyond the Basics: Smoky Eye Perfection',
    description: 'Elevate your smoky eye game with advanced blending and color theory.',
    image: '/images/tutorial-smoky-eyes.jpg',
  },
  {
    id: 'bridal-glow',
    title: 'Bridal Glow: Wedding Day Radiance',
    description: 'Create an ethereal and long-lasting bridal look for your special day.',
    image: '/images/tutorial-bridal-glow.jpg',
  },
  {
    id: 'sculpt-define',
    title: 'Sculpt & Define: Contouring & Highlighting',
    description: 'Learn how to expertly sculpt your features for a defined and luminous finish.',
    image: '/images/tutorial-sculpt-define.jpg',
  },
  // 添加更多教程数据
])
</script>

<template>
  <main class="tutorials-page container">
    <h1 class="page-title">All Masterclasses</h1>
    <p class="page-intro">
      Explore our comprehensive collection of beauty tutorials, designed to elevate your artistry
      and refine your techniques.
    </p>

    <div class="tutorial-grid">
      <TutorialCard v-for="tutorial in allTutorials" :key="tutorial.id" :tutorial="tutorial" />
    </div>
  </main>
</template>

<style scoped>
.tutorials-page {
  padding-top: var(--spacing-lg); /* Adjust based on header height */
  padding-bottom: var(--spacing-xl);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: #fff;
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
  color: #fff;
}

.tutorial-grid {
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
  .tutorial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
