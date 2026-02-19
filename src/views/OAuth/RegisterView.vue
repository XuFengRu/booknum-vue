<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { ref } from 'vue'
import OAuthCard from '@/components/OAuthCard.vue'

const router = useRouter()

const formData = ref({
    email: '',
    password: '',
    name: '',
    phone: '',
    gender: '',
    birthday: ''
})

const handleRegister = () => {
    console.log('註冊資料:', formData.value)    
    router.push('/register-success') // 確保此處的路由對應你設定的路徑
}
</script>

<template>
  <OAuthCard>
    
    <template #left-side>
      <i class="bi bi-heart-fill floating-obj fs-3" style="left: 15%; animation-delay: 0s;"></i>
      <i class="bi bi-person-plus-fill floating-obj fs-2" style="left: 50%; animation-delay: 3s; animation-duration: 10s;"></i>

      <div class="position-relative z-2">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg" style="width: 90px; height: 90px;">
          <i class="bi bi-person-heart fs-1" style="color: var(--bs-primary);"></i>
        </div>
        <h1 class="fs-1 fw-bolder mb-2">加入 BOOK仁</h1>
        <p class="fs-5 mb-0">開啟你的專屬緣分之旅</p>
        <div style="width: 50px; height: 3px; background: white; margin: 15px auto;"></div>
      </div>
    </template>

    <div style="max-width: 500px; margin: 0 auto;">
      <div class="text-center text-lg-start mb-4">
        <h2 class="fw-bold text-gradient mb-2">建立新帳號</h2>
        <p class="text-muted small">請填寫以下資訊完成註冊</p>
      </div>

      <form @submit.prevent="handleRegister">
        
        <div class="mb-3">
          <label class="form-label">電子信箱</label>
          <div class="input-group-custom">
            <input type="email" v-model="formData.email" class="form-control" placeholder="請輸入電子信箱" required>
            <i class="bi bi-envelope-at"></i>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">密碼</label>
          <div class="input-group-custom">
            <input type="password" v-model="formData.password" class="form-control" placeholder="設定密碼" required>
            <i class="bi bi-key"></i>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">姓名</label>
            <div class="input-group-custom mb-0">
              <input type="text" v-model="formData.name" class="form-control" placeholder="您的真實姓名" required>
              <i class="bi bi-person"></i>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">手機號碼</label>
            <div class="input-group-custom mb-0">
              <input type="tel" v-model="formData.phone" class="form-control" placeholder="09xxxxxxxx" required>
              <i class="bi bi-phone"></i>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">性別</label>
            <div class="input-group-custom mb-0">
              <select v-model="formData.gender" class="form-select" required>
                <option value="" selected disabled>請選擇</option>
                <option value="M">男</option>
                <option value="F">女</option>
              </select>
              <i class="bi bi-gender-ambiguous"></i>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">生日</label>
            <div class="input-group-custom mb-0">
              <input type="date" v-model="formData.birthday" class="form-control" required>
              <i class="bi bi-calendar-event"></i>
            </div>
          </div>
        </div>

        <div class="d-grid mt-2 mb-4">
          <button type="submit" class="btn btn-primary btn-lg shadow-sm">
            立即註冊 <i class="bi bi-arrow-right-short ms-1"></i>
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="small text-muted mb-0">
          已經有帳號了? 
          <RouterLink to="/login" class="fw-bold ms-1 text-gradient text-decoration-none">直接登入</RouterLink>
        </p>
      </div>
    </div>

  </OAuthCard>
</template>