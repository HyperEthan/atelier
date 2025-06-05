<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { ElRow, ElCol, ElCard, ElImage, ElEmpty, ElNotification } from 'element-plus';
import { Loading, Picture } from '@element-plus/icons-vue';
import chengguo1 from '@/assets/images/chengguo/1.jpg';
import chengguo2 from '@/assets/images/chengguo/2.jpg';
import chengguo3 from '@/assets/images/chengguo/3.jpg';
import chengguo4 from '@/assets/images/chengguo/4.jpg';
import chengguo5 from '@/assets/images/chengguo/5.jpg';
import chengguo6 from '@/assets/images/chengguo/6.jpg';

// --- 模拟作品数据 ---
const studentWorks = ref([]);
let newWorksCounter = 0; // 用于生成模拟作品的唯一ID

// 备用图片库 (可以增加更多不同风格的图片)
const placeholderImages = [
    chengguo1,
    chengguo2,
    chengguo3,
    chengguo4,
    chengguo5,
    chengguo6
];

// 添加一个随机作品到列表
function addRandomWork(showNotification = true, add = true) {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  const imageUrl = placeholderImages[randomIndex];
  const newWork = {
    id: `work-${Date.now()}-${newWorksCounter++}`,
    src: imageUrl,
    alt: `学生作品 ${newWorksCounter}`,
    author: `学生${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, // 模拟作者
    uploadTime: new Date().toLocaleTimeString(), // 模拟上传时间
    isNew: true // 标记为新作品，用于动画或高亮
  };
  if (add) {
    studentWorks.value.unshift(newWork); // 插入到数组开头
    previewSrcList.value.unshift(newWork.src); // 更新预览列表
  }

  // 保持作品数量在合理范围，移除最旧的
//   const maxWorks = 20; // 页面最多显示20个作品
//   if (studentWorks.value.length > maxWorks) {
//     studentWorks.value.pop();
//   }

  // 短暂移除 isNew 标记，用于动画效果
//   setTimeout(() => {
//     newWork.isNew = false;
//   }, 1000); // 1秒后移除新作品标记

  if (showNotification) {
    ElNotification({
      title: '新作品上传！',
      message: `${newWork.author} 上传了新作品：${newWork.alt}`,
      type: 'success',
      duration: 2000, // 2秒后自动关闭
      position: 'bottom-right'
    });
  }
}

// --- 定时器模拟上传 ---
let uploadInterval = null;
const uploadFrequency = 5000; // 每5秒模拟上传一个新作品

// 计算用于 el-image 预览的图片列表
const previewSrcList = ref([]);
let initInterval = null;
onMounted(() => {
  // Initialize some works
  const initialWorksCount = 6;
  let i = 0
  initInterval = setInterval(() => {
    if (i >= initialWorksCount) {
      clearInterval(initInterval);
    } else {
      const imageUrl = placeholderImages[i];
      const newWork = {
          id: `work-${Date.now()}-${newWorksCounter++}`,
          src: imageUrl,
          alt: `学生作品 ${newWorksCounter}`,
          author: `学生${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, // 模拟作者
          uploadTime: new Date().toLocaleTimeString(), // 模拟上传时间
          isNew: true // 标记为新作品，用于动画或高亮
      };
      studentWorks.value.unshift(newWork); // 插入到数组开头
      previewSrcList.value.unshift(newWork.src); // 更新预览列表
      i++;
    }
  }, 1000);

  // uploadInterval = setInterval(() => {
  //   addRandomWork(true, false); // Set 'add' to 'true' here to actually add the work
  // }, uploadFrequency);
});

onUnmounted(() => {
  if (uploadInterval) {
    clearInterval(uploadInterval);
  }
});

</script>

<template>
  <div class="student-showcase-container">
    <h1 class="page-title">学生作品成果展示</h1>
    <p class="page-description">
      这里展示了同学们最新的创意作品。页面会实时更新，让您感受源源不断的艺术灵感！
    </p>

    <el-row :gutter="30" class="works-grid">
      <el-col
        v-for="(work, index) in studentWorks"
        :key="work.id"
        :span="8"
        class="work-col"
      >
        <el-card :body-style="{ padding: '0px' }" class="work-card" shadow="hover">
          <div class="image-wrapper">
            <el-image
              :src="work.src"
              :alt="work.alt"
              fit="cover"
              class="work-image"
              :preview-src-list="previewSrcList"
              :initial-index="index" >
              <template #error>
                <div class="image-slot">
                  <el-icon><picture /></el-icon>
                  <span>加载失败</span>
                </div>
              </template>
              <template #placeholder>
                <div class="image-slot loading-slot">
                  <el-icon class="is-loading"><Loading /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="work-info">
            <span class="work-title">{{ work.alt }}</span>
            <div class="work-meta">
              <span class="work-author">作者：{{ work.author }}</span>
              <time class="work-time">上传于：{{ work.uploadTime }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-if="studentWorks.length === 0" description="暂无作品，敬请期待！"></el-empty>
  </div>
</template>

<style scoped>
.student-showcase-container {
  padding: 30px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #fff;
  text-align: center;
  min-height: 100vh;
}

.page-title {
  color: #fff;
  margin-bottom: 15px;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-description {
  color: #b2b4b8;
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.6;
}

.works-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-bottom: 30px;
}

.work-col {
  margin-bottom: 30px; /* 列之间的垂直间距 */
  display: flex; /* 确保 ElCard 填充 ElCol */
  justify-content: center;
}

.work-card {
  width: 100%; /* 确保卡片填充列 */
  max-width: 400px; /* 限制卡片最大宽度 */
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border: none;
}


/* 新作品高亮动画 */
.work-card.is-new-work {
  animation: newWorkHighlight 1s ease-out forwards; /* 动画持续1秒后停止 */
}

@keyframes newWorkHighlight {
  0% { transform: scale(0.95); opacity: 0.5; border-color: transparent; }
  50% { transform: scale(1.02); opacity: 1; border-color: #ff9800; }
  100% { transform: scale(1); opacity: 1; border-color: #f0f0f0; } /* 恢复正常边框颜色 */
}

.image-wrapper {
  width: 100%;
  padding-top: 75%; /* 4:3 宽高比 (300/400 = 0.75) */
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex; /* 用于居中加载和错误提示 */
  align-items: center;
  justify-content: center;
}

.work-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片覆盖整个区域 */
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
  margin-right: 5px;
}

.loading-slot {
  font-size: 20px;
}
.loading-slot .el-icon {
  font-size: 2em;
}

.work-info {
  padding: 15px;
  text-align: left;
  background-color: #b73c62;
}

.work-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  display: block;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.work-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  color: #fff;
}

.work-author {
  font-weight: 500;
}

.work-time {
  font-style: italic;
}

/* 响应式布局调整 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .page-description {
    font-size: 0.95rem;
  }
  .work-info {
    padding: 10px;
  }
  .work-title {
    font-size: 1.1rem;
  }
  .work-meta {
    font-size: 0.8em;
  }
}
</style>