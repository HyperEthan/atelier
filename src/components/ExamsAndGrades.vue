<script setup>
import { ref } from 'vue';
import {
  ElTabs, ElTabPane, ElTable, ElTableColumn, ElButton, ElTag,
  ElDialog, ElForm, ElFormItem, ElInput, ElSelect, ElDatePicker,
  ElMessage, ElRadioGroup, ElRadio, ElTimeSelect, ElProgress, ElRate,
  ElDivider, ElAlert
} from 'element-plus';
import {
  Notebook, Trophy, Timer, QuestionFilled, Edit,
  DocumentChecked, Plus, CircleCheck, Search, Setting, Calendar
} from '@element-plus/icons-vue';

// 模拟数据
const studentExams = ref([
  {
    id: 'exam-001',
    title: '任务分析阶段测试',
    module: 'task-analysis',
    moduleLabel: '任务分析',
    dueDate: '2025-06-10 23:59',
    duration: 60, // minutes
    status: '未开始', // or '已开始', '已完成'
    score: null,
    attemptsMade: 0,
    maxAttempts: 1,
    gradeStatus: '未评分',
  },
  {
    id: 'exam-002',
    title: '方案设计期中考',
    module: 'solution-design',
    moduleLabel: '方案设计',
    dueDate: '2025-06-20 23:59',
    duration: 90,
    status: '已完成',
    score: 85,
    attemptsMade: 1,
    maxAttempts: 1,
    gradeStatus: '已评分',
  },
  {
    id: 'exam-003',
    title: '前端技术实践考核',
    module: 'task-analysis',
    moduleLabel: '任务分析',
    dueDate: '2025-07-01 23:59',
    duration: 120,
    status: '未开始',
    score: null,
    attemptsMade: 0,
    maxAttempts: 3,
    gradeStatus: '未评分',
  },
]);

const studentGrades = ref([
  {
    id: 'grade-hw-001',
    item: '任务分析报告 V1.0',
    type: '作业',
    module: '任务分析',
    score: 92,
    total: 100,
    weight: 0.3,
    feedback: '报告结构清晰，分析深入，但某些数据来源需要更详细的引用。干得好！',
  },
  {
    id: 'grade-exam-002',
    item: '方案设计期中考',
    type: '考试',
    module: '方案设计',
    score: 85,
    total: 100,
    weight: 0.4,
    feedback: '选择题部分表现出色，简答题仍有提升空间。',
  },
  {
    id: 'grade-quiz-001',
    item: '前端基础概念小测',
    type: '小测',
    module: '任务分析',
    score: 78,
    total: 100,
    weight: 0.1,
    feedback: '基础概念掌握扎实，但对某些新特性理解不足。',
  },
]);

const overallGrade = ref(calculateOverallGrade()); // 计算总成绩

function calculateOverallGrade() {
  let totalWeightedScore = 0;
  let totalWeight = 0;
  studentGrades.value.forEach(item => {
    if (item.score !== null) {
      totalWeightedScore += (item.score / item.total) * item.weight;
      totalWeight += item.weight;
    }
  });
  if (totalWeight === 0) return 'N/A';
  return (totalWeightedScore / totalWeight * 100).toFixed(2);
}

// -------------------- 教师/管理员视图模拟 --------------------
const instructorExams = ref([
  {
    id: 'exam-inst-001',
    title: '任务分析阶段测试',
    module: 'task-analysis',
    moduleLabel: '任务分析',
    questions: 15,
    studentsSubmitted: 5,
    totalStudents: 10,
    status: 'Active',
    creationDate: '2025-05-20',
  },
  {
    id: 'exam-inst-002',
    title: '方案设计期中考',
    module: 'solution-design',
    moduleLabel: '方案设计',
    questions: 20,
    studentsSubmitted: 8,
    totalStudents: 10,
    status: 'Closed',
    creationDate: '2025-05-15',
  },
]);

