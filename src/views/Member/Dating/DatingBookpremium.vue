<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const plans = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('https://localhost:7091/api/MatchPremium/plans')
    const data = res.data

    // 以第一個方案的週費作為基準
    const basePlan = data[0]
    const baseWeeks = Math.round(basePlan.durationDay / 7)
    const baseWeekly = Math.round(basePlan.price / baseWeeks)

    // 先算出所有方案的折扣
    const discounts = data.map((p, idx) => {
      const weeks = Math.round(p.durationDay / 7)
      const weekly = Math.round(p.price / weeks)
      return idx === 0 ? 0 : Math.round((1 - weekly / baseWeekly) * 100)
    })
    const maxDiscount = Math.max(...discounts)

    plans.value = data.map((p, idx) => {
      const weeks = Math.round(p.durationDay / 7)
      const weekly = Math.round(p.price / weeks)
      const discount = idx === 0 ? 0 : Math.round((1 - weekly / baseWeekly) * 100)

      return {
        id: p.methodId,
        name: p.methodName,
        weeks,
        price: p.price,
        weekly,
        discount,
        label: discount === maxDiscount && discount > 0 ? '最受歡迎' : '',
      }
    })
  } catch (err) {
    console.error('載入方案失敗:', err)
  }
})

// 訂閱 API 呼叫
const subscribe = async (plan) => {
  try {
    const res = await axios.post('https://localhost:7091/api/MatchPremium/subscribe', {
      userId: 6, // TODO: 改成實際登入使用者 ID
      methodId: plan.id,
      price: plan.price,
    })
    const endDate = new Date(res.data.endAt)
    const formatted = new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(endDate)

    alert('訂閱成功！到期日：' + formatted)
  } catch (err) {
    console.error('訂閱失敗:', err)
    alert('訂閱失敗，請稍後再試')
  }
}
</script>

<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center w-100 fade-in-up"
    style="min-height: 75vh"
  >
    <div class="w-100" style="max-width: 1000px">
      <!-- 頂部標題 -->
      <div class="text-center mb-5">
        <div
          class="bg-gradient rounded-circle d-flex align-items-center justify-content-center shadow-lg mx-auto mb-4"
          style="width: 80px; height: 80px"
        >
          <i class="bi bi-gem display-5 text-white"></i>
        </div>
        <h1 class="fw-bolder mb-2" style="letter-spacing: 1px">
          升級至 <span class="text-gradient">BookPremium</span>
        </h1>
        <p class="text-muted fs-5">解鎖所有進階功能，提升你的配對成功率</p>
      </div>

      <!-- 功能卡片 -->
      <div class="row justify-content-center g-3 mb-5">
        <div class="col-md-4">
          <div
            class="card solid-card border-0 shadow-sm rounded-4 p-3 h-100 d-flex flex-row align-items-center gap-3 feature-card"
          >
            <div
              class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 55px; height: 55px; background-color: #fff3cd"
            >
              <i class="bi bi-fire fs-3 text-warning"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-1 text-dark">無限次喜歡</h6>
              <span class="small text-muted">不受每日喜歡數限制</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div
            class="card solid-card border-0 shadow-sm rounded-4 p-3 h-100 d-flex flex-row align-items-center gap-3 feature-card"
          >
            <div
              class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 55px; height: 55px; background-color: #fff3cd"
            >
              <i class="bi bi-heart-fill fs-3 text-warning"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-1 text-dark">查看誰喜歡你</h6>
              <span class="small text-muted">立即查看心動對象</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div
            class="card solid-card border-0 shadow-sm rounded-4 p-3 h-100 d-flex flex-row align-items-center gap-3 feature-card"
          >
            <div
              class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style="width: 55px; height: 55px; background-color: #fff3cd"
            >
              <i class="bi bi-chat-dots-fill fs-3 text-warning"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-1 text-dark">優先訊息</h6>
              <span class="small text-muted">搶先發送留下第一印象</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 方案卡片 -->
      <div class="row justify-content-center g-4 align-items-center mb-4">
        <div v-for="plan in plans" :key="plan.id" class="col-md-4">
          <div
            class="card h-100 rounded-5 position-relative text-center plan-card transition-all solid-card"
            :class="
              plan.label
                ? 'border border-warning border-2 shadow-lg popular-card'
                : 'border-0 shadow-sm'
            "
          >
            <div v-if="plan.label" class="position-absolute top-0 start-50 translate-middle">
              <span
                class="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill shadow-sm fs-6 border border-white border-2"
              >
                <i class="bi bi-star-fill me-1"></i>{{ plan.label }}
              </span>
            </div>

            <div class="card-body p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <h5 class="fw-bold text-muted mb-4">{{ plan.name }}</h5>
                <h1 class="fw-bolder mb-1" :class="plan.label ? 'text-gold' : 'text-dark'">
                  NT$ {{ plan.price }}
                </h1>
                <p class="text-muted small mb-3">（約 NT$ {{ plan.weekly }} / 週）</p>

                <div style="min-height: 28px">
                  <span
                    v-if="plan.discount > 0"
                    class="badge discount-badge text-white rounded-pill px-3 py-1 fs-6 shadow-sm"
                  >
                    省下 {{ plan.discount }}%
                  </span>
                </div>
              </div>

              <div class="mt-4">
                <button
                  class="btn btn-warning w-100 rounded-pill fw-bold text-dark shadow-sm fs-5"
                  @click="subscribe(plan)"
                >
                  立即升級
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <p class="text-muted small fw-medium">
          <i class="bi bi-shield-check me-1"></i>安全的付款機制 ｜ 隨時取消訂閱 ｜ 立即生效
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.solid-card {
  background: #ffffff !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
.text-gold {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.feature-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
}
.plan-card {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.plan-card:not(.popular-card):hover {
  transform: translateY(-5px);
}
.popular-card {
  background: linear-gradient(180deg, #ffffff 0%, #fffdf2 100%) !important;
  box-shadow: 0 15px 35px rgba(255, 165, 0, 0.12) !important;
  transform: scale(1.05);
  z-index: 2;
}
.popular-card:hover {
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.2) !important;
  transform: scale(1.08);
}
.discount-badge {
  background: linear-gradient(135deg, #ff4757 0%, #ff8c33 100%);
  border: none;
}
@media (max-width: 768px) {
  .popular-card {
    transform: scale(1);
  }
  .popular-card:hover {
    transform: translateY(-5px);
  }
}
</style>
