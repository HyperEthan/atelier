<script setup>
import { ref, onMounted } from 'vue'
import {
  Picture as IconPicture,
  VideoCamera as IconVideoCamera,
  Monitor as IconMonitor,
  Star as IconStar,
} from '@element-plus/icons-vue' // 引入 Star 图标

const beautyCases = ref([
  {
    id: 'case1',
    title: 'Eternal Bride | Elegant and Pure Makeup',
    summary:
      'Timeless classic makeup for the bride, highlighting natural beauty and ensuring perfection both on camera and in person.',
    thumbnail: '/images/collections/case_bridal_full.jpg',
    image: '/images/collections/case_bridal_full.jpg', // 可以是主视觉图
    galleryImages: [
      // 案例画廊图片
      '/images/collections/case_bridal_gallery1.jpg',
      '/images/collections/case_bridal_gallery2.jpg',
      '/images/collections/case_bridal_full.jpg',
    ],
    highlights: [
      'Flawless and translucent base makeup',
      'Gentle and elegant eye contours',
      'Natural and fresh lip color',
      "Long-lasting makeup, ready to face a whole day's challenges",
    ],
    productsUsed: [
      { name: 'CPB Radiant Cream Foundation', brand: 'Cle de Peau Beaute', type: 'Foundation' },
      { name: 'SUQQU Designing Color Eyeshadow Palette', brand: 'SUQQU', type: 'Eyeshadow' },
      { name: 'La Mer The Renewal Oil', brand: 'La Mer', type: 'Skincare' },
      {
        name: 'Givenchy Haute Couture Le Rouge Velvet Lipstick',
        brand: 'Givenchy',
        type: 'Lipstick',
      },
    ],
    fullDescription:
      'This makeup look is specially designed for brides, aiming to present a pure beauty that is both classic and modern. We start with deep skincare, using high-end products to create a perfect foundation for the skin. The base makeup uses a lightweight yet highly concealing foundation, combined with precise spot concealing to achieve a flawless, natural-looking complexion. The eye makeup focuses on soft transitions and a natural enlarging effect, using earth-toned eyeshadows paired with long, curled lashes. For the lips, nude pink or light coral shades that complement the skin tone are chosen to enhance the overall gentle vibe. Finally, professional setting techniques ensure the makeup remains perfect throughout the tears and laughter of the wedding day.',
  },
  {
    id: 'case2',
    title: 'Enchanting Night | Red Carpet Smoky Makeup',
    summary:
      'Create an unforgettable red carpet look, centered on deep smoky eye makeup and refined facial contours, exuding ultimate charm.',
    thumbnail: '/images/collections/case_dramatic_full.jpg',
    image: '/images/collections/case_dramatic_full.jpg',
    galleryImages: [
      '/images/collections/case_dramatic_gallery1.jpg',
      '/images/collections/case_dramatic_full.jpg',
      '/images/collections/case_dramatic_gallery3.jpg',
      '/images/collections/case_dramatic_gallery4.jpg',
    ],
    highlights: [
      'Deep and captivating smoky eyes',
      'Three-dimensional contouring highlights the beauty of bone structure.',
      'Full and plump lip shape',
      'Highlight accents to enhance glossiness',
    ],
    productsUsed: [
      {
        name: 'Pat McGrath Labs Mothership V Eyeshadow Palette',
        brand: 'Pat McGrath Labs',
        type: 'Eyeshadow',
      },
      {
        name: 'Fenty Beauty Match Stix Matte Contour Skinstick',
        brand: 'Fenty Beauty',
        type: 'Contour',
      },
      { name: 'Dior Rouge Dior Lipstick #999', brand: 'Dior', type: 'Lipstick' },
      { name: 'Hourglass Ambient Lighting Palette', brand: 'Hourglass', type: 'Face Palette' },
    ],
    fullDescription:
      'This red carpet smoky makeup focuses on the depth and allure of the eyes, creating a striking eye effect through layered eyeshadow blending and eyeliner outlining. To balance the intensity of the eye makeup, facial contouring is done with precision, emphasizing the three-dimensionality of the cheekbones and jawline, while delicate highlights brighten specific areas, giving the skin a sophisticated glow under the lights. For the lips, rich matte or satin shades, such as classic true red or deep berry tones, are chosen to perfectly complement the smoky eye makeup. The key to the entire look is balance and harmony, ensuring every detail exudes luxury and confidence.',
  },
  {
    id: 'case3',
    title: 'Summer Morning Light | Clear and Natural Makeup Look',
    summary:
      'How to keep your makeup fresh and long-lasting in the scorching summer while showcasing a natural and healthy bare-skin look.',
    thumbnail: '/images/collections/case_summer_full.jpg',
    image: '/images/collections/case_summer_full.jpg',
    galleryImages: [
      '/images/collections/case_summer_gallery1.jpg',
      '/images/collections/case_summer_full.jpg',
      '/images/collections/case_summer_gallery3.jpg',
    ],
    highlights: [
      'Lightweight and Hydrating Base Makeup',
      'Natural and seamless blush',
      'Refreshing and long-lasting without smudging',
      'Subtle tricks for a natural makeup look',
    ],
    productsUsed: [
      { name: 'NARS Tinted Lip Balm', brand: 'NARS', type: 'Lip Balm' },
      { name: 'RMK Lightweight Liquid Foundation', brand: 'RMK', type: 'Foundation' },
      { name: 'THREE Radiant Glow Blush', brand: 'THREE', type: 'Blush' },
    ],
    fullDescription:
      'The secret to a summer translucent natural makeup look lies in "less is more." We choose lightweight and breathable base makeup products, such as sunscreen primers or tinted moisturizers, to even out skin tone without burdening the skin. For the eyes, use only a small amount of brightening or earthy-toned eyeshadow, paired with waterproof mascara to create a natural wide-eyed look. For blush and lips, opt for hydrating products with light and natural colors, giving the appearance of a healthy glow from within. The key is long-lasting oil control and setting, ensuring the makeup stays fresh in hot and humid weather.',
  },
  {
    id: 'case4',
    title: 'Futurism | Geometric Line Creative Makeup',
    summary:
      'Boldly explore the infinite possibilities of beauty, using vibrant colors and geometric lines to create avant-garde artistic looks.',
    thumbnail: '/images/collections/case_editorial_full.jpg',
    image: '/images/collections/case_editorial_full.jpg',
    galleryImages: [
      '/images/collections/case_editorial_full.jpg',
      '/images/collections/case_editorial_gallery2.jpg',
    ],
    highlights: [
      'Bold use of colors',
      'Precise geometric lines',
      'Contrast between light and shadow to highlight the sense of three-dimensionality.',
      'Artistic expression',
    ],
    productsUsed: [
      { name: 'Make Up For Ever Pure Color Eyeshadow', brand: 'MUFE', type: 'Eyeshadow' },
      { name: 'NYX Professional Makeup Liquid Eyeliner', brand: 'NYX', type: 'Eyeliner' },
      { name: 'MAC Bullet Lipstick (Limited Edition)', brand: 'MAC', type: 'Lipstick' },
    ],
    fullDescription:
      'Futuristic geometric line creative makeup is a perfect fusion of beauty art and geometric aesthetics. The core of this concept is to break tradition by creating a unique visual impact on the face through bold and contrasting color combinations, as well as precise and sharp geometric lines. The eye area may feature floating eyeliner, bold color block splicing, or even symmetrical or asymmetrical abstract patterns. Facial contours are emphasized through exaggerated light and shadow contrasts, highlighting the structural sense of the bones. This is not just makeup but a walking piece of art, suitable for fashion enthusiasts who dare to express themselves and pursue innovation.',
  },
])

