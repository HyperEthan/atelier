<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  ElTable, ElTableColumn, ElButton, ElInput, ElSelect, ElOption,
  ElDatePicker, ElPagination, ElDialog, ElMessage, ElTag, ElEmpty
} from 'element-plus';
import { Search, Plus, Edit, View, Delete, Picture as IconPicture } from '@element-plus/icons-vue';
import orderPng from '@/assets/images/order.png';

// --- 图片数据 ---
import { beautyImages } from '@/data/mediaData';
const images = ref(beautyImages);

// --- 订单数据与状态管理 ---
const orders = ref([]); // 存储所有订单数据
const isLoading = ref(false); // 表格加载状态

// 搜索和筛选条件
const searchKeyword = ref(''); // 搜索关键词
const selectedStatus = ref(''); // 选中的订单状态
const dateRange = ref([]); // 日期范围 [开始日期, 结束日期]

// 订单状态选项
const orderStatusOptions = [
  { label: '全部', value: '' },
  { label: '待付款', value: 'pending_payment', type: 'info' },
  { label: '待发货', value: 'pending_shipment', type: 'warning' },
  { label: '已发货', value: 'shipped', type: '' },
  { label: '已完成', value: 'completed', type: 'success' },
  { label: '已取消', value: 'cancelled', type: 'danger' },
];

// --- 分页配置 ---
const currentPage = ref(1);
const pageSize = ref(10);
const totalOrders = computed(() => filteredOrders.value.length);

function generateOrderId() {
  const randomMiddle = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // 6位随机数
  const randomEnd = Math.floor(Math.random() * 1000).toString().padStart(3, '0');       // 3位随机数
  return `ORD-${randomMiddle}-${randomEnd}`;
}
// 模拟生成订单数据
const generateOrders = (count) => {
  const newOrders = [];
  const customerNames = ['航空公司', '我在大运河边走', '影拍工作室', '留洋大小姐', '**医院工会', '**市第五幼儿园']

  for (let i = 0; i < count; i++) {
    const orderId = generateOrderId();
    const customerName = customerNames[i];
    const orderTime = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleString(); // 过去30天内

    newOrders.push({
      id: orderId,
      customerName,
      orderTime,
    });
  }
  return newOrders;
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    // orders.value = generateOrders(6); // 初始生成50条订单数据
    // console.log(orders.value);
    orders.value = [
        {
            "id": "ORD-335955-757",
            "customerName": "航空公司",
            "orderTime": "2025/5/16 03:41:16"
        },
        {
            "id": "ORD-557469-325",
            "customerName": "我在大运河边走",
            "orderTime": "2025/5/11 00:11:28"
        },
        {
            "id": "ORD-806328-453",
            "customerName": "影拍工作室",
            "orderTime": "2025/5/20 19:01:12"
        },
        {
            "id": "ORD-519356-268",
            "customerName": "留洋大小姐",
            "orderTime": "2025/6/6 15:48:48"
        },
        {
            "id": "ORD-193074-063",
            "customerName": "**医院工会",
            "orderTime": "2025/5/14 12:43:15"
        },
        {
            "id": "ORD-196319-462",
            "customerName": "**市第五幼儿园",
            "orderTime": "2025/6/5 12:29:47"
        }
    ]
    isLoading.value = false;
  }, 500);
});

// 根据筛选条件过滤订单
const filteredOrders = computed(() => {
  let result = orders.value;

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(order =>
      order.id.toLowerCase().includes(keyword) ||
      order.customerName.toLowerCase().includes(keyword)
    );
  }

  // 按状态筛选
  if (selectedStatus.value) {
    result = result.filter(order => order.status === selectedStatus.value);
  }

  // 按日期范围筛选
  if (dateRange.value && dateRange.value.length === 2) {
    const startDate = new Date(dateRange.value[0]).setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.value[1]).setHours(23, 59, 59, 999);
    result = result.filter(order => {
      const orderDate = new Date(order.orderTime).getTime();
      return orderDate >= startDate && orderDate <= endDate;
    });
  }
  return result;
});

// 计算当前页显示的数据
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredOrders.value.slice(start, end);
});

// 获取订单状态对应的类型（用于ElTag颜色）
const getStatusType = (status) => {
  const option = orderStatusOptions.find(opt => opt.value === status);
  return option ? option.type : '';
};

