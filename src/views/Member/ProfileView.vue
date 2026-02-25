<script setup>
import { ref, onMounted } from 'vue'
import { ElSelect, ElOption, ElDatePicker } from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import { useRouter } from 'vue-router'

const formData = ref({
  name: '張小明',
  gender: 'M',
  birthday: '1990-05-15',
  phone: '0912345678',
  email: 'xiaoming@example.com',
  lastLogin: '2026-02-20 09:30',
  lastIp: '192.168.1.100',
})

const isPremium = ref(false)
const premiumExpiryDate = ref('無')
const autoRenew = ref(false)   // 紀錄是否自動續訂
const router = useRouter()

const userId = 6

onMounted(async () => {
  try {
    const res = await axios.get(`https://localhost:7091/api/MatchPremium/check/${userId}`)
    if (res.data?.endAt) {
      const endDate = new Date(res.data.endAt)   // ✅ 改用 new Date()
      const now = new Date()

      isPremium.value = endDate > now
      premiumExpiryDate.value = res.data.endAt.split('T')[0]
      autoRenew.value = res.data.autoRenew === true
    } else {
      isPremium.value = false
      premiumExpiryDate.value = '無'
      autoRenew.value = false
    }
  } catch (err) {
    console.error('載入 Premium 狀態失敗:', err)
  }
})

function goPremiumPage() {
  router.push({ name: 'member-bookpremium' })
}

async function cancelPremium() {
  try {
    const res = await axios.post(`https://localhost:7091/api/MatchPremium/cancel`, userId, {
      headers: { 'Content-Type': 'application/json' },
    })
    alert(res.data.message)

    // 更新狀態
    autoRenew.value = false

    // 再呼叫一次 check API，確保 EndAt 與 isPremium 最新
    const checkRes = await axios.get(`https://localhost:7091/api/MatchPremium/check/${userId}`)
    if (checkRes.data?.endAt) {   // ✅ 改成小寫
      const endDate = new Date(checkRes.data.endAt)
      const now = new Date()
      isPremium.value = endDate > now
      premiumExpiryDate.value = checkRes.data.endAt.split('T')[0]   // ✅ 保留到期日
      autoRenew.value = checkRes.data.autoRenew === true
    } else {
      isPremium.value = false
      premiumExpiryDate.value = '無'
    }
  } catch (err) {
    console.error('取消訂閱失敗:', err)
    alert('取消訂閱失敗')
  }
}

</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    <div
      class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto"
      style="max-width: 1300px; height: 650px"
    >
      <div class="row g-0 h-100">
        <div
          class="col-lg-6 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end border-light-subtle"
        >
          <div class="mb-4 pb-3 border-bottom border-light-subtle">
            <h3 class="fw-bolder mb-0 text-gradient">
              <i class="bi bi-person-vcard me-2"></i>個人資料
            </h3>
          </div>

          <h5 class="fw-bold text-dark mb-4">修改個資</h5>

          <div class="row g-4">
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small ms-1">真實姓名</label>
              <div class="input-group-custom mb-0">
                <input
                  type="text"
                  v-model="formData.name"
                  class="form-control"
                  placeholder="您的真實姓名"
                />
                <i class="bi bi-person"></i>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small ms-1">手機號碼</label>
              <div class="input-group-custom mb-0">
                <input
                  type="tel"
                  v-model="formData.phone"
                  class="form-control"
                  placeholder="09xxxxxxxx"
                />
                <i class="bi bi-phone"></i>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small ms-1">性別</label>
              <div class="input-group-custom mb-0">
                <el-select
                  v-model="formData.gender"
                  placeholder="請選擇"
                  size="large"
                  style="width: 100%"
                >
                  <el-option label="男性" value="M" />
                  <el-option label="女性" value="F" />
                  <el-option label="不拘" value="N" />
                </el-select>
                <i class="bi bi-gender-ambiguous"></i>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small ms-1">生日</label>
              <div class="input-group-custom mb-0">
                <el-date-picker
                  v-model="formData.birthday"
                  type="date"
                  placeholder="選擇生日"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  size="large"
                  style="width: 100%"
                />
                <i class="bi bi-calendar-event"></i>
              </div>
            </div>
          </div>

          <div class="d-flex gap-3 mt-auto pt-4 border-top border-light-subtle">
            <button class="btn btn-light rounded-pill flex-fill text-nowrap fw-bold">取消</button>
            <button class="btn btn-primary rounded-pill flex-fill text-nowrap shadow-sm">
              儲存變更
            </button>
          </div>
        </div>

        <div class="col-lg-6 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
          <h5 class="fw-bold text-dark mb-3">
            <i class="bi bi-gem text-warning me-2"></i>訂閱管理
          </h5>
          <!-- 訂閱管理區塊 -->
      <div
  class="bg-white rounded-4 p-4 border border-light-subtle shadow-sm mb-4 position-relative overflow-hidden"
