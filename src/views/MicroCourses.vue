<script setup>
import { ref, markRaw } from 'vue';
import {
  VideoCamera, Monitor, MagicStick, Film, Connection // 常用图标
} from '@element-plus/icons-vue';

import zhibo from '@/assets/videos/weike/zhibo.mp4';
import duanshipin from '@/assets/videos/weike/duanshipin.mp4';
import vrluyan from '@/assets/videos/weike/vrluyan.mp4';
import gongfang from '@/assets/images/weike/gongfang.jpg';

import weike_bg1 from '@/assets/videos/weike/1.jpg';
import weike_bg2 from '@/assets/videos/weike/2.jpg';
import weike_bg3 from '@/assets/videos/weike/3.jpg';

// 模拟数据：四大营销工具及其媒体内容
const marketingTools = ref([
  {
    id: 'live-stream',
    name: '直播',
    icon: markRaw(VideoCamera), // Element Plus Icon
    type: 'video',
    mediaUrl: zhibo, 
    description: '通过实时互动直播，零距离接触学员，答疑解惑，提升学习体验和转化率。',
  },
  {
    id: 'short-video',
    name: '短视频',
    icon: markRaw(Film),
    type: 'video',
    mediaUrl: duanshipin,
    description: '制作精良的短视频教程，碎片化学习，提高知识传播效率，吸引更多学员。',
  },
  {
    id: 'virtual-workshop',
    name: '虚拟工坊',
    icon: markRaw(MagicStick),
    type: 'image',
    mediaUrl: gongfang,
    description: '提供沉浸式虚拟实践环境，让学员动手操作，加深理解，提升实战能力。'
  },
  {
    id: 'vr-roadshow',
    name: 'VR路演',
    icon: markRaw(Connection),
    type: 'video',
    mediaUrl: vrluyan,
    description: '利用VR技术进行沉浸式产品或项目路演，带来全新体验，有效吸引投资者和合作伙伴。',
  }
]);

const group = ref(
  [
    {
      id: 'weike4_1',
      title: '走进非遗剪纸',
      thumbnail: weike_bg1, // 使用第一张图片作为缩略图
      videoUrl: null, // 使用导入的视频资源
    },
    {
      id: 'weike4_2',
      title: '立体镂空灯的制作',
      thumbnail: weike_bg2, // 使用第一张图片作为缩略图
      videoUrl: null, // 使用导入的视频资源
    },
    {
      id: 'weike4_3',
      title: '镂空类图案制作的一般工艺',
      thumbnail: weike_bg3, // 使用第一张图片作为缩略图
      videoUrl: null, // 使用导入的视频资源
    }
  ]
)

// 弹窗状态管理
const dialogVisible = ref(false);
const currentMedia = ref(null); // { type: 'video' | 'image', mediaUrl: string, poster?: string }
const dialogTitle = ref('');

// 视频播放器引用，用于控制视频播放
const videoPlayerRef = ref(null);

// 点击卡片处理函数
const openMediaDialog = (tool) => {
  currentMedia.value = {
    type: tool.type,
    mediaUrl: tool.mediaUrl,
    poster: tool.poster || '' // 视频可能没有poster
  };
  dialogTitle.value = tool.name;
  dialogVisible.value = true;
};

// 弹窗关闭前的回调，用于停止视频播放
const handleDialogClose = () => {
  if (videoPlayerRef.value) {
    videoPlayerRef.value.pause(); // 暂停视频
    videoPlayerRef.value.currentTime = 0; // 重置播放时间
  }
  currentMedia.value = null; // 清空当前媒体内容
  dialogTitle.value = '';
  dialogVisible.value = false; // 关闭弹窗
};

// 弹窗完全关闭后的回调
const handleDialogClosed = () => {
  // 确保弹窗关闭动画结束后再清除内容，避免闪烁
};
</script>

<template>
  <div class="micro-courses-container">
    <h1 class="page-title">E课堂 · 微课中心</h1>
    <p class="page-description">在这里，我们为您准备了四大创新营销工具，助您轻松打造优质微课内容！</p>

    <div class="video-group">
      <div class="video-group">
      <div class="title">第三模块：定妆实施</div>
      <div class="imgur-grid">
        <div v-for="item in group" :key="item.id" class="grid-item">
          <div class="grid-item-content">
            <div class="grid-item-thumbnail-wrapper-3">
              <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
            </div>
            <div class="grid-item-overlay">
              <h3 class="grid-item-title">{{ item.title }}</h3>
              </div>
          </div>
        </div>
      </div>
    </div>
      <div class="title">第四模块：营销推广</div>
      <div class="imgur-grid">
        <div v-for="item in marketingTools" :key="item.id" class="grid-item">
          <div class="grid-item-content">
            <div class="grid-item-thumbnail-wrapper">
              <el-card class="tool-card" shadow="hover" @click="openMediaDialog(item)">
                <div class="card-content">
                  <el-icon :size="50" class="tool-icon"><component :is="item.icon" /></el-icon>
                  <h3 class="tool-name">{{ item.name }}</h3>
                  <p class="tool-description">{{ item.description }}</p>
                  <el-button class="view-btn" type="primary" size="small" round>查看详情</el-button>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :before-close="handleDialogClose"
      @closed="handleDialogClosed"
      class="media-dialog"
      fullscreen
      append-to-body
    >
      <div class="media-content-wrapper">
        <div v-if="currentMedia && currentMedia.type === 'video'" class="video-player-container">
          <video
            ref="videoPlayerRef"
            :src="currentMedia.mediaUrl"
            controls
            autoplay
            preload="auto"
            class="media-video"
          >
            您的浏览器不支持视频播放。
          </video>
        </div>
        <div v-else-if="currentMedia && currentMedia.type === 'image'" class="image-viewer-container">
          <img :src="currentMedia.mediaUrl" alt="虚拟工坊" class="media-image" />
        </div>
        <el-empty v-else description="未找到媒体内容" />
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

