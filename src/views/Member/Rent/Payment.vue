<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

defineOptions({
  name: 'PaymentPage'
});

const route = useRoute();

const paymentMethods = ref([
  { name: "信用卡", description: "使用 VISA / MasterCard / JCB 付款", image: "/images/Card.png", requiresCard: true },
  { name: "Line Pay", description: "快速掃碼付款，支援多家銀行", image: "/images/linepay.png", requiresCard: false },
  { name: "ATM 轉帳", description: "使用銀行 ATM 或網銀轉帳", image: "/images/ATM.png", requiresCard: false }
]);

const selectedMethod = ref(paymentMethods.value[0]);
const form = ref({ name: "", email: "", cardNumber: "" });

// 🚩 生成合法的商店訂單編號（僅英文字母 + 底線）
const orderNo = "ORDER_" + new Date().getTime().toString().slice(-8);

const amountRaw = route.query.amount;
let amount = 0;

// 檢查 amountRaw 是否為有效數字
if (amountRaw && !isNaN(Number(amountRaw))) {
  amount = parseInt(amountRaw, 10);
} else {
  console.warn("⚠️ Payment.vue 收到的 amount 無效:", amountRaw);
}

const itemsRaw = route.query.items || "[]";
let items = [];
try {
  items = JSON.parse(itemsRaw);
} catch {
  console.warn("⚠️ Payment.vue 收到的 items 無效:", itemsRaw);
}

function selectMethod(method) {
  console.log("選擇付款方式:", method.name);
  selectedMethod.value = method;
}

async function submitPayment() {
  console.log("✅ submitPayment triggered");

  const itemDesc = items.map(i => i.name).join(',');

  const payload = {
    orderNo,
    amount,
    itemDesc,
    method: selectedMethod.value.name,
    customerName: form.value.name,
    customerEmail: form.value.email,
    cardNumber: form.value.cardNumber
  };

  console.log("🔎 送出的 JSON:", payload);

  try {
    // 呼叫後端，後端會回 HTML form
    const res = await axios.post('https://localhost:7091/Payment/CreateOrder', payload);

    console.log("✅ 後端回傳 HTML form");

    // 直接渲染 HTML，讓瀏覽器自動送出表單
    const newWindow = window.open("", "_self");
    newWindow.document.write(res.data);
  } catch (err) {
    console.error("❌ 付款失敗:", err);
    alert("付款流程發生錯誤，請稍後再試");
  }
}
</script>

<template>
  <div class="w-100 fade-in-up">
    <div class="mb-4 mb-xl-5 text-center">
      <h2 class="fw-bolder text-gradient mb-2">結帳付款</h2>
      <p class="text-muted">選擇最方便的付款方式，安全完成預約</p>
    </div>

    <div class="row g-4 g-xl-5">
      <!-- 左側付款方式 -->
      <div class="col-lg-5">
        <h5 class="fw-bold text-dark mb-4">1. 選擇付款方式</h5>
        <div class="d-flex flex-column gap-3">
          <div v-for="method in paymentMethods" :key="method.name"
            class="card border-2 rounded-4 overflow-hidden transition-all bg-white"
            :class="selectedMethod?.name === method.name ? 'border-primary shadow-sm' : 'border-light-subtle shadow-sm'"
            style="cursor: pointer;" @click="selectMethod(method)">
            <div class="card-body p-3 p-md-4 d-flex align-items-center gap-3">
              <div
                class="bg-light rounded-3 d-flex align-items-center justify-content-center border border-light-subtle flex-shrink-0"
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
                <i v-if="selectedMethod?.name === method.name" class="bi bi-check-circle-fill text-primary fs-4"></i>
                <i v-else class="bi bi-circle text-black-50 fs-4 opacity-50"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側付款表單 -->
      <div class="col-lg-7">
        <h5 class="fw-bold text-dark mb-4">2. 安全結帳資訊</h5>
        <div class="card border-0 shadow-sm rounded-5 overflow-hidden w-100 fade-in-up bg-white"
          style="min-height: 400px;">
          <div class="card-body p-4 p-md-5 d-flex flex-column h-100">
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
                    <input type="email" v-model="form.email" class="form-control" placeholder="example@email.com"
                      required />
                    <i class="bi bi-envelope"></i>
                  </div>
                </div>
                <div v-if="selectedMethod.requiresCard" class="col-12">
                  <label class="form-label fw-bold text-muted small ms-1">信用卡號</label>
                  <div class="input-group-custom mb-0">
                    <input type="text" v-model="form.cardNumber" class="form-control" placeholder="0000 0000 0000 0000"
                      required />
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