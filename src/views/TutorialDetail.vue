<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElProgress } from 'element-plus' // Example: for a progress bar or step indicator

const route = useRoute()
const router = useRouter()
const tutorial = ref(null)
const isLoading = ref(true)

// Simulate a database/API of tutorials
const mockTutorialsDB = [
  {
    id: 'red-carpet',
    title: 'Red Carpet Radiance: The Ultimate Glam',
    image: '/images/tutorial-red-carpet.jpg',
    description:
      'Master breathtaking looks for your most dazzling events. This masterclass covers everything from perfect skin prep to captivating eye makeup and long-lasting lip artistry.',
    videoUrl: 'https://www.youtube.com/embed/OBQ4JwfLcPE', // Replace with actual YouTube/Vimeo embed URL
    steps: [
      {
        id: 1,
        title: 'Step 1: Flawless Skin Preparation',
        details: 'Begin with a hydrating primer and color corrector to create an even canvas.',
      },
      {
        id: 2,
        title: 'Step 2: Sculpting with Foundation & Concealer',
        details: 'Apply full-coverage foundation and strategically conceal any imperfections.',
      },
      {
        id: 3,
        title: 'Step 3: The Glamorous Eye',
        details: 'Create a smoky eye with rich metallics and dramatic winged liner.',
      },
      {
        id: 4,
        title: 'Step 4: Defined Brows & Lashes',
        details: 'Fill and shape brows, then apply voluminous false lashes.',
      },
      {
        id: 5,
        title: 'Step 5: Contouring & Highlighting',
        details: 'Sculpt your face with cream and powder contours, adding a luminous highlight.',
      },
      {
        id: 6,
        title: 'Step 6: Long-Lasting Lip Artistry',
        details: 'Line and fill with a bold, transfer-proof lipstick for a captivating pout.',
      },
      {
        id: 7,
        title: 'Step 7: Setting for Longevity',
        details: 'Lock in your look with a high-performance setting spray.',
      },
    ],
    productsUsed: [
      { name: "Chanel Sublimage L'Essence Lumière", type: 'Serum', link: '#' },
      { name: 'Dior Forever Skin Glow Foundation', type: 'Foundation', link: '#' },
      { name: 'Pat McGrath Labs Mothership V Eyeshadow Palette', type: 'Eyeshadow', link: '#' },
      { name: 'Tom Ford Emotionproof Eye Color', type: 'Eyeliner', link: '#' },
      { name: 'Charlotte Tilbury Pillow Talk Lipstick', type: 'Lipstick', link: '#' },
      { name: 'La Mer The Powder', type: 'Setting Powder', link: '#' },
    ],
  },
  {
    id: 'everyday-eclat',
    title: 'The Everyday Éclat: Effortless Chic',
    image: '/images/tutorial-everyday-eclat.jpg',
    description:
      'Unlock sophisticated beauty routines for your daily life. This tutorial focuses on enhancing your natural features with minimal effort for maximum impact.',
    videoUrl: 'https://www.youtube.com/embed/6TmiyB0FuKQ',
    steps: [
      {
        id: 1,
        title: 'Step 1: Hydration & Sun Protection',
        details: 'Start with a lightweight moisturizer and broad-spectrum SPF.',
      },
      {
        id: 2,
        title: 'Step 2: Sheer Base & Conceal',
        details: 'Apply a tinted moisturizer or BB cream, concealing only where needed.',
      },
      {
        id: 3,
        title: 'Step 3: Natural Brow Enhancement',
        details: 'Brush brows into place and lightly fill sparse areas.',
      },
      {
        id: 4,
        title: 'Step 4: Soft Eyes & Lashes',
        details: 'A touch of neutral eyeshadow and one coat of mascara.',
      },
      {
        id: 5,
        title: 'Step 5: A Hint of Color',
        details: 'Dab cream blush onto cheeks and lips for a cohesive look.',
      },
    ],
    productsUsed: [
      { name: 'Augustinus Bader The Rich Cream', type: 'Moisturizer', link: '#' },
      { name: 'Laura Mercier Tinted Moisturizer', type: 'Tinted Moisturizer', link: '#' },
      { name: 'Glossier Boy Brow', type: 'Brow Gel', link: '#' },
      { name: 'NARS The Multiple in Orgasm', type: 'Multi-stick', link: '#' },
    ],
  },
  {
    id: 'flawless-canvas',
    title: 'Flawless Canvas: Foundation Mastery',
    image: '/images/tutorial-flawless-canvas.jpg',
    description:
      'Achieve a perfect base with expert techniques for every skin type. This masterclass covers choosing the right foundation, application methods, and ensuring longevity.',
    videoUrl: 'https://www.youtube.com/embed/IjTNs4R7o4U',
    steps: [
      {
        id: 1,
        title: 'Step 1: Skin Assessment',
        details: 'Understand your skin type and concerns (oily, dry, combo, sensitive).',
      },
      {
        id: 2,
        title: 'Step 2: Choosing Your Formula',
        details: 'Learn about liquid, cream, powder foundations and their finishes.',
      },
      {
        id: 3,
        title: 'Step 3: Color Matching',
        details: 'Tips for finding your perfect shade and undertone.',
      },
      {
        id: 4,
        title: 'Step 4: Application Techniques',
        details: 'Master brushes, sponges, and finger application for different coverages.',
      },
      {
        id: 5,
        title: 'Step 5: Setting & Finishing',
        details: 'How to set your foundation for long-wear and a seamless finish.',
      },
    ],
    productsUsed: [
      { name: 'Shiseido Synchro Skin Self-Refreshing Foundation', type: 'Foundation', link: '#' },
      { name: 'Giorgio Armani Luminous Silk Foundation', type: 'Foundation', link: '#' },
      { name: 'Beautyblender Original', type: 'Sponge', link: '#' },
      { name: 'Kevyn Aucoin The Sensual Skin Enhancer', type: 'Concealer', link: '#' },
    ],
  },
  // Add more mock tutorial data here matching the IDs in your router
]

