<script setup>
import { ref, computed, watch } from 'vue';
import {
  ElButton, ElCard, ElInput, ElSelect, ElOption, ElTable, ElTableColumn,
  ElTag, ElDialog, ElForm, ElFormItem, ElMessageBox, ElMessage,
  ElAvatar, ElIcon, ElPagination, ElEmpty
} from 'element-plus';
import {
  ChatDotRound, Search, Filter, Plus, Document,
  Message, UserFilled, Edit, Check, Link, StarFilled, CirclePlus,
  ArrowUp, ArrowDown, Setting
} from '@element-plus/icons-vue';

// --- 模拟数据 ---
const currentUser = ref({ // 模拟当前登录用户
  id: 'user-001',
  name: '王小明',
  role: 'student', // 'student' 或 'teacher'
  avatar: 'https://cube.elemecdn.com/0/88/03b0dff45cf2a9a7d7591c8924087png.png'
});

const teachers = ref([
  { id: 'teacher-001', name: '张老师', avatar: 'https://cube.elemecdn.com/d/e7/sgygkjgjlajdjgdlajgldjgaljjgla.jpg', role: 'teacher' }
]);

const students = ref([
  { id: 'user-001', name: '王小明', avatar: 'https://cube.elemecdn.com/0/88/03b0dff45cf2a9a7d7591c8924087png.png', role: 'student' },
  { id: 'user-002', name: '李华', avatar: 'https://cube.elemecdn.com/3/7c/fa2ab6ed1949da67f103b418a90bbpng.png', role: 'student' }
]);

const users = computed(() => [...teachers.value, ...students.value]);
const getUserInfo = (id) => users.value.find(u => u.id === id) || { name: '未知', role: 'unknown', avatar: '' };

const messages = ref([
  {
    id: 'msg-001',
    type: 'question', // 'question' | 'notice'
    senderId: 'user-001',
    title: 'Vue 3 生命周期钩子函数的问题',
    content: '请问 `onMounted` 和 `mounted` 有什么本质区别？Composition API 真的比 Options API 更好用吗？',
    courseModule: '任务分析', // 可以关联到课程模块
    status: 'pending', // 'pending' | 'resolved' | 'pinned'
    createdAt: '2025-05-28 10:00',
    lastReplyAt: '2025-05-29 11:30',
    replies: [
      {
        id: 'reply-001-1', senderId: 'teacher-001',
        content: '这是一个很好的问题！`onMounted` 是 Composition API 的钩子，必须在 `setup` 中使用，而 `mounted` 是 Options API 的选项。Composition API 在逻辑复用和代码组织方面有优势。',
        createdAt: '2025-05-28 14:00',
        isBestAnswer: false,
      },
      {
        id: 'reply-001-2', senderId: 'user-002',
        content: '我觉得 Composition API 更清晰，特别是项目复杂的时候。',
        createdAt: '2025-05-29 11:30',
        isBestAnswer: false,
      },
    ],
    attachments: [],
    bestAnswerId: null,
  },
  {
    id: 'msg-002',
    type: 'notice',
    senderId: 'teacher-001',
    title: '关于期末项目提交截止日期的通知',
    content: '各位同学，期末项目提交截止日期已延期至 2025年6月15日 23:59，请大家合理安排时间。',
    courseModule: '所有模块',
    status: 'pinned',
    createdAt: '2025-05-27 09:00',
    lastReplyAt: '2025-05-27 09:00',
    replies: [],
    attachments: [{ name: '项目要求变更.pdf', url: '#' }],
    bestAnswerId: null,
  },
  {
    id: 'msg-003',
    type: 'question',
    senderId: 'user-002',
    title: 'Element Plus 表格动态列问题',
    content: '在 Element Plus 中，如何根据后台返回的数据动态生成表格列？我用 `v-for` 循环 `el-table-column` 时遇到了一些问题。',
    courseModule: '定妆实施',
    status: 'resolved',
    createdAt: '2025-05-25 15:00',
    lastReplyAt: '2025-05-26 10:00',
    replies: [
      {
        id: 'reply-003-1', senderId: 'teacher-001',
        content: '你需要确保 `key` 绑定正确，并且 `prop` 对应数据字段。可以参考官方文档的动态列示例。如果问题依然存在，请提供你的代码片段。',
        createdAt: '2025-05-25 16:30',
        isBestAnswer: true,
      },
    ],
    attachments: [],
    bestAnswerId: 'reply-003-1',
  },
]);

