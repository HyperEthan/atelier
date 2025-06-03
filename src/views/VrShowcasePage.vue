<template>
  <main class="vr-showcase-page">
    <div class="background-video-wrapper">
      <video
        class="background-video"
        :src="vrScenes[0].vrUrl"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
      ></video>
      <div class="background-video-overlay">
        <h1 class="page-title overlay-title">VR 沉浸式体验</h1>
        <p class="page-intro overlay-intro">
          探索Éclat工作室的虚拟世界，从360°漫游到沉浸式妆容演示，体验美妆的无限可能。
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { beautyVR } from '@/data/mediaData';

const vrScenes = ref(beautyVR);
const dialogVisible = ref(false);
const currentVrScene = ref(null);

const openVrDialog = (scene) => {
  currentVrScene.value = scene;
  dialogVisible.value = true;
};

const closeVrDialog = () => {
  dialogVisible.value = false;
  currentVrScene.value = null;
};

const launchVrExperience = () => {
  if (currentVrScene.value && currentVrScene.value.vrUrl) {
    window.open(currentVrScene.value.vrUrl, '_blank');
  }
};
</script>

<style scoped>
/* Existing styles (container, page-title, page-intro, vr-grid, vr-item, etc.) */

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-family: var(--font-heading);
}

.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--color-accent);
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-text-dark);
  line-height: 1.6;
}

.vr-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.vr-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.vr-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.vr-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}

.vr-item:hover .vr-thumbnail {
  transform: scale(1.05);
}

.vr-item-content {
  padding: var(--spacing-md);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vr-item-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

.vr-item-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text-dark);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vr-item-content .el-button {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
  width: 100%;
  font-family: var(--font-body);
}

.vr-item-content .el-button:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

/* Dialog Styles (from your original code) */
.vr-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: var(--color-primary-light);
  text-align: center;
}
.vr-dialog .el-dialog__title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: var(--color-primary-dark);
}

.vr-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.vr-dialog.is-fullscreen .el-dialog__body {
  padding: var(--spacing-xl);
}

.vr-dialog-content {
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.dialog-description {
  font-size: 1.1rem;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
}

.vr-placeholder {
  background-color: var(--color-border);
  border-radius: 8px;
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%; /* Ensure it takes full width of content area */
  position: relative; /* For the iframe inside */
  padding-top: 56.25%; /* 16:9 Aspect Ratio for embedded video */
  overflow: hidden;
}

.dialog-video-iframe { /* Specific class for iframe in dialog */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.vr-placeholder p {
  font-size: 1rem;
  color: var(--color-text-light);
}

.vr-dialog .el-button {
  font-family: var(--font-body);
  font-size: 1.2rem;
  padding: 12px 25px;
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.vr-dialog .el-button:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.vr-dialog .el-icon {
  margin-right: 8px;
}

.vr-note {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-top: var(--spacing-sm);
}

.vr-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: var(--color-primary-light);
}

/* NEW STYLES for background video */
.background-video-wrapper {
  position: relative;
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100vw; /* Change this to 100vw */
  min-height: 100vh; /* Change this to 100vh */
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1;
  object-fit: cover;
}

.background-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Dark overlay for text readability */
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--spacing-md);
}

.overlay-title {
  color: white; /* Make title readable on dark overlay */
  font-size: 4.5rem; /* Larger title for impact */
  text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  margin-bottom: var(--spacing-sm);
}

.overlay-title::after {
  background-color: var(--color-accent); /* Maintain accent color */
}

.overlay-intro {
  color: white; /* Make intro readable */
  font-size: 1.3rem; /* Larger intro */
  max-width: 800px;
  line-height: 1.8;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.6);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .overlay-title {
    font-size: 3.5rem;
  }
  .overlay-intro {
    font-size: 1.1rem;
  }
  .background-video-wrapper {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .overlay-title {
    font-size: 2.8rem;
  }
  .overlay-intro {
    font-size: 1rem;
  }
  .background-video-wrapper {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .overlay-title {
    font-size: 2.2rem;
  }
  .overlay-intro {
    font-size: 0.9rem;
  }
  .background-video-wrapper {
    height: 300px;
  }
  .page-title { /* Adjust original page title if it overlaps */
    font-size: 2.2rem;
  }
}
</style>