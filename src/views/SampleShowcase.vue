<script setup>
import { ref, watch } from 'vue';
import {
  ElCard, ElRow, ElCol, ElDialog, ElButton, ElIcon, ElEmpty,
  ElUpload, ElMessage, ElImage, ElLoading
} from 'element-plus';
import {
  Picture as IconPicture, Upload as IconUpload, MagicStick, ZoomIn
} from '@element-plus/icons-vue';

// --- 模拟数据 ---
const makeupThemes = ref([
  {
    id: 'theme-001',
    name: '经典新娘妆',
    coverImage: 'https://via.placeholder.com/300x200?text=经典新娘妆',
    themeImage: 'https://via.placeholder.com/800x600?text=经典新娘妆+效果图' // 主题妆容大图
  },
  {
    id: 'theme-002',
    name: '时尚派对妆',
    coverImage: 'https://via.placeholder.com/300x200?text=时尚派对妆',
    themeImage: 'https://via.placeholder.com/800x600?text=时尚派对妆+效果图'
  },
  {
    id: 'theme-003',
    name: '日常通勤妆',
    coverImage: 'https://via.placeholder.com/300x200?text=日常通勤妆',
    themeImage: 'https://via.placeholder.com/800x600?text=日常通勤妆+效果图'
  },
  {
    id: 'theme-004',
    name: '自然清新妆',
    coverImage: 'https://via.placeholder.com/300x200?text=自然清新妆',
    themeImage: 'https://via.placeholder.com/800x600?text=自然清新妆+效果图'
  },
  {
    id: 'theme-005',
    name: '复古名伶妆',
    coverImage: 'https://via.placeholder.com/300x200?text=复古名伶妆',
    themeImage: 'https://via.placeholder.com/800x600?text=复古名伶妆+效果图'
  },
]);

// --- 弹窗状态管理 ---
const dialogVisible = ref(false);
const selectedTheme = ref(null); // 当前选中的主题妆容
const userPhotoUrl = ref(''); // 用户上传的个人照片URL
const syntheticImageUrl = ref(''); // 合成后的图片URL
const isSynthesizing = ref(false); // 合成中状态

// 打开主题详情弹窗
const openThemeDetail = (theme) => {
  selectedTheme.value = theme;
  // 重置用户上传照片和合成结果
  userPhotoUrl.value = '';
  syntheticImageUrl.value = '';
  dialogVisible.value = true;
};

// 弹窗关闭前的回调
const handleDialogClose = () => {
  dialogVisible.value = false;
  // 清空数据，避免下次打开显示上次内容
  selectedTheme.value = null;
  userPhotoUrl.value = '';
  syntheticImageUrl.value = '';
  isSynthesizing.value = false;
};

// // --- 图片上传处理 ---
// const handleAvatarSuccess = (response, uploadFile) => {
//   // 实际项目中，response 会包含图片在服务器上的 URL
//   // 这里我们模拟一个本地URL或者直接用文件对象的URL
//   userPhotoUrl.value = URL.createObjectURL(uploadFile.raw);
//   ElMessage.success('个人照片上传成功！');
//   syntheticImageUrl.value = ''; // 重新上传照片，清空上次合成结果
// };

const handleChange = (uploadFile, uploadFiles) => {
  // 确保文件存在且是图片
  if (uploadFile.raw && beforeAvatarUpload(uploadFile.raw)) {
    userPhotoUrl.value = URL.createObjectURL(uploadFile.raw);
    ElMessage.success('个人照片已选择，可以进行预览！');
    syntheticImageUrl.value = ''; // 重新上传照片，清空上次合成结果
  } else {
    userPhotoUrl.value = ''; // 如果校验失败或文件不存在，清空 URL
  }
};

const beforeAvatarUpload = (rawFile) => {
  const isJPGPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';
//   const isLt2M = rawFile.size / 1024 / 1024 < 2; // 2MB

  if (!isJPGPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!');
    return false;
  }
//   if (!isLt2M) {
//     ElMessage.error('上传头像图片大小不能超过 2MB!');
//     return false;
//   }
  return true;
};

