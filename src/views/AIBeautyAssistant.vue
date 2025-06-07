<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { ElButton, ElUpload, ElIcon, ElMessage, ElLoading } from 'element-plus';
import {
  Microphone, UploadFilled, MagicStick, VideoCamera, Close, VideoPlay // 常用图标
} from '@element-plus/icons-vue';
import staticImage from '@/assets/images/zhuangbao.jpg'; // 静态妆宝图片
import animatedImage from '@/assets/images/zhuangbao.gif'; // 静态妆宝图片

// 导入语音
import voice0 from '@/assets/voice/voice0.mp3'; // 欢迎语音
import voice1 from '@/assets/voice/voice1.mp3'; // 分析结果语音
import voice2 from '@/assets/voice/voice2.mp3'; // 语音提示
import zhuangrong1 from '@/assets/images/zhuangrong1.jpg'; // 妆容分析语音

// --- 妆宝形象状态 ---
const beautyAssistantImage = ref(''); // 当前展示的妆宝图片/GIF URL
const isListening = ref(false); // 妆宝是否正在聆听
const isSpeaking = ref(false); // 妆宝是否正在说话
const isAnalyzing = ref(false); // 妆宝是否正在分析

// 妆宝的静态形象和动画形象
// const staticImage = 'https://via.placeholder.com/400x400/9e9e9e/ffffff?text=AI数字人妆宝(静止)';
// 模拟动画GIF，实际项目中替换为您的动画GIF URL
// const animatedImage = 'https://i.giphy.com/media/v1.gif/media/l0IxYD9j1fX0oD0X4k/giphy.gif'; // 示例GIF
// 或者更小的示例：'https://i.giphy.com/media/v1.gif/media/xT0xeQ89X1WzX8yP60/giphy.gif'

// 计算属性：根据状态选择显示哪个图片
const currentBeautyAssistantImage = computed(() => {
  if (isListening.value || isAnalyzing.value || isSpeaking.value) {
    return animatedImage;
  }
  return staticImage;
});

// --- 语音播放状态 (模拟) ---
const speechDuration = ref(3000); // 模拟语音持续时间 (毫秒)
let speechTimeout = null; // 用于清除语音计时器

// 播放语音
const playSpeech = (audio) => {
  if (isSpeaking.value) return; // 避免重复播放

  isSpeaking.value = true;
//   ElMessage.info(message); // 模拟语音提示
  audio.muted = true
  audio.play().then(() => {
    audio.muted = false; // 播放前先静音，播放后取消静音
  }).catch(err => {
    console.error('播放失败', err)
  }).finally(() => {
    isSpeaking.value = false; // 播放结束后重置状态
  });

//   speechTimeout = setTimeout(() => {
//     isSpeaking.value = false;
//     ElMessage.success('语音播报结束。');
//   }, duration);
};
const count = ref(0); // 计数器，用于模拟语音播放次数
const listening = () => {
    isListening.value = !isListening.value; // 切换聆听状态
    if (!isListening.value) {
      userUploadedPhotoUrl.value = zhuangrong1; // 停止聆听时清空上传的图片
      if(count.value < 1) {
        count.value++;
        ElMessage.success('图片上传成功，妆宝即将为您分析！');
        // 立即开始分析
        startAnalysis(
          "好的请稍等，根据图片分析，您的线条存在抖动和弧度不均匀的问题。建议您加强握笔练习的方法，可以尝试分段描画。推荐您使用醒图、PS、天生会画等软件。",
          voice1
        );
      } else {
        startAnalysis(
            "1. 打开天生会画软件，导入图片后选择液化工具，调整面部至对称。<br />2. 新建图层，选铅笔笔刷，用吸管取眼线颜色，沿线条柔和描绘。<br />3. 再新建图层，吸眼周妆容色，按妆容形状重复描边加重色彩，锁定图层透明度后微调颜色。<br />4. 新建图层吸嘴唇周围颜色，用铅笔轻涂唇峰尖锐处使其柔和。<br />5. 缩小图片查看整体效果，确认后保存图片。",
            voice2
        );
      }
    }
}

// --- 图片上传状态 ---
const userUploadedPhotoUrl = ref(''); // 用户上传的图片预览URL
const analysisResult = ref(''); // 分析结果文本
const showAnalysisResult = ref(false); // 是否显示分析结果区
const analysisDuration = ref(5000); // 模拟分析持续时间 (毫秒)

