<script setup>
import { ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';
import HomeworkSubmission from '@/components/HomeworkSubmission.vue';
import * as echarts from 'echarts';

const activeTab = ref('homework'); // 默认激活作业提交模块
const chartRef1 = ref(null);
const chartRef2 = ref(null);
const chartData1 = [
  {
    value: 95,
    name: '已观看'
  },
  {
    value: 5,
    name: '未观看'
  }
]
const chartData2 = [
  {
    value: 80,
    name: '已提交'
  },
  {
    value: 20,
    name: '未提交'
  }
]
let chartInstance1 = null
let chartInstance2 = null
const initChart = (cref, title, seriesName, cdata, index) => {

  const option = {
    title: {
      text: title,
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 18,
        color: '#fff',
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
    },
    legend: {
      bottom: 10,
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#fff',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
          },
        },
        labelLine: {
          show: true,
        },
        data: cdata,
      },
    ],
  };
  if(index === 1) {
    let chartInstance1 = echarts.init(cref.value);
    chartInstance1.setOption(option);
  } else {
    let chartInstance2 = echarts.init(cref.value);
    chartInstance2.setOption(option);
  }
};

const tabChecked = (tab, event) => {
  console.log('Tab changed:', tab.paneName);
  if (tab.paneName === 'exams-grades') {
    activeTab.value = 'exams-grades';
    initChart(chartRef1, '微课资源视频观看完成度', '观看情况', chartData1, 1);
    initChart(chartRef2, "'营销手段在文化传播中的应用'思考题", '提交情况', chartData2, 2);
  }
};
</script>

<template>
  <div class="learning-management-page">
    <h1 class="page-title">学习管理中心</h1>

    <el-tabs v-model="activeTab" type="border-card" class="learning-tabs" @tab-click="tabChecked">
      <el-tab-pane label="作业提交与反馈" name="homework">
        <HomeworkSubmission />
      </el-tab-pane>
      <el-tab-pane label="考试与成绩" name="exams-grades">
        <div class="flex">
          <el-row :gutter="20">
              <el-col :span="24" class="chart-col">
                <div ref="chartRef1" class="chart1" style="width: 400px; height: 400px;"></div>
              </el-col>
              <el-col :span="24" class="chart-col">
                <div ref="chartRef2" class="chart2" style="width: 400px; height: 400px;"></div>
              </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.chart-col {
  display: flex;
  justify-content: center;
  align-items: center;
}
.learning-management-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  color: #fff;
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
  background-color: #b73c62; /* Excel Blue */
  border-radius: 2px;
}

.learning-tabs {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #9d3050;
  border: none;
  color: #fff;
}

:deep(.el-tabs__nav-wrap) {
  background-color: #9d3050; 
  color: #fff;
}

.learning-tabs :deep(.el-tabs__item) {
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
  padding: 0 20px;
  height: 55px; /* Adjust tab height */
  line-height: 55px;
  transition: all 0.3s ease;
  border: none;
}

.learning-tabs :deep(.el-tabs__item.is-active) {
  color: #fff; /* Active tab color */
  background-color: #cb446f;
}

.learning-tabs :deep(.el-tabs__item:hover) {
  color: #fff !important; /* Hover tab color */
}

.learning-tabs :deep(.el-tabs__content) {
  padding: 30px;
  background-color: #cb446f;
}
</style>