const beautyImages = ref([
  {
    id: 'img1',
    title: 'Dewy Skin Perfection',
    thumbnail: '/images/collections/img_dewy_full.jpg',
    image: '/images/collections/img_dewy_full.jpg',
  },
  {
    id: 'img2',
    title: 'Vibrant Eyeshot',
    thumbnail: '/images/collections/img_vibrant_full.jpg',
    image: '/images/collections/img_vibrant_full.jpg',
  },
  {
    id: 'img3',
    title: 'Sculpted Features',
    thumbnail: '/images/collections/img_sculpted_full.jpg',
    image: '/images/collections/img_sculpted_full.jpg',
  },
  {
    id: 'img4',
    title: 'Classic Red Lip',
    thumbnail: '/images/collections/img_redlip_full.jpg',
    image: '/images/collections/img_redlip_full.jpg',
  },
])

const beautyVideos = ref([
  {
    id: 'vid1',
    title: 'Behind the Scenes: Photoshoot Glam',
    thumbnail: '/images/collections/video_bts_thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    type: 'youtube',
  }, // Example YouTube embed
  {
    id: 'vid2',
    title: 'Product Showcase: New Arrivals',
    thumbnail: '/images/collections/video_product_thumb.jpg',
    videoUrl: 'https://player.vimeo.com/video/819323384?autoplay=1&loop=1',
    type: 'vimeo',
  }, // Example Vimeo embed
  {
    id: 'vid3',
    title: 'Mastering Liquid Eyeliner',
    thumbnail: '/images/collections/video_eyeliner_thumb.jpg',
    videoUrl: 'https://www.youtube.com/embed/your_video_id_here_3',
    type: 'youtube',
  },
])

