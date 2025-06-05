<template>
  <article class="tutorial-card">
    <router-link :to="`/tutorials/${tutorial.id}`">
      <img :src="tutorial.image" :alt="tutorial.title" />
      <h3>{{ tutorial.title }}</h3>
      <p>{{ tutorial.description }}</p>
    </router-link>
  </article>
</template>

<script setup>
// 使用 defineProps 接收父组件传递的数据
const props = defineProps({
  tutorial: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      title: 'Default Title',
      description: 'A default description.',
      image: '/images/placeholder.jpg',
    }),
  },
})
</script>

<style scoped>
.tutorial-card {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition:
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.tutorial-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.tutorial-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.tutorial-card:hover img {
  transform: scale(1.05);
}

.tutorial-card a {
  display: block;
  color: inherit;
}

.tutorial-card h3 {
  font-size: 1.5rem;
  margin: var(--spacing-sm) var(--spacing-sm) var(--spacing-xs);
  color: #fff;
}

.tutorial-card p {
  font-size: 0.95rem;
  color: #fff;
  padding: 0 var(--spacing-sm) var(--spacing-sm);
}
</style>