const fetchTutorialData = (id) => {
  isLoading.value = true
  // Simulate API call delay
  setTimeout(() => {
    tutorial.value = mockTutorialsDB.find((t) => t.id === id)
    isLoading.value = false
    if (!tutorial.value) {
      router.push('/404') // Redirect to 404 if not found
    }
  }, 500)
}

// Watch for changes in the route parameter 'id'
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchTutorialData(newId)
    }
  },
  { immediate: true },
) // Fetch data immediately when component mounts

// You might also want to set current step if you have a progress bar
const currentStep = ref(1) // For progress tracking, if implemented
</script>

<template>
  <main class="tutorial-detail-page container">
    <div v-if="isLoading" class="loading-state">
      <el-progress
        :percentage="50"
        :indeterminate="true"
        :duration="1"
        type="circle"
        status="warning"
      />
      <p>Loading Tutorial...</p>
    </div>

    <div v-else-if="tutorial" class="tutorial-content">
      <h1 class="tutorial-title">{{ tutorial.title }}</h1>
      <p class="tutorial-description">{{ tutorial.description }}</p>

      <div class="video-container">
        <iframe
          :src="tutorial.videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="Tutorial Video"
        ></iframe>
      </div>

      <section class="tutorial-steps">
        <h2>Tutorial Steps</h2>
        <div class="steps-grid">
          <div v-for="step in tutorial.steps" :key="step.id" class="step-item">
            <h3>{{ step.title }}</h3>
            <p>{{ step.details }}</p>
          </div>
        </div>
      </section>

      <section class="products-used">
        <h2>Products Used in This tutorial</h2>
        <div class="product-list">
          <div v-for="(product, index) in tutorial.productsUsed" :key="index" class="product-item">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-type">{{ product.type }}</span>
            <a
              v-if="product.link"
              :href="product.link"
              target="_blank"
              rel="noopener noreferrer"
              class="product-link"
            >
              Shop Now
            </a>
          </div>
        </div>
        <p class="disclaimer">
          *Product links may be affiliate links. Éclat Atelier only recommends products we truly
          believe in.
        </p>
      </section>

      <div class="back-to-tutorials">
        <el-button type="info" size="large" @click="router.push('/tutorials')"
          >BACK TO ALL TUTORIALS</el-button
        >
      </div>
    </div>

    <div v-else class="error-state">
      <p>TUTORIAL NOT FOUND.</p>
      <el-button type="primary" size="large" @click="router.push('/tutorials')"
        >BROWSE TUTORIALS</el-button
      >
    </div>
  </main>
</template>

<style scoped>
.tutorial-detail-page {
  padding-top: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
  color: var(--color-text-dark);
}

.loading-state,
.error-state {
  text-align: center;
  padding: var(--spacing-xl);
  font-size: 1.2rem;
  color: var(--color-text-dark);
}
.loading-state .el-progress {
  margin-bottom: var(--spacing-sm);
}

.tutorial-content {
  background-color: #ffffff;
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.tutorial-title {
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
}

.tutorial-description {
  font-size: 1.2rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto var(--spacing-xl);
  line-height: 1.8;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  background-color: #000; /* Placeholder background */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

section {
  margin-bottom: var(--spacing-xl);
}

section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-xl);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: var(--spacing-sm);
}

section h2::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: var(--color-accent);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.step-item {
  background-color: var(--color-primary-light);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.step-item h3 {
  font-size: 1.5rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-xs);
}

.step-item p {
  font-size: 0.95rem;
  color: var(--color-text-dark);
}

.products-used {
  background-color: var(--color-primary-light);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  background-color: #ffffff;
  min-width: 200px;
  max-width: 250px;
  text-align: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.02);
}

.product-name {
  font-weight: bold;
  color: var(--color-primary-dark);
  margin-bottom: 5px;
  font-size: 1.1rem;
}

.product-type {
  font-style: italic;
  color: var(--color-text-light);
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.product-link {
  display: inline-block;
  padding: 8px 15px;
  background-color: var(--color-accent);
  color: white;
  border-radius: 3px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background-color 0.3s ease;
}

.product-link:hover {
  background-color: darken(
    var(--color-accent),
    10%
  ); /* Requires a SCSS processor or manually pick color */
  background-color: #927547; /* Example darker gold */
}

.disclaimer {
  font-size: 0.8rem;
  color: var(--color-text-light);
  text-align: center;
  margin-top: var(--spacing-md);
}

.back-to-tutorials {
  text-align: center;
  margin-top: var(--spacing-xl);
}

/* Media Queries */
@media (max-width: 992px) {
  .tutorial-title {
    font-size: 2.8rem;
  }
  section h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .tutorial-title {
    font-size: 2rem;
  }
  .tutorial-description {
    font-size: 1rem;
  }
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .product-item {
    min-width: unset;
    width: 100%;
  }
}
</style>