const instructorGrades = ref([
  { id: 1, name: '张三', '任务分析报告 V1.0': 92, '方案设计期中考': 85, '前端基础概念小测': 78, overall: 85.33 },
  { id: 2, name: '李四', '任务分析报告 V1.0': 88, '方案设计期中考': 90, '前端基础概念小测': 82, overall: 86.67 },
  { id: 3, name: '王五', '任务分析报告 V1.0': null, '方案设计期中考': 75, '前端基础概念小测': 70, overall: 72.50 },
]);
const instructorGradeColumns = ref([
  { prop: 'name', label: '学生姓名', fixed: 'left', width: 120 },
  { prop: '任务分析报告 V1.0', label: '任务分析报告 V1.0 (作业)', width: 180 },
  { prop: '方案设计期中考', label: '方案设计期中考 (考试)', width: 180 },
  { prop: '前端基础概念小测', label: '前端基础概念小测 (小测)', width: 180 },
  { prop: 'overall', label: '总成绩', width: 100, fixed: 'right' },
]);

const isInstructor = ref(true); // 模拟用户角色，实际应通过后端判断

// 新建考试弹窗
const dialogVisible = ref(false);
const newExamForm = ref({
  title: '',
  module: '',
  dueDate: '',
  duration: 60,
  maxAttempts: 1,
  questions: [], // 模拟问题列表
});
const questionTypes = ref(['multiple-choice', 'single-choice', 'short-answer', 'essay']);

// 添加问题到新考试
const addQuestion = (type) => {
  newExamForm.value.questions.push({
    type: type,
    text: '',
    options: [], // for multiple/single choice
    answer: '',
    points: 10,
  });
};

// 移除问题
const removeQuestion = (index) => {
  newExamForm.value.questions.splice(index, 1);
};

// 提交新考试
const submitNewExam = () => {
  if (!newExamForm.value.title || !newExamForm.value.module || !newExamForm.value.dueDate) {
    ElMessage.error('请填写完整的考试信息！');
    return;
  }
  // 模拟添加考试逻辑
  const newExam = {
    id: `exam-inst-${Date.now()}`,
    title: newExamForm.value.title,
    module: newExamForm.value.module,
    moduleLabel: courseModulesOption.value.find(m => m.value === newExamForm.value.module)?.label,
    questions: newExamForm.value.questions.length,
    studentsSubmitted: 0,
    totalStudents: 10, // 假设总学生数
    status: 'Draft',
    creationDate: new Date().toISOString().slice(0, 10),
  };
  instructorExams.value.push(newExam);
  ElMessage.success('新考试创建成功！');
  dialogVisible.value = false;
  // 清空表单
  newExamForm.value = {
    title: '', module: '', dueDate: '', duration: 60, maxAttempts: 1, questions: [],
  };
};

const courseModulesOption = ref([
  { label: '任务分析', value: 'task-analysis' },
  { label: '方案设计', value: 'solution-design' },
  { label: '定妆实施', value: 'implementation' },
  { label: '拓展推广', value: 'expansion-promotion' },
]);

// 模拟考试进行中
const isTakingExam = ref(false);
const currentExam = ref(null);
const examTimer = ref(0);
let timerInterval = null;