const beautyVR = ref([
  {
    id: 'vr1',
    title: '360° Makeup Studio Tour',
    thumbnail: '/images/collections/vr_studio_thumb.jpg',
    vrUrl: 'https://www.example.com/your-vr-experience-1',
    description: 'Explore our virtual makeup studio in a full 360-degree experience.',
  },
  {
    id: 'vr2',
    title: 'Immersive Application Demo',
    thumbnail: '/images/collections/vr_demo_thumb.jpg',
    vrUrl: 'https://www.example.com/your-vr-experience-2',
    description: 'Step into a virtual demo of complex makeup application techniques.',
  },
])

// --- Modal/Dialog State ---
const dialogVisible = ref(false)
const currentAsset = ref(null)
const dialogTitle = ref('')
const dialogType = ref('') // 'image', 'video', 'vr', 'case'

const openDialog = (asset, type) => {
  currentAsset.value = asset
  dialogType.value = type
  dialogTitle.value = asset.title

  // Special handling for video URLs to ensure autoplay and embedding
  if (type === 'video' && asset.videoUrl) {
    let embedUrl = asset.videoUrl
    // Basic conversion for common video platforms
    if (embedUrl.includes('youtube.com/watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/') + '?autoplay=1'
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/') + '?autoplay=1'
    } else if (embedUrl.includes('vimeo.com/')) {
      embedUrl = embedUrl.replace('vimeo.com/', 'player.vimeo.com/video/') + '?autoplay=1'
    }
    currentAsset.value.embedUrl = embedUrl // Store processed URL
  }

  dialogVisible.value = true
}

const closeDialog = () => {
  dialogVisible.value = false
  currentAsset.value = null // Clear asset when dialog closes
  dialogType.value = ''
}

// Default active tab
const activeTab = ref('cases')

onMounted(() => {
  // Any initial data fetching or setup
})
</script>

