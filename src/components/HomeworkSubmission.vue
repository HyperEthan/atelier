<script setup>
import { ref, watch, markRaw } from 'vue';
import { ElSelect, ElOption, ElUpload, ElButton, ElInput, ElImage, ElCard, ElTag, ElMessage, ElMessageBox, ElDialog, ElEmpty } from 'element-plus';
import { UploadFilled, Document, ChatDotRound, StarFilled, Plus, CircleCheck, View, Picture as IconPicture } from '@element-plus/icons-vue';
import * as echarts from 'echarts'; // Import ECharts

// Import homework images - consider a more dynamic way to load these in a real app
import task1 from '@/assets/images/homework/1/1.jpg';
import task2 from '@/assets/images/homework/1/2.jpg';
import task3 from '@/assets/images/homework/1/3.jpg';
import task4 from '@/assets/images/homework/1/4.jpg';

import hangkong1 from '@/assets/images/homework/3/hangkong1.jpg';
import hangkong2 from '@/assets/images/homework/3/hangkong2.jpg';
import hangkong3 from '@/assets/images/homework/3/hangkong3.jpg';
import lvke1 from '@/assets/images/homework/3/lvke1.jpg';
import lvke2 from '@/assets/images/homework/3/lvke2.jpg';
import lvke3 from '@/assets/images/homework/3/lvke3.jpg';

import zhuangxiao1 from '@/assets/images/homework/3/zhuangxiao1.jpg';
import zhuangxiao2 from '@/assets/images/homework/3/zhuangxiao2.jpg';
import zhuangxiao3 from '@/assets/images/homework/3/zhuangxiao3.jpg';
import zhuangxiao4 from '@/assets/images/homework/3/zhuangxiao4.jpg';
import zhuangxiao5 from '@/assets/images/homework/3/zhuangxiao5.jpg';
import zhuangxiao6 from '@/assets/images/homework/3/zhuangxiao6.jpg';

//

// Mock data: course modules
const courseModules = ref([
  {
    label: '任务分析',
    value: 'task-analysis',
    description: '深入理解任务需求，明确目标与范围。',
    images: [
      { id: 'ta-001', url: task1, status: 'evaluated', score: 85, feedback: '任务拆解清晰，目标明确。' },
      { id: 'ta-002', url: task2, status: 'pending', score: null, feedback: null },
      { id: 'ta-003', url: task3, status: 'evaluated', score: 70, feedback: 'SWOT分析有待加强。' },
      { id: 'ta-004', url: task4, status: 'pending', score: null, feedback: null },
    ]
  },
  {
    label: '方案设计',
    value: 'solution-design',
    description: '制定并设计详细的定妆方案。',
    images: [
      { id: 'sd-001', url: 'https://picsum.photos/id/237/200/200', status: 'pending', score: null, feedback: null },
      { id: 'sd-002', url: 'https://picsum.photos/id/238/200/200', status: 'evaluated', score: 92, feedback: '设计方案创新，考虑周全。' },
    ]
  },
  {
    label: '定妆实施',
    value: 'implementation',
    description: '按照设计方案进行具体实现，完成定妆。',
    images: {
      hangkong: [
        { id: 'zi-001', url: zhuangxiao1, status: 'pending', score: null, feedback: null },
        { id: 'zi-004', url: zhuangxiao4, status: 'pending', score: null, feedback: null },
        { id: 'zi-003', url: zhuangxiao3, status: 'pending', score: null, feedback: null },
        { id: 'hi-001', url: hangkong1, status: 'pending', score: null, feedback: null },
        { id: 'hi-002', url: hangkong2, status: 'pending', score: null, feedback: null },
        { id: 'hi-003', url: hangkong3, status: 'pending', score: null, feedback: null },
      ],
      lvke: [
        { id: 'zi-006', url: zhuangxiao6, status: 'pending', score: null, feedback: null },
        { id: 'zi-002', url: zhuangxiao2, status: 'pending', score: null, feedback: null },
        { id: 'zi-005', url: zhuangxiao5, status: 'pending', score: null, feedback: null },
        { id: 'li-001', url: lvke1, status: 'evaluated', score: 90, feedback: '实施效果出色，符合预期。' },
        { id: 'li-002', url: lvke2, status: 'evaluated', score: 85, feedback: '整体效果良好，细节处理到位。' },
        { id: 'li-003', url: lvke3, status: 'evaluated', score: 88, feedback: '整体效果良好，细节处理到位。' },
      ]
    } // No images for this module yet
  },
  {
    label: '营销推广',
    value: 'expansion-promotion',
    description: '将成果进行推广，探索进一步的拓展可能性。',
    images: [
      { id: 'ep-001', url: 'https://picsum.photos/id/239/200/200', status: 'evaluated', score: 78, feedback: '推广渠道建议可更具体。' },
      { id: 'ep-002', url: 'https://picsum.photos/id/240/200/200', status: 'pending', score: null, feedback: null },
      { id: 'ep-003', url: 'https://picsum.photos/id/241/200/200', status: 'evaluated', score: 88, feedback: '市场分析深入，策略可行。' },
    ]
  },
]);

