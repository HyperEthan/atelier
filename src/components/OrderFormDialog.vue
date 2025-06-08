<script setup>
import { ref, watch, computed } from 'vue';
import {
  ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElInputNumber, ElDatePicker,
  ElTable, ElTableColumn, ElButton, ElTag, ElIcon, ElMessage
} from 'element-plus';
import { Plus, Delete, CirclePlus } from '@element-plus/icons-vue';

const props = defineProps({
  orderData: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit', 'cancel']);

const form = ref({}); // 表单数据

// 订单状态选项
const orderStatusOptions = [
  { label: '待付款', value: 'pending_payment' },
  { label: '待发货', value: 'pending_shipment' },
  { label: '已发货', value: 'shipped' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
];

// 支付方式选项
const paymentMethodOptions = ['支付宝', '微信支付', '银行卡支付', '货到付款'];

// 监听 props.orderData 变化，更新表单数据
watch(() => props.orderData, (newVal) => {
  if (newVal) {
    // 深拷贝，避免直接修改props
    form.value = JSON.parse(JSON.stringify(newVal));
    // 如果是新增模式，确保productList是数组
    if (!props.isEdit && !form.value.productList) {
      form.value.productList = [];
    }
  }
}, { immediate: true, deep: true }); // 立即执行一次并深度监听

// 计算商品总金额
const calculatedAmount = computed(() => {
  if (!form.value.productList || form.value.productList.length === 0) return 0;
  const total = form.value.productList.reduce((sum, item) => {
    return sum + (parseFloat(item.price || 0) * parseInt(item.quantity || 0));
  }, 0);
  return total.toFixed(2);
});

// 添加商品行
const addProduct = () => {
  if (!form.value.productList) {
    form.value.productList = [];
  }
  form.value.productList.push({ name: '', price: 0.00, quantity: 1 });
};

// 删除商品行
const removeProduct = (index) => {
  form.value.productList.splice(index, 1);
};

// 提交表单
const submitForm = () => {
  // 简单校验
  if (!form.value.customerName || !form.value.shippingAddress) {
    ElMessage.error('客户名称和收货地址是必填项！');
    return;
  }
  form.value.amount = calculatedAmount.value; // 更新总金额
  emit('submit', form.value);
};

// 取消
const cancelForm = () => {
  emit('cancel');
};
</script>

<template>
  <el-form :model="form" label-width="100px" class="order-form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="订单号">
          <el-input v-model="form.id" :disabled="props.isEdit" placeholder="新增时自动生成"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户名称" required>
          <el-input v-model="form.customerName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="订单金额">
          <el-input v-model="calculatedAmount" disabled>
            <template #append>元</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="订单状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="12">
            <el-form-item label="下单时间">
                <el-date-picker
                    v-model="form.orderTime"
                    type="datetime"
                    placeholder="选择下单时间"
                    value-format="YYYY/MM/DD HH:mm:ss"
                    style="width: 100%;"
                ></el-date-picker>
            </el-form-item>
        </el-col>
      <el-col :span="12">
        <el-form-item label="支付方式">
          <el-select v-model="form.paymentMethod" placeholder="请选择支付方式">
            <el-option
              v-for="item in paymentMethodOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="收货地址" required>
      <el-input v-model="form.shippingAddress" type="textarea" :rows="2"></el-input>
    </el-form-item>

    <el-form-item label="商品列表">
      <el-button type="primary" :icon="CirclePlus" size="small" @click="addProduct" style="margin-bottom: 10px;">
        添加商品
      </el-button>
      <el-table :data="form.productList" border style="width: 100%;">
        <el-table-column label="商品名称" width="180">
          <template #default="{ row }">
            <el-input v-model="row.name" placeholder="商品名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.price" :min="0" :precision="2" :step="0.01"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.quantity" :min="1" :step="1" :precision="0"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" width="100">
          <template #default="{ row }">
            <span>¥{{ (parseFloat(row.price || 0) * parseInt(row.quantity || 0)).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" circle size="small" @click="removeProduct(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
       <span v-if="form.productList.length === 0" style="color: #909399; font-size: 0.9em; margin-top: 10px; display: block;">点击“添加商品”按钮添加商品。</span>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="form.notes" type="textarea" :rows="3"></el-input>
    </el-form-item>

    <el-form-item>
      <div class="dialog-footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" @click="submitForm">
          {{ props.isEdit ? '保存修改' : '立即创建' }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.order-form {
  padding: 20px;
}
.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
/* 调整商品列表的数字输入框宽度 */
.el-input-number {
    width: 100%;
}
</style>