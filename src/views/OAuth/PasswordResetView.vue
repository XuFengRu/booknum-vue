<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()
const route = useRoute()

const newPassword = ref('')
const confirmPassword = ref('')
const isError = ref(false)
const token = ref('')
const isSubmitting = ref(false) // 防連點狀態

onMounted(() => {
  token.value = route.query.token
  if (!token.value) {
    isError.value = true
  }
})

const handleResetSubmit = async () => {
  if (isSubmitting.value) return;

  // 防呆：檢查密碼是否一致
  if (newPassword.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'warning',
      title: '密碼不一致',
      text: '兩次輸入的密碼不相同，請重新確認',
      confirmButtonColor: '#f8c471'
    })
    return
  }

  // 防呆：同步註冊時的密碼強度規定
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(newPassword.value)) {
    Swal.fire({
      icon: 'warning',
      title: '密碼強度不足',
      text: '新密碼必須至少 8 個字元，且同時包含「英文字母」與「數字」',
      confirmButtonColor: '#f8c471'
    })
    return;
  }

  isSubmitting.value = true; // 鎖定按鈕

  try {
    const response = await axios.post('/Auth/ResetPassword', {
      token: token.value,
      newPassword: newPassword.value
    })

    await Swal.fire({
      icon: 'success',
      title: '重設成功',
      text: response.data.message || '密碼已成功更新！請使用新密碼登入。',
      confirmButtonColor: '#0d6efd'
    })

    router.push('/login')

  } catch (error) {
    if (error.response && error.response.data) {
      Swal.fire({ icon: 'error', title: '重設失敗', text: error.response.data.message, confirmButtonColor: '#dc3545' })
      isError.value = true
    } else {
      Swal.fire({ icon: 'error', title: '連線失敗', text: '請檢查您的網路狀態', confirmButtonColor: '#dc3545' })
    }
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <OAuthCard>
    <template #left-side>
      <i class="bi bi-shield-lock-fill floating-obj fs-1" style="left: 15%; animation-duration: 14s;"></i>
      <i class="bi bi-key-fill floating-obj fs-3"
        style="left: 80%; animation-duration: 16s; animation-delay: 0.5s;"></i>

      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg"
          style="width: 90px; height: 90px;">
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
          <button type="submit" class="btn btn-primary fs-5 shadow-sm" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"
              aria-hidden="true"></span>
            {{ isSubmitting ? '處理中...' : '確認重設' }}
            <i v-if="!isSubmitting" class="bi bi-check-circle-fill ms-2"></i>
          </button>
        </div>
      </form>
    </div>
  </OAuthCard>
</template>