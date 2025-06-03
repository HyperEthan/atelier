<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import {
  ElButton, ElForm, ElFormItem, ElSelect, ElOption, ElRadioGroup, ElRadio,
  ElSlider, ElInput, ElUpload, ElIcon, ElMessage, ElImage, ElEmpty, ElLoading
} from 'element-plus';
import { UploadFilled, Picture, MagicStick, Switch } from '@element-plus/icons-vue';

const props = defineProps({
  selectedScene: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const emit = defineEmits(['close']);

// --- 场景模拟参数 ---
const simulationParams = ref({
  season: 'spring',
  timeOfDay: 'day',
  locationType: 'indoor', // 默认是室内，但可根据场景改变
  venue: '', // 根据实际场景选择
  lightTone: 'natural',
  lightPower: 70, // 0-100
  lightDirection: 'front',
  weatherEffect: 'sunny',
  filterStyle: 'none'
});

// 动态设置场地选项，根据当前选中的场景
const venueOptions = computed(() => {
  if (!props.selectedScene) return [];
  // 根据场景ID或名称提供不同的场地选项
  switch (props.selectedScene.id) {
    case 'scene-001': return [{ label: '客厅', value: 'living_room' }, { label: '餐厅', value: 'dining_room' }];
    case 'scene-002': return [{ label: '主卧', value: 'master_bedroom' }, { label: '客卧', value: 'guest_bedroom' }];
    case 'scene-003': return [{ label: '独立办公室', value: 'private_office' }, { label: '开放工位', value: 'open_workspace' }];
    case 'scene-004': return [{ label: '庭院', value: 'courtyard' }, { label: '湖畔', value: 'lakeside' }, { label: '山顶', value: 'mountain_top' }];
    case 'scene-005': return [{ label: '阅览室', value: 'reading_room' }, { label: '书店', value: 'bookstore' }];
    case 'scene-006': return [{ label: '霓虹街头', value: 'neon_street' }, { label: '高楼天台', value: 'rooftop' }];
    default: return [{ label: '默认场地', value: 'default' }];
  }
});

// 重置场地选择，以匹配新场景的默认值
watch(() => props.selectedScene, (newScene) => {
    if (newScene) {
        // 尝试匹配新的场地列表中的第一个，如果旧的值不在新列表中
        if (!venueOptions.value.some(opt => opt.value === simulationParams.value.venue)) {
            simulationParams.value.venue = venueOptions.value[0]?.value || '';
        }
        // 根据场景ID设置默认的室内/室外
        if (['scene-001', 'scene-002', 'scene-003', 'scene-005'].includes(newScene.id)) {
            simulationParams.value.locationType = 'indoor';
        } else if (['scene-004', 'scene-006'].includes(newScene.id)) {
            simulationParams.value.locationType = 'outdoor';
        }
    }
}, { immediate: true });

// --- 人物图像上传 ---
const userPhotoUrl = ref('');
const uploadedFile = ref(null); // 存储 File 对象，以便在模拟时使用

const handleAvatarSuccess = (response, uploadFile) => {
  if (userPhotoUrl.value) { // 如果之前有图片，先撤销旧的 URL
    URL.revokeObjectURL(userPhotoUrl.value);
  }
  userPhotoUrl.value = URL.createObjectURL(uploadFile.raw);
  uploadedFile.value = uploadFile.raw; // 保存原始文件
  ElMessage.success('人物照片上传成功！');
};

const beforeAvatarUpload = (rawFile) => {
  const isJPGPNG = rawFile.type === 'image/jpeg' || rawFile.type === 'image/png';
  const isLt2M = rawFile.size / 1024 / 1024 < 2;

  if (!isJPGPNG) {
    ElMessage.error('上传人物图片只能是 JPG 或 PNG 格式!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传人物图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// --- 模拟效果图 ---
const simulatedResultUrl = ref('');
const isSimulating = ref(false);

const simulateEffect = () => {
  if (!userPhotoUrl.value) {
    ElMessage.warning('请先上传人物图像！');
    return;
  }

  isSimulating.value = true;
  simulatedResultUrl.value = ''; // 清空旧结果
  ElMessage.info('正在生成模拟效果图...');

  // 模拟耗时操作，例如5秒
  setTimeout(() => {
    // 实际项目中，这里会调用后端API，根据参数生成真实图片
    // 这里我们简单地根据参数生成一个模拟URL
    const paramsHash = btoa(JSON.stringify({ ...simulationParams.value, sceneId: props.selectedScene.id }));
    simulatedResultUrl.value = `https://via.placeholder.com/800x600/2196F3/FFFFFF?text=模拟效果图+ID${paramsHash.substring(0,6)}`;
    isSimulating.value = false;
    ElMessage.success('模拟效果图生成成功！');
  }, 5000);
};

// 清理 URL.createObjectURL 创建的临时 URL，防止内存泄漏
onUnmounted(() => {
  if (userPhotoUrl.value) {
    URL.revokeObjectURL(userPhotoUrl.value);
  }
});
</script>

<template>
  <div class="scene-experience-content">
    <div class="control-panel">
      <div class="upload-area">
        <h3>上传人物图像</h3>
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="() => {}"
          :disabled="isSimulating"
        >
          <img v-if="userPhotoUrl" :src="userPhotoUrl" class="uploaded-avatar" alt="人物照片预览" />
          <el-icon v-else class="avatar-uploader-icon"><UploadFilled /></el-icon>
          <div v-if="!userPhotoUrl" class="upload-tip">点击或拖拽上传人物图片</div>
        </el-upload>
        <p class="upload-requirements">支持JPG/PNG格式，小于2MB</p>
      </div>

      <el-form :model="simulationParams" label-position="top" class="params-form">
        <h3>场景模拟参数</h3>

        <el-form-item label="当前场景">
          <el-input :model-value="props.selectedScene?.name" disabled></el-input>
        </el-form-item>

        <el-form-item label="季节">
          <el-select v-model="simulationParams.season" placeholder="选择季节" :disabled="isSimulating">
            <el-option label="春季 (Spring)" value="spring"></el-option>
            <el-option label="夏季 (Summer)" value="summer"></el-option>
            <el-option label="秋季 (Autumn)" value="autumn"></el-option>
            <el-option label="冬季 (Winter)" value="winter"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间段">
          <el-radio-group v-model="simulationParams.timeOfDay" :disabled="isSimulating">
            <el-radio value="day">白天</el-radio>
            <el-radio value="dusk">黄昏</el-radio>
            <el-radio value="night">夜晚</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="室内/室外">
          <el-radio-group v-model="simulationParams.locationType" :disabled="isSimulating">
            <el-radio value="indoor">室内</el-radio>
            <el-radio value="outdoor">室外</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="场地选择">
          <el-select v-model="simulationParams.venue" placeholder="选择具体场地" :disabled="isSimulating">
            <el-option
              v-for="option in venueOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="灯光色调">
          <el-select v-model="simulationParams.lightTone" placeholder="选择灯光色调" :disabled="isSimulating">
            <el-option label="暖黄 (Warm Yellow)" value="warm"></el-option>
            <el-option label="自然白 (Natural White)" value="natural"></el-option>
            <el-option label="冷白 (Cool White)" value="cool"></el-option>
            <el-option label="氛围蓝 (Ambient Blue)" value="blue"></el-option>
            <el-option label="浪漫粉 (Romantic Pink)" value="pink"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="灯光功率 (%)">
          <el-slider v-model="simulationParams.lightPower" :min="0" :max="100" show-input :disabled="isSimulating"></el-slider>
        </el-form-item>

        <el-form-item label="光线方向">
          <el-select v-model="simulationParams.lightDirection" placeholder="选择光线方向" :disabled="isSimulating">
            <el-option label="前侧光 (Front)" value="front"></el-option>
            <el-option label="逆光 (Backlight)" value="backlight"></el-option>
            <el-option label="顶光 (Top)" value="top"></el-option>
            <el-option label="侧光 (Side)" value="side"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="天气效果">
          <el-select v-model="simulationParams.weatherEffect" placeholder="选择天气效果" :disabled="isSimulating">
            <el-option label="晴朗" value="sunny"></el-option>
            <el-option label="多云" value="cloudy"></el-option>
            <el-option label="雨天" value="rainy"></el-option>
            <el-option label="雾气" value="foggy"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="滤镜/风格">
          <el-select v-model="simulationParams.filterStyle" placeholder="选择滤镜风格" :disabled="isSimulating">
            <el-option label="无" value="none"></el-option>
            <el-option label="复古" value="vintage"></el-option>
            <el-option label="黑白" value="black_white"></el-option>
            <el-option label="清新" value="fresh"></el-option>
            <el-option label="赛博朋克" value="cyberpunk"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-button
        type="success"
        :icon="MagicStick"
        :loading="isSimulating"
        :disabled="!userPhotoUrl || isSimulating"
        @click="simulateEffect"
        class="simulate-button"
      >
        {{ isSimulating ? '模拟中...' : '生成模拟效果图' }}
      </el-button>
    </div>

    <div class="result-display-panel">
      <div class="current-scene-preview">
        <h3>当前选择场景</h3>
        <el-image
          :src="props.selectedScene?.background"
          :alt="props.selectedScene?.name"
          fit="cover"
          class="selected-scene-background"
        >
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
              <span>场景图加载失败</span>
            </div>
          </template>
        </el-image>
      </div>

      <div class="simulated-result-area">
        <h3>模拟效果图</h3>
        <div class="simulated-image-wrapper">
          <el-image
            v-if="simulatedResultUrl"
            :src="simulatedResultUrl"
            :preview-src-list="[simulatedResultUrl]"
            :initial-index="0"
            fit="contain"
            class="simulated-effect-image"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><Picture /></el-icon>
                <span>效果图加载失败</span>
              </div>
            </template>
            <template #placeholder>
              <div v-loading="true" class="image-slot loading-slot"></div>
            </template>
          </el-image>
          <el-empty v-else description="模拟效果图将在此显示" :image-size="80"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene-experience-content {
  display: flex;
  height: 100%; /* 填充父容器高度 */
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden; /* 确保内部滚动 */
}

/* 左侧控制面板 */
.control-panel {
  flex: 0 0 350px; /* 固定宽度 */
  background-color: #f7f9fb;
  padding: 25px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #eee;
  overflow-y: auto; /* 允许滚动 */
  box-shadow: inset -2px 0 5px rgba(0, 0, 0, 0.03);
}

.control-panel h3 {
  font-size: 1.4rem;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
.control-panel h3::after {
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

.upload-area {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #e0e0e0;
}

.avatar-uploader {
  width: 150px; /* 调整上传区域大小 */
  height: 150px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  margin: 0 auto 10px; /* 居中显示 */
}

:deep(.el-upload) {
    width: 100%;
    height: 100%;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 40px;
  color: #8c939d;
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
  bottom: 5px;
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  color: #909399;
}
.upload-requirements {
  font-size: 0.8em;
  color: #909399;
  text-align: center;
}

.params-form {
  flex-grow: 1; /* 占据剩余空间 */
  width: 100%;
  margin-top: 10px;
}
.params-form .el-form-item {
  margin-bottom: 18px;
}
.params-form .el-select,
.params-form .el-input {
  width: 100%;
}
.params-form .el-radio-group {
    display: flex; /* 让单选按钮一行显示 */
    gap: 10px;
    flex-wrap: wrap;
}

.simulate-button {
  width: 90%;
  margin-top: 25px;
  padding: 12px 0;
  font-size: 1.1rem;
  align-self: center; /* 按钮在自身flex容器中居中 */
}

/* 右侧效果展示区 */
.result-display-panel {
  flex: 1; /* 占据剩余所有空间 */
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: #ffffff;
  position: relative;
  overflow-y: auto; /* 允许滚动 */
}

.result-display-panel h3 {
  font-size: 1.4rem;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}
.result-display-panel h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #409eff; /* 蓝色下划线 */
    border-radius: 2px;
}

.current-scene-preview {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #e0e0e0;
}
.selected-scene-background {
  width: 100%;
  height: 250px; /* 固定高度，确保预览区大小 */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.simulated-result-area {
  flex-grow: 1; /* 占据剩余高度 */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.simulated-image-wrapper {
  width: 100%;
  flex-grow: 1; /* 占据尽可能多的空间 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  min-height: 200px; /* 最小高度，避免太小 */
}

.simulated-effect-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: zoom-in;
}

/* 统一的图片加载/错误插槽样式 */
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

/* ElEmpty 样式调整，使其在容器内居中且不占太多空间 */
.simulated-image-wrapper .el-empty {
    position: relative; /* 保持流式布局，但可以微调 */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
}
.simulated-image-wrapper .el-empty__description {
    margin-top: 10px;
    font-size: 0.9em;
}
.simulated-image-wrapper .el-empty__image {
    width: 80px; /* 调整图标大小 */
}

/* 响应式调整 for dialog */
@media (max-width: 992px) {
  .scene-experience-content {
    flex-direction: column; /* 小屏幕下垂直排列 */
    overflow-y: auto; /* 允许整个内容区滚动 */
  }
  .control-panel {
    flex: none; /* 取消固定宽度 */
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee; /* 添加底部边框 */
    box-shadow: none;
  }
  .result-display-panel {
    flex: none;
    width: 100%;
    min-height: 400px; /* 小屏幕下确保有足够高度显示效果 */
  }
  .simulated-image-wrapper {
      min-height: 300px; /* 确保小屏幕下效果图有足够空间 */
  }
}
</style>