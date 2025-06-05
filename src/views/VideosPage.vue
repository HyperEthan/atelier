<script setup>
import { ref } from 'vue';
import { ElDialog, ElButton, ElIcon } from 'element-plus';
import VideoPlaceholder from '@/assets/images/video_placeholder.png'; // Make sure this path is correct

// Import videos data - Make sure your mediaData.js is structured as described
import { beautyVideos } from '@/data/mediaData'; // Assuming this now exports an object with groups

const dialogVisible = ref(false);
const currentVideo = ref(null);
const videoGroups = ref(beautyVideos); // Use the grouped videos directly

// Function to format group names for display
const formatGroupName = (name) => {
  const groupNames = {
    group1: '第一组 | 基础教学',
    group2: '第二组 | 创意造型',
    group3: '第三组 | 幕后花絮',
    group4: '第四组 | 产品评测',
    // Add more groups if you expand them in mediaData.js
  };
  return groupNames[name] || name; // Returns formatted name, or original if not mapped
};

const openVideoDialog = (item) => {
  currentVideo.value = item;
  // Prepare embed URL
  let embedUrl = item.videoUrl;
  if (embedUrl.includes('youtube.com/watch?v=') || embedUrl.includes('youtube.com/watch?v=')) {
    // This handles both the placeholder URL and actual YouTube watch URLs
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
    // Handle the specific placeholder URL if it's meant to be modified this way
    embedUrl = embedUrl.replace('youtube.com/watch?v=', 'https://www.youtube.com/embed/');
  } else if (embedUrl.includes('youtu.be/')) {
    // This looks like another placeholder, adjust if needed
    embedUrl = embedUrl.replace('youtu.be/', 'https://www.youtube.com/embed/some_video_id_here'); // Replace with a real embed base
  }

  // Ensure autoplay is added
  if (!embedUrl.includes('autoplay=1')) {
    embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
  }

  currentVideo.value.embedUrl = embedUrl;
  dialogVisible.value = true;
};

const closeVideoDialog = () => {
  dialogVisible.value = false;
  // Stop the video when dialog closes by clearing the current video's embed URL
  if (currentVideo.value) {
    currentVideo.value.embedUrl = ''; // Clear embed URL to stop playback
  }
  currentVideo.value = null;
};
</script>

<template>
  <main class="videos-page container">
    <h1 class="page-title">美妆视频集锦</h1>
    <p class="page-intro">
      观看Éclat工作室的精彩美妆视频，从幕后花絮到教程演示，身临其境感受美妆魅力。
    </p>

    <div v-for="(group, groupName) in videoGroups" :key="groupName" class="video-group">
      <div class="title">{{ formatGroupName(groupName) }}</div>
      <div class="imgur-grid">
        <div v-for="item in group" :key="item.id" class="grid-item" @click="openVideoDialog(item)">
          <div class="grid-item-content">
            <div class="grid-item-thumbnail-wrapper">
              <img :src="item.thumbnail" :alt="item.title" class="grid-item-thumbnail" />
            </div>
            <div class="grid-item-overlay">
              <h3 class="grid-item-title">{{ item.title }}</h3>
              </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title=""
      :fullscreen="true"
      @close="closeVideoDialog"
      custom-class="video-playback-dialog"
      :align-center="true"
      append-to-body="true"
    >
      <div v-if="currentVideo && currentVideo.embedUrl" class="video-embed-container">
        <iframe
          :src="currentVideo.embedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="video-iframe"
        ></iframe>
      </div>
    </el-dialog>
  </main>
</template>

<style scoped>

/* --- Page Layout and Typography --- */
.videos-page {
  padding-top: 40px; /* Increase top padding */
  padding-bottom: 40px; /* Increase bottom padding */
}

.page-title {
  text-align: center;
  font-size: 4rem; /* Slightly larger title */
  margin-bottom: 40px; /* More space after title */
  color: #fff;
  position: relative;
  padding-bottom: var(--spacing-md); /* More padding for the underline */
  font-family: var(--font-heading);
  letter-spacing: 0.5px; /* Slight letter spacing for elegance */
  font-weight: 700; /* Bold for emphasis */
}
.page-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 120px; /* Slightly wider underline */
  height: 4px; /* Thicker underline */
  background-color: #b73c62;
}

.page-intro {
  text-align: center;
  font-size: 1.2rem; /* Slightly larger intro text */
  max-width: 900px;
  margin: 0 auto 60px; /* More space after intro */
  color: #b2b4b8; /* Darker grey intro text */
  line-height: 1.7; /* Improved line height for readability */
  font-family: var(--font-body);
}

/* --- Video Group Styling --- */
.video-group {
  margin-bottom: 20px; /* More space between groups */
  border-radius: 12px; /* Rounded corners for group sections */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* Subtle box shadow for depth */
}

.video-group:last-child {
  margin-bottom: 0; /* No bottom margin for the last group */
}