// Dialog state
const dialogVisible = ref(false);
const currentModule = ref(null); // Stores the module whose images are being viewed

// Image detail dialog state
const imageDetailDialogVisible = ref(false);
const currentImage = ref(null); // Stores the currently selected image for detail view
const chartInstance = ref(null); // To store the ECharts instance

// Function to open the image list dialog
const openImageListDialog = (module) => {
  currentModule.value = module;
  dialogVisible.value = true;
};

// Function to open the image detail dialog and render chart
const openImageDetailDialog = (image) => {
  currentImage.value = image;
  imageDetailDialogVisible.value = true;

  // Wait for the dialog to render and then initialize chart
  watch(imageDetailDialogVisible, (newValue) => {
    if (newValue && currentImage.value && currentImage.value.score !== null) {
      // Use markRaw to prevent ECharts from being reactive, which can cause issues
      // Ensure the DOM element is available before initializing
      setTimeout(() => {
        const chartDom = document.getElementById('score-pie-chart');
        if (chartDom) {
          if (chartInstance.value) {
            chartInstance.value.dispose(); // Dispose old chart if exists
          }
          chartInstance.value = markRaw(echarts.init(chartDom));
          renderPieChart(currentImage.value.score);
        }
      }, 50); // Small delay to ensure DOM is ready
    }
  }, { once: true }); // Only run once when dialog becomes visible
};

// Function to render the ECharts pie chart
const renderPieChart = (score) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['得分', '未得分']
    },
    series: [
      {
        name: '评价得分',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
            formatter: `{d}%`
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: score, name: '得分', itemStyle: { color: '#67C23A' } }, // Green for scored
          { value: 100 - score, name: '未得分', itemStyle: { color: '#E6A23C' } } // Orange for remaining
        ]
      }
    ]
  };
  chartInstance.value.setOption(option);
};

