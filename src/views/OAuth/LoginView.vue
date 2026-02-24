<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
import OAuthCard from '@/components/OAuthCard.vue'
import Swal from 'sweetalert2'
const router = useRouter()

const email = ref('user7@test.com')
const password = ref('000')
const rememberMe = ref(false)


const handleLogin = async () => {
  // console.log("帳號:", email.value, "密碼:", password.value);
    try {
        const response = await axios.post('/Auth/Login', {
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value
        })

        const { token, user, message } = response.data

        // Token 存入 Storage
        if (rememberMe.value) {
            localStorage.setItem('token', token) // 關閉瀏覽器後依然保留
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            sessionStorage.setItem('token', token) // 關閉分頁就會清空
            sessionStorage.setItem('user', JSON.stringify(user))
        }

        // alert(message || '登入成功！') 
        Swal.fire({
            icon: 'success',
            title: message || '登入成功！',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500, // 1.5 秒後自動消失
            timerProgressBar: true
        })
        router.push('/member')
    } catch (error) {
        let errorMsg = '連線失敗，請確認後端 API 伺服器是否已啟動'
        if (error.response && error.response.data) {
            errorMsg = error.response.data.message || '登入失敗，請檢查帳號密碼'
        }

        Swal.fire({
            icon: 'error',
            title: '登入失敗',
            text: errorMsg,
            confirmButtonText: '確定',
            confirmButtonColor: '#dc3545' // Bootstrap danger 顏色
        })
    }
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
        <input type="email" v-model="email" class="form-control" placeholder="電子信箱" required autofocus>
        <i class="bi bi-envelope"></i>
      </div>

      <div class="input-group-custom">
        <input type="password" v-model="password" class="form-control" placeholder="密碼" required>
        <i class="bi bi-lock"></i>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe">
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