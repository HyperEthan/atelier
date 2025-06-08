<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  ElTable, ElTableColumn, ElButton, ElInput, ElSelect, ElOption,
  ElDatePicker, ElPagination, ElDialog, ElMessage, ElTag, ElEmpty
} from 'element-plus';
import { Search, Plus, Edit, View, Delete } from '@element-plus/icons-vue';
import orderPng from '@/assets/images/order.png';

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

// 模拟生成订单数据
const generateOrders = (count) => {
  const statusValues = ['pending_payment', 'pending_shipment', 'shipped', 'completed', 'cancelled'];
  const customerNames = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const products = ['商品A', '商品B', '商品C', '商品D', '商品E'];

  const newOrders = [];
  for (let i = 0; i < count; i++) {
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${String(i).padStart(3, '0')}`;
    const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const amount = (Math.random() * 1000 + 50).toFixed(2); // 50 - 1050
    const status = statusValues[Math.floor(Math.random() * statusValues.length)];
    const orderTime = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleString(); // 过去30天内
    const productList = Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
      name: products[Math.floor(Math.random() * products.length)],
      price: (Math.random() * 100 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 5) + 1,
    }));
    const shippingAddress = `${customerName}，电话：138****${Math.floor(Math.random()*9000+1000)}，地址：XX省XX市XX区XX街道XX号`;
    const paymentMethod = Math.random() > 0.5 ? '支付宝' : '微信支付';
    const notes = Math.random() > 0.7 ? '客户有特殊要求，请注意！' : '';

    newOrders.push({
      id: orderId,
      customerName,
      amount,
      status,
      orderTime,
      productList,
      shippingAddress,
      paymentMethod,
      notes,
    });
  }
  return newOrders;
};

onMounted(() => {
  isLoading.value = true;
  setTimeout(() => {
    // orders.value = generateOrders(50); // 初始生成50条订单数据
    orders.value.push({
        "id": "ORD-666173-000",
        "customerName": "航空公司",
        "orderTime": "2025/6/1 09:33:58",
        "shippingAddress": "*************",
        "notes": ""
    })
    console.log(orders.value);
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
const isEditMode = ref(false); // 是否是编辑模式
const currentOrder = ref(null); // 当前操作的订单数据

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
  isEditMode.value = true;
  // 深拷贝，避免直接修改表格数据
  currentOrder.value = JSON.parse(JSON.stringify(order));
  dialogVisible.value = true;
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

    <!-- <div class="operation-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索订单号或客户名称"
        clearable
        :prefix-icon="Search"
        style="width: 250px;"
        @clear="currentPage = 1"
        @keyup.enter="currentPage = 1"
      ></el-input>

      <el-select v-model="selectedStatus" placeholder="筛选订单状态" clearable style="width: 150px;" @change="currentPage = 1">
        <el-option
          v-for="item in orderStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="YYYY-MM-DD"
        @change="currentPage = 1"
      ></el-date-picker>

      <el-button type="primary" :icon="Plus" @click="handleAddOrder">新增订单</el-button>
    </div> -->

    <el-table
      :data="paginatedOrders"
      v-loading="isLoading"
      stripe
      style="width: 100%; margin-top: 20px;"
      height="calc(100vh - 300px)" empty-text="暂无订单数据"
    >
      <el-table-column prop="id" label="订单号" sortable></el-table-column>
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
      <el-image :src="orderPng" :fit="fit" ::preview-src-list="[orderPng]" :initial-index="0" />
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
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