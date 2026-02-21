<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()
const newPassword = ref('')
const confirmPassword = ref('')
const isError = ref(false)

const handleResetSubmit = () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('密碼與確認密碼不符')
        return
    }

    console.log('提交新密碼:', newPassword.value)
    router.push('/login')
}
</script>

<template>
  <OAuthCard>
    <template #left-side>
      <i class="bi bi-shield-lock-fill floating-obj fs-1" style="left: 15%; animation-duration: 14s;"></i>
      <i class="bi bi-key-fill floating-obj fs-3" style="left: 80%; animation-duration: 16s; animation-delay: 0.5s;"></i>
      
      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg" style="width: 90px; height: 90px;">
          <i class="bi bi-shield-check fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">設定新密碼</h1>
        <p class="fs-5 mb-0">為了安全，請設定一組強密碼</p>
      </div>
    </template>

    <div style="max-width: 450px; margin: 0 auto;">
      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">重設密碼</h2>
        <p class="text-muted">請輸入您的新密碼以恢復帳號存取權。</p>
      </div>

      <div v-if="isError" class="alert alert-danger border-0 bg-danger-subtle text-danger mb-4 shadow-sm">
        <i class="bi bi-exclamation-circle-fill me-2"></i> 連結已過期或無效
      </div>

      <form @submit.prevent="handleResetSubmit">
        <div class="mb-3">
          <label class="form-label">新密碼</label>
          <div class="input-group-custom">
            <input type="password" v-model="newPassword" class="form-control" placeholder="請設定新密碼" required autofocus>
            <i class="bi bi-key"></i>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">確認新密碼</label>
          <div class="input-group-custom">
            <input type="password" v-model="confirmPassword" class="form-control" placeholder="再次輸入新密碼" required>
            <i class="bi bi-check-lg"></i>
          </div>
        </div>

        <div class="d-grid mt-4">
          <button type="submit" class="btn btn-primary fs-5 shadow-sm">
            確認重設 <i class="bi bi-check-circle-fill ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  </OAuthCard>
</template>