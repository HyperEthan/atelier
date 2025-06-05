<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElIcon } from 'element-plus';
import { Monitor as IconMonitor } from '@element-plus/icons-vue';

// Import VR data from the new media data file
import { beautyVR } from '@/data/mediaData'; // <--- **IMPORTANT CHANGE HERE**

const vrScenes = ref(beautyVR); // Use the imported VR data

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

<template>
  <main class="vr-showcase-page container">
    <h1 class="page-title">VR 沉浸式体验</h1>
    <p class="page-intro">
      探索Éclat工作室的虚拟世界，从360°漫游到沉浸式妆容演示，体验美妆的无限可能。
    </p>

    <div class="vr-grid">
      <div v-for="scene in vrScenes" :key="scene.id" class="vr-item" @click="openVrDialog(scene)">
        <img :src="scene.thumbnail" :alt="scene.title" class="vr-thumbnail" />
        <div class="vr-item-content">
          <h3 class="vr-item-title">{{ scene.title }}</h3>
          <p class="vr-item-description">{{ scene.description }}</p>
          <el-button type="primary" size="small" :icon="IconMonitor" circle>
            启动体验
          </el-button>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="currentVrScene ? currentVrScene.title : 'VR 场景'"
      width="80%"
      :fullscreen="true"
      @close="closeVrDialog"
      :align-center="true"
      append-to-body="true"
    >
      <div v-if="currentVrScene" class="vr-dialog-content">
        <iframe
          :src="currentVrScene.vrUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-iframe"
        ></iframe>
      </div>
    </el-dialog>
  </main>
</template>

<style scoped>
/* (Styles are already good, no changes needed unless you want to customize further) */
/* Re-include the styles from the previous VrShowcasePage.vue */
.vr-showcase-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
  font-family: var(--font-body);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: #fff;
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
  background-color: #b73c62;
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: #fff;
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
  background-color: #b73c62;
}

.vr-item-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

.vr-item-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: #fff;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vr-item-content .el-button {
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  width: 100%;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}

.vr-item-content .el-button:hover {
  background-color: #762239;
  border-color: #762239;
}


.vr-dialog-content {
  text-align: center;
  width: 100wh;
}

.dialog-description {
  font-size: 1.1rem;
  color: #fff;
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
}
.vr-placeholder-image {
    max-width: 80%;
    max-height: 200px;
    object-fit: contain;
    margin-bottom: var(--spacing-sm);
    border-radius: 4px;
}
.vr-placeholder p {
    font-size: 1rem;
    color: var(--color-text-light);
}

.vr-note {
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-top: var(--spacing-sm);
}

.video-iframe {
  width: 100%;
  height: calc(100vh - 80px);
  border: none;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .page-title {
    font-size: 3rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .vr-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }
  .vr-item-title {
    font-size: 1.3rem;
  }
  .dialog-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .vr-grid {
    grid-template-columns: 1fr;
  }
  .vr-item-content {
    padding: var(--spacing-sm);
  }
}
</style>