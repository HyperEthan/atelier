<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ElButton, ElUpload, ElIcon, ElMessage, ElLoading } from 'element-plus';
import { UploadFilled, MagicStick, Microphone } from '@element-plus/icons-vue';
import ceping_bg from '@/assets/images/ceping/ceping_bg.jpg'; // 替换为您的背景图路径
import aipng from '@/assets/images/ceping/ai.png'; // 替换为您的数字人静态图片路径
import zhuangbao_ai from '@/assets/images/ceping/zhuangbao_ai.gif'; // 替换为您的数字人动画GIF路径
import ceping_people from '@/assets/images/homework/3/hangkong3.jpg'; // 替换为您的数字人静态图片路径

import ceping0 from '@/assets/voice/ceping0.mp3';
import ceping1 from '@/assets/voice/ceping1.mp3';

// --- 页面背景图 ---
const pageBackground = ceping_bg; // 替换为您的背景图URL

// --- 数字人形象状态 ---
const beautyAssistantImage = ref(''); // 当前展示的数字人图片/GIF URL
const staticImage = zhuangbao_ai; // 替换为您的数字人静态图片
const animatedImage = zhuangbao_ai; // 替换为您的数字人动画GIF
// 或者更小的示例：'https://i.giphy.com/media/v1.gif/media/xT0xeQ89X1WzX8yP60/giphy.gif'

const isThinking = ref(false); // 数字人是否正在思考
const isSpeaking = ref(false); // 数字人是否正在语音播报

// 计算属性：根据状态选择显示哪个图片
const currentBeautyAssistantImage = computed(() => {
  if (isThinking.value || isSpeaking.value) {
    return animatedImage;
  }
  return staticImage;
});

const record = ref(0)
// --- 用户图片上传状态 ---
const userUploadedPhotoUrl = ref(''); // 用户上传的图片预览URL

// 上传文件成功后的回调
const handleUpload = (uploadFile) => {
  if (userUploadedPhotoUrl.value) { // 如果之前有图片，先撤销旧的 URL
    URL.revokeObjectURL(userUploadedPhotoUrl.value);
  }
  userUploadedPhotoUrl.value = URL.createObjectURL(uploadFile.raw);
  ElMessage.success('图片上传成功，可以进行测评！');
  assessmentResult.value = ''; // 重新上传图片，清空旧的测评结果
  showAssessmentResult.value = false;
};

// 上传前的校验

// --- 测评功能 ---
const assessmentResult = ref(''); // 测评结果文本
const showAssessmentResult = ref(false); // 是否显示测评结果区

let thinkingTimeout = null;
let speechTimeout = null;
const addPicture = () => {
    userUploadedPhotoUrl.value = ceping_people
}

const startAssessment = () => {
  if (!userUploadedPhotoUrl.value) {
    ElMessage.warning('请先上传图片才能进行测评！');
    return;
  }
  if (isThinking.value || isSpeaking.value) {
    ElMessage.info('当前正在进行测评或播报，请稍候。');
    return;
  }

  if (record.value === 0) {
    record.value = 1; // 开始倾听
    ElMessage.info('AI正在倾听您的描述，请稍候...');
    return;
  }

  if (record.value === 1) {
    record.value = 2; // 开始思考
    isThinking.value = true;
    showAssessmentResult.value = false; // 清空旧结果
    assessmentResult.value = '';
    ElMessage.info('AI正在为您分析妆容，请稍候...');
  
    // 模拟思考过程
    thinkingTimeout = setTimeout(() => {
      isThinking.value = false;
  
      // 模拟测评结果
      const result = `
        亲爱的用户，妆宝为您带来了详细的妆容测评！测评结果如下：
        <br>右侧眉尾弧度偏差两度，建议调整
        <br>颅顶过高，超过发际线到颅顶的距离，建议调整
      `;
      assessmentResult.value = result;
      showAssessmentResult.value = true;
  
      // 思考结束后，开始语音播报结果
      playAssessmentSpeech('妆容分析完成！根据您的图片，妆宝已为您提供详细的妆容测评报告。', ceping1);
        record.value = 0; // 更新状态为播报结果
  
    }, 5000); // 模拟思考 5 秒
  }
};