:deep(.el-dialog__body) {
    height: calc(100% - 74px) !important; /* 保证弹窗内容区高度 */
}
/* 通用样式 */
.micro-courses-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #fff;
}

.page-title {
  text-align: center;
  color: #fff;
  margin-bottom: 15px;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-description {
  text-align: center;
  color: #b2b4b8;
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.6;
}

/* 工具卡片区域 */
.tool-cards-row {
  justify-content: center; /* 使卡片在行中居中 */
  /* margin-bottom: 40px; */
  background-color: #bb3d63;

}

.el-col {
  display: flex; /* 确保卡片高度一致 */
}

.tool-card {
  width: 100%;
  height: 100%; /* 确保卡片充满列高 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 25px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: none;
  background: linear-gradient(to bottom, #962b4a, #a41b46);
}

.tool-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #409eff; /* Element Plus primary color */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1; /* 内容区占据剩余空间 */
}

.tool-icon {
  color: #fff; /* Element Plus primary color */
  margin-bottom: 20px;
  animation: bounceIn 0.8s ease-out; /* 添加动画 */
}

/* --- Video Group Styling --- */
.video-group {
  margin-bottom: 20px; /* More space between groups */
  border-radius: 12px; /* Rounded corners for group sections */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* Subtle box shadow for depth */
}

.video-group:last-child {
  margin-bottom: 0; /* No bottom margin for the last group */
}

.video-group .title {
  font-size: 1.2rem; /* Larger group titles */
  font-weight: 500; /* Slightly lighter but still strong */
  color: #fff;
  text-align: left; /* Align group titles to the left */
  padding-bottom: var(--spacing-sm);
  padding-left: 52px; /* Indent slightly */
  padding-top: 20px;
  padding-right: 52px; /* Add some right margin for balance */
  background-color: #9d3050;
  border-radius: 12px 12px 0 0;
}

/* --- Imgur-like Grid Style --- */
.imgur-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Slightly wider minimum width for items */
  gap: 20px; /* Increased gap between grid items */
  padding: 20px; /* Padding inside the grid container */
  background-color: #bb3d63;
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: transparent;
  border-radius: 12px; /* Rounded corners for individual grid items */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Subtle box shadow on items */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: auto;
  display: block;
}

.grid-item:hover {
  transform: translateY(-5px); /* Slightly more pronounced hover effect */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); /* Enhanced hover shadow */
}

.grid-item-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.grid-item-thumbnail-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  /* border-radius: 12px; Rounded top corners for thumbnail */
}
.grid-item-thumbnail-wrapper-3 {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  padding-bottom: 56.25%;
  /* border-radius: 12px; Rounded top corners for thumbnail */
}

.group2 {
  padding-bottom: 178%;
}

.grid-item-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area */
  display: block;
  transition: opacity 0.3s ease;
}

.grid-item:hover .grid-item-thumbnail {
  opacity: 0.8; /* Slightly less dimming on hover, keeps some vibrancy */
}

.grid-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Slightly lighter overlay */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align title and other content to the bottom */
  align-items: flex-start; /* Align title and other content to the left */
  opacity: 0; /* Hidden by default */
  transition: opacity 0.3s ease;
  color: white;
  padding: var(--spacing-md); /* More padding for overlay text */
  box-sizing: border-box;
}

.grid-item:hover .grid-item-overlay {
  opacity: 1; /* Overlay appears on hover */
}

.grid-item-title {
  font-family: var(--font-heading);
  font-size: 1.4rem; /* Slightly larger title in overlay */
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6); /* Stronger text shadow for readability */
  color: white;
  font-weight: 500; /* Slightly lighter font weight for a modern look */
  text-align: left;
}

/* Icon bounce animation */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.tool-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 15px;
}

.tool-description {
  font-size: 0.95rem;
  color: #cccdcf;
  line-height: 1.6;
  margin-bottom: 25px;
  flex-grow: 1; /* 描述占据剩余空间 */
}

/* 媒体弹窗样式 */
.media-dialog :deep(.el-dialog__header) {
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
}

.media-dialog :deep(.el-dialog__body) {
  /* padding: 20px 25px; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* 保证弹窗内容区有最小高度 */
  background-color: #f0f2f5;
}

.media-content-wrapper {
  width: 100%;
  max-width: 900px; /* 限制媒体内容最大宽度 */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player-container,
.image-viewer-container {
  width: 100%;
  text-align: center; /* 居中图片或视频 */
}

.media-video {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: black; /* 视频区域背景 */
  max-width: 95%; /* 限制最大宽度，留一点边距 */
  max-height: 95%; /* 限制最大高度，留一点边距 */
  width: auto; /* 保持宽高比 */
  height: auto; /* 保持宽高比 */
  object-fit: contain; /* 确保媒体内容在容器内完整显示，不被裁剪 */
}

.media-image {
  display: block; /* 移除图片底部空白 */
  margin: 0 auto; /* 居中图片 */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 95%; /* 限制最大宽度，留一点边距 */
  max-height: 95%; /* 限制最大高度，留一点边距 */
  width: auto; /* 保持宽高比 */
  height: auto; /* 保持宽高比 */
  object-fit: contain; /* 确保媒体内容在容器内完整显示，不被裁剪 */
}

.media-dialog .el-empty {
    padding: 50px 0;
}

.view-btn {
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}
</style>