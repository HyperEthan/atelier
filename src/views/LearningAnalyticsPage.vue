<script setup>
import { ref, onMounted, computed } from 'vue';
import { ElCard, ElRow, ElCol, ElProgress, ElTable, ElTableColumn, ElTag } from 'element-plus';
// Import ECharts components and core
import VChart from 'vue-echarts';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent, // For zoomable charts
} from 'echarts/components';

// Register necessary ECharts components
echarts.use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

// Import mock data
import { studentData, courseEnrollments, serviceBookings, platformUsage, revenueData } from '@/data/analyticsData';

// --- Data Refs ---
const students = ref(studentData);
const enrollments = ref(courseEnrollments);
const bookings = ref(serviceBookings);
const usage = ref(platformUsage);
const revenue = ref(revenueData);

// --- Computed Properties for Chart Options ---

// 1. Student Progress Distribution (Pie Chart)
const studentProgressOption = computed(() => {
  const progressGroups = {
    '优秀 (90-100%)': 0,
    '良好 (70-89%)': 0,
    '中等 (40-69%)': 0,
    '待提高 (<40%)': 0,
  };

  students.value.forEach(student => {
    if (student.progress >= 90) progressGroups['优秀 (90-100%)']++;
    else if (student.progress >= 70) progressGroups['良好 (70-89%)']++;
    else if (student.progress >= 40) progressGroups['中等 (40-69%)']++;
    else progressGroups['待提高 (<40%)']++;
  });

  return {
    title: { text: '学生学情进度分布', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: '学生数量',
        type: 'pie',
        radius: '50%',
        data: Object.keys(progressGroups).map(key => ({
          value: progressGroups[key],
          name: key,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
});

// 2. Course Enrollment Popularity (Bar Chart)
const courseEnrollmentOption = computed(() => {
  return {
    title: { text: '课程报名量', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: enrollments.value.map(item => item.courseName),
      axisLabel: {
        interval: 0,
        rotate: 30, // Rotate labels for better readability if many items
      },
    },
    yAxis: { type: 'value', name: '报名人数' },
    series: [{
      name: '报名人数',
      type: 'bar',
      data: enrollments.value.map(item => item.enrollments),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ]
        )
      },
    }],
  };
});

// 3. Service Booking Trends (Bar Chart)
const serviceBookingOption = computed(() => {
  return {
    title: { text: '美妆服务预约量', left: 'center' },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: bookings.value.map(item => item.serviceName),
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: { type: 'value', name: '预约量' },
    series: [{
      name: '预约量',
      type: 'bar',
      data: bookings.value.map(item => item.bookings),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: '#a6e3d7' },
            { offset: 0.5, color: '#68c7ae' },
            { offset: 1, color: '#68c7ae' }
          ]
        )
      },
    }],
  };
});


// 4. Platform User Engagement (Line Chart)
const userEngagementOption = computed(() => {
  return {
    title: { text: '平台每日活跃用户', left: 'center' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: usage.value.userEngagementByDay.map(item => item.date.substring(5)), // Show only Month-Day
    },
    yAxis: { type: 'value', name: '活跃用户数' },
    series: [{
      name: '活跃用户',
      type: 'line',
      smooth: true,
      data: usage.value.userEngagementByDay.map(item => item.users),
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(58,77,233,0.8)'
        }, {
          offset: 1,
          color: 'rgba(58,77,233,0.3)'
        }])
      },
      lineStyle: {
        color: '#3a4de9'
      },
      itemStyle: {
        color: '#3a4de9'
      }
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    dataZoom: [ // Add data zoom for larger datasets
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 100
        }
    ]
  };
});

