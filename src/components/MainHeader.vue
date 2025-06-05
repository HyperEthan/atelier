<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// 引入 Element Plus 组件
import { ArrowRight } from '@element-plus/icons-vue'
import avatar from '@/assets/images/avatar.jpg'

const router = useRouter()
const showSearchDialog = ref(false)
const searchQuery = ref('')

const menuItems = reactive([
  {
    name: 'E-课堂',
    path: '/vr_scene',
    isOpen: false,
    children: [
      { name: 'VR场景', path: '/vr_scene' },
      { name: '微课', path: '/microlecture' },
      { name: '图片资源', path: '/images' },
      { name: '视频资源', path: '/videos' },
      { name: '电子教材/讲义', path: '/textbooks' },
    ],
  },
  {
    name: '妆小阁美妆工坊',
    path: '/makeup_home',
    isOpen: false,
    children: [
      { name: '首页', path: '/makeup_home' },
      { name: '简介', path: '/about' },
      { name: '样片欣赏', path: '/samples' },
      { name: '后台管理', path: '/management' },
      { name: '在线订单', path: '/orders' },
    ],
  },
  {
    name: '数字美妆实验室',
    path: '/makeup_design',
    isOpen: false,
    children: [
      { name: '虚拟妆容设计', path: '/makeup_design' },
      { name: '实景体验', path: '/real_scene' },
      { name: '妆容测评', path: '/makeup_evaluation' },
      { name: '美妆教程', path: '/tutorials' },
    ],
  },
  {
    name: '人人空间',
    path: '/portfolio_display',
    isOpen: false,
    children: [
      { name: '个人基本情况', path: '/personal' },
      { name: '学习管理', path: '/learning' },
      { name: '成果展示', path: '/showcase' },
      { name: '师生留言区', path: '/board' },
    ],
  },
])

// Placeholder for user data
const user = reactive({
  avatar: 'https://via.placeholder.com/40', // Replace with a real image path
  username: '用户名称',
});

const isChildRoute = (item) => {
  if (!item.children) return false
  const currentPath = router.currentRoute.value.path
  return item.children.some(child => currentPath.startsWith(child.path))
}

const goToHome = () => {
  router.push('/')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // 实际应用中，这里会触发搜索逻辑，并可能跳转到搜索结果页
    showSearchDialog.value = false
    searchQuery.value = ''
  }
}
</script>

<template>
  <header class="main-header">
    <a @click.prevent="goToHome" class="logo">智妆教学平台</a>
    <nav class="main-nav">
      <ul class="vertical-menu">
        <li v-for="item in menuItems" :key="item.path" class="menu-item">
          <div
            class="menu-title"
            @click="item.isOpen = !item.isOpen"
          >
            <span>{{ item.name }}</span>
            <el-icon v-if="item.children" :class="{ 'is-open': item.isOpen }">
              <arrow-right />
            </el-icon>
          </div>
          <transition name="slide">
            <ul v-if="item.children" v-show="item.isOpen" class="submenu">
              <li v-for="child in item.children" :key="child.path">
                <router-link
                  :to="child.path"
                  active-class="active"
                  exact-active-class="exact-active"
                >
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>

    <div class="user-profile">
      <img :src="avatar" alt="User Avatar" class="user-avatar" />
      <span class="username">20091010</span>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background: #4c1523; /* 柔和金属光泽 */
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3); /* 柔和外阴影，去掉内阴影 */
}



.logo {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  flex-shrink: 0; /* 防止 logo 被压缩 */
}

.main-nav {
  flex: 1; /* 让导航占据可用空间 */
  overflow-y: auto; /* 允许导航内容滚动 */
  padding: 20px 0;
  /* Removed height: 0; */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  border-top: 1px solid #eee;
}

.main-nav::-webkit-scrollbar {
  display: none;
}

.vertical-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
}

.menu-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  font-size: 1.2rem;
}

.menu-title:hover {
  background-color: #260810;
}

.menu-title.active {
  color: #fff; /* 亮粉红色激活状态 */
  background-color: #260810;
  border-left: 4px solid #D6B98C;
}

.menu-title .el-icon {
  transition: transform 0.3s ease;
}

.menu-title .is-open {
  transform: rotate(90deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #4c1523;
}

.submenu li {
  display: flex;
  margin-left: 0px;
  color: #fff;
  margin-top: 5px;
}

.submenu li a {
  display: flex;
  align-items: center;
  width: 250px;
  padding: 12px 0px 12px 40px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.submenu li a:hover {
  background-color: #260810; /* 淡玫瑰色悬停效果 */
  color: #fff; /* 亮粉红色悬停文字 */
}

.submenu li a.active {
  background-color: #260810;
  color: #fff; /* 深玫红色激活状态 */
  border-left: 4px solid #fff;
}

/* 动画效果 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: 300px; /* 根据实际内容调整 */
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

/* 用户头像和用户名区域样式 */
.user-profile {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #4c1523; /* Slightly darker background for the profile section */
  color: #fff;
  border-top: 1px solid #eee;
  flex-shrink: 0; /* Prevent profile section from being compressed */
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover; /* Ensures the image covers the area without distortion */
}

.username {
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff; /* Light color for better contrast */
}

/* 响应式布局 */
@media (max-width: 768px) {
  .main-header {
    width: 100%;
    height: auto;
    position: relative;
  }
  .user-profile {
    border-top: none; /* Adjust border for mobile if needed */
  }
}
</style>