// 语音播报测评结果
const playAssessmentSpeech = (message, voice) => {
  if (isSpeaking.value) return;

  isSpeaking.value = true;
  ElMessage.info(message); // 模拟语音提示
  const audio = new Audio(voice);
  audio.muted = true
  audio.play().then(() => {
    audio.muted = false; // 播放前先静音，播放后取消静音
  }).catch(err => {
    console.error('播放失败', err)
  }).finally(() => {
    isSpeaking.value = false; // 播放结束后重置状态
  });
};
const gridContainer = ref(null)
const rows = 20
const cols = 20
const totalCells = rows * cols
const flashRate = 0.1 // 每次闪烁 20% 单元格
// --- 生命周期钩子 ---
onMounted(() => {
  // 页面加载时数字人播报欢迎语
  playAssessmentSpeech('欢迎来到智能妆容测评！请上传您的美妆照片，点击测评按钮，我将为您提供专业的AI妆容分析！', ceping0);
  const grid = gridContainer.value
  const cells = []

  // 生成网格
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div')
    cell.className = 'grid-cell'
    grid.appendChild(cell)
    cells.push(cell)
  }

  // 随机闪烁逻辑
  setInterval(() => {
    // 先清除所有闪烁
    cells.forEach(cell => cell.classList.remove('flashing'))

    // 随机抽取若干个 cell 添加闪烁
    const flashCount = Math.floor(totalCells * flashRate)
    const indices = new Set()

    while (indices.size < flashCount) {
      indices.add(Math.floor(Math.random() * totalCells))
    }

    indices.forEach(i => {
      cells[i].classList.add('flashing')
    })
  }, 800)
});

onUnmounted(() => {
  if (userUploadedPhotoUrl.value) {
    URL.revokeObjectURL(userUploadedPhotoUrl.value);
  }
  clearTimeout(thinkingTimeout);
  clearTimeout(speechTimeout);
});
</script>

<template>
  <div class="makeup-assessment-container" :style="{ backgroundImage: 'url(' + pageBackground + ')' }">
    <div class="assign_content">
      <h1 class="page-title">智能妆容测评</h1>

      <div class="main-assessment-area">
        <el-row :gutter="0" justify="center">
            <el-col :span="8">
              <div class="ai-avatar-panel">
                <div class="beauty-assistant-image-wrapper">
                  <img
                    :src="currentBeautyAssistantImage"
                    alt="AI数字人形象"
                    class="beauty-assistant-image"
                  />
                  <div v-if="isThinking" class="status-indicator thinking-indicator">
                      <el-icon class="is-loading"><MagicStick /></el-icon>
                      <span>AI正在思考中...</span>
                  </div>
                  <!-- <div v-if="isSpeaking" class="status-indicator speaking-indicator">
                    <span class="dot dot-1"></span>
                    <span class="dot dot-2"></span>
                    <span class="dot dot-3"></span>
                    <span>AI正在播报...</span>
                  </div> -->
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="right-panel">
                  <div class="upload-assessment-panel">
                      <div class="upload-area">
                        <h2>上传您的妆容照片</h2>
                        <el-upload
                          class="avatar-uploader"
                          action="#"
                          :show-file-list="false"
                          :on-change="handleUpload"
                          :http-request="() => {}"
                          :disabled="isThinking || isSpeaking"
                        >
                          <img v-if="userUploadedPhotoUrl" :src="userUploadedPhotoUrl" class="uploaded-avatar" alt="妆容照片预览" />
                          <el-icon v-else class="avatar-uploader-icon"><UploadFilled /></el-icon>
                          <div v-if="!userUploadedPhotoUrl" class="upload-tip">点击或拖拽上传照片</div>
                          <div v-show="userUploadedPhotoUrl && isThinking" class="grid-container" ref="gridContainer"></div>
                          <div v-show="userUploadedPhotoUrl && isThinking" class="scan-line"></div>
                        </el-upload>
                        <p class="upload-requirements" @click="addPicture">支持JPG和PNG格式</p>
                      </div>
            
                      <el-button
                        type="primary"
                        :icon="Microphone"
                        :loading="isThinking"
                        :disabled="!userUploadedPhotoUrl || isThinking || isSpeaking"
                        @click="startAssessment"
                        class="assessment-button"
                      >
                        {{ record === 2 && isThinking ? 'AI分析中...' : record === 1 ? '正在倾听...' : '开始妆容测评' }}
                      </el-button>
            
                    </div>
                  </div>
                </el-col>
                <el-col v-if="showAssessmentResult" :span="8">
                  <div class="assessment-result-box">
                      <h2>测评报告</h2>
                      <div class="result-content" v-html="assessmentResult"></div>
                  </div>
            </el-col>
        </el-row>

    </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.scan-area) {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
  border: 1px solid #0ff;
}

/* 扫描线动画 */
:deep(.scan-line) {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to bottom, transparent, #0ff, transparent);
  animation: scan-line 3s ease-in-out infinite;
  z-index: 3;
}
@keyframes scan-line {
  0% { top: 0%; }
  50% { top: 100%; }
  100% { top: 0%; }
}

/* 网格区域 */
.grid-container {
  position: absolute;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  z-index: 1;
}

