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
</script>

<template>
  <div class="scene-experience-content">
    <iframe
        :src="selectedScene.background"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-iframe"
    ></iframe>
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

.video-iframe {
  position: absolute;
  top: 58;
  left: 0;
  width: 100%;
  height: calc(100vh - 58px); /* 减去对话框标题和底部的高度 */
  border: none;
}
</style>