// 上传文件成功后的回调
const handleUploadSuccess = (uploadFile) => {
  userUploadedPhotoUrl.value = URL.createObjectURL(uploadFile.raw);
  // ElMessage.success('图片上传成功，妆宝即将为您分析！');
  // // 立即开始分析
  // startAnalysis(
  //   "好的请稍等，根据图片分析，您的线条存在抖动和弧度不均匀的问题。建议您加强握笔练习的方法，可以尝试分段描画。推荐您使用醒图、PS、画世界等软件。",
  //   voice1
  // );
};

// 上传前的校验
const beforeUpload = (rawFile) => {
  const isJPGPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';
  const isLt5M = rawFile.size / 1024 / 1024 < 5;

  if (!isJPGPNG) {
    ElMessage.error('只能上传 JPG 或 PNG 格式的图片!');
    return false;
  }
  // if (!isLt5M) {
  //   ElMessage.error('图片大小不能超过 5MB!');
  //   return false;
  // }
  return true;
};

// 模拟分析过程
const startAnalysis = (description, voice) => {
  isAnalyzing.value = true;
  showAnalysisResult.value = false; // 清空旧结果
  analysisResult.value = '';

  ElMessage.info('妆宝正在努力分析中，请稍候...');

  setTimeout(() => {
    isAnalyzing.value = false;
    // 模拟分析结果
    analysisResult.value = description;
    showAnalysisResult.value = true;

    // 分析完成后，语音播报结果
    const audio = new Audio(voice);
    playSpeech(audio);

  }, analysisDuration.value);
};

// 清理 URL.createObjectURL 创建的临时 URL，防止内存泄漏
onUnmounted(() => {
  if (userUploadedPhotoUrl.value) {
    URL.revokeObjectURL(userUploadedPhotoUrl.value);
  }
  if (speechTimeout) {
    clearTimeout(speechTimeout);
  }
});

// 初始化：默认播放一句欢迎语
onMounted(() => {
    const audio = new Audio(voice0);
    playSpeech(audio);
});

</script>

<template>
  <div class="ai-beauty-assistant-container">
    <h1 class="page-title">AI虚拟妆容设计</h1>
    <p class="page-description">
      我是您的专属AI数字人妆宝，上传您的照片，我将为您提供个性化妆容分析和建议！
    </p>

    <div class="main-content-area">
      <div class="beauty-assistant-panel">
        <div class="beauty-assistant-image-wrapper">
          <img
            :src="currentBeautyAssistantImage"
            alt="AI数字人妆宝"
            class="beauty-assistant-image"
          />
          <div v-if="isListening" class="speaking-indicator">
            <span class="dot dot-1"></span>
            <span class="dot dot-2"></span>
            <span class="dot dot-3"></span>
            <span class="speech-text">妆宝正在聆听...</span>
          </div>
          <div v-if="isAnalyzing" class="analyzing-indicator">
              <el-icon class="is-loading"><MagicStick /></el-icon>
              <span>妆宝正在思考...</span>
          </div>
        </div>

        <el-button
          type="primary"
          :icon="isListening ? VideoPlay : Microphone"
          circle
          size="large"
          @click="listening()"
          :disabled="isSpeaking || isAnalyzing"
          class="speech-button"
        ></el-button>
        <span class="button-tip">点击对妆宝说话</span>
      </div>

      <div class="interaction-panel">
        <h2>上传您的照片</h2>
        <el-upload
          class="avatar-uploader"
          action="#" :show-file-list="false"
          :on-change="handleUploadSuccess"
          :before-upload="beforeUpload"
          :disabled="isAnalyzing || isSpeaking"
          :auto-upload="false"
        >
          <img v-if="userUploadedPhotoUrl" :src="userUploadedPhotoUrl" class="uploaded-avatar" alt="上传照片预览" />
          <el-icon v-else class="avatar-uploader-icon"><UploadFilled /></el-icon>
          <div v-if="!userUploadedPhotoUrl" class="upload-tip">点击或拖拽上传图片</div>
        </el-upload>
        <p class="upload-requirements">支持JPG/PNG格式</p>

        <el-button
          type="success"
          :icon="MagicStick"
          :loading="isAnalyzing"
          :disabled="!userUploadedPhotoUrl || isAnalyzing || isSpeaking"
          @click="startAnalysis"
          class="analyze-button"
        >
          {{ isAnalyzing ? '分析中...' : '开始分析照片' }}
        </el-button>

        <div v-if="showAnalysisResult" class="analysis-result-box">
          <h2>分析结果</h2>
          <div class="result-content" v-html="analysisResult"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-beauty-assistant-container {
  max-width: 1400px;
  margin: 40px 20px;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #fff;
  text-align: center;
  min-height: calc(100vh - 80px); /* 假设顶部有导航栏，使其不被遮挡 */
  display: flex;
  flex-direction: column;
  align-items: center;
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

.main-content-area {
  display: flex;
  gap: 40px; /* 左右面板间距 */
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: flex-start; /* 顶部对齐 */
  flex-wrap: wrap; /* 允许换行 */
}

/* 左侧：妆宝形象与语音交互 */
.beauty-assistant-panel {
  flex: 0 0 450px; /* 固定宽度，避免压缩 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  position: relative; /* 用于内部元素的定位 */
  background-color: #b73c62;
}

.beauty-assistant-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px; /* 限制图片最大宽度 */
  height: 400px; /* 固定高度，避免布局跳动 */
  margin-bottom: 30px;
  border-radius: 50%; /* 圆形图片框 */
  overflow: hidden; /* 确保图片在圆形框内 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #e487a3; /* 强调边框 */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.beauty-assistant-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 覆盖整个圆形区域 */
  transition: transform 0.3s ease;
}

