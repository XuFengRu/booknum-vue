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
            <i class="bi bi-key-fill floating-particle text-white opacity-50 display-1"
                style="left: 20%; animation-duration: 14s;"></i>
            <i class="bi bi-unlock-fill floating-particle text-white opacity-25 h1"
                style="left: 70%; animation-duration: 18s; animation-delay: 2s;"></i>

            <div class="position-relative z-2 text-center">
                <i class="bi bi-shield-lock-fill display-3 mb-4 d-block opacity-75"></i>
                <h3 class="fw-bold mb-3">找回您的帳號</h3>
                <p class="opacity-75">忘記密碼了嗎？<br>別擔心，我們幫您重新連結緣分。</p>
            </div>
        </template>

        <div class="text-center text-lg-start mb-5">
            <h2 class="fw-bold" style="color: var(--text-main);">忘記密碼?</h2>
            <p class="text-muted">輸入您的註冊 Email，我們會寄送重設連結。</p>
        </div>

        <form @submit.prevent="handleReset">
            <div class="input-icon-group mb-4">
                <i class="bi bi-envelope"></i>
                <input type="email" v-model="email" class="form-control rounded-pill" placeholder="請輸入 Email" required
                    autofocus>
            </div>

            <div class="d-grid gap-3">
                <button type="submit" class="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm btn-pulse"
                    style="border: none;">
                    發送重設信 <i class="bi bi-send-fill ms-2"></i>
                </button>
            </div>
        </form>

        <div class="text-center mt-5">
            <p class="small text-muted mb-1">想起密碼了?</p>
            <RouterLink to="/login" class="text-decoration-none fw-bold fs-6" style="color: var(--brand-orange);">
                <i class="bi bi-arrow-left-short"></i> 返回登入
            </RouterLink>
        </div>
    </OAuthCard>
</template>