// --- 筛选与搜索 ---
const searchQuery = ref('');
const filterModule = ref('');
const filterStatus = ref('');
const filterSenderRole = ref('');

const courseModulesOptions = [
  { label: '所有模块', value: '' },
  { label: '任务分析', value: '任务分析' },
  { label: '方案设计', value: '方案设计' },
  { label: '定妆实施', value: '定妆实施' },
  { label: '拓展推广', value: '拓展推广' },
];

const statusOptions = [
  { label: '所有状态', value: '' },
  { label: '待解决', value: 'pending' },
  { label: '已解决', value: 'resolved' },
  { label: '置顶', value: 'pinned' },
];

const senderRoleOptions = [
  { label: '所有角色', value: '' },
  { label: '教师', value: 'teacher' },
  { label: '学生', value: 'student' },
];

const filteredMessages = computed(() => {
  let filtered = messages.value;

  // 1. 搜索
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(msg =>
      msg.title.toLowerCase().includes(query) ||
      msg.content.toLowerCase().includes(query) ||
      msg.replies.some(reply => reply.content.toLowerCase().includes(query))
    );
  }

  // 2. 模块筛选
  if (filterModule.value) {
    filtered = filtered.filter(msg => msg.courseModule === filterModule.value);
  }

  // 3. 状态筛选
  if (filterStatus.value) {
    filtered = filtered.filter(msg => msg.status === filterStatus.value);
  }

  // 4. 发布者角色筛选
  if (filterSenderRole.value) {
    filtered = filtered.filter(msg => {
      const sender = getUserInfo(msg.senderId);
      return sender.role === filterSenderRole.value;
    });
  }

  // 5. 排序：置顶优先，然后按最新回复时间倒序
  return filtered.sort((a, b) => {
    if (a.status === 'pinned' && b.status !== 'pinned') return -1;
    if (a.status !== 'pinned' && b.status === 'pinned') return 1;
    return new Date(b.lastReplyAt).getTime() - new Date(a.lastReplyAt).getTime();
  });
});

// --- 分页 ---
const currentPage = ref(1);
const pageSize = ref(5); // 每页显示5条留言
const totalMessages = computed(() => filteredMessages.value.length);

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredMessages.value.slice(start, end);
});

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

// --- 发布新留言 ---
const newMessageDialogVisible = ref(false);
const newMessageForm = ref({
  title: '',
  content: '',
  courseModule: '',
  type: 'question', // 默认是提问
  attachments: [{ name: '', url: '' }],
});

const publishNewMessage = async () => {
  if (!newMessageForm.value.title || !newMessageForm.value.content) {
    ElMessage.warning('标题和内容不能为空！');
    return;
  }
  if (newMessageForm.value.type === 'question' && !newMessageForm.value.courseModule) {
    ElMessage.warning('提问请选择课程模块！');
    return;
  }

  await ElMessageBox.confirm('确定要发布这条留言吗？', '确认发布', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    const now = new Date().toLocaleString();
    messages.value.unshift({ // 添加到最前面
      id: `msg-${Date.now()}`,
      senderId: currentUser.value.id,
      title: newMessageForm.value.title,
      content: newMessageForm.value.content,
      courseModule: newMessageForm.value.courseModule,
      type: newMessageForm.value.type,
      status: newMessageForm.value.type === 'notice' ? 'pinned' : 'pending',
      createdAt: now,
      lastReplyAt: now,
      replies: [],
      attachments: newMessageForm.value.attachments, // 模拟附件
      bestAnswerId: null,
    });
    ElMessage.success('留言发布成功！');
    newMessageDialogVisible.value = false;
    resetNewMessageForm();
  }).catch(() => {
    ElMessage.info('已取消发布。');
  });
};

