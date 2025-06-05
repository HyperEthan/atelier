<script setup>
// If you use icons from Element Plus, you might import them here,
// for example, if you replace simple image icons with ElIcon components.
// import { Instagram, Youtube } from '@element-plus/icons-vue'
</script>

<template>
  <footer class="main-footer">
    <div class="container">
      <div class="footer-nav">
        <ul>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/privacy">Privacy Policy</router-link></li>
          <li><router-link to="/terms">Terms of Service</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
        </ul>
      </div>
      <div class="social-media">
        <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <img :src="instagramIcon" alt="Instagram" />
        </a>
        <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
          <img :src="youtubeIcon" alt="YouTube" />
        </a>
        <a href="#" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
          <img :src="pinterestIcon" alt="Pinterest" />
        </a>
      </div>
      <p class="copyright">&copy; {{ currentYear }} Éclat Atelier. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script>
import instagramIcon from '@/assets/images/instagram-icon.svg'
import youtubeIcon from '@/assets/images/youtube-icon.svg'
import pinterestIcon from '@/assets/images/pinterest-icon.svg'
export default {
  name: 'MainFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
.main-footer {
  background-color: #fff;
  color: var(--color-text-light);
  padding: var(--spacing-md) 0;
  text-align: center;
}

.main-footer .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.footer-nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
}

.footer-nav ul li a {
  color: var(--color-text-light);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.footer-nav ul li a:hover {
  color: var(--color-accent);
}

/* Vue Router active link for footer nav */
.footer-nav ul li .router-link-active {
  color: var(--color-accent);
}

.social-media {
  display: flex;
  gap: var(--spacing-sm);
}

.social-media a img {
  width: 28px;
  height: 28px;
  filter: invert(80%); /* Make social icons lighter against dark background */
  transition: filter 0.3s ease;
}

.social-media a:hover img {
  filter: invert(0%) sepia(100%) saturate(2000%) hue-rotate(300deg) brightness(100%) contrast(100%); /* Gold tint on hover */
}

.copyright {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .footer-nav ul {
    flex-direction: column;
    align-items: center;
  }
  .footer-nav ul li {
    margin-bottom: 5px;
  }
}
</style>