// --- 模拟图片合成 ---
const synthesizeImage = () => {
  if (!userPhotoUrl.value) {
    ElMessage.warning('请先上传您的个人照片！');
    return;
  }
  if (!selectedTheme.value) {
    ElMessage.error('未选择主题妆容！'); // 理论上不会发生，因为只有选择了才会进入弹窗
    return;
  }

  isSynthesizing.value = true;
  ElMessage.info('正在合成中，请稍候...');

  // 模拟网络请求和合成过程
  setTimeout(() => {
    // 实际项目中，这里会是后端返回的合成图片URL
    // 为了演示，我们简单地用主题图片作为合成结果，或者一个固定的占位符
    syntheticImageUrl.value = 'https://via.placeholder.com/800x600/FFD700/000000?text=合成效果图+' + selectedTheme.value.name.replace(/\s+/g, '+');
    isSynthesizing.value = false;
    ElMessage.success('合成成功！');
  }, 2000); // 模拟2秒的合成时间
};

// 用于el-image的预览列表
const previewSrcList = ref([]);
watch(syntheticImageUrl, (newVal) => {
  if (newVal) {
    previewSrcList.value = [newVal];
  } else {
    previewSrcList.value = [];
  }
}, { immediate: true });

</script>

<template>
  <div class="sample-showcase-container">
    <h1 class="page-title">样片欣赏与试妆体验</h1>
    <p class="page-description">
      选择一个您喜欢的主题妆容，上传您的个人照片，即可模拟生成虚拟试妆效果！
    </p>

    <el-row :gutter="30" class="theme-selection-row">
      <el-col
        v-for="theme in makeupThemes"
        :key="theme.id"
        :xs="24" :sm="12" :md="8" :lg="6"
      >
        <el-card class="theme-card" shadow="hover" @click="openThemeDetail(theme)">
          <img :src="theme.coverImage" :alt="theme.name" class="theme-cover-image" />
          <div class="card-content">
            <h3 class="theme-name">{{ theme.name }}</h3>
            <p class="theme-tag">#艺术 #时尚 #个性</p>
            <el-button type="primary" round size="small">选择并试妆</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="dialogVisible"
      :title="selectedTheme ? `试妆体验 - ${selectedTheme.name}` : '试妆体验'"
      fullscreen
      :before-close="handleDialogClose"
      class="makeup-dialog"
      append-to-body
    >
      <div class="makeup-content-wrapper">
        <div class="aside">
            <div class="theme-display-area">
              <h2>主题妆容</h2>
              <el-image
                :src="selectedTheme ? selectedTheme.themeImage : ''"
                alt="主题妆容"
                fit="contain"
                class="theme-main-image"
              >
                <template #error>
                  <div class="image-slot"><el-icon><icon-picture /></el-icon>加载失败</div>
                </template>
              </el-image>
              <p class="section-description">这是您选择的主题妆容效果参考图。</p>
            </div>
    
            <div class="upload-operate-area">
              <h2>上传个人照片</h2>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-change="handleChange"
            >
                <img v-if="userPhotoUrl" :src="userPhotoUrl" class="avatar" alt="个人照片预览" />
                <el-icon v-else class="avatar-uploader-icon"><icon-upload /></el-icon>
                <div v-if="!userPhotoUrl" class="upload-tip">点击上传照片（JPG/PNG）</div>
              </el-upload>
              <el-button
                type="success"
                :icon="MagicStick"
                :loading="isSynthesizing"
                :disabled="!userPhotoUrl || isSynthesizing"
                @click="synthesizeImage"
                class="synthesize-button"
              >
                {{ isSynthesizing ? '合成中...' : '合成虚拟试妆' }}
              </el-button>
            </div>
        </div>

        <div class="result-display-area">
          <h2>合成效果</h2>
          <div class="result-image-container">
            <el-image
              v-if="syntheticImageUrl"
              :src="syntheticImageUrl"
              :preview-src-list="previewSrcList"
              :initial-index="0"
              fit="contain"
              class="synthetic-image"
              :z-index="3000" >
              <template #error>
                <div class="image-slot"><el-icon><icon-picture /></el-icon>合成图加载失败</div>
              </template>
              <template #placeholder>
                <div v-loading="true" class="image-slot loading-slot"></div>
              </template>
            </el-image>
            <el-empty v-else description="合成结果将在此显示" :image-size="80"></el-empty>
          </div>
          <p class="section-description">点击图片可放大查看细节。</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 通用样式 */
.sample-showcase-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #333;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-description {
  text-align: center;
  color: #606266;
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.6;
}

