<script setup>
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
// Element Plus 的 Message 组件可以用于提示，例如表单提交成功
import { ElMessage } from 'element-plus'

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
      <!-- <el-header>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="32" src="/images/avatar.jpg" />
              <span class="username">张雅</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header> -->
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
