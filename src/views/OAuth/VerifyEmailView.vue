<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import OAuthCard from '@/components/OAuthCard.vue'

const route = useRoute()
const router = useRouter()
const isSuccess = ref(false)
const isError = ref(false)
const message = ref('正在驗證您的 Email，請稍候...')

onMounted(async () => {
  const token = route.query.token
  if (!token) {
    message.value = '無效的驗證連結'
    isError.value = true
    return
  }

  try {
    Swal.fire({ title: '驗證中...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } })

    const response = await axios.post('/Auth/VerifyEmail', { token })

    message.value = response.data.message
    isSuccess.value = true

    await Swal.fire({ icon: 'success', title: '驗證成功', text: message.value, confirmButtonColor: '#0d6efd' })
    router.push('/login')

  } catch (error) {
    message.value = error.response?.data?.message || '驗證失敗，請稍後再試'
    isError.value = true
    Swal.fire({ icon: 'error', title: '驗證失敗', text: message.value, confirmButtonColor: '#dc3545' })
  }
})
</script>

<template>
  <OAuthCard>
    <template #left-side>
      <i class="bi bi-shield-check floating-obj fs-1" style="left: 20%; animation-duration: 15s;"></i>
      <i class="bi bi-envelope-heart-fill floating-obj fs-2"
        style="left: 65%; animation-duration: 12s; animation-delay: 2s;"></i>

      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg"
          style="width: 90px; height: 90px;">
          <i class="bi bi-envelope-check-fill fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">帳號啟用</h1>
      </div>
    </template>

    <div style="max-width: 450px; margin: 0 auto;">

      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">Email 驗證</h2>
        <p class="text-muted">正在確認您的帳號狀態...</p>
      </div>

      <div v-if="!isSuccess && !isError" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
        <p class="text-muted fs-5 fw-bold">{{ message }}</p>
      </div>

      <div v-if="isSuccess">
        <div class="alert alert-custom p-4 mb-4">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <i class="bi bi-check-circle-fill fs-3 text-success"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-1" style="color: var(--text-main);">驗證成功</h5>
              <p class="mb-0 small text-muted lh-base">
                {{ message }}<br>正在為您跳轉至登入頁面...
              </p>
            </div>
          </div>
        </div>

        <div class="d-grid gap-3 mb-4">
          <RouterLink to="/login" class="btn btn-primary fs-5 shadow-sm">
            立即登入 <i class="bi bi-arrow-right-short ms-1"></i>
          </RouterLink>
        </div>
      </div>

      <div v-if="isError">
        <div class="alert alert-custom p-4 mb-4">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <i class="bi bi-exclamation-circle-fill fs-3 text-danger"></i>
            </div>
            <div>
              <h5 class="fw-bold mb-1" style="color: var(--text-main);">驗證失敗</h5>
              <p class="mb-0 small text-muted lh-base">
                {{ message }}
              </p>
            </div>
          </div>
        </div>

        <div class="d-grid gap-3 mb-4">
          <RouterLink to="/login" class="btn btn-primary fs-5 shadow-sm">
            返回登入頁 <i class="bi bi-arrow-right-short ms-1"></i>
          </RouterLink>
        </div>

        <div class="text-center border-top border-secondary border-opacity-10 pt-3">
          <p class="text-muted small opacity-75 mb-0">
            連結已失效？請返回登入頁，或
            <RouterLink to="/register" class="fw-bold text-gradient text-decoration-none">重新註冊</RouterLink>
          </p>
        </div>
      </div>

    </div>
  </OAuthCard>
</template>