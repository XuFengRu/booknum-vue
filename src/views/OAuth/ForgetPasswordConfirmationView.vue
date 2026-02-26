<script setup>
import { RouterLink } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'
</script>

<template>
    <OAuthCard>
        <template #left-side>
            <i class="bi bi-envelope-heart-fill floating-particle text-white opacity-50 display-1"
                style="left: 20%; animation-duration: 15s;"></i>
            <i class="bi bi-heart-fill floating-particle text-white opacity-25 h1"
                style="left: 70%; animation-duration: 12s; animation-delay: 1s;"></i>
            <i class="bi bi-send-fill floating-particle text-white opacity-25 h3"
                style="left: 40%; animation-duration: 18s; animation-delay: 3s;"></i>

            <div class="position-relative z-2 text-center">
                <i class="bi bi-send-check-fill display-1 mb-4 d-block opacity-75"></i>
                <h3 class="fw-bold mb-3">信件已發送</h3>
                <p class="opacity-75">請前往您的信箱<br>收取重設密碼連結</p>
            </div>
        </template>

        <div class="text-center">
            <div class="mb-4">
                <div class="success-icon-container">
                    <i class="bi bi-envelope-check-fill envelope-icon display-1"
                        style="color: var(--brand-blue-adaptive);"></i>
                </div>
                <h2 class="fw-bold mt-3" style="color: var(--text-main);">請查收信件</h2>
            </div>

            <div class="alert alert-primary border-0 rounded-4 p-4 mb-4 text-start"
                style="background-color: rgba(25, 118, 210, 0.08);">
                <div class="d-flex">
                    <i class="bi bi-info-circle-fill me-3 fs-4" style="color: var(--brand-blue-adaptive);"></i>
                    <div>
                        <h6 class="fw-bold mb-1" style="color: var(--brand-blue-adaptive);">沒收到信件?</h6>
                        <p class="mb-0 small text-muted">
                            請檢查您的垃圾郵件夾，或是稍後再試。<br>連結有效時間為 30 分鐘。
                        </p>
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