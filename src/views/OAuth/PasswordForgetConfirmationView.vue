<script setup>
import { RouterLink } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'
</script>

<template>
  <OAuthCard>
    
    <template #left-side>
      <i class="bi bi-envelope-heart-fill floating-obj fs-1" style="left: 20%; animation-duration: 15s;"></i>
      <i class="bi bi-send-fill floating-obj fs-3" style="left: 60%; animation-duration: 12s; animation-delay: 2s;"></i>

      <div class="position-relative z-2 text-center">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg" style="width: 90px; height: 90px;">
          <i class="bi bi-send-check-fill fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">信件已發送</h1>
        <p class="fs-5 mb-0">我們已寄出重設連結</p>
        <div style="width: 40px; height: 3px; background: white; margin: 15px auto;"></div>
      </div>
    </template>

    <div style="max-width: 450px; margin: 0 auto;">
      
      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">請查收信件</h2>
        <p class="text-muted">重設密碼的步驟已發送至您的信箱。</p>
      </div>

      <div class="alert alert-custom p-4 mb-4">
        <div class="d-flex align-items-start">
          <div class="me-3">
            <i class="bi bi-envelope-exclamation-fill fs-3" style="color: var(--bs-primary);"></i>
          </div>
          <div>
            <h5 class="fw-bold mb-1" style="color: var(--text-main);">下一步：重設密碼</h5>
            <p class="mb-0 small text-muted lh-base">
              請點擊信中的連結以設定新密碼。<br>
              連結有效時間為 30 分鐘。
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
          <a href="#" class="fw-bold text-gradient text-decoration-none">重新發送</a>
        </p>
      </div>

    </div>

  </OAuthCard>
</template>