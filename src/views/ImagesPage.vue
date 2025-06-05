<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElIcon } from 'element-plus';
import { Picture as IconPicture } from '@element-plus/icons-vue';

// Import images data
import { beautyImages } from '@/data/mediaData';


const collapseValue = ref(['1']); // Default open collapse item

const images = ref(beautyImages);

const dialogVisible = ref(false);
const currentImage = ref(null);

const openImageDialog = (item) => {
  currentImage.value = item;
  dialogVisible.value = true;
};

const closeImageDialog = () => {
  dialogVisible.value = false;
  currentImage.value = null;
};
</script>

<template>
  <main class="images-page container">
    <h1 class="page-title">美妆图片画廊</h1>
    <p class="page-intro">
      浏览Éclat工作室的精美美妆图片，捕捉每一个精彩瞬间和独特风格。
    </p>

    <div class="area">
      <div class="title">新疆地区</div>
      <el-collapse v-model="collapseValue">
        <el-collapse-item title="哈密" name="1">
          <div class="imgur-grid">
            <div v-for="item in images.hami" :key="item.id" class="grid-item" @click="openImageDialog(item)">
              <div class="grid-item-content">
                <img :src="item.image" class="grid-item-thumbnail" />
                <div class="grid-item-overlay">
                  <el-button type="primary" size="small" :icon="IconPicture" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="吐鲁番" name="2">
          <div class="imgur-grid">
            <div v-for="item in images.tulufan" :key="item.id" class="grid-item" @click="openImageDialog(item)">
              <div class="grid-item-content">
                <img :src="item.image" class="grid-item-thumbnail" />
                <div class="grid-item-overlay">
                  <el-button type="primary" size="small" :icon="IconPicture" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="阿克苏" name="3">
          <div class="imgur-grid">
            <div v-for="item in images.akesu" :key="item.id" class="grid-item" @click="openImageDialog(item)">
              <div class="grid-item-content">
                <img :src="item.image" class="grid-item-thumbnail" />
                <div class="grid-item-overlay">
                  <el-button type="primary" size="small" :icon="IconPicture" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="喀什" name="4">
          <div class="imgur-grid">
            <div v-for="item in images.kashi" :key="item.id" class="grid-item" @click="openImageDialog(item)">
              <div class="grid-item-content">
                <img :src="item.image" class="grid-item-thumbnail" />
                <div class="grid-item-overlay">
                  <el-button type="primary" size="small" :icon="IconPicture" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>


    <el-dialog
      v-model="dialogVisible"
      title=""
      :fullscreen="true"
      @close="closeImageDialog"
      custom-class="image-detail-dialog"
      :align-center="true"
    >
      <div v-if="currentImage" class="image-dialog-content-wrapper">
        <img :src="currentImage.image" class="full-view-image" />
      </div>
    </el-dialog>
  </main>
</template>

<style scoped>
:deep(.el-dialog__body) {
  height: calc(100% - 16px);
}

.images-page {
  padding-top: var(--spacing-lg);
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
  width: 100px;
  height: 3px;
  background-color: #b73c62;
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: #b2b4b8;
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
  height: 100%; /* Important: let this expand to fit the image */
  position: relative;
  display: flex; /* Use flex to allow content within to control layout */
  flex-direction: column; /* Stack image and potential future text */
  justify-content: center;
  align-items: center;
  /* Remove min-height: this is the key for variable heights */
}

.grid-item-thumbnail {
  height: 100%;
  display: block;
  object-fit: cover;
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
  background-color: #fff;
  border-color: #fff;
  color: var(--color-accent);
}

/* Dialog Styles (retained as before) */
.image-detail-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
.image-detail-dialog .el-dialog__title {
  font-size: 2.2rem;
  color: #fff;
}
.image-detail-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.image-dialog-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.full-view-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.image-description {
  margin-top: var(--spacing-md);
  font-size: 1rem;
  color: #fff;
  font-family: var(--font-body);
  text-align: center;
}
.image-detail-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: #fff;
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
  color: #fff;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

:deep(.el-collapse) {
  border: none
}

:deep(.el-collapse-item) {
  border: none;
}

:deep(.el-collapse-item__header) {
  background-color: #9d3050;
  color: #fff;
  font-family: 'MyFont';
  font-size: 1.2rem;
  border: none;
}

:deep(.el-collapse-item__content) {
  background-color: #bb3d63;
  border: none;
}

:deep(.el-collapse-item__wrap) {
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
  .imgur-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  .grid-item-title {
    font-size: 1.1rem;
  }
  .image-detail-dialog .el-dialog__title {
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
  .full-view-image {
    max-height: 70vh;
  }
}
</style>