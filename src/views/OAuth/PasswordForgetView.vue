<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()
const email = ref('')

const handleReset = () => {
    console.log(`正在發送信件給: ${email.value}`)
    setTimeout(() => {
        router.push('/forget-password/confirmation')
    }, 1000)
}
</script>

<template>
  <OAuthCard>
    <template #left-side>
      <i class="bi bi-key-fill floating-obj fs-3" style="left: 20%; animation-delay: 0s;"></i>
      <i class="bi bi-unlock-fill floating-obj fs-1" style="left: 50%; animation-delay: 2s; animation-duration: 9s;"></i>

      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg" style="width: 90px; height: 90px;">
          <i class="bi bi-shield-lock-fill fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">找回您的帳號</h1>
        <p class="fs-5 mb-0">我們幫您重新連結緣分</p>
      </div>
    </template>

    <div style="max-width: 450px; margin: 0 auto;">
      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">忘記密碼?</h2>
        <p class="text-muted">輸入您的註冊 Email，我們會寄送重設連結。</p>
      </div>

      <form @submit.prevent="handleReset">
        <div class="input-group-custom mb-4">
          <input type="email" v-model="email" class="form-control" placeholder="請輸入 Email" required autofocus>
          <i class="bi bi-envelope"></i>
        </div>

        <div class="d-grid gap-3 mb-4">
          <button type="submit" class="btn btn-primary fs-5 shadow-sm">
            發送重設信 <i class="bi bi-send-fill ms-2"></i>
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
        <p class="small text-muted mb-1">想起密碼了?</p>
        <RouterLink to="/login" class="text-decoration-none fw-bold text-gradient">
          <i class="bi bi-arrow-left-short"></i> 返回登入
        </RouterLink>
      </div>
    </div>
  </OAuthCard>
</template>