>
  <div class="position-absolute top-0 end-0 p-3 opacity-25">
    <i class="bi bi-stars display-1 text-warning"></i>
  </div>
  <div class="position-relative z-1">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="fw-bolder text-dark mb-0">BookPremium</h5>
      <span
        v-if="isPremium"
        class="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill shadow-sm"
      >
        <i class="bi bi-check-circle-fill me-1"></i>啟用中
      </span>
      <span
        v-else
        class="badge bg-secondary text-white fw-bold px-3 py-1 rounded-pill shadow-sm"
      >
        尚未訂閱
      </span>
    </div>
    <div class="mb-2">
      <span class="text-muted small fw-bold me-2">到期日：</span>
      <span class="text-dark fw-bold fs-6">{{ premiumExpiryDate }}</span>
    </div>
    <div class="d-flex gap-3">
      <button
        class="btn btn-warning rounded-pill flex-fill fw-bold text-dark shadow-sm"
        @click="goPremiumPage"
      >
        <i class="bi bi-arrow-repeat me-1"></i> {{ isPremium ? '立即續訂' : '立即升級' }}
      </button>
      <button
        v-if="isPremium"
        class="btn btn-light border text-danger rounded-pill px-4 fw-bold"
        @click="cancelPremium"
      >
        {{ autoRenew ? '解除訂閱' : '已取消訂閱' }}
      </button>
    </div>
  </div>
</div>

          <h5 class="fw-bold text-dark mb-3">
            <i class="bi bi-envelope-paper text-primary me-2 opacity-75"></i>帳號資訊
          </h5>
          <div class="bg-white rounded-4 p-4 border border-light-subtle shadow-sm mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-envelope-at text-muted"></i>
                <small class="text-muted fw-bold">登入帳號</small>
              </div>
              <span class="fw-bold text-dark">{{ formData.email }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-shield-check text-muted"></i>
                <small class="text-muted fw-bold">驗證狀態</small>
              </div>
              <span
                class="badge bg-success bg-opacity-10 text-success border border-success rounded-pill px-3 py-1 shadow-sm"
              >
                <i class="bi bi-check-circle-fill me-1"></i> 已驗證
              </span>
            </div>
          </div>

          <h5 class="fw-bold text-dark mb-3 mt-auto">
            <i class="bi bi-cpu text-primary me-2 opacity-75"></i>系統紀錄
          </h5>
          <div class="bg-white rounded-4 p-4 border border-light-subtle shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-clock-history text-muted"></i>
                <small class="text-muted fw-bold">最後登入時間</small>
              </div>
              <span class="fw-bold text-dark">{{ formData.lastLogin }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-2">
                <i class="bi bi-geo-alt-fill text-muted"></i>
                <small class="text-muted fw-bold">最後登入 IP</small>
              </div>
              <span class="fw-bold text-dark">{{ formData.lastIp }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 991.98px) {
  .card {
    height: auto !important;
  }
  .col-lg-6 {
    height: auto !important;
  }
}
</style>
