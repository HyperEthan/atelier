<script setup>
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const rules = {
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  email: [
    { required: true, message: 'Please enter your email address', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] },
  ],
  message: [{ required: true, message: 'Please enter your message', trigger: 'blur' }],
}

const formRef = ref(null) // Reference to the ElForm component

const handleSubmit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate() // Validate the form
    // If validation passes
    console.log('Form submitted:', form.value)
    ElMessage.success('Thank you for your message! We will get back to you soon.')
    // Reset form
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
  } catch (error) {
    console.error('Form validation failed:', error)
    ElMessage.error('Please correct the errors in the form.')
  }
}
</script>

<template>
  <main class="contact-page container">
    <h1 class="page-title">Contact Éclat Atelier</h1>
    <p class="page-intro">
      Have a question, feedback, or collaboration inquiry? We'd love to hear from you.
    </p>

    <div class="contact-content">
      <div class="contact-form-wrapper">
        <ElForm
          :model="form"
          :rules="rules"
          ref="formRef"
          label-position="top"
          class="contact-form"
        >
          <ElFormItem label="Your Name" prop="name">
            <ElInput v-model="form.name" placeholder="Enter your full name"></ElInput>
          </ElFormItem>
          <ElFormItem label="Your Email" prop="email">
            <ElInput v-model="form.email" placeholder="name@example.com"></ElInput>
          </ElFormItem>
          <ElFormItem label="Your Message" prop="message">
            <ElInput
              v-model="form.message"
              type="textarea"
              :rows="5"
              placeholder="Tell us how we can help you..."
            ></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" size="large" @click="handleSubmit">Send Message</ElButton>
          </ElFormItem>
        </ElForm>
      </div>

      <div class="contact-info">
        <h3>Reach Out</h3>
        <p>
          For general inquiries, please use the form or email us directly at:
          <br />
          <a href="mailto:info@eclatatelier.com">info@eclatatelier.com</a>
        </p>
        <p>
          For press and media, please contact:
          <br />
          <a href="mailto:press@eclatatelier.com">press@eclatatelier.com</a>
        </p>
        <p>
          <strong>Address:</strong><br />
          Éclat Atelier Headquarters<br />
          123 Luxury Lane, Suite 456<br />
          Beauty City, BC 78901<br />
          France
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
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
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: flex-start; /* Align items to the top */
}

.contact-form-wrapper {
  background-color: #ffffff;
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-form .el-form-item {
  margin-bottom: var(--spacing-sm);
}

.contact-form .el-form-item__label {
  font-weight: bold;
  color: var(--color-primary-dark);
}

.contact-form .el-input,
.contact-form .el-textarea {
  width: 100%;
}

.contact-form .el-button--primary {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: var(--color-primary-light);
  width: 100%; /* Make button full width */
}

.contact-form .el-button--primary:hover {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.contact-info {
  background-color: var(--color-primary-light);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.02);
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-dark);
}

.contact-info p {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-dark);
}

.contact-info a {
  color: var(--color-accent);
  font-weight: bold;
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  .page-intro {
    font-size: 1rem;
  }
}
</style>
