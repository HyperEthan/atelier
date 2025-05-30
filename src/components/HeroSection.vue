<template>
  <section class="hero-section">
    <div class="hero-video-container">
      <video autoplay muted loop playsinline ref="videoElement">
        <source :src="test_case" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="hero-content">
      <h1>Mastering the Art of Elevated Beauty.</h1>
      <p>
        Discover exclusive masterclasses and curated techniques from the world's leading artists.
      </p>
      <el-button
        type="primary"
        size="large"
        @click="goToTutorials"
        color="transparent"
        style="padding: 24px 24px; border: 1px solid #b08d57"
        >BEGIN YOUR JOURNEY</el-button
      >
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus' // 引入 Element Plus 按钮
import test_case from '@/assets/videos/test_case.mp4'

const router = useRouter()

const goToTutorials = () => {
  router.push('/tutorials')
}

const videoElement = ref(null) // 定义一个 ref 来引用视频元素

// onMounted(() => {
//   // 确保视频元素已经挂载
//   if (videoElement.value) {
//     // 尝试播放视频
//     videoElement.value.play()
//       .then(() => {
//         console.log('Video autoplayed successfully!');
//       })
//       .catch(error => {
//         console.error('Autoplay prevented:', error);
//         // 这里可以添加逻辑来处理自动播放失败的情况，
//         // 例如：显示一个播放按钮让用户手动点击
//       });
//   }
// })
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-light);
  text-align: center;
  overflow: hidden;
}

.hero-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.hero-video-container video {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  filter: brightness(0.7) grayscale(0.2);
}

.hero-content {
  z-index: 1;
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
  font-size: 1.3rem;
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
