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

import tuiguang1 from '@/assets/images/homework/4/1.png';
import tuiguang2 from '@/assets/images/homework/4/2.png';
import tuiguang3 from '@/assets/images/homework/4/3.png';
import tuiguang4 from '@/assets/images/homework/4/4.png';
import tuiguang5 from '@/assets/images/homework/4/5.png';
import tuiguang6 from '@/assets/images/homework/4/6.png';

import lianxi1 from '@/assets/images/homework/2/lianxi1.jpg';
import lianxi2 from '@/assets/images/homework/2/lianxi2.jpg';
import lianxi3 from '@/assets/images/homework/2/lianxi3.jpg';
import lianxi4 from '@/assets/images/homework/2/lianxi4.jpg';

import work_1 from '@/assets/images/homework/2/1.jpg';
import work_2 from '@/assets/images/homework/2/2.jpg';
import work_3 from '@/assets/images/homework/2/3.jpg';
import work_4 from '@/assets/images/homework/2/4.jpg';
import work_5 from '@/assets/images/homework/2/5.jpg';
import work_6 from '@/assets/images/homework/2/6.jpg';
import work_7 from '@/assets/images/homework/2/7.jpg';
import work_8 from '@/assets/images/homework/2/8.jpg';
import work_9 from '@/assets/images/homework/2/9.jpg';
import work_10 from '@/assets/images/homework/2/10.jpg';
import work_11 from '@/assets/images/homework/2/11.jpg';
import work_12 from '@/assets/images/homework/2/12.jpg';

import work2_1 from '@/assets/images/homework/2/work2_1.jpg';
import work2_2 from '@/assets/images/homework/2/work2_2.jpg';
import work2_3 from '@/assets/images/homework/2/work2_3.jpg';
import work2_4 from '@/assets/images/homework/2/work2_4.jpg';
import work2_5 from '@/assets/images/homework/2/work2_5.jpg';
import work2_6 from '@/assets/images/homework/2/work2_6.jpg';

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
    images: {
      lianxi: [
        { id: 'li-001', url: lianxi1, status: 'pending', score: null, feedback: null },
        { id: 'li-002', url: lianxi2, status: 'pending', score: null, feedback: null },
        { id: 'li-003', url: lianxi3, status: 'pending', score: null, feedback: null },
        { id: 'li-004', url: lianxi4, status: 'pending', score: null, feedback: null },
      ],
      work1: [
        { id: 'wo-001', url: work_1, status: 'pending', score: null, feedback: '感觉颜色不够鲜艳' },
        { id: 'wo-002', url: work_2, status: 'pending', score: null, feedback: '眉毛和睫毛的线条弯弯曲曲的' },
        { id: 'wo-003', url: work_3, status: 'pending', score: null, feedback: '总感觉色块太严重的，画不出渐变效果' },
        { id: 'wo-004', url: work_4, status: 'pending', score: null, feedback: '灰蒙蒙的，感觉没有立体感' },
        { id: 'wo-005', url: work_5, status: 'pending', score: null, feedback: '嘴巴画不出立体感' },
        { id: 'wo-006', url: work_6, status: 'pending', score: null, feedback: '眉毛总是画不对称' },
        { id: 'wo-007', url: work_7, status: 'pending', score: null, feedback: null },
        { id: 'wo-008', url: work_8, status: 'pending', score: null, feedback: null },
        { id: 'wo-009', url: work_9, status: 'pending', score: null, feedback: null },
        { id: 'wo-010', url: work_10, status: 'pending', score: null, feedback: null },
        { id: 'wo-011', url: work_11, status: 'pending', score: null, feedback: null },
        { id: 'wo-012', url: work_12, status: 'pending', score: null, feedback: null },
      ],
      work2: [
        { id: 'wo2-001', url: work2_1, status: 'pending', score: null, feedback: null },
        { id: 'wo2-002', url: work2_2, status: 'pending', score: null, feedback: null },
        { id: 'wo2-003', url: work2_3, status: 'pending', score: null, feedback: null },
        { id: 'wo2-004', url: work2_4, status: 'pending', score: null, feedback: null },
        { id: 'wo2-005', url: work2_5, status: 'pending', score: null, feedback: null },
        { id: 'wo2-006', url: work2_6, status: 'pending', score: null, feedback: null },
      ]
    }
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
      { id: 'ep-001', url: tuiguang1, status: 'pending', score: null, feedback: null },
      { id: 'ep-002', url: tuiguang2, status: 'pending', score: null, feedback: null },
      { id: 'ep-003', url: tuiguang3, status: 'pending', score: null, feedback: null },
      { id: 'ep-004', url: tuiguang4, status: 'pending', score: null, feedback: null },
      { id: 'ep-005', url: tuiguang5, status: 'pending', score: null, feedback: null },
      { id: 'ep-006', url: tuiguang6, status: 'pending', score: null, feedback: null },
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