const startExam = (exam) => {
  currentExam.value = exam;
  isTakingExam.value = true;
  examTimer.value = exam.duration * 60; // Convert to seconds
  timerInterval = setInterval(() => {
    if (examTimer.value > 0) {
      examTimer.value--;
    } else {
      clearInterval(timerInterval);
      ElMessage.warning('考试时间到！已自动提交。');
      submitExam(); // 自动提交
    }
  }, 1000);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const submitExam = async () => {
  clearInterval(timerInterval);
  await ElMessageBox.confirm('确定要提交考试吗？', '确认提交', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 模拟考试提交和评分
    const score = Math.floor(Math.random() * 40) + 60; // 60-100 随机分数
    const examIndex = studentExams.value.findIndex(e => e.id === currentExam.value.id);
    if (examIndex !== -1) {
      studentExams.value[examIndex].status = '已完成';
      studentExams.value[examIndex].score = score;
      studentExams.value[examIndex].gradeStatus = '已评分';
      studentExams.value[examIndex].attemptsMade++;
    }

    // 模拟添加到成绩单
    const existingGrade = studentGrades.value.find(g => g.item === currentExam.value.title);
    if (existingGrade) {
      existingGrade.score = score;
    } else {
      studentGrades.value.push({
        id: `grade-exam-${currentExam.value.id}`,
        item: currentExam.value.title,
        type: '考试',
        module: currentExam.value.moduleLabel,
        score: score,
        total: 100,
        weight: 0.4, // 假设考试权重
        feedback: '考试完成，成绩已出。',
      });
    }
    overallGrade.value = calculateOverallGrade(); // 重新计算总成绩

    ElMessage.success(`考试提交成功！你的成绩是 ${score} 分。`);
    isTakingExam.value = false;
    currentExam.value = null;
  }).catch(() => {
    // 用户取消提交，不停止计时器，可以继续考试
    timerInterval = setInterval(() => { /* resume timer */ }, 1000);
    ElMessage.info('已取消提交，你可以继续考试。');
  });
};

</script>