const resetNewMessageForm = () => {
  newMessageForm.value = {
    title: '',
    content: '',
    courseModule: '',
    type: 'question',
    attachments: [{ name: '', url: '' }],
  };
};

// --- 留言详情与回复 ---
const selectedMessage = ref(null);
const replyContent = ref('');
const messageDetailDialogVisible = ref(false);

const openMessageDetail = (message) => {
  selectedMessage.value = message;
  messageDetailDialogVisible.value = true;
};

const postReply = async () => {
  if (!replyContent.value.trim()) {
    ElMessage.warning('回复内容不能为空！');
    return;
  }
  if (!selectedMessage.value) return;

  await ElMessageBox.confirm('确定要发布这条回复吗？', '确认回复', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
  }).then(() => {
    const now = new Date().toLocaleString();
    selectedMessage.value.replies.push({
      id: `reply-${Date.now()}`,
      senderId: currentUser.value.id,
      content: replyContent.value.trim(),
      createdAt: now,
      isBestAnswer: false,
    });
    selectedMessage.value.lastReplyAt = now; // 更新最新回复时间

    // 如果是老师回复问题，并且问题是待解决，可以考虑自动标记为已解决
    if (currentUser.value.role === 'teacher' && selectedMessage.value.type === 'question' && selectedMessage.value.status === 'pending') {
        selectedMessage.value.status = 'resolved';
    }

    ElMessage.success('回复成功！');
    replyContent.value = ''; // 清空回复框
  }).catch(() => {
    ElMessage.info('已取消回复。');
  });
};

// 标记为最佳答案
const markAsBestAnswer = (reply) => {
  if (selectedMessage.value && selectedMessage.value.senderId === currentUser.value.id && selectedMessage.value.type === 'question') {
    selectedMessage.value.replies.forEach(r => r.isBestAnswer = false); // 清除旧的最佳答案
    reply.isBestAnswer = true;
    selectedMessage.value.bestAnswerId = reply.id;
    selectedMessage.value.status = 'resolved'; // 问题标记为已解决
    ElMessage.success('已标记为最佳答案！');
  } else {
    ElMessage.warning('只有提问者才能标记最佳答案，且仅限于提问帖。');
  }
};

// 教师操作：标记为已解决/待解决
const toggleStatus = (message) => {
  if (currentUser.value.role === 'teacher') {
    message.status = message.status === 'resolved' ? 'pending' : 'resolved';
    ElMessage.success(`留言状态已更新为：${message.status === 'resolved' ? '已解决' : '待解决'}`);
  } else {
    ElMessage.warning('只有教师才能更改问题状态。');
  }
};

// 教师操作：置顶/取消置顶
const togglePinned = (message) => {
  if (currentUser.value.role === 'teacher') {
    message.status = message.status === 'pinned' ? 'pending' : 'pinned';
    ElMessage.success(`留言状态已更新为：${message.status === 'pinned' ? '已置顶' : '已取消置顶'}`);
  } else {
    ElMessage.warning('只有教师才能置顶留言。');
  }
};

// 获取状态标签类型
const getStatusTagType = (status) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'resolved': return 'success';
    case 'pinned': return ''; // 默认主题色
    default: return 'info';
  }
};

const getRoleTagType = (role) => {
  return role === 'teacher' ? 'success' : 'info';
};

// --- 切换用户角色 (仅用于演示) ---
const toggleUserRole = () => {
  currentUser.value.role = currentUser.value.role === 'student' ? 'teacher' : 'student';
  currentUser.value.name = currentUser.value.role === 'student' ? '王小明' : '张老师';
  currentUser.value.id = currentUser.value.role === 'student' ? 'user-001' : 'teacher-001';
  ElMessage.info(`已切换到${currentUser.value.role === 'student' ? '学生' : '教师'}视图`);
};
</script>