const showScore = ref(false); // Flag to control score display

// Function to open the image detail dialog and render chart
const openImageDetailDialog = (image, score=false) => {
  currentImage.value = image;
  showScore.value = score; // Set the score display flag
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
            <div v-else-if="module.value === 'solution-design'" class="card-header">
              <span class="module-title">{{ module.label }}</span>
              <el-tag size="small" :type="module.images.lianxi.length > 0 || module.images.work1.length > 0 || module.images.work2.length > 0 ? 'success' : 'info'">
                <el-icon><IconPicture /></el-icon> {{ module.images.lianxi.length > 0 || module.images.work1.length > 0 || module.images.work2.length > 0 ? `${module.images.lianxi.length + module.images.work1.length + module.images.work2.length} 张图片` : '暂无图片' }}
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
            <!-- <div v-if="module.value === 'implementation'" class="module-summary">
              <el-tag :type="module.images.hangkong.filter(img => img.status === 'evaluated').length > 0 || module.images.lvke.filter(img => img.status === 'evaluated').length > 0 ? 'success' : 'info'">
                <el-icon><CircleCheck /></el-icon> {{ module.images.hangkong.filter(img => img.status === 'evaluated').length + module.images.lvke.filter(img => img.status === 'evaluated').length }} 已评价
              </el-tag>
              <el-tag type="warning">
                <el-icon><ChatDotRound /></el-icon> {{ module.images.hangkong.filter(img => img.status === 'pending').length + module.images.lvke.filter(img => img.status === 'pending').length }} 待评价
              </el-tag>
            </div> -->
            <!-- <div v-else class="module-summary">
              <el-tag :type="module.images.filter(img => img.status === 'evaluated').length > 0 ? 'success' : 'info'">
                <el-icon><CircleCheck /></el-icon> {{ module.images.filter(img => img.status === 'evaluated').length }} 已评价
              </el-tag>
              <el-tag type="warning">
                <el-icon><ChatDotRound /></el-icon> {{ module.images.filter(img => img.status === 'pending').length }} 待评价
              </el-tag>
            </div> -->
          </div>
          <div class="card-footer">
              <el-button class="view-btn" type="primary" :icon="View" plain>查看详情</el-button>
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
          <el-tabs type="border-card">
            <el-tab-pane label="航空组">
              <el-row :gutter="20">
                <el-col :span="8" v-for="image in currentModule.images.hangkong" :key="image.id" class="image-item-col">
                  <el-card shadow="hover" class="image-item-card" @click="openImageDetailDialog(image, true)">
                    <el-image :src="image.url" fit="cover" class="list-image"></el-image>
                    <div class="image-status-overlay">
                      <el-tag :type="image.status === 'evaluated' ? 'success' : 'warning'">
                        {{ image.status === 'evaluated' ? '已评价' : '待评价' }}
                      </el-tag>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="旅客组">
              <el-row :gutter="20">
                <el-col :span="8" v-for="image in currentModule.images.lvke" :key="image.id" class="image-item-col">
                  <el-card shadow="hover" class="image-item-card" @click="openImageDetailDialog(image, true)">
                    <el-image :src="image.url" fit="cover" class="list-image"></el-image>
                    <div class="image-status-overlay">
                      <el-tag :type="image.status === 'evaluated' ? 'success' : 'warning'">
                        {{ image.status === 'evaluated' ? '已评价' : '待评价' }}
                      </el-tag>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          
          
        </div>
        <el-empty v-else description="该模块暂无图片"></el-empty>
      </div>
      <div v-else-if="currentModule.value === 'solution-design'">
        <div class="image-list-container design" v-if="currentModule && (currentModule.images.lianxi.length || currentModule.images.work1.length || currentModule.images.work2.length) > 0">
          <el-tabs type="border-card">
            <el-tab-pane label="作业一">
              <el-row :gutter="20" class="work1">
                <el-col :span="8" v-for="image in currentModule.images.work1" :key="image.id" class="image-item-col">
                  <el-image :src="image.url" fit="cover" class="list-image" :preview-src-list="[image.url]" :initial-index="0"></el-image>
                  <p style="color: #fff;"><span style="font-weight: 600; color: #fff;">留言评论: </span>{{ image.feedback }}</p>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="课堂小游戏">
              <el-row :gutter="40" class="youxi">
                <el-col :span="12" v-for="image in currentModule.images.lianxi" :key="image.id" class="image-item-col">
                  <el-card shadow="hover" class="image-item-card">
                    <el-image :src="image.url" fit="cover" class="list-image" :preview-src-list="[image.url]" :initial-index="0"></el-image>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="作业二">
              <el-row :gutter="40" class="work2">
                <el-col :span="8" v-for="image in currentModule.images.work2" :key="image.id" class="image-item-col">
                  <el-card shadow="hover" class="image-item-card">
                    <el-image :src="image.url" fit="cover" class="list-image" :preview-src-list="[image.url]" :initial-index="0"></el-image>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-empty v-else description="该模块暂无图片"></el-empty>
      </div>
      <div v-else>
        <div class="image-list-container" v-if="currentModule && currentModule.images.length > 0">
          <el-row :gutter="20">
            <el-col :span="8" v-for="image in currentModule.images" :key="image.id" class="image-item-col">
              <el-card shadow="hover" class="image-item-card">
                <el-image :src="image.url" fit="cover" class="list-image" :preview-src-list="[image.url]" :initial-index="0"></el-image>
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
        <el-row :gutter="20" v-if="showScore">
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
                <p><strong>评价反馈：</strong></p>
                <p>技术点赞</p>
                <el-progress
                  :percentage="86"
                  :stroke-width="15"
                  striped
                  :color="[
                    { color: '#f56c6c', percentage: 20 },
                    { color: '#e6a23c', percentage: 40 },
                    { color: '#6f7ad3', percentage: 60 },
                    { color: '#1989fa', percentage: 80 },
                    { color: '#5cb87a', percentage: 100 }
                  ]"
                />
                <p>服务点赞</p>
                <el-progress :percentage="38" :stroke-width="15" striped />
                <p><strong>留言评论：</strong></p>
                <div id="score-pie-chart" style="width: 100%;">
                  <p>学号5005001：好喜欢这个妆，又温柔又吸睛</p>
                  <p>学号5005012：赞赞赞</p>
                  <p>学号5005023：模特好漂亮</p>
                  <p>学号5005024：化妆师再细心一点哦🤭</p>
                  <p>学号5005035：这个眼妆的配色绝了！亮片和哑光搭配得超有层次感，教程快出！蹲一个～</p>
                  <p>学号5005046：唇釉质地看起来好丝滑</p>
                  <p>学号5005017：修容阴影过渡得好自然，鼻梁瞬间变高挺</p>
                  <p>学号5005028：整体氛围感拉满！</p>
                </div>
              </div>
              <div v-else>
                <el-empty description="该图片尚未评价"></el-empty>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-else>
          <el-col :span="24" class="detail-image-wrapper">
            <el-image :src="currentImage.url" fit="cover" class="detail-image" :preview-src-list="[currentImage.url]" :initial-index="0"></el-image>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

