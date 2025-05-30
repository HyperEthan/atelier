import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TutorialsPage from '../views/TutorialsPage.vue' // 你需要创建这个页面
import AtelierPage from '../views/AtelierPage.vue' // 你需要创建这个页面
import ContactPage from '../views/ContactPage.vue' // 你需要创建这个页面
import TutorialDetail from '../views/TutorialDetail.vue' // 教程详情页
import CollectionsPage from '../views/CollectionsPage.vue'

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
      component: () => import('../views/VrShowcasePage.vue'), // 懒加载
    },
    {
      path: '/textbooks',
      name: 'textbooks',
      component: () => import('../views/ETeachingPage.vue'), // 懒加载
    },
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/ImagesPage.vue'), // 懒加载
    },
    {
      path: '/videos',
      name: 'videos',
      component: () => import('../views/VideosPage.vue'), // 懒加载
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: () => import('../views/TutorialsPage.vue'), // 懒加载
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
      component: () => import('../views/MakeupHome.vue'), // 懒加载
    },
    {
      path: '/collections', // <-- Add this route
      name: 'collections',
      component: CollectionsPage,
    },
    {
      path: '/learning_analytics', // <-- Add this route
      name: 'learning_analytics',
      component: () => import('../views/LearningAnalyticsPage.vue'), // 懒加载
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
    // 添加一个 404 页面
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue'), // 懒加载
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