// --- 新增/编辑订单弹窗 ---
const dialogVisible = ref(false);
const dialogVisible1 = ref(false);
const isEditMode = ref(false); // 是否是编辑模式
const currentOrder = ref(null); // 当前操作的订单数据

const currentImage = ref(null);

const openImageDialog = (item) => {
  currentImage.value = item;
  dialogVisible1.value = true;
};

const closeImageDialog = () => {
  dialogVisible1.value = false;
  currentImage.value = null;
};

// 打开新增订单弹窗
const handleAddOrder = () => {
  isEditMode.value = false;
  currentOrder.value = {
    id: '', // 新增时ID为空，由子组件生成或模拟生成
    customerName: '',
    amount: 0,
    status: 'pending_payment',
    orderTime: new Date().toLocaleString(),
    productList: [],
    shippingAddress: '',
    paymentMethod: '支付宝',
    notes: '',
  };
  dialogVisible.value = true;
};

// 打开编辑订单弹窗
const handleEditOrder = (order) => {
    if(order.customerName === '航空公司') {
        isEditMode.value = true;
        // 深拷贝，避免直接修改表格数据
        currentOrder.value = JSON.parse(JSON.stringify(order));
        dialogVisible.value = true;
    }
};

// 提交订单（由子组件触发）
const handleSubmitOrder = (orderData) => {
  if (isEditMode.value) {
    // 编辑模式：找到并更新订单
    const index = orders.value.findIndex(o => o.id === orderData.id);
    if (index !== -1) {
      orders.value[index] = orderData;
      ElMessage.success(`订单 ${orderData.id} 更新成功！`);
    }
  } else {
    // 新增模式：生成新ID并添加到列表
    const newId = `ORD-${Date.now().toString().slice(-6)}-NEW`;
    orders.value.unshift({ ...orderData, id: newId, orderTime: new Date().toLocaleString() });
    ElMessage.success(`订单 ${newId} 创建成功！`);
  }
  dialogVisible.value = false;
};