.page-title {
  text-align: center;
  color: #fff;
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
  background-color: #a43254; /* Dark background for contrast */
  border: none;
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

:deep(.el-card__header) {
  border-bottom: 1px solid #fff;
}

.view-btn {
  background-color: #9d3050;
  border-color: #9d3050;
  color: white;
  box-shadow: 0px 8px 10px 0px rgb(0 0 0 / 30%);
}

.view-btn:hover {
  background-color: #762239;
  border-color: #762239;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

:deep(.el-tag.el-tag--success) {
  background-color: #4c1523; /* Green for evaluated */
  color: #fff;
}

.module-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
}

.module-content {
  padding: 20px;
  flex-grow: 1; /* Allow content to grow and push footer down */
}

.module-description {
  font-size: 14px;
  color: #fff;
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

:deep(.el-progress) {
  margin-bottom: 10px;
}

:deep(.el-tabs) {
  border: none;
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

.work1 {
  .image-item-col {
    height: 350px;
    margin-bottom: 10px;
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

  :deep(.el-card__body) {
    height: 380px;
  }

  .list-image {
    width: 100%;
    height: 300px;
    transition: transform 0.3s ease;
  }
}
:deep(.el-progress__text) {
  color: #fff; /* Change progress text color to white */
}
/* .image-item-card:hover .list-image {
  transform: scale(1.05);
} */

.image-status-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

#score-pie-chart {
  padding: 20px;
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
  font-size: 2rem;
  margin-bottom: 15px;
  color: #fff;
}

.detail-info p {
  font-size: 1.5rem;
  line-height: 1.8;
  color: #fff;
  margin-bottom: 10px;
}

#score-pie-chart {
  margin-top: 20px;
  background-color: #9d3050;
  border-radius: 8px;
}
</style>