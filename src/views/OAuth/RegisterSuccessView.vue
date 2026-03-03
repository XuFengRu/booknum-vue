<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import OAuthCard from '@/components/OAuthCard.vue'

const route = useRoute()
const userEmail = ref(route.query.email || '') // 🌟 抓取 Email

const handleResend = async () => {
  if (!userEmail.value) {
    Swal.fire({ icon: 'warning', title: '無法發送', text: '遺失 Email 資訊' })
    return
  }

  try {
    Swal.fire({ title: '發送中...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } })

    const response = await axios.post('/Auth/ResendVerifyEmail', { email: userEmail.value })

    Swal.fire({ icon: 'success', title: '已重新發送', text: response.data.message })
  } catch (error) {
    const errorMsg = error.response?.data?.message || '發送失敗'
    Swal.fire({ icon: 'error', title: '錯誤', text: errorMsg })
  }
}
</script>

<template>
  <OAuthCard>
    <template #left-side>
      <i class="bi bi-heart-fill floating-obj fs-3" style="left: 15%; animation-delay: 0s;"></i>
      <i class="bi bi-envelope-check-fill floating-obj fs-2"
        style="left: 50%; animation-delay: 3s; animation-duration: 10s;"></i>
      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg"
          style="width: 90px; height: 90px;">
          <i class="bi bi-check-lg fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">歡迎加入</h1>
        <p class="fs-5 mb-0">BOOK仁 大家庭<br>期待與您相遇</p>
        <div style="width: 40px; height: 3px; background: white; margin: 15px auto;"></div>
      </div>
    </template>

    <div style="max-width: 450px; margin: 0 auto;">
      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">註冊成功！</h2>
        <p class="text-muted">您的帳號已建立，請完成最後驗證。</p>
      </div>

      <div class="alert alert-custom p-4 mb-4">
        <div class="d-flex align-items-start">
          <div class="me-3">
            <i class="bi bi-envelope-exclamation-fill fs-3" style="color: var(--bs-primary);"></i>
          </div>
          <div>
            <h5 class="fw-bold mb-1" style="color: var(--text-main);">只差最後一步</h5>
            <p class="mb-0 small text-muted lh-base">
              驗證信已發送至您的電子信箱。<br>
              請點擊信中的連結以啟用帳號。
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
          沒收到信？請檢查垃圾郵件夾，或
          <a href="#" @click.prevent="handleResend" class="fw-bold text-gradient text-decoration-none">重新發送</a>
        </p>
      </div>
    </div>
  </OAuthCard>
</template>