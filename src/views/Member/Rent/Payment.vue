<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: 'PaymentPage'
});

const router = useRouter();

const paymentMethods = ref([
  {
    name: "信用卡",
    description: "使用 VISA / MasterCard / JCB 付款",
    image: "/images/Card.png",
    requiresCard: true
  },
  {
    name: "Line Pay",
    description: "快速掃碼付款，支援多家銀行",
    image: "/images/linepay.png",
    requiresCard: false
  },
  {
    name: "ATM 轉帳",
    description: "使用銀行 ATM 或網銀轉帳",
    image: "/images/ATM.png",
    requiresCard: false
  }
]);

// 預設直接選中第一個付款方式，讓右側表單一開始就顯示！
const selectedMethod = ref(paymentMethods.value[0]);
const form = ref({
  name: "",
  email: "",
  cardNumber: ""
});

function selectMethod(method) {
  selectedMethod.value = method;
}

function submitPayment() {
  alert(`付款成功！您使用的付款方式為：${selectedMethod.value.name}`);
  // 結帳成功後可以引導回首頁或訂單列表
  // router.push('/bookings');
}
</script>

<template>
  <div class="w-100 fade-in-up">
    
    <div class="mb-4 mb-xl-5 text-center">
      <h2 class="fw-bolder text-gradient mb-2">結帳付款</h2>
      <p class="text-muted">選擇最方便的付款方式，安全完成預約</p>
    </div>

    <div class="row g-4 g-xl-5">
      
      <div class="col-lg-5">
        <h5 class="fw-bold text-dark mb-4">1. 選擇付款方式</h5>
        
        <div class="d-flex flex-column gap-3">
          <div v-for="method in paymentMethods" :key="method.name"
               class="card border-2 rounded-4 overflow-hidden transition-all bg-white"
               :class="selectedMethod?.name === method.name ? 'border-primary shadow-sm' : 'border-light-subtle shadow-sm'"
               style="cursor: pointer; --glass-bg: rgba(255, 255, 255, 0.95);"
               @click="selectMethod(method)">
            
            <div class="card-body p-3 p-md-4 d-flex align-items-center gap-3">
              <div class="bg-light rounded-3 d-flex align-items-center justify-content-center border border-light-subtle flex-shrink-0" 
                   style="width: 80px; height: 56px; padding: 6px;">
                <img :src="method.image" :alt="method.name" class="w-100 h-100" style="object-fit: contain;">
              </div>
              
              <div class="flex-grow-1">
                <h6 class="fw-bolder mb-1" :class="selectedMethod?.name === method.name ? 'text-primary' : 'text-dark'">
                  {{ method.name }}
                </h6>
                <p class="text-muted small mb-0">{{ method.description }}</p>
              </div>
              
              <div class="flex-shrink-0 ms-2">
                <i v-if="selectedMethod?.name === method.name" class="bi bi-check-circle-fill text-primary fs-4 fade-in-up"></i>
                <i v-else class="bi bi-circle text-black-50 fs-4 opacity-50"></i>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="col-lg-7">
        <h5 class="fw-bold text-dark mb-4">2. 安全結帳資訊</h5>
        
        <div class="card border-0 shadow-sm rounded-5 overflow-hidden w-100 fade-in-up bg-white" style="--glass-bg: rgba(255, 255, 255, 0.95); min-height: 400px;">
          <div class="card-body p-4 p-md-5 d-flex flex-column h-100">

            <div class="d-flex align-items-center border-bottom border-light-subtle pb-3 mb-4">
              <i class="bi bi-shield-lock-fill text-success fs-4 me-2"></i>
              <h5 class="fw-bolder text-dark mb-0">填寫資料</h5>
              <span class="badge bg-light text-dark border border-light-subtle rounded-pill ms-auto px-3 py-2 shadow-sm">
                已選：{{ selectedMethod.name }}
              </span>
            </div>

            <form @submit.prevent="submitPayment" class="flex-grow-1 d-flex flex-column">
              <div class="row g-4 mb-4">
                
                <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">真實姓名</label>
                  <div class="input-group-custom mb-0">
                    <input type="text" v-model="form.name" class="form-control" placeholder="請輸入付款人姓名" required />
                    <i class="bi bi-person"></i>
                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-bold text-muted small ms-1">電子信箱</label>
                  <div class="input-group-custom mb-0">
                    <input type="email" v-model="form.email" class="form-control" placeholder="example@email.com" required />
                    <i class="bi bi-envelope"></i>
                  </div>
                </div>

                <div v-if="selectedMethod.requiresCard" class="col-12 fade-in-up">
                  <label class="form-label fw-bold text-muted small ms-1">信用卡號</label>
                  <div class="input-group-custom mb-0">
                    <input type="text" v-model="form.cardNumber" class="form-control" placeholder="0000 0000 0000 0000" required />
                    <i class="bi bi-credit-card"></i>
                  </div>
                </div>
                
              </div>

              <div class="mt-auto pt-4 border-top border-light-subtle">
                <button type="submit" class="btn btn-primary rounded-pill w-100 fw-bold shadow-sm py-3 fs-5">
                  確認付款 <i class="bi bi-arrow-right-circle ms-2"></i>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 所有影響排版與圖片變形的舊 CSS 已經全數消滅，交給 Bootstrap 網格處理！ */
</style>