:deep(.grid-cell) {
  /* border: 1px solid rgba(0, 255, 255, 0.05); */
  background-color: rgba(51, 156, 156, 0.313);
  transition: background-color 0.3s ease;
}

/* 闪烁时的样式 */
:deep(.grid-cell.flashing) {
  background-color: rgba(0, 255, 255, 0.441);
  border-color: rgba(0, 255, 255, 0.461);
  box-shadow: 0 0 5px 5px rgba(0, 255, 255, 0.2);
}


.makeup-assessment-container {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* 背景图固定，内容滚动 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.assign_content {
  background-color: transparent; /* 半透明白色背景 */
  width: 100%;
  text-align: center;
  height: 90vh;
}

.page-title {
  color: #fff; /* 深粉色 */
  margin-bottom: 30px;
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}


/* 左侧：数字人面板 */
.ai-avatar-panel {
  flex: 0 0 450px; /* 固定宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
}

.beauty-assistant-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  margin-bottom: 20px;
  background-color: transparent;
  border-radius: 50%; /* 圆形图片框 */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.beauty-assistant-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

/* 状态指示器 */
.status-indicator {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  font-size: 1em;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.thinking-indicator {
    background-color: #ff9800; /* 橙色 */
}
.thinking-indicator .el-icon {
    animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.speaking-indicator {
    background-color: #4CAF50; /* 绿色 */
}
.speaking-indicator .dot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  animation: speechPulse 1.4s infinite ease-in-out;
}
.speaking-indicator .dot-2 { animation-delay: 0.2s; }
.speaking-indicator .dot-3 { animation-delay: 0.4s; }
@keyframes speechPulse {
  0%, 100% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}


/* 右侧：上传和测评面板 */
.right-panel {
    display: flex;
    flex-direction: row;
}

.upload-assessment-panel {
  flex: 1;
  max-width: 400px; /* 最大宽度 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: transparent;
}

.upload-area {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 12px;
  width: 100%;
}
.upload-area h2 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 10px;
}
:deep(.el-upload) {
    height: 100%;
}

:deep(.avatar-uploader-icon) {
    color: #fff;
}

.avatar-uploader {
    width: 350px;
    height: 400px;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto 15px;
    background-color: #acaeba40;
}

.avatar-uploader-icon {
  font-size: 70px;
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
  object-fit: contain;
  background-color: #f0f2f5;
}
.upload-tip {
    position: absolute;
    bottom: 15px;
    width: 100%;
    text-align: center;
    font-size: 0.9em;
    color: #fff;
}
.upload-requirements {
    font-size: 0.85em;
    color: #ffffff;
    margin-bottom: 10px;
    text-align: center;
}

.assessment-button {
  height: 48px !important;
  font-size: 18px;
  line-height: 48px;
  margin-bottom: 30px;
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}

.assessment-button:hover {
  background-color: #762239;
  border-color: #762239;
}

.assessment-result-box {
  width: 90%;
  height: max-content;
  padding: 20px;
  background-color: transparent; /* 淡粉色背景 */
  margin-top: 110px;
  border-radius: 15px;
  text-align: left;
  border: 1px solid #12e6ea;
  box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.05);
}

.assessment-result-box h2 {
    font-size: 1.8rem;
    color: #fff;
    margin-bottom: 20px;
    text-align: left;
    position: relative;
    padding-bottom: 10px;
}

.result-content {
  font-size: 22px;
  color: #fff;
  line-height: 1.6;
}

/* 响应式调整 */
@media (max-width: 1366px) {
  .main-assessment-area {
    flex-direction: row;
    align-items: center;
  }

  .avatar-uploader {
        width: 200px;
        height: 250px;
        border-radius: 15px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 0 auto 15px;
        background-color: #acaeba40;
    }
    .assessment-result-box {
        width: 230px;
        height: max-content;
        padding: 20px;
        background-color: transparent;
        margin-top: 110px;
        border-radius: 15px;
        text-align: left;
        border: 1px solid #12e6ea;
        box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.05);
    }
}

@media (max-width: 992px) {
  .main-assessment-area {
    flex-direction: row;
    align-items: center;
  }
  .ai-avatar-panel, .upload-assessment-panel {
    max-width: 300px; /* 限制最大宽度 */
  }

  .page-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .avatar-uploader {
    width: 220px;
    height: 220px;
  }
  .assessment-button {
    font-size: 1.2rem;
    padding: 12px 20px;
  }
  .assessment-result-box {
    padding: 20px;
  }
  .assessment-result-box h2 {
    font-size: 1.5rem;
  }
  .result-content {
    font-size: 1rem;
  }
  .beauty-assistant-image-wrapper {
      width: 300px;
      height: 300px;
  }
}
</style>