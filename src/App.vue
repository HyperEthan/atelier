<script setup>
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
// 全局消息提示示例
const showSuccessMessage = (msg) => {
  ElMessage({
    message: msg,
    type: 'success',
    duration: 3000,
    showClose: true,
  })
}

// 可以在这里提供一些全局状态或方法给子组件 (使用 provide/inject 或 Pinia)
</script>

<template>
  <div id="app-wrapper">
    <MainHeader />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style>
/* 可以在这里导入你的全局CSS，或者在 main.js 中导入 */
@import './assets/main.css';

#app-wrapper {
  display: flex;
  min-height: 100vh; /* 确保页脚在底部 */
}

/* 内容区域样式 */
.content-wrapper {
  flex: 1;
  margin-left: 250px; /* 与侧边栏宽度相同 */
  min-height: 100vh;
  background-color: #e9e9e9;
}

main {
  flex: 1; /* 让 main 内容区域填充剩余空间 */
}

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  padding-right: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-dropdown-link:focus-visible {
  outline: none;
}

.username {
  font-size: 14px;
  color: #333;
}
</style>