<template>
  <div class="exams-grades-module">
    <div v-if="!isInstructor">
      <el-card class="module-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Notebook /></el-icon> 我的考试</span>
          </div>
        </template>
        <div v-if="isTakingExam" class="exam-taking-interface">
          <el-alert type="info" :closable="false" center show-icon>
            <p>正在进行：<strong>{{ currentExam.title }}</strong></p>
            <el-progress :percentage="(examTimer / (currentExam.duration * 60) * 100)" :format="(p) => formatTime(examTimer)" :stroke-width="12" :color="['#0078d4', '#e6a23c', '#d13438']" />
          </el-alert>

          <div class="exam-content">
            <h3 class="exam-question">问题 1: 什么是 Vue 3 中的 Composition API？</h3>
            <el-input type="textarea" :rows="6" placeholder="请在此处输入你的答案..." />
          </div>

          <div class="exam-controls">
            <el-button type="primary" :icon="DocumentChecked" @click="submitExam">提交考试</el-button>
          </div>
        </div>

        <el-table
          v-else
          :data="studentExams"
          style="width: 100%"
          border
          class="excel-table"
          empty-text="暂无考试安排。"
        >
          <el-table-column prop="title" label="考试名称" min-width="180"></el-table-column>
          <el-table-column prop="moduleLabel" label="课程模块" width="120"></el-table-column>
          <el-table-column prop="dueDate" label="截止日期" width="160"></el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已完成' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="成绩" width="100">
            <template #default="scope">
              <span v-if="scope.row.score !== null" class="score-text">{{ scope.row.score }}</span>
              <span v-else>{{ scope.row.gradeStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
              <el-button
                v-if="scope.row.status === '未开始'"
                size="small"
                type="primary"
                @click="startExam(scope.row)"
              >
                开始考试
              </el-button>
              <el-button
                v-else-if="scope.row.status === '已完成' && scope.row.score !== null"
                size="small"
                type="info"
                disabled
              >
                已完成
              </el-button>
              <el-button
                v-else
                size="small"
                type="warning"
                disabled
              >
                进行中
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="module-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Trophy /></el-icon> 我的成绩</span>
          </div>
        </template>
        <div class="overall-grade">
          <span>总成绩:</span>
          <el-tag type="success" size="large" effect="dark" class="overall-grade-tag">
            {{ overallGrade }} 分
          </el-tag>
          <el-tooltip content="总成绩根据各项作业和考试的权重计算得出。" placement="top">
            <el-icon class="info-icon"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>

        <el-table :data="studentGrades" style="width: 100%" border class="excel-table" empty-text="暂无成绩。">
          <el-table-column prop="item" label="项目名称" min-width="180"></el-table-column>
          <el-table-column prop="type" label="类型" width="100"></el-table-column>
          <el-table-column prop="module" label="课程模块" width="120"></el-table-column>
          <el-table-column prop="score" label="得分" width="100">
            <template #default="scope">
              <span v-if="scope.row.score !== null" class="score-text">{{ scope.row.score }} / {{ scope.row.total }}</span>
              <span v-else>待评分</span>
            </template>
          </el-table-column>
          <el-table-column prop="weight" label="权重" width="80">
            <template #default="scope">
              {{ scope.row.weight * 100 }}%
            </template>
          </el-table-column>
          <el-table-column prop="feedback" label="反馈" min-width="200"></el-table-column>
        </el-table>
      </el-card>
    </div>

    <div v-else>
      <el-card class="module-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Setting /></el-icon> 考试管理 (教师/管理员)</span>
            <el-button type="primary" :icon="Plus" @click="dialogVisible = true" style="margin-left: auto;">
              新建考试
            </el-button>
          </div>
        </template>
        <el-table :data="instructorExams" style="width: 100%" border class="excel-table" empty-text="暂无考试。">
          <el-table-column prop="title" label="考试名称" min-width="180"></el-table-column>
          <el-table-column prop="moduleLabel" label="课程模块" width="120"></el-table-column>
          <el-table-column prop="questions" label="题目数量" width="100"></el-table-column>
          <el-table-column label="提交学生" width="120">
            <template #default="scope">
              {{ scope.row.studentsSubmitted }} / {{ scope.row.totalStudents }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100"></el-table-column>
          <el-table-column prop="creationDate" label="创建日期" width="120"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button size="small" :icon="Edit">编辑</el-button>
              <el-button size="small" type="success" :icon="DocumentChecked">评分</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card class="module-card">
        <template #header>
          <div class="card-header">
            <span><el-icon><Search /></el-icon> 学生成绩总览 (教师/管理员)</span>
          </div>
        </template>
        <el-table :data="instructorGrades" style="width: 100%" border class="excel-table" empty-text="暂无学生成绩。">
          <el-table-column
            v-for="column in instructorGradeColumns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :fixed="column.fixed"
          >
            <template #default="scope">
              <span v-if="column.prop === 'overall'">
                <el-tag :type="scope.row[column.prop] >= 80 ? 'success' : (scope.row[column.prop] >= 60 ? '' : 'danger')" effect="dark">
                  {{ scope.row[column.prop] !== null ? scope.row[column.prop] : 'N/A' }}
                </el-tag>
              </span>
              <span v-else-if="scope.row[column.prop] === null">
                待评分
              </span>
              <span v-else>
                {{ scope.row[column.prop] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="scope">
              <el-button size="small" :icon="Edit">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <el-dialog v-model="dialogVisible" title="新建考试" width="60%" class="new-exam-dialog">
      <el-form :model="newExamForm" label-width="120px">
        <el-form-item label="考试名称">
          <el-input v-model="newExamForm.title" placeholder="请输入考试名称"></el-input>
        </el-form-item>
        <el-form-item label="所属模块">
          <el-select v-model="newExamForm.module" placeholder="请选择课程模块" class="full-width-select">
            <el-option
              v-for="item in courseModulesOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker
            v-model="newExamForm.dueDate"
            type="datetime"
            placeholder="选择截止日期和时间"
            value-format="YYYY-MM-DD HH:mm"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="考试时长">
          <el-input-number v-model="newExamForm.duration" :min="10" :max="240" /> 分钟
        </el-form-item>
        <el-form-item label="最大尝试次数">
          <el-input-number v-model="newExamForm.maxAttempts" :min="1" :max="5" />
        </el-form-item>

        <el-divider>考试题目</el-divider>
        <div v-for="(question, index) in newExamForm.questions" :key="index" class="question-item">
          <el-form-item :label="`问题 ${index + 1} 类型`">
            <el-select v-model="question.type" placeholder="选择题目类型">
              <el-option label="多选题" value="multiple-choice"></el-option>
              <el-option label="单选题" value="single-choice"></el-option>
              <el-option label="简答题" value="short-answer"></el-option>
              <el-option label="论述题" value="essay"></el-option>
            </el-select>
            <el-button type="danger" :icon="Minus" circle size="small" @click="removeQuestion(index)" style="margin-left: 10px;"></el-button>
          </el-form-item>
          <el-form-item label="题目内容">
            <el-input v-model="question.text" type="textarea" :rows="2" placeholder="请输入题目内容"></el-input>
          </el-form-item>
          <el-form-item label="分值">
            <el-input-number v-model="question.points" :min="1" />
          </el-form-item>
          <div v-if="question.type === 'multiple-choice' || question.type === 'single-choice'">
            <el-form-item label="选项 (每行一个)">
              <el-input v-model="question.optionsText" type="textarea" :rows="3" placeholder="请输入选项，每行一个"></el-input>
            </el-form-item>
            <el-form-item label="正确答案">
                <el-input v-model="question.answer" placeholder="请输入正确答案 (选项内容)"></el-input>
            </el-form-item>
          </div>
          <div v-else-if="question.type === 'short-answer' || question.type === 'essay'">
            <el-form-item label="参考答案">
              <el-input v-model="question.answer" type="textarea" :rows="3" placeholder="请输入参考答案"></el-input>
            </el-form-item>
          </div>
          <el-divider content-position="right">--</el-divider>
        </div>

        <el-form-item label="添加题目">
          <el-button type="info" size="small" @click="addQuestion('single-choice')">单选题</el-button>
          <el-button type="info" size="small" @click="addQuestion('multiple-choice')">多选题</el-button>
          <el-button type="info" size="small" @click="addQuestion('short-answer')">简答题</el-button>
          <el-button type="info" size="small" @click="addQuestion('essay')">论述题</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewExam">创建考试</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.exams-grades-module {
  padding: 10px;
}

.module-card {
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}
.card-header .el-icon {
  margin-right: 8px;
  font-size: 1.5rem;
  color: #0078d4; /* Excel Blue */
}

/* Excel 风格表格 */
.excel-table {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden; /* Ensure rounded corners */
}

.excel-table :deep(.el-table__header-wrapper) {
  background-color: #f5f7fa; /* Light header background */
}

.excel-table :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #e0e0e0; /* Cell borders */
}
.excel-table :deep(.el-table__header-wrapper th:last-child) {
  border-right: none;
}

.excel-table :deep(.el-table__cell) {
  border-right: 1px solid #e0e0e0; /* Cell borders */
  border-bottom: 1px solid #e0e0e0;
  color: #606266;
}
.excel-table :deep(.el-table__cell:last-child) {
  border-right: none;
}
.excel-table :deep(.el-table__row:last-child .el-table__cell) {
  border-bottom: none;
}


.excel-table :deep(.el-table__row:nth-child(even)) {
  background-color: #fefefe; /* Even row lighter background */
}

.excel-table :deep(.el-table__row:hover) {
  background-color: #e6f7ff !important; /* Light blue on hover */
}

.score-text {
  font-weight: bold;
  color: #333;
}

.overall-grade {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.overall-grade-tag {
  font-size: 1.5rem;
  padding: 8px 15px;
  border-radius: 20px;
}

.info-icon {
  font-size: 1.2em;
  color: #909399;
  cursor: pointer;
  margin-left: 5px;
}

/* 考试进行中界面 */
.exam-taking-interface {
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.exam-taking-interface .el-alert {
  margin-bottom: 20px;
  font-size: 1.1rem;
}
.exam-taking-interface .el-progress {
  margin-top: 10px;
}

.exam-content {
  margin-top: 20px;
  padding: 20px;
  border: 1px dashed #e0e0e0;
  border-radius: 8px;
  background-color: #fcfcfc;
}
.exam-question {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
}

.exam-controls {
  text-align: center;
  margin-top: 30px;
}

/* 新建考试弹窗 */
.new-exam-dialog .el-input,
.new-exam-dialog .el-select,
.new-exam-dialog .el-date-picker {
  width: 100%;
}
.new-exam-dialog .el-divider {
  margin: 30px 0;
}
.new-exam-dialog .question-item {
  border: 1px dashed #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #fdfdfd;
  position: relative;
}
</style>