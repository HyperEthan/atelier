<template>
  <section class="hero-section">
    <div class="hero-carousel-container">
      <el-carousel :interval="3000" arrow="never" height="100vh">
        <el-carousel-item v-for="image in backgroundImages" :key="image">
          <img :src="image" alt="Background Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hero-content">
      <h1>智妆教学平台</h1>
      <p>
        智妆教学平台让美妆学习变得前所未有的智能与高效，助你轻松掌握专业美妆技巧。
      </p>
      <!-- <el-button
        type="primary"
        size="large"
        @click="goToTutorials"
        color="transparent"
        style="padding: 24px 24px; border: 1px solid #b08d57"
        >BEGIN YOUR JOURNEY</el-button -->
      >
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton, ElCarousel, ElCarouselItem } from 'element-plus' // 引入 Element Plus 按钮和走马灯组件

// Import your images
import home1 from '@/assets/images/home/1.png'
import home2 from '@/assets/images/home/2.png'
import home3 from '@/assets/images/home/3.png'
import home4 from '@/assets/images/home/4.png'

const router = useRouter()

const goToTutorials = () => {
  router.push('/tutorials')
}

// Define the array of background images
const backgroundImages = [home1, home2, home3, home4]
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-light);
  text-align: center;
  overflow: hidden;
}

.hero-carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the entire container */
  filter: brightness(0.7) grayscale(0.2); /* Apply similar filters as your video */
}

.hero-content {
  z-index: 2; /* Ensure content is above the carousel */
  padding: var(--spacing-md);
  max-width: 800px;
}

.hero-content h1 {
  font-size: 4.5rem;
  color: var(--color-primary-light);
  margin-bottom: var(--spacing-md);
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-light);
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
}

/* 媒体查询 */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  .hero-content p {
    font-size: 1rem;
  }
}
@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
}
</style>