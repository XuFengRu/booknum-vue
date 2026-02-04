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
    router.push('/register/success')
}
</script>

<template>
    <OAuthCard>
        <template #left-side>
            <i class="bi bi-heart-fill floating-particle text-white opacity-50 display-4" style="left: 10%; animation-duration: 13s;"></i>
            <i class="bi bi-chat-heart-fill floating-particle text-white opacity-25 h1" style="left: 80%; animation-duration: 16s; animation-delay: 1s;"></i>

            <i class="bi bi-person-plus-fill display-1 mb-4 text-white-50"></i>
            <h3 class="fw-bold mb-3 text-center">
                加入 <span class="fw-bolder" style="letter-spacing: 2px;">Book</span><span class="fw-bolder" style="color: #ff9045;">仁</span>
            </h3>
            <p class="text-center opacity-75">只需幾分鐘<br>開啟你的專屬緣分之旅</p>
        </template>

        <h3 class="fw-bold mb-4 text-center text-lg-start" style="color: var(--text-main);">建立新帳號</h3>

        <form @submit.prevent="handleRegister">
            <div class="row">
                <div class="col-12 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">帳號 ( Email )</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-envelope-at"></i>
                        <input type="email" v-model="formData.email" class="form-control rounded-pill" placeholder="請輸入 Email" required />
                    </div>
                </div>

                <div class="col-12 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">密碼</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-key"></i>
                        <input type="password" v-model="formData.password" class="form-control rounded-pill" placeholder="設定密碼" required />
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">姓名</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-person"></i>
                        <input type="text" v-model="formData.name" class="form-control rounded-pill" placeholder="您的真實姓名" required />
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">手機號碼</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-phone"></i>
                        <input type="tel" v-model="formData.phone" class="form-control rounded-pill" placeholder="09xxxxxxxx" required/>
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">性別</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-gender-ambiguous"></i>
                        <select v-model="formData.gender" class="form-select form-control rounded-pill" required>
                            <option value="" selected disabled>請選擇</option>
                            <option value="M">男</option>
                            <option value="F">女</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-6 mb-3">
                    <label class="form-label small text-muted fw-bold ms-2">生日</label>
                    <div class="input-icon-group mb-0">
                        <i class="bi bi-calendar-event"></i>
                        <input type="date" v-model="formData.birthday" class="form-control rounded-pill" required />
                    </div>
                </div>
            </div>

            <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm btn-pulse" style="border: none;">
                    立即註冊 <i class="bi bi-arrow-right-short"></i>
                </button>
            </div>
        </form>

        <div class="text-center mt-4">
            <span class="text-muted small">已經有帳號了? </span>
            <RouterLink to="/login" class="fw-bold text-decoration-none" style="color: var(--brand-blue-adaptive);">直接登入</RouterLink>
        </div>
    </OAuthCard>
</template>