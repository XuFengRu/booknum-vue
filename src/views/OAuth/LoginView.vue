<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'
import OAuthCard from '@/components/OAuthCard.vue'
import Swal from 'sweetalert2'
import { GoogleLogin } from 'vue3-google-login'
const router = useRouter()

const email = ref('user7@test.com')
const password = ref('000')
const rememberMe = ref(false)
// 防連點狀態
const isSubmitting = ref(false) 

// 取得經緯度與城市名稱 非同步
const getGeolocation = async () => {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ lat: null, lng: null, city: null }) // 不支援定位
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude
                let city = null

                try {
                    // 🌟 完美解法：改用專為前端設計的 BigDataCloud 免費反向地理編碼 API
                    // 不需要 API Key，不會有 CORS 問題，也不會報 425 錯誤
                    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=zh`
                    const res = await axios.get(url)
                    
                    // 抓取回傳的城市名稱 (通常在 city 或 principalSubdivision 欄位)
                    city = res.data.city || res.data.locality || res.data.principalSubdivision || null
                    
                    if (city) city = city.replace('臺', '台')
                } catch (error) {
                    console.error('無法轉換城市名稱', error)
                }
                resolve({ lat, lng, city })
            },
            (error) => {
                console.warn('使用者拒絕或無法取得定位', error)
                resolve({ lat: null, lng: null, city: null })
            },
            { timeout: 5000 } // 最多等 5 秒
        )
    })
}
const handleLogin = async () => {
    // 防呆：如果正在登入中，禁止再次點擊
    if (isSubmitting.value) return 

    // 防呆：檢查 Email 格式 (正則表達式)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        Swal.fire({ icon: 'warning', title: '格式錯誤', text: '請輸入有效的電子信箱格式' })
        return
    }

    // 防呆：密碼沒有只打空白
    if (password.value.trim() === '') {
        Swal.fire({ icon: 'warning', title: '格式錯誤', text: '請輸入密碼' })
        return
    }

    isSubmitting.value = true // 鎖定按鈕開始轉圈圈
    const locationInfo = await getGeolocation() // 打 API 前，先取得定位資訊
    try {
        const response = await axios.post('/Auth/Login', {
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value,
            latitude: locationInfo.lat,
            longitude: locationInfo.lng,
            currentCity: locationInfo.city
        })

        const { token, user, message } = response.data

        if (rememberMe.value) {
            localStorage.setItem('token', token) 
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            sessionStorage.setItem('token', token) 
            sessionStorage.setItem('user', JSON.stringify(user))
        }

        Swal.fire({
            icon: 'success',
            title: message || '登入成功！',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500, 
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
            confirmButtonColor: '#dc3545' 
        })
    } finally {
        isSubmitting.value = false // 解除按鈕鎖定
    }
}
// 處理 Google 登入回傳
const handleGoogleCallback = async (response) => {
    isSubmitting.value = true
    Swal.fire({ title: 'Google 驗證中...', allowOutsideClick: false, didOpen: () => { Swal.showLoading() } })
    
    // 一樣先抓取經緯度
    const locationInfo = await getGeolocation()

    try {
        const res = await axios.post('/Auth/GoogleLogin', {
            credential: response.credential, // Google 給的憑證
            latitude: locationInfo.lat,
            longitude: locationInfo.lng,
            currentCity: locationInfo.city
        })

        if (res.data.isRegistered === false) {
            // 沒註冊跳轉到註冊頁，並把 Email 跟 Name 帶過去
            Swal.close()
            router.push({
                path: '/register',
                query: { 
                    email: res.data.email, 
                    name: res.data.name 
                }
            })
        } else {
            // 已經註冊
            const { token, user, message } = res.data
            localStorage.setItem('token', token) 
            localStorage.setItem('user', JSON.stringify(user))

            Swal.fire({ icon: 'success', title: message, toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, timerProgressBar: true })
            router.push('/member')
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: '登入失敗', text: error.response?.data?.message || 'Google 登入發生錯誤' })
    } finally {
        isSubmitting.value = false
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
        <button type="submit" class="btn btn-primary fs-5" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isSubmitting ? '登入中...' : '立即登入' }}
        </button>
      </div>

      <div class="text-center mb-4 position-relative">
        <hr class="text-muted opacity-25">
        <span class="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">或使用以下方式</span>
      </div>

      <div class="d-flex justify-content-center gap-3 mb-4">
        <GoogleLogin :callback="handleGoogleCallback" type="icon" shape="circle" />
        <!-- <button type="button" class="btn btn-social"><i class="bi bi-google text-danger"></i></button> -->
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