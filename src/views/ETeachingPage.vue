<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElMessage } from 'element-plus';
import InspirationTableEditor from '@/components/InspirationTableEditor.vue'; // 引入组件

const dialogVisible = ref(false);

const openTableEditor = () => {
  dialogVisible.value = true;
};

const handleTableSave = (data) => {
  console.log('表格数据已保存:', data);
  // 在这里可以将数据发送到后端，例如通过 API 调用
  // axios.post('/api/saveInspirationTable', data)
  //   .then(response => {
  //     ElMessage.success('数据已成功保存到服务器！');
  //     dialogVisible.value = false;
  //   })
  //   .catch(error => {
  //     ElMessage.error('数据保存失败！');
  //     console.error('保存错误:', error);
  //   });
  ElMessage.success('表格数据已在前端保存并打印到控制台。');
  dialogVisible.value = false; // 保存后关闭弹窗
};

const handleTableCancel = () => {
  dialogVisible.value = false; // 取消后关闭弹窗
};
</script>

<template>
  <div class="e-teaching-page">
    <h1>e课堂电子教材</h1>
    <p>点击下方按钮，打开灵感元素汲取表。</p>

    <el-button type="primary" @click="openTableEditor">打开灵感元素汲取表</el-button>

    <el-dialog
      v-model="dialogVisible"
      title="《灵感元素汲取表》"
      width="95%"
      fullscreen
      destroy-on-close
    >
      <InspirationTableEditor @save="handleTableSave" @cancel="handleTableCancel" />
    </el-dialog>
  </div>
</template>

<style scoped>
.e-teaching-page {
  padding: 20px;
  text-align: center;
}
</style>