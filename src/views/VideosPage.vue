<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElIcon } from 'element-plus';
import { VideoCamera as IconVideoCamera } from '@element-plus/icons-vue';

// Import videos data
import { beautyVideos } from '@/data/mediaData';
const collapseValue = ref(['1']); // Default open collapse item

const videos = ref(beautyVideos);

const dialogVisible = ref(false);
const currentVideo = ref(null);

const openVideoDialog = (item) => {
  currentVideo.value = item;
  // Prepare embed URL (same logic as before)
  let embedUrl = item.videoUrl;
  if (embedUrl.includes('youtube.com/watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  } else if (embedUrl.includes('youtu.be/')) {
    embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
  }
  if (!embedUrl.includes('autoplay=1')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
  }
  currentVideo.value.embedUrl = embedUrl;
  dialogVisible.value = true;
};

const closeVideoDialog = () => {
  dialogVisible.value = false;
  // Stop the video when dialog closes by clearing the current video
  if (currentVideo.value) {
    currentVideo.value.embedUrl = ''; // Clear embed URL to stop playback
  }
  currentVideo.value = null;
};
</script>

<template>
  <main class="videos-page container">
    <h1 class="page-title">美妆视频集锦</h1>
    <p class="page-intro">
      观看Éclat工作室的精彩美妆视频，从幕后花絮到教程演示，身临其境感受美妆魅力。
    </p>

    <div class="area">
      <div class="title">新疆地区</div>
      <el-collapse v-model="collapseValue">
        <el-collapse-item title="哈密" name="1">
          <div class="imgur-grid">
            <div v-for="item in videos" :key="item.id" class="grid-item" @click="openVideoDialog(item)">
              <div class="grid-item-content">
                <div class="grid-item-thumbnail-wrapper"> <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
                </div>
                <div class="grid-item-overlay">
                  <h3 class="grid-item-title">{{ item.title }}</h3>
                  <el-button type="primary" size="small" :icon="IconVideoCamera" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="吐鲁番" name="2">
          <div class="imgur-grid">
            <div v-for="item in videos" :key="item.id" class="grid-item" @click="openVideoDialog(item)">
              <div class="grid-item-content">
                <div class="grid-item-thumbnail-wrapper"> <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
                </div>
                <div class="grid-item-overlay">
                  <h3 class="grid-item-title">{{ item.title }}</h3>
                  <el-button type="primary" size="small" :icon="IconVideoCamera" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="阿克苏" name="3">
          <div class="imgur-grid">
            <div v-for="item in videos" :key="item.id" class="grid-item" @click="openVideoDialog(item)">
              <div class="grid-item-content">
                <div class="grid-item-thumbnail-wrapper"> <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
                </div>
                <div class="grid-item-overlay">
                  <h3 class="grid-item-title">{{ item.title }}</h3>
                  <el-button type="primary" size="small" :icon="IconVideoCamera" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="喀什" name="4">
          <div class="imgur-grid">
            <div v-for="item in videos" :key="item.id" class="grid-item" @click="openVideoDialog(item)">
              <div class="grid-item-content">
                <div class="grid-item-thumbnail-wrapper"> <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
                </div>
                <div class="grid-item-overlay">
                  <h3 class="grid-item-title">{{ item.title }}</h3>
                  <el-button type="primary" size="small" :icon="IconVideoCamera" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="currentVideo ? currentVideo.title : '视频播放'"
      :fullscreen="true"
      @close="closeVideoDialog"
      custom-class="video-playback-dialog"
      :align-center="true"
      append-to-body="true"
    >
      <div v-if="currentVideo && currentVideo.embedUrl" class="video-embed-container">
        <iframe
          :src="currentVideo.embedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-iframe"
        ></iframe>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeVideoDialog">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<style scoped>
.videos-page {
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

/* Imgur-like Grid Style */
.imgur-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Flexible columns */
  /* Remove grid-auto-rows and let content define row height */
  gap: 15px;
  padding: 15px;
  /* background-color: #f0f2f5; */
  border-radius: 8px;
  /* Add explicit auto-flow for dense packing */
  grid-auto-flow: dense;
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  /* IMPORTANT: Let the content define the height */
  height: auto;
  display: block; /* Important for self-sizing */
}

.grid-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.grid-item-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column; /* Allows content below thumbnail if desired */
}

.grid-item-thumbnail-wrapper {
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio for video thumbnails */
  position: relative;
  overflow: hidden;
}

.grid-item-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the 16:9 area */
  display: block;
  transition: opacity 0.3s ease;
}

.grid-item:hover .grid-item-thumbnail {
  opacity: 0.7;
}

.grid-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  text-align: center;
  padding: var(--spacing-sm);
  box-sizing: border-box;
}

.grid-item:hover .grid-item-overlay {
  opacity: 1;
}

.grid-item-title {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  color: white;
  font-weight: 700;
}

.grid-item-overlay .el-button {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
  margin-top: var(--spacing-sm);
  font-size: 1rem;
}
.grid-item-overlay .el-button:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: var(--color-accent);
}

/* Dialog Styles (retained) */
.video-playback-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: var(--color-primary-light);
  text-align: center;
}
.video-playback-dialog .el-dialog__title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: var(--color-primary-dark);
}
.video-playback-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.video-embed-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  background-color: #000;
  max-width: 100%;
}
.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.video-playback-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: var(--color-primary-light);
}

:deep(.el-collapse-item) {
  margin-bottom: 15px;
}

:deep(.el-collapse-item__header) {
  background-color: #d6d6d6;
  color: #000;
  border-radius: 8px;
  padding: 10px 20px;
  height: 60px;
  font-size: 18px;
  font-weight: 400;

  &.is-active {
    border-radius: 8px 8px 0px 0px;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .page-title {
    font-size: 3rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .imgur-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  .grid-item-title {
    font-size: 1.1rem;
  }
  .video-playback-dialog .el-dialog__title {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .imgur-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
    padding: 8px;
  }
  .grid-item-title {
    font-size: 1rem;
  }
  .grid-item-overlay .el-button {
    font-size: 0.8rem;
  }
}
</style>