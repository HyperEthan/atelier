<script setup>
import { ref, watch } from 'vue';
import { ElSelect, ElOption, ElUpload, ElButton, ElInput, ElImage, ElCard, ElTag, ElMessage, ElMessageBox } from 'element-plus';
import { UploadFilled, Document, ChatDotRound, StarFilled, Plus, CircleCheck } from '@element-plus/icons-vue';

// 导入作业图片
import task1 from '@/assets/images/homework/1/1.jpg';
import task2 from '@/assets/images/homework/1/2.jpg';
import task3 from '@/assets/images/homework/1/3.jpg';
import task4 from '@/assets/images/homework/1/4.jpg';

// 模拟数据：课程模块
const courseModules = ref([
  { label: '任务分析', value: 'task-analysis', images: [task1, task2, task3, task4] },
  { label: '方案设计', value: 'solution-design', images: [] },
  { label: '定妆实施', value: 'implementation', images: [] },
  { label: '拓展推广', value: 'expansion-promotion', images: [] },
]);

// 模拟数据：已提交作业和反馈
const submittedAssignments = ref([
  {
    id: 'hw-001',
    module: 'task-analysis',
    moduleLabel: '任务分析',
    title: '任务分析报告 V1.0',
    submissionDate: '2025-05-28 14:30',
    dueDate: '2025-05-30 23:59',
    status: 'graded',
    grade: 92,
    feedback: '报告结构清晰，分析深入，但某些数据来源需要更详细的引用。干得好！',
    uploadedFile: '任务分析报告.docx',
  },
  {
    id: 'hw-002',
    module: 'solution-design',
    moduleLabel: '方案设计',
    title: '方案设计稿初稿',
    submissionDate: '2025-05-29 10:00',
    dueDate: '2025-06-05 23:59',
    status: 'submitted',
    grade: null,
    feedback: null,
    uploadedFile: '方案设计稿.zip',
  },
]);

const selectedModule = ref('');
const moduleImages = ref([]);
const previewImageSrcList = ref([]); // 用于ElImage的预览列表

const homeworkTitle = ref('');
const homeworkComment = ref('');
const uploadedFileList = ref([]); // 用于el-upload
const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleFileChange = (uploadFile, fileList) => {
  uploadedFileList.value = fileList;
  console.log('updated uploadedFileList:', uploadedFileList.value); // For debugging
};

// 监听选中的课程模块，更新图片列表
watch(selectedModule, (newValue) => {
  const module = courseModules.value.find(m => m.value === newValue);
  if (module) {
    moduleImages.value = module.images;
    previewImageSrcList.value = module.images; // 设置预览列表
  } else {
    moduleImages.value = [];
    previewImageSrcList.value = [];
  }
}, { immediate: true }); // 立即执行一次，确保初始状态正确

// 处理文件上传
const handleFileUploadSuccess = (response, file, fileList) => {
  uploadedFileList.value = fileList;
  ElMessage.success(`${file.name} 上传成功！`);
  // 实际开发中，这里需要从后端获取文件路径或ID
};

const handleFileUploadError = (error, file, fileList) => {
  ElMessage.error(`${file.name} 上传失败，请重试！`);
  console.error('Upload error:', error);
};

const handleRemoveFile = (file, fileList) => {
  uploadedFileList.value = fileList;
  ElMessage.info(`文件 ${file.name} 已移除。`);
};

// 提交作业
const submitHomework = async () => {
  if (!selectedModule.value) {
    ElMessage.warning('请选择一个课程模块。');
    return;
  }
  if (uploadedFileList.value.length === 0 && homeworkComment.value.trim() === '') {
    ElMessage.warning('请至少上传一个文件或填写提交说明。');
    return;
  }

  await ElMessageBox.confirm('确定要提交作业吗？', '确认提交', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    // 模拟提交逻辑
    const newAssignment = {
      id: `hw-${Date.now()}`,
      module: selectedModule.value,
      moduleLabel: courseModules.value.find(m => m.value === selectedModule.value)?.label,
      title: homeworkTitle.value || '未命名作业',
      submissionDate: new Date().toLocaleString(),
      dueDate: '2025-06-30 23:59', // 假设一个截止日期
      status: 'submitted',
      grade: null,
      feedback: null,
      uploadedFile: uploadedFileList.value.map(f => f.name).join(', ') || '无文件',
    };
    submittedAssignments.value.unshift(newAssignment); // 添加到已提交列表最前面

    ElMessage.success('作业提交成功！');
    // 清空表单
    homeworkTitle.value = '';
    homeworkComment.value = '';
    uploadedFileList.value = [];
    selectedModule.value = '';
  }).catch(() => {
    ElMessage.info('已取消提交。');
  });
};

// 根据成绩判断标签类型
const getGradeTagType = (grade) => {
  if (grade === null) return 'info';
  if (grade >= 90) return 'success';
  if (grade >= 75) return ''; // Default tag
  return 'warning';
};
</script>