<template>
  <main class="collections-page container">
    <h1 class="page-title">Éclat Collections</h1>
    <p class="page-intro">
      Immerse yourself in our curated beauty gallery, exploring every stunning transformation,
      breathtaking imagery, immersive videos, and cutting-edge VR experiences.
    </p>

    <div class="tabs-wrapper">
      <el-tabs v-model="activeTab" class="eclat-tabs">
        <el-tab-pane label="Beauty Case Studies" name="cases">
          <template #label>
            <el-icon><IconPicture /></el-icon>
            <span>Beauty Case Studies</span>
          </template>
          <div class="grid">
            <div
              v-for="item in beautyCases"
              :key="item.id"
              class="grid-item"
              @click="openDialog(item, 'case')"
            >
              <img :src="item.thumbnail" :alt="item.title" class="thumbnail" />
              <div class="item-content">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-summary">{{ item.summary }}</p>
                <el-button type="primary" size="small">View cases</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Beauty Makeup Images" name="images">
          <template #label>
            <el-icon><IconPicture /></el-icon>
            <span>Beauty Makeup Images</span>
          </template>
          <div class="grid">
            <div
              v-for="item in beautyImages"
              :key="item.id"
              class="grid-item"
              @click="openDialog(item, 'image')"
            >
              <img :src="item.thumbnail" :alt="item.title" class="thumbnail" />
              <div class="item-overlay">
                <p class="item-title">{{ item.title }}</p>
                <el-button type="primary" size="small" :icon="IconPicture" circle />
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Beauty Videos" name="videos">
          <template #label>
            <el-icon><IconVideoCamera /></el-icon>
            <span>Beauty Videos</span>
          </template>
          <div class="grid">
            <div
              v-for="item in beautyVideos"
              :key="item.id"
              class="grid-item"
              @click="openDialog(item, 'video')"
            >
              <img :src="item.thumbnail" :alt="item.title" class="thumbnail" />
              <div class="item-overlay">
                <p class="item-title">{{ item.title }}</p>
                <el-button type="primary" size="small" :icon="IconVideoCamera" circle />
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="Beauty VR" name="vr">
          <template #label>
            <el-icon><IconMonitor /></el-icon>
            <span>Beauty VR</span>
          </template>
          <div class="grid">
            <div
              v-for="item in beautyVR"
              :key="item.id"
              class="grid-item"
              @click="openDialog(item, 'vr')"
            >
              <img :src="item.thumbnail" :alt="item.title" class="thumbnail" />
              <div class="item-overlay">
                <p class="item-title">{{ item.title }}</p>
                <el-button type="primary" size="small" :icon="IconMonitor" circle />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :fullscreen="dialogType === 'image' || dialogType === 'video'"
      :width="dialogType === 'vr' ? '50%' : '60%'"
      @close="closeDialog"
      custom-class="eclat-dialog"
      :align-center="true"
    >
      <div v-if="currentAsset">
        <div v-if="dialogType === 'case'" class="case-detail-content">
          <el-carousel
            trigger="click"
            height="400px"
            indicator-position="outside"
            v-if="currentAsset.galleryImages && currentAsset.galleryImages.length > 0"
          >
            <el-carousel-item v-for="img in currentAsset.galleryImages" :key="img">
              <img :src="img" :alt="currentAsset.title" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
          <img
            v-else
            :src="currentAsset.image"
            :alt="currentAsset.title"
            class="case-main-image"
          />

          <h3 class="detail-section-title">Case Overview</h3>
          <p class="case-full-description">
            {{ currentAsset.fullDescription || currentAsset.summary }}
          </p>

          <div v-if="currentAsset.highlights && currentAsset.highlights.length > 0">
            <h3 class="detail-section-title">Core Highlights</h3>
            <ul class="highlights-list">
              <li v-for="(highlight, index) in currentAsset.highlights" :key="index">
                <el-icon><IconStar /></el-icon> {{ highlight }}
              </li>
            </ul>
          </div>

          <div v-if="currentAsset.productsUsed && currentAsset.productsUsed.length > 0">
            <h3 class="detail-section-title">Use the product</h3>
            <div class="products-tags">
              <el-tag
                v-for="(product, index) in currentAsset.productsUsed"
                :key="index"
                type="info"
                effect="dark"
                class="product-tag"
              >
                {{ product.name }} ({{ product.brand }})
              </el-tag>
            </div>
          </div>
        </div>

        <div v-else-if="dialogType === 'image'" class="image-dialog-content-wrapper">
          <img :src="currentAsset.image" :alt="currentAsset.title" class="full-view-image" />
          <p v-if="currentAsset.description" class="image-description">
            {{ currentAsset.description }}
          </p>
        </div>

        <div v-else-if="dialogType === 'video'" class="video-embed-container">
          <iframe
            :src="currentAsset.embedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="video-iframe"
          ></iframe>
        </div>

        <div v-else-if="dialogType === 'vr'" class="vr-info">
          <p class="vr-description">{{ currentAsset.description }}</p>
          <el-button type="primary" @click="window.open(currentAsset.vrUrl, '_blank')" size="large">
            Start VR Experience
          </el-button>
          <p class="vr-note">Requires compatible VR headset or device for full experience.</p>
        </div>
      </div>
    </el-dialog>
  </main>
</template>

<style scoped>
.collections-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
}

.page-title {
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
  position: relative;
  padding-bottom: var(--spacing-sm);
  font-family: var(--font-heading); /* 确保页面标题使用标题字体 */
}

.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 80px;
  height: 2px;
  background-color: var(--color-accent);
}