<template>
  <div class="message-board-container">
    <h1 class="page-title">师生留言与答疑区</h1>

    <el-button @click="toggleUserRole" class="toggle-role-button">
      <el-icon><UserFilled /></el-icon> 切换为{{ currentUser.role === 'student' ? '教师' : '学生' }}视图
    </el-button>

    <el-card class="filter-card">
      <div class="filter-area">
        <el-input
          v-model="searchQuery"
          placeholder="搜索标题、内容或回复..."
          :prefix-icon="Search"
          clearable
          class="search-input"
        />
        <el-select v-model="filterModule" placeholder="按模块筛选" clearable class="filter-select">
          <el-option
            v-for="item in courseModulesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="filterStatus" placeholder="按状态筛选" clearable class="filter-select">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="filterSenderRole" placeholder="按发布者筛选" clearable class="filter-select">
          <el-option
            v-for="item in senderRoleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" :icon="Plus" @click="newMessageDialogVisible = true">
          发布新留言
        </el-button>
      </div>
    </el-card>

    <el-card class="message-list-card">
      <el-table
        :data="paginatedMessages"
        style="width: 100%"
        border
        class="message-table"
        empty-text="暂无留言，尝试发布一个吧！"
      >
        <el-table-column prop="title" label="标题" min-width="250">
          <template #default="scope">
            <div class="message-title-cell" @click="openMessageDetail(scope.row)">
              <el-tag v-if="scope.row.status === 'pinned'" type="warning" size="small" effect="dark" class="status-tag">置顶</el-tag>
              <el-tag v-else :type="getStatusTagType(scope.row.status)" size="small" class="status-tag">
                {{ scope.row.status === 'pending' ? '待解决' : '已解决' }}
              </el-tag>
              <span class="message-title-text">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布者" width="120">
          <template #default="scope">
            <div class="user-display">
              <el-avatar :size="24" :src="getUserInfo(scope.row.senderId).avatar" class="user-avatar"></el-avatar>
              <span class="user-name">{{ getUserInfo(scope.row.senderId).name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="模块" width="120">
            <template #default="scope">
                <el-tag size="small" :type="scope.row.type === 'notice' ? 'danger' : 'info'">
                    {{ scope.row.courseModule }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="回复" width="80" align="center">
          <template #default="scope">
            <div class="reply-count">
              <el-icon><Message /></el-icon> {{ scope.row.replies.length }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lastReplyAt" label="最新回复" width="160"></el-table-column>
        <el-table-column label="操作" width="160" fixed="right" align="center">
          <template #default="scope">
            <el-button size="small" @click="openMessageDetail(scope.row)">
              查看详情
            </el-button>
            <el-dropdown v-if="currentUser.role === 'teacher'">
              <el-button size="small" type="info" :icon="Setting">
                管理
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="toggleStatus(scope.row)">
                    <el-icon><Check /></el-icon>
                    {{ scope.row.status === 'resolved' ? '标记为待解决' : '标记为已解决' }}
                  </el-dropdown-item>
                  <el-dropdown-item @click="togglePinned(scope.row)">
                    <el-icon><ArrowUp /></el-icon>
                    {{ scope.row.status === 'pinned' ? '取消置顶' : '置顶' }}
                  </el-dropdown-item>
                  </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="totalMessages > pageSize"
        background
        layout="prev, pager, next, total"
        :total="totalMessages"
        :page-size="pageSize"
        v-model:current-page="currentPage"
        @current-change="handlePageChange"
        class="pagination-bottom"
      />
      <el-empty v-else-if="filteredMessages.length === 0" description="没有找到符合条件的留言"></el-empty>
    </el-card>

    <el-dialog
      v-model="newMessageDialogVisible"
      title="发布新留言"
      width="600px"
      @closed="resetNewMessageForm"
      class="new-message-dialog"
    >
      <el-form :model="newMessageForm" label-width="80px">
        <el-form-item label="留言类型">
          <el-radio-group v-model="newMessageForm.type">
            <el-radio value="question">提问</el-radio>
            <el-radio value="notice" :disabled="currentUser.role !== 'teacher'">公告/通知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="newMessageForm.title" placeholder="请输入留言标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="newMessageForm.content"
            type="textarea"
            :rows="6"
            placeholder="请输入留言内容，支持 Markdown (简化演示)"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="newMessageForm.type === 'question'" label="课程模块">
          <el-select v-model="newMessageForm.courseModule" placeholder="请选择相关课程模块" class="full-width-select">
            <el-option
              v-for="item in courseModulesOptions.slice(1)" :key="item.value" :label="item.label" :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="附件">
          <el-input v-model="newMessageForm.attachments[0].name" placeholder="附件名" />
          <el-button type="info" size="small" :icon="Link" style="margin-left: 10px;">上传附件</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newMessageDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="publishNewMessage">发布</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="messageDetailDialogVisible"
      :title="selectedMessage ? selectedMessage.title : '留言详情'"
      width="70%"
      class="message-detail-dialog"
    >
      <div v-if="selectedMessage" class="message-detail-content">
        <el-card class="original-message-card">
          <template #header>
            <div class="card-header">
              <el-avatar :size="30" :src="getUserInfo(selectedMessage.senderId).avatar"></el-avatar>
              <span class="user-name">{{ getUserInfo(selectedMessage.senderId).name }}</span>
              <el-tag :type="getRoleTagType(getUserInfo(selectedMessage.senderId).role)" size="small" effect="dark" class="role-tag">
                {{ getUserInfo(selectedMessage.senderId).role === 'teacher' ? '教师' : '学生' }}
              </el-tag>
              <el-tag :type="getStatusTagType(selectedMessage.status)" size="small" class="status-tag detail-status-tag">
                {{ selectedMessage.status === 'pending' ? '待解决' : (selectedMessage.status === 'resolved' ? '已解决' : '置顶公告') }}
              </el-tag>
              <span class="timestamp">{{ selectedMessage.createdAt }}</span>
            </div>
          </template>
          <p class="message-content-text">{{ selectedMessage.content }}</p>
          <div v-if="selectedMessage.attachments.length > 0" class="attachments">
            <p>附件:</p>
            <ul>
              <li v-for="(attachment, idx) in selectedMessage.attachments" :key="idx">
                <el-icon><Link /></el-icon>
                <a :href="attachment.url || '#'" target="_blank">{{ attachment.name }}</a>
              </li>
            </ul>
          </div>
        </el-card>

        <el-divider>所有回复 ({{ selectedMessage.replies.length }})</el-divider>

        <div class="reply-list">
          <el-empty v-if="selectedMessage.replies.length === 0" description="暂无回复"></el-empty>
          <el-card v-for="reply in selectedMessage.replies" :key="reply.id" class="reply-item-card">
            <template #header>
              <div class="card-header">
                <el-avatar :size="24" :src="getUserInfo(reply.senderId).avatar"></el-avatar>
                <span class="user-name">{{ getUserInfo(reply.senderId).name }}</span>
                <el-tag :type="getRoleTagType(getUserInfo(reply.senderId).role)" size="small" effect="dark" class="role-tag">
                  {{ getUserInfo(reply.senderId).role === 'teacher' ? '教师' : '学生' }}
                </el-tag>
                <span class="timestamp">{{ reply.createdAt }}</span>
                <el-tag v-if="reply.isBestAnswer" type="success" size="small" effect="dark" class="best-answer-tag">
                  <el-icon><StarFilled /></el-icon> 最佳答案
                </el-tag>
              </div>
            </template>
            <p class="reply-content-text">{{ reply.content }}</p>
            <div class="reply-actions">
              <el-button
                v-if="currentUser.id === selectedMessage.senderId && selectedMessage.type === 'question' && !reply.isBestAnswer"
                type="success" size="small" :icon="Check"
                @click="markAsBestAnswer(reply)"
              >采纳为最佳</el-button>
            </div>
          </el-card>
        </div>

        <el-divider>发布回复</el-divider>
        <el-input
          v-model="replyContent"
          type="textarea"
          :rows="4"
          placeholder="请输入你的回复内容..."
          class="reply-input"
        />
        <div class="reply-actions-bottom">
          <el-button type="primary" :icon="CirclePlus" @click="postReply">发布回复</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 通用样式 */
.message-board-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #fff;
}

.page-title {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  font-size: 2.2rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}
.page-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: #0078d4; /* Accent color */
  border-radius: 2px;
}

/* 切换角色按钮 */
.toggle-role-button {
  display: block;
  margin: -15px auto 20px;
  font-size: 0.9em;
  color: #0078d4;
  background-color: #e6f7ff;
  border-color: #e6f7ff;
}
.toggle-role-button:hover {
  background-color: #cce9ff;
  border-color: #cce9ff;
}

/* 筛选卡片 */
.filter-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.filter-area {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.search-input {
  flex: 2; /* 占据更多空间 */
  min-width: 250px;
}

.filter-select {
  flex: 1;
  min-width: 120px;
}

/* 留言列表卡片 */
.message-list-card {
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.message-table {
  border: 1px solid #e0e0e0; /* Table border */
  border-radius: 6px;
  overflow: hidden;
}

.message-table :deep(.el-table__header-wrapper) {
  background-color: #f5f7fa;
}

.message-table :deep(.el-table__header-wrapper th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
  border-bottom: 1px solid #dcdfe6;
  border-right: 1px solid #e0e0e0;
}

.message-table :deep(.el-table__cell) {
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  color: #606266;
  padding: 12px 0;
}

.message-table :deep(.el-table__row:nth-child(even)) {
  background-color: #fefefe;
}

.message-table :deep(.el-table__row:hover) {
  background-color: #e6f7ff !important;
}

.message-title-cell {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 10px;
}
.message-title-cell:hover .message-title-text {
  color: #0078d4;
}

.status-tag {
  margin-right: 8px;
  border-radius: 4px;
}
.message-title-text {
  font-weight: 500;
  transition: color 0.2s ease;
}

.user-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 10px;
}
.user-name {
  font-size: 0.95em;
  color: #555;
}

.reply-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #666;
  font-size: 0.9em;
}
.reply-count .el-icon {
  font-size: 1.1em;
  color: #909399;
}

.pagination-bottom {
  margin-top: 20px;
  justify-content: flex-end;
  display: flex;
}

/* 发布新留言弹窗 */
.new-message-dialog .el-form-item {
  margin-bottom: 20px;
}
.new-message-dialog .full-width-select {
  width: 100%;
}
.new-message-dialog .el-textarea {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}
.new-message-dialog .el-input {
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

/* 留言详情弹窗 */
.message-detail-dialog .original-message-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  background-color: #fbfdff; /* Light blueish background */
  border-left: 4px solid #0078d4;
}

.message-detail-dialog .card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #fff;
  padding-right: 15px; /* Spacing for right aligned elements */
}
.message-detail-dialog .card-header .user-name {
  font-size: 1.1em;
}
.message-detail-dialog .card-header .role-tag {
  margin-left: 5px;
}
.message-detail-dialog .card-header .timestamp {
  margin-left: auto; /* Push to right */
  font-size: 0.85em;
  color: #888;
  font-weight: normal;
}
.detail-status-tag {
    margin-left: 10px;
}

.message-content-text {
  line-height: 1.8;
  font-size: 1.05em;
  color: #444;
}

.attachments ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
}
.attachments li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.attachments li .el-icon {
  margin-right: 5px;
  color: #0078d4;
}
.attachments a {
  color: #0078d4;
  text-decoration: none;
}
.attachments a:hover {
  text-decoration: underline;
}

.reply-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}

.reply-item-card {
  margin-bottom: 15px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  background-color: #fefefe;
}
.reply-item-card .card-header {
  font-size: 0.95em;
  padding: 8px 15px;
}
.reply-item-card .card-header .user-name {
  font-weight: 500;
  font-size: 1em;
}
.reply-item-card .card-header .timestamp {
  font-size: 0.8em;
}

.reply-content-text {
  line-height: 1.6;
  font-size: 0.95em;
  color: #555;
}

.reply-actions {
  text-align: right;
  margin-top: 10px;
}
.best-answer-tag {
  margin-left: 10px;
}
.best-answer-tag .el-icon {
  margin-right: 5px;
}

.reply-input {
  margin-bottom: 15px;
}

.reply-actions-bottom {
  text-align: right;
}

/* 针对el-empty的样式调整 */
.el-empty {
    padding: 30px 0;
}
</style>