// 5. Monthly Revenue (Line Chart)
const revenueOption = computed(() => {
  return {
    title: { text: '年度月度营收概览', left: 'center' },
    tooltip: { trigger: 'axis', formatter: '{b}<br/>营收: {c}万元' },
    xAxis: {
      type: 'category',
      data: revenue.value.map(item => item.month),
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
    },
    yAxis: { type: 'value', name: '营收 (万元)' },
    series: [{
      name: '营收',
      type: 'line',
      smooth: true,
      data: revenue.value.map(item => item.revenue / 10000), // Convert to万元
      itemStyle: { color: '#e06e6e' },
      lineStyle: { color: '#e06e6e' },
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
  };
});


onMounted(async () => {
  await nextTick();
  // 如果还有问题，可以添加一个小延时
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);
});
</script>

<template>
  <main class="analytics-page container">
    <h1 class="page-title">学情分析与运营概览</h1>
    <p class="page-intro">
      深入洞察学员学习进度、课程与服务热门度、平台活跃数据以及工作室营收表现。
    </p>

    <el-row :gutter="20" class="summary-cards">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">总学员数</div>
            <div class="card-value">{{ students.length }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">总课程数</div>
            <div class="card-value">{{ enrollments.length }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">月活跃用户</div>
            <div class="card-value">{{ usage.totalLoginsLastMonth }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-content">
            <div class="card-label">本月预估营收</div>
            <div class="card-value">¥{{ revenue[4]?.revenue?.toLocaleString() }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-section">
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <v-chart 
            :option="studentProgressOption" 
            autoresize 
            :manual-update="false"
            ref="chartRef"
            class="chart" 
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <v-chart
            :option="courseEnrollmentOption" 
            autoresize 
            :manual-update="false"
            ref="chartRef"
            class="chart" 
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <v-chart
            :option="serviceBookingOption" 
            autoresize 
            :manual-update="false"
            ref="chartRef"
            class="chart" 
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="chart-card">
          <v-chart
            :option="userEngagementOption" 
            autoresize 
            :manual-update="false"
            ref="chartRef"
            class="chart" 
          />
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card shadow="hover" class="chart-card">
          <v-chart
            :option="revenueOption" 
            autoresize 
            :manual-update="false"
            ref="chartRef"
            class="chart" 
          />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="table-section">
      <el-col :span="14">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <span>学员学习进度详情</span>
            </div>
          </template>
          <el-table :data="students" style="width: 100%" class="student-table">
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="course" label="所学课程"></el-table-column>
            <el-table-column label="进度">
              <template #default="scope">
                <el-progress :percentage="scope.row.progress" :stroke-width="10" :text-inside="true" />
              </template>
            </el-table-column>
            <el-table-column label="反馈评分" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.feedbackScore >= 4.5 ? 'success' : (scope.row.feedbackScore >= 4 ? 'info' : 'warning')">
                  {{ scope.row.feedbackScore }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="lastActive" label="上次活跃" width="120"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" class="table-card">
          <template #header>
            <div class="card-header">
              <span>热门内容浏览</span>
            </div>
          </template>
          <el-table :data="usage.topAccessedContent" style="width: 100%" class="top-content-table">
            <el-table-column prop="name" label="内容名称"></el-table-column>
            <el-table-column prop="type" label="类型" width="80"></el-table-column>
            <el-table-column prop="views" label="浏览量" width="100" sortable></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<style scoped>
.analytics-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
  font-family: var(--font-body);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-family: var(--font-heading);
}

.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background-color: var(--color-accent);
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-text-dark);
  line-height: 1.6;
}

.summary-cards {
  margin-bottom: var(--spacing-xl);
}

.summary-cards .el-card {
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--color-primary-light);
}

.summary-cards .el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.card-content {
  text-align: center;
  padding: var(--spacing-sm);
}

.card-label {
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.card-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  font-family: var(--font-heading);
}

/* Charts */
.chart-section {
  margin-bottom: var(--spacing-xl);
}

.chart-card {
  height: 400px;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 20px;  /* 添加内边距 */
}
.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.chart {
  width: 100%;
  height: 320px !important; /* 明确设置高度并使用 !important */
  min-height: 300px;  /* 添加最小高度 */
}

.chart-full-width {
  width: 100%;
  height: 320px !important; /* 明确设置高度并使用 !important */
  min-height: 300px;  /* 添加最小高度 */
}


/* Tables */
.table-section {
  margin-bottom: var(--spacing-xl);
}

.table-card {
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.table-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.card-header {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  font-weight: 600;
}

.student-table .el-progress {
  padding: 5px 0; /* Adjust progress bar padding in table */
}

.student-table .el-table__cell, .top-content-table .el-table__cell {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-text-dark);
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .page-title {
    font-size: 3rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .summary-cards .el-col {
    margin-bottom: var(--spacing-md);
  }
  .chart-section .el-col {
    margin-bottom: var(--spacing-md);
  }
  .chart-card {
    height: 350px; /* Adjust chart height for smaller screens */
  }
  .table-section .el-col {
    margin-bottom: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .summary-cards .el-col,
  .chart-section .el-col,
  .table-section .el-col {
    flex: 0 0 100%; /* Make columns full width */
    max-width: 100%;
  }
  .card-value {
    font-size: 2rem;
  }
  .chart-card {
    height: 300px;
  }
  .student-table, .top-content-table {
    font-size: 0.9rem;
  }
}
</style>