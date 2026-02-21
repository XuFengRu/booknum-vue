<script setup>
import { useRouter, RouterLink } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()

const handleLogin = () => {
    router.push('/member')
}
</script>

<template>
  <OAuthCard>
    
    <template #left-side>
      <i class="bi bi-heart-fill floating-obj fs-3" style="left: 20%; animation-delay: 0s;"></i>
      <i class="bi bi-chat-heart-fill floating-obj fs-1" style="left: 50%; animation-delay: 2s; animation-duration: 9s;"></i>

      <div class="position-relative z-2">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg" style="width: 90px; height: 90px;">
          <i class="bi bi-heart-fill fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2" style="letter-spacing: 2px;">BOOK仁</h1>
        <p class="fs-5 mb-4">遇見，從這裡開始</p>
        <div style="width: 50px; height: 3px; background: white; margin: 0 auto 20px auto;"></div>
        <p class="small lh-lg">
          探索專屬於你的緣分<br>連結每一個心動時刻
        </p>
      </div>
    </template>

    <div class="text-center mb-4">
      <h2 class="fw-bold text-gradient mb-2">歡迎回來</h2>
      <p class="text-muted">請輸入您的帳號密碼以繼續</p>
    </div>

    <form @submit.prevent="handleLogin">
      
      <div class="input-group-custom">
        <input type="email" class="form-control" placeholder="電子信箱" required autofocus>
        <i class="bi bi-envelope"></i>
      </div>

      <div class="input-group-custom">
        <input type="password" class="form-control" placeholder="密碼" required>
        <i class="bi bi-lock"></i>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="rememberMe">
          <label class="form-check-label small text-muted" for="rememberMe">記住我</label>
        </div>
        <RouterLink to="/forget-password" class="text-decoration-none small fw-bold text-muted">
          忘記密碼?
        </RouterLink>
      </div>

      <div class="d-grid mb-4">
        <button type="submit" class="btn btn-primary fs-5">立即登入</button>
      </div>

      <div class="text-center mb-4 position-relative">
        <hr class="text-muted opacity-25">
        <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">或使用以下方式</span>
      </div>

      <div class="d-flex justify-content-center gap-3 mb-4">
        <button type="button" class="btn btn-social"><i class="bi bi-google text-danger"></i></button>
        <button type="button" class="btn btn-social"><i class="bi bi-facebook text-primary"></i></button>
      </div>
    </form>

    <div class="text-center">
      <p class="small text-muted mb-0">
        還沒有帳號嗎? 
        <RouterLink to="/register" class="fw-bold ms-1 text-gradient text-decoration-none">免費註冊</RouterLink>
      </p>
    </div>

  </OAuthCard>
</template>