/* 主题选择区域 */
.theme-selection-row {
  justify-content: space-between; /* 卡片之间的间距 */
}

.el-col {
  display: flex;
  margin-bottom: 20px; /* 卡片之间的间距 */
}

.theme-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0; /* 移除默认padding，让图片占据卡片顶部 */
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden; /* 确保图片圆角 */
}

.theme-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #ff8c00; /* 橙色边框突出选择 */
}

.theme-cover-image {
  width: 100%;
  height: 180px; /* 固定图片高度 */
  object-fit: cover; /* 确保图片覆盖整个区域 */
  border-radius: 12px 12px 0 0; /* 顶部圆角 */
  transition: transform 0.3s ease;
}

.theme-card:hover .theme-cover-image {
    transform: scale(1.05); /* 悬停时图片轻微放大 */
}

.card-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.theme-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #303133;
  margin-bottom: 10px;
}

.theme-tag {
  font-size: 0.85rem;
  color: #909399;
  margin-bottom: 15px;
}

/* 试妆体验弹窗样式 */
.makeup-content-wrapper {
    display: flex;
    flex-direction: row; /* 水平排列 */
    gap: 20px; /* 列之间的间隔 */
}

.aside {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px; /* 列之间的间隔 */
}

.makeup-dialog :deep(.el-dialog__header) {
  background-color: #fce4ec; /* 淡粉色背景 */
  border-bottom: 1px solid #f8bbd0;
  padding: 15px 20px;
}

.makeup-dialog :deep(.el-dialog__title) {
  font-size: 1.4rem;
  font-weight: 600;
  color: #d81b60; /* 深粉色标题 */
}

.makeup-dialog :deep(.el-dialog__body) {
  padding: 20px;
  display: flex;
  gap: 20px; /* 列之间的间隔 */
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 顶部对齐，如果内容高度不一 */
  background-color: #fffafa; /* 更柔和的背景色 */
  height: calc(100vh - 54px - 60px); /* 动态计算主体高度 */
  overflow-y: auto; /* 允许内容滚动，如果内容过长 */
}

/* 各个区域的通用样式 */
.theme-display-area,
.upload-operate-area,
.result-display-area {
  flex: 1; /* 均分空间 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
}

h2 {
  font-size: 1.3rem;
  color: #424242;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  width: 100%;
  padding-bottom: 8px;
}
h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #d81b60;
    border-radius: 2px;
}

.section-description {
    font-size: 0.9em;
    color: #9e9e9e;
    margin-top: 15px;
    text-align: center;
}

/* 主题妆容图片 */
.theme-main-image {
  width: 100%;
  max-height: 350px; /* 限制主题图片高度 */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; /* 防止图片被压缩 */
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.loading-slot {
    min-height: 150px; /* 确保加载状态有高度 */
}

/* 上传组件 */
:deep(.el-upload) {
  display: flex;
}

.avatar-uploader {
  width: 180px; /* 固定上传区域大小 */
  height: auto;
  border: 2px dashed var(--el-border-color-darker);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 20px;
}
.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 180px;
  text-align: center;
  line-height: 180px;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}
.upload-tip {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    color: #909399;
}

.synthesize-button {
    width: 80%;
    margin-top: 10px;
    padding: 12px 20px;
    font-size: 1.1rem;
}

/* 合成结果 */
.result-image-container {
  width: 100%;
  max-height: 400px; /* 限制结果图高度 */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px; /* 确保即使没有图也有高度 */
}
.synthetic-image {
  width: 100%;
  height: auto; /* 自动高度，保持比例 */
  object-fit: contain;
  cursor: zoom-in; /* 提示可放大 */
}

/* 弹窗底部 */
.makeup-dialog :deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #f8bbd0;
  text-align: right;
  background-color: #fce4ec;
}

/* 响应式布局调整 */
@media (max-width: 992px) {
  .makeup-dialog :deep(.el-dialog__body) {
    flex-direction: column; /* 小屏幕下垂直排列 */
    align-items: center; /* 垂直排列时居中 */
    height: auto; /* 允许高度自适应 */
  }

  .theme-display-area,
  .upload-operate-area,
  .result-display-area {
    width: 90%; /* 占据更大部分宽度 */
    max-width: 600px; /* 增加最大宽度 */
    margin-bottom: 20px; /* 各区域之间增加间距 */
  }
}
</style>