<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import OAuthCard from '@/components/OAuthCard.vue'
import { ElSelect, ElOption, ElDatePicker } from 'element-plus'
import 'element-plus/dist/index.css'

const router = useRouter()
const route = useRoute() 
const isSubmitting = ref(false)

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone: '',
  gender: '',
  birthday: ''
})

onMounted(() => {
  if (route.query.email) formData.value.email = route.query.email
  if (route.query.name) formData.value.name = route.query.name
})

// 🌟 新增：Demo 自動填入功能
const fillDemoData = (type) => {
  // 先填入一組「完全正確」的預設資料
  formData.value = {
    email: 'testuser@gmail.com',
    password: 'Password123',
    confirmPassword: 'Password123',
    name: '王小明',
    phone: '0912345678',
    gender: 'M',
    birthday: '1995-05-15'
  }

  // 根據不同情境，故意把某個欄位改錯
  switch (type) {
    case 'emailError':
      formData.value.email = 'wrongemail@format' // 錯誤的信箱
      break
    case 'weakPassword':
      formData.value.password = '12345678' // 缺少英文
      formData.value.confirmPassword = '12345678'
      break
    case 'mismatchPassword':
      formData.value.confirmPassword = 'Password999' // 密碼不一致
      break
    case 'phoneError':
      formData.value.phone = '091234567' // 錯誤的手機格式
      break
  }
}

const handleRegister = async () => {
  if (isSubmitting.value) return;

  // 🌟 為了讓 Demo 效果更好，我們把 Email 檢查也加進來，統一用 Swal 提示
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    Swal.fire({ icon: 'warning', title: '信箱格式錯誤', text: '請輸入有效的電子信箱格式', confirmButtonColor: '#f8c471' })
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    Swal.fire({ icon: 'warning', title: '密碼不一致', text: '請確認兩次輸入的密碼相同', confirmButtonColor: '#f8c471' })
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(formData.value.password)) {
    Swal.fire({
      icon: 'warning',
      title: '密碼強度不足',
      text: '密碼必須至少 8 個字元，且同時包含「英文字母」與「數字」',
      confirmButtonColor: '#f8c471'
    })
    return;
  }

  const phoneRegex = /^09\d{8}$/;
  if (!phoneRegex.test(formData.value.phone)) {
    Swal.fire({ icon: 'warning', title: '手機格式錯誤', text: '請輸入有效的手機號碼 (例如: 0912345678)' })
    return;
  }

  isSubmitting.value = true;

  try {
    const { confirmPassword, ...submitData } = formData.value;
    const response = await axios.post('/Auth/Register', submitData)

    await Swal.fire({
      icon: 'success',
      title: '註冊成功！',
      text: '請至信箱收取驗證信，以啟用您的帳號。',
      confirmButtonColor: '#0d6efd'
    })

    router.push({
      name: 'register-success',
      query: { email: formData.value.email }
    })
  } catch (error) {
    const errorMsg = error.response?.data?.message || '註冊失敗，請稍後再試'
    Swal.fire({ icon: 'error', title: '錯誤', text: errorMsg })
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <OAuthCard>

    <template #left-side>
      <i class="bi bi-heart-fill floating-obj fs-3" style="left: 15%; animation-delay: 0s;"></i>
      <i class="bi bi-person-plus-fill floating-obj fs-2"
        style="left: 50%; animation-delay: 3s; animation-duration: 10s;"></i>

      <div class="position-relative z-2">
        <div class="mb-4 d-inline-flex align-items-center justify-content-center bg-white rounded-circle shadow-lg"
          style="width: 90px; height: 90px;">
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

<div class="d-flex flex-wrap gap-2 mb-4 justify-content-lg-start justify-content-center">
        <button type="button" @click="fillDemoData('emailError')" class="btn btn-sm btn-outline-danger rounded-pill shadow-sm">
          <i class="bi bi-bug me-1"></i>信箱錯誤
        </button>
        <button type="button" @click="fillDemoData('weakPassword')" class="btn btn-sm btn-outline-warning rounded-pill shadow-sm">
          <i class="bi bi-bug me-1"></i>密碼太弱
        </button>
        <button type="button" @click="fillDemoData('mismatchPassword')" class="btn btn-sm btn-outline-info rounded-pill shadow-sm">
          <i class="bi bi-bug me-1"></i>密碼不一致
        </button>
        <button type="button" @click="fillDemoData('phoneError')" class="btn btn-sm btn-outline-secondary rounded-pill shadow-sm">
          <i class="bi bi-bug me-1"></i>手機錯誤
        </button>
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
            <input type="password" v-model="formData.password" class="form-control" placeholder="至少 8 碼，包含英數字" required>
            <i class="bi bi-key"></i>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">確認密碼</label>
          <div class="input-group-custom">
            <input type="password" v-model="formData.confirmPassword" class="form-control" placeholder="請再次輸入密碼"
              required>
            <i class="bi bi-check-circle"></i>
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
              <el-select v-model="formData.gender" placeholder="請選擇" size="large" style="width: 100%;">
                <el-option label="男" value="M" />
                <el-option label="女" value="F" />
              </el-select>
              <i class="bi bi-gender-ambiguous"></i>
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">生日</label>
            <div class="input-group-custom mb-0">
              <el-date-picker v-model="formData.birthday" type="date" placeholder="選擇生日" format="YYYY/MM/DD"
                value-format="YYYY-MM-DD" size="large" style="width: 100%;" />
              <i class="bi bi-calendar-event"></i>
            </div>
          </div>
        </div>

        <div class="d-grid mt-2 mb-4">
          <button type="submit" class="btn btn-primary fs-5 shadow-sm" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"
              aria-hidden="true"></span>
            {{ isSubmitting ? '註冊中...' : '立即註冊' }}
            <i v-if="!isSubmitting" class="bi bi-arrow-right-short ms-1"></i>
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