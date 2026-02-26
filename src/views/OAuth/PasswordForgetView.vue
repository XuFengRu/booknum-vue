<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()
const email = ref('')
const isSubmitting = ref(false) // 🌟 把防連點狀態移到前面宣告

const handleReset = async () => {
    // 1. 如果正在送出中，就不理會連續點擊
    if (isSubmitting.value) return 

    // 2. 🌟 新增防呆：檢查 Email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        Swal.fire({ icon: 'warning', title: '格式錯誤', text: '請輸入有效的電子信箱格式', confirmButtonColor: '#f8c471' })
        return
    }

    isSubmitting.value = true // 3. 檢查都通過後，鎖定按鈕

    try {
        const response = await axios.post('/Auth/ForgotPassword', {
            email: email.value
        })

        await Swal.fire({
            icon: 'success',
            title: '信件已發送',
            text: response.data.message || '請至信箱收信',
            confirmButtonColor: '#0d6efd'
        })
        
        router.push({ 
            path: '/forget-password/confirmation', 
            query: { email: email.value } 
        })
    } catch (error) {
        if (error.response && error.response.data) {
            Swal.fire({ icon: 'error', title: '發送失敗', text: error.response.data.message })
        } else {
            Swal.fire({ icon: 'error', title: '系統錯誤', text: '系統忙碌中，請稍後再試' })
        }
    } finally {
        isSubmitting.value = false // 4. 無論成功失敗，最後解除鎖定
    }
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
          <button type="submit" class="btn btn-primary fs-5 shadow-sm" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isSubmitting ? '發送中...' : '發送重設信' }}
            <i v-if="!isSubmitting" class="bi bi-send-fill ms-2"></i>
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