<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()

// 定義表單狀態
const newPassword = ref('')
const confirmPassword = ref('')
const isError = ref(false) // 用於模擬連結失效的情境

const handleResetSubmit = () => {
    // Note : 加入密碼一致性檢查
    if (newPassword.value !== confirmPassword.value) {
        alert('密碼與確認密碼不符')
        return
    }

    console.log('提交新密碼:', newPassword.value)

    // 模擬成功後跳轉回登入頁
    router.push('/login')
}
</script>

<template>
    <OAuthCard>
        <template #left-side>
            <i class="bi bi-shield-lock-fill floating-particle text-white opacity-50 display-1"
                style="left: 15%; animation-duration: 14s;"></i>
            <i class="bi bi-key-fill floating-particle text-white opacity-25 h1"
                style="left: 80%; animation-duration: 16s; animation-delay: 0.5s;"></i>
            <i class="bi bi-unlock-fill floating-particle text-white opacity-25 h2"
                style="left: 45%; animation-duration: 20s; animation-delay: 2s;"></i>

            <div class="position-relative z-2 text-center">
                <i class="bi bi-shield-check display-1 mb-4 d-block opacity-75"></i>
                <h3 class="fw-bold mb-3">設定新密碼</h3>
                <p class="opacity-75">為了您的帳號安全<br>請設定一組強密碼</p>
            </div>
        </template>

        <div class="text-center text-lg-start mb-5">
            <h2 class="fw-bold" style="color: var(--text-main);">重設密碼</h2>
            <p class="text-muted">請輸入您的新密碼以恢復帳號存取權。</p>
        </div>

        <div v-if="isError" class="alert alert-danger border-0 bg-danger-subtle text-danger mb-4 shadow-sm">
            <i class="bi bi-exclamation-circle-fill me-2"></i> 連結已過期或無效
        </div>

        <form @submit.prevent="handleResetSubmit">
            <div class="mb-4">
                <label class="form-label small text-muted fw-bold ms-2">新密碼</label>
                <div class="input-icon-group">
                    <i class="bi bi-key"></i>
                    <input type="password" v-model="newPassword" class="form-control rounded-pill" placeholder="請設定新密碼"
                        required autofocus>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label small text-muted fw-bold ms-2">確認新密碼</label>
                <div class="input-icon-group">
                    <i class="bi bi-check-lg"></i>
                    <input type="password" v-model="confirmPassword" class="form-control rounded-pill"
                        placeholder="再次輸入新密碼" required>
                </div>
            </div>

            <div class="d-grid mt-5">
                <button type="submit" class="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm btn-pulse"
                    style="border: none;">
                    確認重設 <i class="bi bi-check-circle-fill ms-2"></i>
                </button>
            </div>
        </form>
    </OAuthCard>
</template>

<style scoped></style>