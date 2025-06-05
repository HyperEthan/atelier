<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElTag, ElCarousel, ElCarouselItem, ElIcon } from 'element-plus';
import { Star as IconStar } from '@element-plus/icons-vue';

// Import cases data
import { beautyCases } from '@/data/mediaData';

const cases = ref(beautyCases);

const dialogVisible = ref(false);
const currentCase = ref(null);

const openCaseDialog = (item) => {
  currentCase.value = item;
  dialogVisible.value = true;
};

const closeCaseDialog = () => {
  dialogVisible.value = false;
  currentCase.value = null;
};
</script>

<template>
  <main class="cases-page container">
    <h1 class="page-title">美妆案例精选</h1>
    <p class="page-intro">
      探索Éclat工作室的经典美妆案例，每一次蜕变都凝聚着对美的极致追求。
    </p>

    <div class="cases-grid">
      <div v-for="item in cases" :key="item.id" class="case-item" @click="openCaseDialog(item)">
        <img :src="item.thumbnail" :alt="item.title" class="case-thumbnail" />
        <div class="case-item-content">
          <h3 class="case-item-title">{{ item.title }}</h3>
          <p class="case-item-summary">{{ item.summary }}</p>
          <el-button type="primary" size="small">查看详情</el-button>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="currentCase ? currentCase.title : '案例详情'"
      width="80%"
      @close="closeCaseDialog"
      custom-class="case-detail-dialog"
      :align-center="true"
      append-to-body="true"
    >
      <div v-if="currentCase" class="case-detail-content">
        <el-carousel trigger="click" height="400px" indicator-position="outside" v-if="currentCase.galleryImages && currentCase.galleryImages.length > 0">
          <el-carousel-item v-for="img in currentCase.galleryImages" :key="img">
            <img :src="img" :alt="currentCase.title" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        <img v-else :src="currentCase.image" :alt="currentCase.title" class="case-main-image" />

        <h3 class="detail-section-title">案例概述</h3>
        <p class="case-full-description">{{ currentCase.fullDescription || currentCase.summary }}</p>

        <div v-if="currentCase.highlights && currentCase.highlights.length > 0">
          <h3 class="detail-section-title">核心亮点</h3>
          <ul class="highlights-list">
            <li v-for="(highlight, index) in currentCase.highlights" :key="index">
              <el-icon><IconStar /></el-icon> {{ highlight }}
            </li>
          </ul>
        </div>

        <div v-if="currentCase.productsUsed && currentCase.productsUsed.length > 0">
          <h3 class="detail-section-title">使用产品</h3>
          <div class="products-tags">
            <el-tag v-for="(product, index) in currentCase.productsUsed" :key="index" type="info" effect="dark" class="product-tag">
              {{ product.name }} ({{ product.brand }})
            </el-tag>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeCaseDialog">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>

<style scoped>
.cases-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: #fff;
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-family: var(--font-heading);
}
.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--color-accent);
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  color: #fff;
  line-height: 1.6;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.case-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.case-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.case-thumbnail {
  width: 100%;
  height: 220px;
  object-fit: cover;
  flex-shrink: 0;
  transition: transform 0.4s ease;
}

.case-item:hover .case-thumbnail {
  transform: scale(1.05);
}

.case-item-content {
  padding: var(--spacing-md);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.case-item-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

.case-item-summary {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: #fff;
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.case-item-content .el-button {
  background-color: #fff;
  border-color: #fff;
  color: white;
  width: 100%;
  font-family: var(--font-body);
}

.case-item-content .el-button:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Dialog Styles (reused from CollectionsPage, adjusted class name) */
.case-detail-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: #fff;
  text-align: center;
}
.case-detail-dialog .el-dialog__title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: #fff;
}

.case-detail-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.case-detail-content {
  padding: var(--spacing-md);
  color: #fff;
  max-height: 80vh;
  overflow-y: auto;
  font-family: var(--font-body);
  width: 100%;
}

.case-main-image, .carousel-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: var(--spacing-md);
}

.detail-section-title {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  color: #fff;
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: relative;
  padding-bottom: 5px;
  border-bottom: 1px dashed var(--color-border);
}

.case-full-description {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.highlights-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: var(--spacing-md);
  font-family: var(--font-body);
}

.highlights-list li {
  font-size: 1rem;
  margin-bottom: 8px;
  color: #fff;
}
.highlights-list li .el-icon {
  margin-right: 8px;
  color: var(--color-accent);
}

.products-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: var(--spacing-md);
}

.product-tag {
  font-family: var(--font-body);
  font-size: 0.9rem;
  background-color: #fff;
  color: #fff;
  border-color: #fff;
  padding: 8px 12px;
}

.case-detail-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: #fff;
}
.case-detail-dialog .el-dialog__footer .el-button {
  font-family: var(--font-body);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .page-title {
    font-size: 3rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .cases-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-md);
  }
  .case-item-title {
    font-size: 1.3rem;
  }
  .case-detail-dialog .el-dialog__title {
    font-size: 1.8rem;
  }
  .detail-section-title {
    font-size: 1.5rem;
  }
  .case-full-description, .highlights-list li, .product-tag {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .cases-grid {
    grid-template-columns: 1fr;
  }
  .case-item-content {
    padding: var(--spacing-sm);
  }
  .case-detail-dialog .el-dialog__title {
    font-size: 1.5rem;
  }
}
</style>