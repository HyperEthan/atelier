import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TutorialsPage from '../views/TutorialsPage.vue' // 你需要创建这个页面
import AtelierPage from '../views/AtelierPage.vue' // 你需要创建这个页面
import ContactPage from '../views/ContactPage.vue' // 你需要创建这个页面
import TutorialDetail from '../views/TutorialDetail.vue' // 教程详情页
import CollectionsPage from '../views/CollectionsPage.vue'

import VrShowcasePage from '../views/VrShowcasePage.vue' // VR 展示页面
import ETeachingPage from '../views/ETeachingPage.vue' // 电子教材页面
import ImagesPage from '../views/ImagesPage.vue' // 图片页面
import VideosPage from '../views/VideosPage.vue' // 视频页面
import LearningAnalyticsPage from '../views/LearningAnalyticsPage.vue' // 学习分析页面
import MakeupHome from '../views/MakeupHome.vue' // 化妆主页
import LearningPage from '../views/LearningPage.vue' // 学习页面
import MicroCourses from '../views/MicroCourses.vue' // 微课程页面
import SampleShowcase from '../views/SampleShowcase.vue' // 样品展示页面
import AIBeautyAssistant from '../views/AIBeautyAssistant.vue' // AI 美妆助手页面
import StudentShowcase from '../views/StudentShowcase.vue' // 学生作品展示页面
import RealityExperience from '../views/RealityExperience.vue' // 现实体验页面
import TeacherStudentMessages from '../views/TeacherStudentMessages.vue' // 师生留言板页面
import MakeupAssessment from '../views/MakeupAssessment.vue' // 化妆评估页面
import OrderManagement from '../views/OrderManagement.vue' // 订单管理页面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/vr_scene',
      name: 'vr_scene',
      component: VrShowcasePage, // 懒加载
    },
    {
      path: '/textbooks',
      name: 'textbooks',
      component: ETeachingPage, // 懒加载
    },
    {
      path: '/images',
      name: 'images',
      component: ImagesPage, // 懒加载
    },
    {
      path: '/videos',
      name: 'videos',
      component: VideosPage, // 懒加载
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: TutorialsPage, // 懒加载
    },
    {
      path: '/tutorials/:id', // 动态路由，用于教程详情页
      name: 'tutorial-detail',
      component: TutorialDetail,
      props: true, // 将路由参数作为 props 传递给组件
    },
    {
      path: '/makeup_home', // <-- Add this route
      name: 'makeup_home',
      component: MakeupHome, // 懒加载
    },
    {
      path: '/collections', // <-- Add this route
      name: 'collections',
      component: CollectionsPage,
    },
    {
      path: '/learning_analytics', // <-- Add this route
      name: 'learning_analytics',
      component: LearningAnalyticsPage, // 懒加载
    },
    {
      path: '/atelier',
      name: 'atelier',
      component: AtelierPage,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
    {
      path: '/learning',
      name: 'learning',
      component: LearningPage, // 懒加载
    },
    {
      path: '/microlecture',
      name: 'microlecture',
      component: MicroCourses, // 懒加载
    },
    {
      path: '/samples',
      name: 'samples',
      component: SampleShowcase, // 懒加载
    },
    {
      path: '/makeup_design',
      name: 'makeup_design',
      component: AIBeautyAssistant, // 懒加载
    },
    {
      path: '/makeup_evaluation',
      name: 'makeup_evaluation',
      component: MakeupAssessment, // 懒加载
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: StudentShowcase, // 懒加载
    },
    {
      path: '/real_scene',
      name: 'real_scene',
      component: RealityExperience, // 懒加载
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrderManagement, // 懒加载
    },
    {
      path: '/board',
      name: 'board',
      component: TeacherStudentMessages, // 懒加载
    },
    // 添加一个 404 页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('../views/NotFoundPage.vue'), // 懒加载
    },
  ],
  // 保持滚动位置，增强用户体验
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