.speaking-indicator, .analyzing-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  gap: 5px;
}

/* 语音点点动画 */
.speaking-indicator .dot {
  width: 8px;
  height: 8px;
  background-color: #fff;
  border-radius: 50%;
  animation: speechPulse 1.4s infinite ease-in-out;
}

.speaking-indicator .dot-2 {
  animation-delay: 0.2s;
}

.speaking-indicator .dot-3 {
  animation-delay: 0.4s;
}

@keyframes speechPulse {
  0%, 100% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}

.analyzing-indicator .el-icon {
    margin-right: 5px;
    font-size: 1.2em;
}

.speech-button {
  width: 80px;
  height: 80px;
  font-size: 2em;
  margin-top: 15px;
  transition: all 0.3s ease;
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}
.speech-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background-color: #762239;
  border-color: #762239;
}

.button-tip {
    margin-top: 10px;
    color: #fff;
    font-size: 0.9em;
}


/* 右侧：图片上传与分析结果 */
.interaction-panel {
  flex: 1; /* 占据剩余空间 */
  min-width: 400px; /* 最小宽度 */
  max-width: 600px; /* 最大宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #b73c62;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

h2 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 25px;
  position: relative;
  width: 100%;
  padding-bottom: 10px;
}

.avatar-uploader {
  width: 250px; /* 上传区域大小 */
  height: 250px;
  border: 2px dashed #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin-bottom: 15px;

}
:deep(.el-upload) {
  display: flex;
  height: 100%;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 60px;
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uploaded-avatar {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain; /* 确保图片完整显示 */
  background-color: #f0f2f5;
}
.upload-tip {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 0.9em;
    color: #fff;
}
.upload-requirements {
    font-size: 0.85em;
    color: #fff;
    margin-bottom: 25px;
}

.analyze-button {
  width: 70%;
  padding: 12px 20px;
  font-size: 1.2rem;
  margin-top: 15px;
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}

.analyze-button:hover {
  background-color: #762239;
  border-color: #762239;
}

.analysis-result-box {
  width: 100%;
  margin-top: 30px;
  padding: 20px;
  background-color: #9d3050; /* 淡粉色背景 */
  border-radius: 10px;
  text-align: left;
  border: 1px solid #9d3050;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.05);
}

.analysis-result-box h2 {
    font-size: 1.5rem;
    color: #fff;
    margin-bottom: 15px;
    text-align: left;
    padding-bottom: 0;
}
.analysis-result-box h2::after {
    display: none; /* 移除下划线 */
}

.result-content {
  font-size: 1.05rem;
  color: #fff;
  line-height: 1.8;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .main-content-area {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  .beauty-assistant-panel, .interaction-panel {
    flex: none; /* 取消弹性 */
    width: 95%; /* 占据更多宽度 */
    max-width: 500px; /* 限制最大宽度 */
  }

  .beauty-assistant-image-wrapper {
      width: 300px;
      height: 300px;
  }

  .analyze-button {
      width: 80%;
  }
}
</style>