<template>
  <div class="homework-submission-module">
    <el-card class="module-card submission-section">
      <template #header>
        <div class="card-header">
          <span><el-icon><Document /></el-icon> 提交作业</span>
        </div>
      </template>
      <el-form label-width="120px" @submit.prevent="submitHomework">
        <el-form-item label="选择课程模块">
          <el-select v-model="selectedModule" placeholder="请选择课程模块" class="full-width-select">
            <el-option
              v-for="item in courseModules"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="moduleImages.length > 0" label="参考图片">
          <div class="image-gallery">
            <el-image
              v-for="(src, index) in moduleImages"
              :key="index"
              :src="src"
              :preview-src-list="previewImageSrcList"
              :initial-index="index"
              fit="cover"
              class="gallery-image"
            />
          </div>
          <p class="image-tip">点击图片可放大查看</p>
        </el-form-item>

        <el-form-item label="作业标题 (可选)">
          <el-input v-model="homeworkTitle" placeholder="请输入作业标题" />
        </el-form-item>

        <el-form-item label="提交文件">
          <el-upload
            class="upload-demo"
            action="#"
            drag
            multiple
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveFile"
            :file-list="uploadedFileList"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="提交说明/评论">
          <el-input
            v-model="homeworkComment"
            type="textarea"
            :rows="4"
            placeholder="请在此处填写您对作业的说明或评论"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitHomework" :icon="CircleCheck">
            提交作业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="module-card feedback-section">
      <template #header>
        <div class="card-header">
          <span><el-icon><ChatDotRound /></el-icon> 我的作业与反馈</span>
        </div>
      </template>
      <div v-if="submittedAssignments.length === 0" class="empty-state">
        <p>您还没有提交任何作业。</p>
      </div>
      <el-timeline v-else class="homework-timeline">
        <el-timeline-item
          v-for="assignment in submittedAssignments"
          :key="assignment.id"
          :timestamp="`提交日期: ${assignment.submissionDate}`"
          placement="top"
        >
          <el-card>
            <h4 class="assignment-title">
              {{ assignment.moduleLabel }} - {{ assignment.title || '未命名作业' }}
            </h4>
            <p class="assignment-info">
              <el-tag :type="assignment.status === 'graded' ? 'success' : 'info'" size="large">
                {{ assignment.status === 'graded' ? '已评分' : '待评分' }}
              </el-tag>
              <span v-if="assignment.grade !== null" class="grade-display">
                <el-tag :type="getGradeTagType(assignment.grade)" effect="dark" size="large">
                  成绩: {{ assignment.grade }}
                </el-tag>
              </span>
              <span class="due-date-text">截止日期: {{ assignment.dueDate }}</span>
            </p>
            <p class="file-display">
              <el-icon><Document /></el-icon> 提交文件: {{ assignment.uploadedFile }}
            </p>
            <div v-if="assignment.feedback" class="feedback-content">
              <p><strong><el-icon><StarFilled /></el-icon> 教师反馈:</strong></p>
              <p>{{ assignment.feedback }}</p>
            </div>
            <div v-else class="feedback-content no-feedback">
              <p>暂无教师反馈。</p>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped>
.homework-submission-module {
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
  color: #0078d4;
}

.full-width-select {
  width: 100%;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.gallery-image {
  width: 120px;
  height: 90px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
/* .gallery-image:hover {
  transform: scale(1.05);
} */

.image-tip {
  font-size: 0.85rem;
  color: #888;
  margin-top: 5px;
}

/* ElUpload 样式调整 */
.upload-demo :deep(.el-upload-dragger) {
  padding: 20px;
  border-radius: 8px;
  background-color: #fafafa;
  transition: border-color 0.3s ease, background-color 0.3s ease;
  height: 100%;
  align-content: space-around;
}
.upload-demo :deep(.el-upload-dragger:hover) {
  border-color: #0078d4;
  background-color: #f0f8ff;
}
.upload-demo .el-icon--upload {
  font-size: 48px;
  color: #0078d4;
}
.upload-demo .el-upload__text em {
  color: #0078d4;
  font-weight: 600;
}
.el-upload__tip {
  color: #888;
  font-size: 0.85rem;
}

.homework-timeline {
  margin-top: 20px;
  padding-left: 10px; /* Align timeline better */
}

.homework-timeline .el-card {
  border-left: 4px solid #0078d4; /* Accent border */
  border-radius: 6px;
}

.assignment-title {
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.assignment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.grade-display {
  font-weight: 700;
}
.grade-display .el-tag {
  border-radius: 12px;
}
.due-date-text {
  font-style: italic;
  color: #888;
}

.file-display {
  font-size: 0.9rem;
  color: #555;
  margin-top: 5px;
  display: flex;
  align-items: center;
}
.file-display .el-icon {
  margin-right: 5px;
}

.feedback-content {
  margin-top: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px dashed #e0e0e0;
}
.feedback-content strong {
  color: #0078d4;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.feedback-content strong .el-icon {
  margin-right: 5px;
  color: #f7b731; /* Star color */
}
.feedback-content p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}
.feedback-content.no-feedback {
  font-style: italic;
  color: #888;
  text-align: center;
}

.empty-state {
  text-align: center;
  padding: 50px;
  color: #999;
  font-size: 1.1rem;
}
</style>