.page-intro {
  text-align: center;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
  color: var(--color-text-dark);
  font-family: var(--font-body); /* 确保介绍文字使用正文字体 */
  line-height: 1.6; /* 更好的阅读体验 */
}

/* --- Element Plus Tabs Customization --- */
.eclat-tabs {
  --el-tabs-header-height: 60px;
  --el-tabs-border-color: transparent;
}

.eclat-tabs .el-tabs__header {
  margin-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--color-border);
  background-color: var(--color-primary-light);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.03);
  padding: 0 var(--spacing-md);
  border-radius: 4px;
}

.eclat-tabs .el-tabs__item {
  font-family: var(--font-heading); /* 标签项字体 */
  font-size: 1.2rem;
  color: var(--color-text-dark); /* 默认文字颜色 */
  padding: 0 var(--spacing-md);
  transition: all 0.3s ease;
  height: var(--el-tabs-header-height);
  line-height: var(--el-tabs-header-height);
}

:deep(.eclat-tabs .el-tabs__item:hover) {
  color: #b08d57; /* 悬停时强调色 */
}

:deep(.eclat-tabs .el-tabs__item.is-active) {
  color: #b08d57; /* 选中时强调色 */
  font-weight: 700;
}

:deep(.eclat-tabs .el-tabs__active-bar) {
  background-color: #b08d57; /* 指示条颜色 */
  height: 3px;
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.eclat-tabs .el-tabs__item .el-icon {
  vertical-align: middle;
  margin-right: 8px;
  font-size: 1.4rem;
  color: var(--color-primary-dark); /* 标签图标默认颜色 */
}
.eclat-tabs .el-tabs__item.is-active .el-icon {
  color: #b08d57; /* 选中标签的图标颜色 */
}
.eclat-tabs .el-tabs__item:hover .el-icon {
  color: #b08d57; /* 悬停标签的图标颜色 */
}

.eclat-tabs .el-tabs__item span {
  vertical-align: middle;
}

/* --- Grid Display for Items --- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.grid-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.grid-item .thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.grid-item:hover .thumbnail {
  transform: scale(1.05);
}

.item-content {
  padding: var(--spacing-sm);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-family: var(--font-heading); /* 案例卡片标题字体 */
  font-size: 1.3rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
  text-align: left;
}

.item-summary {
  font-family: var(--font-body); /* 案例卡片摘要字体 */
  font-size: 0.9rem;
  color: var(--color-text-dark);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
  text-align: left;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-content .el-button {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: white;
  width: 100%;
  margin-top: auto;
  font-family: var(--font-body); /* 按钮字体 */
}

.item-content .el-button:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

/* Image/Video Item Overlay */
.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-grow: 1;
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
}

.grid-item:hover .item-overlay {
  opacity: 1;
}

.item-overlay .item-title {
  font-family: var(--font-heading); /* 覆盖层标题字体 */
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  color: white; /* 确保覆盖层标题是白色 */
}

.item-overlay .el-button {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: white;
  margin-top: var(--spacing-sm);
  font-size: 1.2rem;
  font-family: var(--font-body); /* 覆盖层按钮字体 */
}

.item-overlay .el-button:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: var(--color-accent);
}

/* --- Dialog / Modal Styling --- */
.eclat-dialog .el-dialog__header {
  border-bottom: 1px solid var(--color-border);
  padding: 20px;
  background-color: var(--color-primary-light);
  text-align: center;
}
.eclat-dialog .el-dialog__title {
  font-family: var(--font-heading); /* 对话框标题字体 */
  font-size: 2rem;
  color: var(--color-primary-dark);
}
.eclat-dialog .el-dialog__body {
  padding: var(--spacing-md);
  background-color: #ffffff;
  display: flex; /* Make it a flex container */
  flex-direction: column; /* Stack items vertically */
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  min-height: 100px; /* Give it a minimum height to apply centering */
}
.eclat-dialog.is-fullscreen .el-dialog__body {
  padding: 0;
  display: flex; /* Still useful for centering content within fullscreen */
  justify-content: center;
  align-items: center;
}

/* Specific wrapper for image content to allow flex centering on its container */
.image-dialog-content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ensure it takes full width of the dialog body */
  height: calc(100vh - 78px); /* Ensure it takes full height of the dialog body */
}

