<script setup>
import { useRouter, RouterLink } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()

const handleLogin = () => {
    // 模擬登入成功，跳轉到會員頁
    router.push('/member')
}
</script>

<template>
    <OAuthCard>
        
        <template #left-side>
            <i class="bi bi-heart-fill floating-particle original text-white opacity-50 display-4" style="left: 15%; animation-duration: 12s;"></i>
            <i class="bi bi-chat-heart-fill floating-particle original text-white opacity-25 h1" style="left: 35%; animation-duration: 18s; animation-delay: 2s;"></i>
            <i class="bi bi-heart-fill floating-particle original text-white opacity-25 h3" style="left: 75%; animation-duration: 15s; animation-delay: 1s;"></i>

            <div class="position-relative z-2 text-center">
                <div class="mb-4">
                    <span class="fw-bolder display-3" style="letter-spacing: 2px;">BOOK</span>
                    <span class="fw-bolder display-3" style="letter-spacing: 2px; color: var(--brand-orange);">仁</span>
                </div>
                <h4 class="fw-light mb-3">遇見，從這裡開始</h4>
                <p class="opacity-75">探索專屬於你的緣分<br>連結每一個心動時刻</p>
            </div>
        </template>

        <div class="text-center text-lg-start mb-5">
            <h2 class="fw-bold" style="color: var(--text-main);">歡迎回來</h2>
            <p class="text-muted">請輸入您的帳號密碼以繼續</p>
        </div>

        <form @submit.prevent="handleLogin">
            
            <div class="input-icon-group">
                <i class="bi bi-envelope"></i>
                <input type="email" class="form-control rounded-pill" placeholder="帳號 ( Email )" value="xiaoming@example.com" required autofocus>
            </div>

            <div class="input-icon-group">
                <i class="bi bi-lock"></i>
                <input type="password" class="form-control rounded-pill" placeholder="密碼" value="000" required>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="rememberMe">
                    <label class="form-check-label small text-muted" for="rememberMe" style="cursor: pointer;">記住我 (7天)</label>
                </div>
                <RouterLink to="/forget-password" class="text-decoration-none small fw-bold" style="color: var(--brand-blue-adaptive);">
                    忘記密碼?
                </RouterLink>
            </div>

            <div class="d-grid">
                <button type="submit" class="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm btn-pulse" style="border: none;">
                    登入系統 
                </button>
            </div>
        </form>

        <div class="text-center mt-5">
            <p class="small text-muted mb-1">還沒有帳號嗎?</p>
            <RouterLink to="/register" class="text-decoration-none fw-bold fs-6" style="color: var(--brand-orange);">
                立即免費註冊 <i class="bi bi-arrow-right-short"></i>
            </RouterLink>
        </div>

    </OAuthCard>
</template>

<style scoped>
</style>