<script setup>
import { ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';
import HomeworkSubmission from '@/components/HomeworkSubmission.vue';
import ExamsAndGrades from '@/components/ExamsAndGrades.vue';

const activeTab = ref('homework'); // 默认激活作业提交模块
</script>

<template>
  <div class="learning-management-page">
    <h1 class="page-title">学习管理中心</h1>

    <el-tabs v-model="activeTab" type="border-card" class="learning-tabs">
      <el-tab-pane label="作业提交与反馈" name="homework">
        <HomeworkSubmission />
      </el-tab-pane>
      <el-tab-pane label="考试与成绩" name="exams-grades">
        <ExamsAndGrades />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.learning-management-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

.page-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
  position: relative;
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background-color: #0078d4; /* Excel Blue */
  border-radius: 2px;
}

.learning-tabs {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.learning-tabs :deep(.el-tabs__header) {
  background-color: #f0f2f5; /* Light gray background for tabs header */
}

.learning-tabs :deep(.el-tabs__item) {
  font-size: 1.1rem;
  font-weight: 500;
  color: #666;
  padding: 0 20px;
  height: 55px; /* Adjust tab height */
  line-height: 55px;
  transition: all 0.3s ease;
}

.learning-tabs :deep(.el-tabs__item.is-active) {
  color: #0078d4; /* Active tab color */
  background-color: #fff;
  border-bottom-color: #0078d4 !important;
}

.learning-tabs :deep(.el-tabs__item:hover) {
  color: #0078d4;
}

.learning-tabs :deep(.el-tabs__content) {
  padding: 30px;
  background-color: #fff;
}
</style>