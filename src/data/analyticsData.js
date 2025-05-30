// src/data/analyticsData.js

export const studentData = [
  { id: 'stu001', name: '王晓婷', course: '新娘美妆初级班', progress: 85, completedLessons: 12, totalLessons: 15, feedbackScore: 4.8, lastActive: '2025-05-20' },
  { id: 'stu002', name: '李明', course: '时尚造型进阶班', progress: 60, completedLessons: 8, totalLessons: 12, feedbackScore: 4.2, lastActive: '2025-05-22' },
  { id: 'stu003', name: '张丽华', course: '美妆课程 | 个人形象定制', progress: 95, completedLessons: 10, totalLessons: 10, feedbackScore: 4.9, lastActive: '2025-05-25' },
  { id: 'stu004', name: '陈思思', course: '新娘美妆初级班', progress: 70, completedLessons: 10, totalLessons: 15, feedbackScore: 4.5, lastActive: '2025-05-18' },
  { id: 'stu005', name: '刘洋', course: '时尚造型进阶班', progress: 40, completedLessons: 5, totalLessons: 12, feedbackScore: 3.9, lastActive: '2025-05-15' },
  { id: 'stu006', name: '赵芳', course: '美妆课程 | 个人形象定制', progress: 78, completedLessons: 8, totalLessons: 10, feedbackScore: 4.7, lastActive: '2025-05-23' },
];

export const courseEnrollments = [
  { courseName: '新娘美妆初级班', enrollments: 35 },
  { courseName: '时尚造型进阶班', enrollments: 20 },
  { courseName: '美妆课程 | 个人形象定制', enrollments: 15 },
  { courseName: '红毯烟熏妆', enrollments: 10 }, // Assuming some cases are also 'mini-courses'
  { courseName: '永恒新娘 | 典雅纯净妆容', enrollments: 5 },
];

export const serviceBookings = [
  { serviceName: '新娘美妆', bookings: 50 },
  { serviceName: '时尚造型', bookings: 30 },
  { serviceName: '美妆课程', bookings: 25 },
];

export const platformUsage = {
  totalLoginsLastMonth: 1200,
  averageSessionDuration: '15m 30s',
  topAccessedContent: [
    { name: '永恒新娘 | 典雅纯净妆容', type: '案例', views: 500 },
    { name: '凝光肌理', type: '图片', views: 450 },
    { name: '幕后花絮: 摄影棚美妆', type: '视频', views: 300 },
    { name: '新娘美妆初级班', type: '课程', views: 280 },
    { name: '360° 美妆工作室漫游', type: 'VR', views: 200 },
  ],
  userEngagementByDay: [
    { date: '2025-05-20', users: 50 },
    { date: '2025-05-21', users: 65 },
    { date: '2025-05-22', users: 70 },
    { date: '2025-05-23', users: 60 },
    { date: '2025-05-24', users: 80 },
    { date: '2025-05-25', users: 75 },
    { date: '2025-05-26', users: 90 },
    { date: '2025-05-27', users: 85 },
  ]
};

export const revenueData = [
    { month: '一月', revenue: 120000 },
    { month: '二月', revenue: 135000 },
    { month: '三月', revenue: 150000 },
    { month: '四月', revenue: 140000 },
    { month: '五月', revenue: 160000 },
    { month: '六月', revenue: 175000 },
    { month: '七月', revenue: 180000 },
    { month: '八月', revenue: 165000 },
    { month: '九月', revenue: 190000 },
    { month: '十月', revenue: 200000 },
    { month: '十一月', revenue: 195000 },
    { month: '十二月', revenue: 210000 },
];