// 删除订单
const handleDeleteOrder = (orderId) => {
  ElMessage.confirm(`确定要删除订单 ${orderId} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      orders.value = orders.value.filter(order => order.id !== orderId);
      ElMessage.success(`订单 ${orderId} 已删除。`);
      // 如果当前页数据不足，回到上一页
      if (paginatedOrders.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除。');
    });
};

const collapseValue = ref(['1'])
// 页面大小改变
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 回到第一页
};

// 当前页改变
const handleCurrentChange = (val) => {
  currentPage.value = val;
};
</script>

<template>
  <div class="order-management-container">
    <h1 class="page-title">在线订单管理</h1>
    <el-collapse v-model="collapseValue">
        <el-collapse-item title="订单列表" name="1">
          <el-table
            :data="paginatedOrders"
            v-loading="isLoading"
            stripe
            empty-text="暂无订单数据"
            >
            <el-table-column prop="id" label="订单号"></el-table-column>
            <el-table-column prop="customerName" label="客户名称"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                <el-button class="view-btn" :icon="View" size="small" @click="handleEditOrder(row)">查看详情</el-button>
                <!-- <el-button :icon="Delete" size="small" type="danger" @click="handleDeleteOrder(row.id)">删除</el-button> -->
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有符合条件的订单数据"></el-empty>
            </template>
            </el-table>
        </el-collapse-item>
        <el-collapse-item title="虚拟客户" name="2">
          <div class="imgur-grid">
            <div v-for="item in images.virtual" :key="item.id" class="grid-item" @click="openImageDialog(item)">
              <div class="grid-item-content">
                <img :src="item.image" class="grid-item-thumbnail" />
                <div class="grid-item-overlay">
                  <el-button type="primary" size="small" :icon="IconPicture" circle />
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
    </el-collapse>
    

    <!-- <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="totalOrders"
      layout="total, sizes, prev, pager, next, jumper"
      background
      class="pagination-bar"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination> -->

    <el-dialog
      v-model="dialogVisible"
      title="订单详情"
      fullscreen
      :close-on-click-modal="false"
      destroy-on-close
      class="order-form-dialog"
    >
      <el-image :src="orderPng" :fit="fit" :preview-src-list="[orderPng]" :initial-index="0" />
    </el-dialog>
    <el-dialog
      v-model="dialogVisible1"
      title=""
      :fullscreen="true"
      @close="closeImageDialog"
      custom-class="image-detail-dialog"
      :align-center="true"
    >
      <div v-if="currentImage" class="image-dialog-content-wrapper">
        <img :src="currentImage.image" class="full-view-image" />
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.order-management-container {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #333;
  min-height: calc(100vh - 60px); /* 适应屏幕高度 */
}

.page-title {
  color: #fff;
  margin-bottom: 60px;
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
}

:deep(.el-dialog__body) {
    text-align: center;
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

.operation-bar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap; /* 允许换行 */
  background-color: #ffffff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

:deep(.el-table) {
  overflow: hidden; /* 确保圆角效果 */
  background-color: transparent !important;
  border: none;

  &  tr {
    background-color: transparent !important;
    color: #fff;
  }
}

:deep(.el-table__body) {
    background-color: transparent !important;
}

:deep(.el-table__inner-wrapper::before) {
    display: none;
}

:deep(.el-table__cell) {
    background-color: transparent !important;
}

.pagination-bar {
  margin-top: 20px;
  justify-content: flex-end;
  display: flex;
}

/* 弹窗样式调整 */
.order-form-dialog :deep(.el-dialog__body) {
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.el-collapse-item) {
  margin-bottom: 15px;
}

:deep(.el-collapse-item__header) {
  background-color: #d6d6d6;
  color: #000;
  border-radius: 8px;
  padding: 10px 20px;
  height: 60px;
  font-size: 18px;
  font-weight: 400;

  &.is-active {
    border-radius: 8px 8px 0px 0px;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: var(--spacing-md);
  text-align: center;
}

:deep(.el-collapse) {
  border: none
}

:deep(.el-collapse-item) {
  border: none;
}

:deep(.el-collapse-item__header) {
  background-color: #9d3050;
  color: #fff;
  font-family: 'MyFont';
  font-size: 1.2rem;
  border: none;
}

:deep(.el-collapse-item__content) {
  background-color: #bb3d63;
  padding: 20px;
  border: none;
}

:deep(.el-collapse-item__wrap) {
  background-color: #bb3d63;
  border: none;
}

/* Imgur-like Grid Style */
.imgur-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Flexible columns */
  /* Remove grid-auto-rows and let content define row height */
  gap: 15px;
  padding: 15px;
  /* background-color: #f0f2f5; */
  border-radius: 8px;
  /* Add explicit auto-flow for dense packing */
  grid-auto-flow: dense;
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  /* IMPORTANT: Let the content define the height */
  height: auto;
  display: block; /* Important for self-sizing */
}

.grid-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.grid-item-content {
  width: 100%;
  height: 100%; /* Important: let this expand to fit the image */
  position: relative;
  display: flex; /* Use flex to allow content within to control layout */
  flex-direction: column; /* Stack image and potential future text */
  justify-content: center;
  align-items: center;
  /* Remove min-height: this is the key for variable heights */
}

.grid-item-thumbnail {
  height: 100%;
  display: block;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.grid-item:hover .grid-item-thumbnail {
  opacity: 0.7;
}

.grid-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  text-align: center;
  padding: var(--spacing-sm);
  box-sizing: border-box;
}

.grid-item:hover .grid-item-overlay {
  opacity: 1;
}

.grid-item-title {
  font-size: 1.3rem;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  color: white;
  font-weight: 700;
}

.grid-item-overlay .el-button {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
  margin-top: var(--spacing-sm);
  font-size: 1rem;
}
.grid-item-overlay .el-button:hover {
  background-color: #fff;
  border-color: #fff;
  color: var(--color-accent);
}

/* Dialog Styles (retained as before) */
.image-detail-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
.image-detail-dialog .el-dialog__title {
  font-size: 2.2rem;
  color: #fff;
}
.image-detail-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.image-dialog-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.full-view-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.image-description {
  margin-top: var(--spacing-md);
  font-size: 1rem;
  color: #fff;
  font-family: var(--font-body);
  text-align: center;
}
.image-detail-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: #fff;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .order-management-container {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .operation-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .operation-bar > * {
    width: 100% !important; /* 强制元素宽度 */
  }
  .el-table {
    /* 小屏幕下表格可能需要横向滚动 */
    overflow-x: auto;
  }
  .el-table :deep(.el-table__header-wrapper),
  .el-table :deep(.el-table__body-wrapper) {
      width: max-content; /* 确保内容不会被截断 */
  }
  .pagination-bar {
    justify-content: center;
  }
}
</style>