.video-group .title {
  font-size: 1.2rem; /* Larger group titles */
  font-weight: 500; /* Slightly lighter but still strong */
  color: #fff;
  text-align: left; /* Align group titles to the left */
  padding-bottom: var(--spacing-sm);
  padding-left: 52px; /* Indent slightly */
  padding-top: 20px;
  padding-right: 52px; /* Add some right margin for balance */
  background-color: #9d3050;
  border-radius: 12px 12px 0 0;
}

/* --- Imgur-like Grid Style --- */
.imgur-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Slightly wider minimum width for items */
  gap: 20px; /* Increased gap between grid items */
  padding: 20px; /* Padding inside the grid container */
  background-color: #bb3d63;
}

.grid-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border-radius: 8px; /* Rounded corners for individual grid items */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* Subtle box shadow on items */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  height: auto;
  display: block;
}

.grid-item:hover {
  transform: translateY(-5px); /* Slightly more pronounced hover effect */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1); /* Enhanced hover shadow */
}

.grid-item-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.grid-item-thumbnail-wrapper {
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio for video thumbnails */
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0; /* Rounded top corners for thumbnail */
}

.grid-item-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image covers the area */
  display: block;
  transition: opacity 0.3s ease;
}

.grid-item:hover .grid-item-thumbnail {
  opacity: 0.8; /* Slightly less dimming on hover, keeps some vibrancy */
}

.grid-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Slightly lighter overlay */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align title and other content to the bottom */
  align-items: flex-start; /* Align title and other content to the left */
  opacity: 0; /* Hidden by default */
  transition: opacity 0.3s ease;
  color: white;
  padding: var(--spacing-md); /* More padding for overlay text */
  box-sizing: border-box;
}

.grid-item:hover .grid-item-overlay {
  opacity: 1; /* Overlay appears on hover */
}

.grid-item-title {
  font-family: var(--font-heading);
  font-size: 1.4rem; /* Slightly larger title in overlay */
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6); /* Stronger text shadow for readability */
  color: white;
  font-weight: 500; /* Slightly lighter font weight for a modern look */
  text-align: left;
}

/* --- Dialog Styles (for video playback) --- */
/* Target the dialog body specifically for full height */
:deep(.el-dialog__body) {
  height: calc(100% - 16px) !important; /* Adjust if header/footer height changes */
  display: flex; /* Ensure flex behavior for centering video */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xl); /* More padding in dialog body */
  background-color: #ffffff; /* Clean white background */
}

.video-playback-dialog .el-dialog__header {
  border-bottom: 1px solid #eee; /* Lighter border */
  padding: 25px; /* More padding */
  background-color: #f9f9f9; /* Lighter background */
  text-align: center;
}
.video-playback-dialog .el-dialog__title {
  font-family: var(--font-heading);
  font-size: 2.5rem; /* Slightly larger dialog title */
  color: #fff;
  font-weight: 500;
}
.video-embed-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
  background-color: #000; /* Black background for video area */
  border-radius: 8px; /* Rounded corners for video iframe */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Subtle shadow on video */
  max-width: 1200px; /* Limit maximum width of the video for larger screens */
  margin: 0 auto; /* Center the video within the dialog */
}
.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px; /* Match container border-radius */
}
.video-playback-dialog .el-dialog__footer {
  border-top: 1px solid #eee; /* Lighter border */
  padding: 20px 25px; /* Adjust padding */
  background-color: #f9f9f9; /* Lighter background */
  display: flex;
  justify-content: flex-end; /* Align buttons (if any) to the right */
}

/* --- Responsive Adjustments --- */
@media (max-width: 992px) {
  .page-title {
    font-size: 3.5rem;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
  }
  .page-intro {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-xl);
  }
  .video-group {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }
  .video-group .title {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-xs);
  }
  .imgur-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    padding: 15px;
  }
  .grid-item-title {
    font-size: 1.2rem;
  }
  .video-playback-dialog .el-dialog__title {
    font-size: 2rem;
  }
  .video-embed-container {
    max-width: 95%; /* Make video slightly smaller on tablets */
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 3rem;
  }
  .page-intro {
    font-size: 1rem;
    margin-bottom: var(--spacing-lg);
  }
  .video-group {
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
  }
  .video-group .title {
    font-size: 1.6rem;
    margin-bottom: var(--spacing-sm);
    padding-bottom: 0;
    border-bottom: none; /* Remove border on smaller screens for cleaner look */
    text-align: center; /* Center title on smaller screens */
    margin-left: 0;
    margin-right: 0;
  }
  .imgur-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  .grid-item-title {
    font-size: 1rem;
  }
  .grid-item-overlay .el-button {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
  .video-playback-dialog .el-dialog__title {
    font-size: 1.8rem;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 2.5rem;
  }
  .imgur-grid {
    grid-template-columns: 1fr; /* Stack items vertically on very small screens */
  }
  .grid-item-title {
    font-size: 1.1rem;
  }
}
</style>