/* Specific image styling within dialog */
.full-view-image {
  max-width: 100%;
  max-height: 80vh; /* Limit height relative to viewport for large images */
  object-fit: contain; /* Ensures the whole image is visible, scales down if too big */
  display: block; /* Remove extra space below image */
  margin: 0 auto; /* Ensures horizontal centering if flex fails */
}

.image-description {
  margin-top: var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text-dark);
  font-family: var(--font-body);
  text-align: center; /* Center description under the image */
}

/* 案例详情特定样式 */
.case-detail-content {
  padding: var(--spacing-md);
  color: var(--color-text-dark);
  max-height: 80vh;
  overflow-y: auto;
  font-family: var(--font-body); /* 确保内容字体 */
}

.case-main-image,
.carousel-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  margin-bottom: var(--spacing-md);
}

.detail-section-title {
  font-family: var(--font-heading); /* 详情页小标题字体 */
  font-size: 1.8rem;
  color: var(--color-primary-dark);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-sm);
  position: relative;
  padding-bottom: 5px;
  border-bottom: 1px dashed var(--color-border);
}

.case-full-description {
  font-family: var(--font-body); /* 详情描述字体 */
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.highlights-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: var(--spacing-md);
  font-family: var(--font-body); /* 亮点列表字体 */
}

.highlights-list li {
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--color-text-dark);
}
.highlights-list li .el-icon {
  margin-right: 8px;
  color: var(--color-accent); /* 亮点图标颜色 */
}

.products-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: var(--spacing-md);
}

.product-tag {
  font-family: var(--font-body); /* 产品标签字体 */
  font-size: 0.9rem;
  background-color: var(--color-primary-dark);
  color: var(--color-primary-light);
  border-color: var(--color-primary-dark);
  padding: 8px 12px;
}

/* Default Image/Video Dialog styles */
.full-view-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.image-description {
  margin-top: var(--spacing-md);
  font-size: 1rem;
  color: var(--color-text-dark);
  font-family: var(--font-body);
}

.video-embed-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  background-color: #000;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.vr-info {
  padding: var(--spacing-md);
}
.vr-description {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-dark);
  font-family: var(--font-body);
}
.vr-note {
  font-size: 0.9rem;
  color: var(--color-text-light);
  margin-top: var(--spacing-sm);
  font-family: var(--font-body);
}

.eclat-dialog .el-dialog__footer {
  border-top: 1px solid var(--color-border);
  padding: 15px 20px;
  background-color: var(--color-primary-light);
}
.eclat-dialog .el-dialog__footer .el-button {
  font-family: var(--font-body); /* 对话框底部按钮字体 */
}

/* 覆盖 Element Plus Carousel 导航按钮的默认样式 */
.el-carousel__button {
  background-color: var(--color-accent) !important;
  opacity: 0.8 !important;
  border-radius: 50% !important;
}
.el-carousel__button:hover {
  opacity: 1 !important;
}
.el-carousel__indicators--outside button {
  background-color: var(--color-border) !important;
}
.el-carousel__indicators--outside .is-active button {
  background-color: var(--color-accent) !important;
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .page-intro {
    font-size: 1rem;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .eclat-tabs .el-tabs__item {
    font-size: 1rem;
    padding: 0 10px;
  }
  .item-title {
    font-size: 1.2rem;
  }
  .item-summary {
    font-size: 0.85rem;
  }
  .item-overlay .el-button {
    font-size: 1rem;
  }
  .eclat-dialog .el-dialog__title {
    font-size: 1.5rem;
  }
  .case-detail-content {
    padding: var(--spacing-sm);
  }
  .case-main-image,
  .carousel-image {
    max-height: 300px;
  }
  .detail-section-title {
    font-size: 1.5rem;
  }
  .case-full-description,
  .highlights-list li,
  .product-tag {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .eclat-tabs .el-tabs__item {
    font-size: 0.9rem;
    padding: 0 8px;
    height: 50px;
    line-height: 50px;
  }
  .eclat-tabs .el-tabs__header {
    padding: 0 var(--spacing-sm);
    --el-tabs-header-height: 50px;
  }
}
</style>