// Dispose chart when dialog closes
watch(imageDetailDialogVisible, (newValue) => {
  if (!newValue && chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
});
</script>

<template>
  <div class="homework-submission-module">
    <el-row :gutter="40" class="module-cards-row">
      <el-col :span="12" v-for="module in courseModules" :key="module.value">
        <el-card class="module-card submission-section" shadow="hover" @click="openImageListDialog(module)">
          <template #header>
            <div v-if="module.value === 'implementation'" class="card-header">
              <span class="module-title">{{ module.label }}</span>
              <el-tag size="small" :type="module.images.hangkong.length > 0 || module.images.lvke.length > 0 ? 'success' : 'info'">
                <el-icon><IconPicture /></el-icon> {{ module.images.hangkong.length > 0 || module.images.lvke.length > 0 ? `${module.images.hangkong.length + module.images.lvke.length} 张图片` : '暂无图片' }}
              </el-tag>
            </div>
            <div v-else class="card-header">
              <span class="module-title">{{ module.label }}</span>
              <el-tag size="small" :type="module.images.length > 0 ? 'success' : 'info'">
                <el-icon><IconPicture /></el-icon> {{ module.images.length > 0 ? `${module.images.length} 张图片` : '暂无图片' }}
              </el-tag>
            </div>
          </template>
          <div class="module-content">
            <p class="module-description">{{ module.description }}</p>
            <div v-if="module.value === 'implementation'" class="module-summary">
              <el-tag :type="module.images.hangkong.filter(img => img.status === 'evaluated').length > 0 || module.images.lvke.filter(img => img.status === 'evaluated').length > 0 ? 'success' : 'info'">
                <el-icon><CircleCheck /></el-icon> {{ module.images.hangkong.filter(img => img.status === 'evaluated').length + module.images.lvke.filter(img => img.status === 'evaluated').length }} 已评价
              </el-tag>
              <el-tag type="warning">
                <el-icon><ChatDotRound /></el-icon> {{ module.images.hangkong.filter(img => img.status === 'pending').length + module.images.lvke.filter(img => img.status === 'pending').length }} 待评价
              </el-tag>
            </div>
            <div v-else class="module-summary">
              <el-tag :type="module.images.filter(img => img.status === 'evaluated').length > 0 ? 'success' : 'info'">
                <el-icon><CircleCheck /></el-icon> {{ module.images.filter(img => img.status === 'evaluated').length }} 已评价
              </el-tag>
              <el-tag type="warning">
                <el-icon><ChatDotRound /></el-icon> {{ module.images.filter(img => img.status === 'pending').length }} 待评价
              </el-tag>
            </div>
          </div>
          <div class="card-footer">
              <el-button type="primary" :icon="View" plain>查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="dialogVisible"
      :title="currentModule ? `${currentModule.label} - 图片列表` : '图片列表'"
      width="80%"
      top="5vh"
      destroy-on-close
      class="image-list-dialog"
    >
      <div v-if="currentModule.value === 'implementation'">
        <div class="image-list-container" v-if="currentModule && (currentModule.images.hangkong.length || currentModule.images.lvke.length) > 0">
          <el-row :gutter="20">
            <el-col :span="8" v-for="image in currentModule.images.hangkong" :key="image.id" class="image-item-col">
              <el-card shadow="hover" class="image-item-card" @click="openImageDetailDialog(image)">
                <el-image :src="image.url" fit="cover" class="list-image"></el-image>
                <div class="image-status-overlay">
                  <el-tag :type="image.status === 'evaluated' ? 'success' : 'warning'">
                    {{ image.status === 'evaluated' ? '已评价' : '待评价' }}
                  </el-tag>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" v-for="image in currentModule.images.lvke" :key="image.id" class="image-item-col">
              <el-card shadow="hover" class="image-item-card" @click="openImageDetailDialog(image)">
                <el-image :src="image.url" fit="cover" class="list-image"></el-image>
                <div class="image-status-overlay">
                  <el-tag :type="image.status === 'evaluated' ? 'success' : 'warning'">
                    {{ image.status === 'evaluated' ? '已评价' : '待评价' }}
                  </el-tag>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else description="该模块暂无图片"></el-empty>
      </div>
      <div v-else>
        <div class="image-list-container" v-if="currentModule && currentModule.images.length > 0">
          <el-row :gutter="20">
            <el-col :span="8" v-for="image in currentModule.images" :key="image.id" class="image-item-col">
              <el-card shadow="hover" class="image-item-card" @click="openImageDetailDialog(image)">
                <el-image :src="image.url" fit="cover" class="list-image"></el-image>
                <div class="image-status-overlay">
                  <el-tag :type="image.status === 'evaluated' ? 'success' : 'warning'">
                    {{ image.status === 'evaluated' ? '已评价' : '待评价' }}
                  </el-tag>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <el-empty v-else description="该模块暂无图片"></el-empty>
      </div>
      
    </el-dialog>

    <el-dialog
      v-model="imageDetailDialogVisible"
      title="图片详情"
      destroy-on-close
      class="image-detail-dialog"
    >
      <div v-if="currentImage" class="image-detail-content">
        <el-row :gutter="20">
          <el-col :span="12" class="detail-image-wrapper">
            <el-image :src="currentImage.url" fit="cover" class="detail-image" :preview-src-list="[currentImage.url]"></el-image>
          </el-col>
          <el-col :span="12">
            <div class="detail-info">
              <h3>评价状态：
                <el-tag :type="currentImage.status === 'evaluated' ? 'success' : 'warning'" effect="dark">
                  {{ currentImage.status === 'evaluated' ? '已评价' : '待评价' }}
                </el-tag>
              </h3>
              <div v-if="currentImage.status === 'evaluated'">
                <p><strong>评价反馈：</strong> {{ currentImage.feedback || '暂无详细反馈' }}</p>
                <p><strong>最终得分：</strong> <el-tag type="success" size="large">{{ currentImage.score }} 分</el-tag></p>
                <div id="score-pie-chart" style="width: 100%; height: 250px;"></div>
              </div>
              <div v-else>
                <el-empty description="该图片尚未评价"></el-empty>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.homework-submission-module {
}

.page-title {
  text-align: center;
  color: #333;
  font-size: 36px;
  margin-bottom: 10px;
  letter-spacing: 2px;
  font-weight: bold;
}

.page-description {
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-bottom: 50px;
}

.module-cards-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the cards */
}

.module-card {
  margin-bottom: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: auto; /* Allow card height to adjust based on content */
  display: flex;
  flex-direction: column;
  cursor: pointer; /* Indicate clickability */
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.module-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.module-content {
  padding: 20px;
  flex-grow: 1; /* Allow content to grow and push footer down */
}

.module-description {
  font-size: 14px;
  color: #777;
  margin-bottom: 15px;
  line-height: 1.6;
}

.module-summary {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.card-footer {
  padding: 15px 20px;
  border-top: 1px solid #ebeef5;
  text-align: right;
}

/* Image List Dialog Styles */
:deep(.image-list-dialog.el-dialog) {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border-radius: 0;
}

:deep(.image-detail-dialog.el-dialog) {
  width: 100%;
  height: 100vh;
  margin: 0;
  border-radius: 0;
}

.image-list-container {
  overflow-y: auto;
  padding-right: 10px; /* For scrollbar */
}

.image-item-col {
  margin-bottom: 20px;
}

.image-item-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  max-height: 400px; /* Fixed height for consistent layout */
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-item-card .el-card__body {
  padding: 0; /* Remove default padding */
  width: 100%;
  height: 100%;
}

.list-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-item-card:hover .list-image {
  transform: scale(1.05);
}

.image-status-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

/* Image Detail Dialog Styles */
.image-detail-content {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 20px;
}

.detail-image-wrapper {
  flex: 1; /* Allow image to take available space */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* Minimum height for the image area */
}

.detail-image {
  max-width: 100%;
  max-height: calc(100vh - 70px); /* Limit max height of the image */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.detail-info {
  flex: 1; /* Allow info to take available space */
  padding: 10px;
}

.detail-info h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.detail-info p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 10px;
}

#score-pie-chart {
  margin-top: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
}
</style>