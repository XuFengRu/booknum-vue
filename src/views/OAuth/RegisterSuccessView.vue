<script setup>
import { RouterLink } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'
</script>

<template>
    <OAuthCard>
        <template #left-side>
            <i class="bi bi-heart-fill floating-particle text-white opacity-50 display-1" style="left: 20%;"></i>
            <i class="bi bi-chat-heart-fill floating-particle text-white opacity-25 h1" style="left: 70%;"></i>
            
            <div class="position-relative z-2 text-center">
                <i class="bi bi-check-circle-fill display-1 mb-4 d-block opacity-75"></i>
                <h3 class="fw-bold mb-3">註冊成功！</h3>
                <p class="opacity-75">歡迎加入 <span class="fw-bolder">Book</span><span class="fw-bolder" style="color: #ff9045;">仁</span> 大家庭</p>
            </div>
        </template>

        <div class="text-center">
            <div class="mb-4 position-relative">
                <div class="success-icon-container">
                    <i class="bi bi-heart-fill heart-burst hb1"></i>
                    <i class="bi bi-heart-fill heart-burst hb2"></i>
                    <i class="bi bi-envelope-check-fill envelope-icon display-1" style="color: var(--brand-blue-adaptive);"></i>
                </div>
                <h2 class="fw-bold mt-3" style="color: var(--text-main);">只差最後一步</h2>
            </div>

            <div class="alert alert-primary border-0 rounded-4 p-4 mb-4 text-start" style="background-color: rgba(25, 118, 210, 0.08);">
                <div class="d-flex">
                    <i class="bi bi-info-circle-fill me-3 fs-4" style="color: var(--brand-blue-adaptive);"></i>
                    <div>
                        <h6 class="fw-bold mb-1" style="color: var(--brand-blue-adaptive);">驗證信已發送</h6>
                        <p class="mb-0 small text-muted">請前往信箱點擊連結啟用帳號。<br>沒收到信？請檢查垃圾郵件夾。</p>
                    </div>
                </div>
            </div>

            <div class="d-grid mt-4">
                <RouterLink to="/login" class="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm btn-pulse">
                    返回登入頁
                </RouterLink>
            </div>
        </div>
    </OAuthCard>
</template>

<style scoped>
/* 成功頁專屬的小動畫 */
.heart-burst { position: absolute; color: rgba(255, 51, 102, 0.6); animation: burst 2s infinite; }
.hb1 { top: -10%; left: 35%; }
.hb2 { bottom: -10%; right: 35%; animation-delay: 1s; }
@keyframes burst {
    0% { transform: scale(1); opacity: 0; }
    50% { transform: scale(1.3); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
}
</style>