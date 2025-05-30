<script setup>
import { ref, nextTick } from 'vue';
import {
  ElButton,
  ElInput,
  ElIcon,
  ElTable,
  ElTableColumn,
  ElMessageBox,
  ElMessage
} from 'element-plus';
import {
  Plus,
  Minus,
  Edit,
  DocumentChecked,
  Close,
  CircleCheck,
  Warning
} from '@element-plus/icons-vue';

const emit = defineEmits(['save', 'cancel']);

const initialTableData = {
  headers: ['元素', '描述', '来源', '备注'],
  rows: [
    { id: 1, '元素': '颜色', '描述': '2025流行色', '来源': '时尚杂志', '备注': '柔和、低饱和度' },
    { id: 2, '元素': '形状', '描述': '几何线条', '来源': '建筑设计', '备注': '简洁、有力' },
    { id: 3, '元素': '材质', '描述': '哑光金属', '来源': '工业产品', '备注': '高级感' },
    { id: 4, '元素': '纹理', '描述': '水波纹理', '来源': '自然元素', '备注': '动态、流畅' },
    { id: 5, '元素': '图案', '描述': '极简抽象', '来源': '当代艺术', '备注': '打破常规' },
    { id: 6, '元素': '光泽', '描述': '珍珠光泽', '来源': '珠宝首饰', '备注': '内敛、奢华' }
  ],
  nextId: 7
};

const tableData = ref(JSON.parse(JSON.stringify(initialTableData)));

const addRow = () => {
  const newRow = { id: tableData.value.nextId };
  tableData.value.headers.forEach(h => newRow[h] = '');
  tableData.value.rows.push(newRow);
  tableData.value.nextId++;
};

const deleteRow = (index) => {
  ElMessageBox.confirm('确定要删除这一行吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      tableData.value.rows.splice(index, 1);
      ElMessage.success('已删除');
    })
    .catch(() => {});
};

const saveTable = () => emit('save', tableData.value);
const cancelEdit = () => emit('cancel');
</script>

<template>
  <div class="editor-container">
    <el-table
      :data="tableData.rows"
      border
      stripe
      highlight-current-row
      style="width: 100%; font-family: 'Microsoft YaHei', sans-serif;"
    >
      <el-table-column
        v-for="header in tableData.headers"
        :key="header"
        :label="header"
        :prop="header"
        sortable
        show-overflow-tooltip
        min-width="120"
      >
        <template #default="scope">
          <el-input
            v-model="scope.row[header]"
            size="small"
            placeholder="请输入"
          />
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="100"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            @click="deleteRow(scope.$index)"
            type="danger"
            :icon="Close"
            circle
            size="small"
          />
        </template>
      </el-table-column>
    </el-table>

    <div class="editor-actions">
      <el-button type="primary" :icon="Plus" @click="addRow">添加一行</el-button>
      <el-button type="success" :icon="DocumentChecked" @click="saveTable">保存</el-button>
      <el-button :icon="Close" @click="cancelEdit">取消</el-button>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.el-table {
  background-color: white;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}
.el-table th {
  background-color: #f2f5fa;
  font-weight: bold;
  text-align: center;
}
.el-table td {
  padding: 8px 12px;
}
.editor-actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
