<script setup>
import { ref } from 'vue';
import { ElRow, ElCol, ElCard, ElImage, ElDialog } from 'element-plus';
import SceneExperienceDialog from '@/components/SceneExperienceDialog.vue'; // 导入子组件

// 模拟场景数据
const scenes = ref([
  {
    id: 'scene-001',
    name: '现代客厅',
    cover: 'https://via.placeholder.com/600x400/F0F8FF/000000?text=现代客厅',
    background: 'https://via.placeholder.com/1200x800/E0FFFF/000000?text=现代客厅背景图' // 弹窗中使用的背景图
  },
  {
    id: 'scene-002',
    name: '温馨卧室',
    cover: 'https://via.placeholder.com/600x400/FFF0F5/000000?text=温馨卧室',
    background: 'https://via.placeholder.com/1200x800/F8F8FF/000000?text=温馨卧室背景图'
  },
  {
    id: 'scene-003',
    name: '创意办公室',
    cover: 'https://via.placeholder.com/600x400/F5FFFA/000000?text=创意办公室',
    background: 'https://via.placeholder.com/1200x800/E6E6FA/000000?text=创意办公室背景图'
  },
  {
    id: 'scene-004',
    name: '户外花园',
    cover: 'https://via.placeholder.com/600x400/F0FFF0/000000?text=户外花园',
    background: 'https://via.placeholder.com/1200x800/F5DEB3/000000?text=户外花园背景图'
  },
  {
    id: 'scene-005',
    name: '静谧图书馆',
    cover: 'https://via.placeholder.com/600x400/FDF5E6/000000?text=静谧图书馆',
    background: 'https://via.placeholder.com/1200x800/F0E68C/000000?text=静谧图书馆背景图'
  },
  {
    id: 'scene-006',
    name: '赛博朋克街景',
    cover: 'https://via.placeholder.com/600x400/E6E6FA/000000?text=赛博朋克',
    background: 'https://via.placeholder.com/1200x800/4B0082/FFFFFF?text=赛博朋克背景图'
  },
]);

const dialogVisible = ref(false);
const currentSelectedScene = ref(null);

// 打开场景体验对话框
const openSceneExperience = (scene) => {
  currentSelectedScene.value = scene;
  dialogVisible.value = true;
};

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false;
  currentSelectedScene.value = null; // 清空选中场景
};
</script>

<template>
  <div class="reality-experience-container">
    <h1 class="page-title">实景体验馆</h1>
    <p class="page-description">
      选择一个您感兴趣的场景，上传人物图像，并调整模拟参数，即可体验虚拟实景效果！
    </p>

    <el-row :gutter="30" class="scene-grid">
      <el-col
        v-for="scene in scenes"
        :key="scene.id"
        :xs="24" :sm="12" :md="8" :lg="8" class="scene-col"
      >
        <el-card shadow="hover" class="scene-card" @click="openSceneExperience(scene)">
          <div class="image-wrapper">
            <el-image :src="scene.cover" :alt="scene.name" fit="cover" class="scene-cover" />
          </div>
          <div class="scene-info">
            <h3 class="scene-name">{{ scene.name }}</h3>
            <p class="scene-action">点击体验</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="dialogVisible"
      :title="currentSelectedScene ? `场景体验 - ${currentSelectedScene.name}` : '场景体验'"
      fullscreen
      :before-close="closeDialog"
      class="scene-experience-dialog-wrapper"
      append-to-body
    >
      <SceneExperienceDialog
        v-if="dialogVisible"
        :selected-scene="currentSelectedScene"
        @close="closeDialog"
      />
    </el-dialog>
  </div>
</template>

<style scoped>
.reality-experience-container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #333;
  text-align: center;
  min-height: 100vh;
}

.page-title {
  color: #d81b60;
  margin-bottom: 15px;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-description {
  color: #606266;
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.6;
}

.scene-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.scene-col {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.scene-card {
  width: 100%;
  max-width: 450px; /* 限制卡片最大宽度 */
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.scene-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  width: 100%;
  padding-top: 66.66%; /* 3:2 宽高比 (400/600) */
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
}

.scene-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scene-info {
  padding: 15px;
  text-align: center;
}

.scene-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #424242;
  margin-bottom: 5px;
}

.scene-action {
  font-size: 0.9em;
  color: #909399;
}

/* 对话框 wrapper 样式 */
.scene-experience-dialog-wrapper :deep(.el-dialog__header) {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}
.scene-experience-dialog-wrapper :deep(.el-dialog__body) {
  padding: 20px;
  height: calc(100vh - var(--el-dialog-title-height, 54px) - var(--el-dialog-footer-height, 60px) - 40px); /* 减去header/footer高度和padding */
  display: flex;
  gap: 20px;
  background-color: #fcfcfc;
}
.scene-experience-dialog-wrapper :deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #eee;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .scene-col {
    max-width: 380px; /* 进一步限制小屏幕卡片宽度 */
  }
}
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .page-description {
    font-size: 0.95rem;
  }
  .scene-col {
    max-width: 100%; /* 单列显示 */
  }
}
</style>