

<template>
  <div class="container">
    <h1 class="title">付款資訊</h1>

    
    <div class="grid">
      <div v-for="method in paymentMethods" :key="method.name" class="card">
        <img :src="method.image" :alt="method.name" class="card-img"/>
        <h2 class="card-title">{{ method.name }}</h2>
        <p class="card-desc">{{ method.description }}</p>
        <button class="btn" @click="selectMethod(method)">選擇此方式</button>
      </div>
    </div>

    
    <div v-if="selectedMethod" class="payment-form mt-5">
      <h2 class="fw-bold mb-3">填寫付款資訊</h2>
      <p class="mb-3">您選擇的付款方式：<strong>{{ selectedMethod.name }}</strong></p>
      <form @submit.prevent="submitPayment">
        <div class="form-group mb-3">
          <label>姓名</label>
          <input type="text" v-model="form.name" class="form-control" required />
        </div>
        <div class="form-group mb-3">
          <label>Email</label>
          <input type="email" v-model="form.email" class="form-control" required />
        </div>
        <div class="form-group mb-3" v-if="selectedMethod.requiresCard">
          <label>信用卡號</label>
          <input type="text" v-model="form.cardNumber" class="form-control" required />
        </div>
        <button type="submit" class="btn">確認付款</button>
      </form>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PaymentPage'
});

import { ref } from "vue";

const paymentMethods = ref([
  {
    name: "信用卡",
    description: "使用 VISA / MasterCard / JCB 付款",
    image: "/images/Card.png",   // 改成 card.png
    requiresCard: true
  },
  {
    name: "Line Pay",
    description: "快速掃碼付款，支援多家銀行",
    image: "/images/linepay.png", // 改成 Linepay.png
    requiresCard: false
  },
  {
    name: "ATM 轉帳",
    description: "使用銀行 ATM 或網銀轉帳",
    image: "/images/ATM.png",     // 改成 ATM.png
    requiresCard: false
  }
]);

const selectedMethod = ref(null);
const form = ref({
  name: "",
  email: "",
  cardNumber: ""
});

function selectMethod(method) {
  selectedMethod.value = method;
}

function submitPayment() {
  alert(`付款成功！方式：${selectedMethod.value.name}`);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}
.card-img {
  width: 100%;
  height: 300px;          /* 固定高度 */
  object-fit: cover;      /* 保持比例並裁切 */
  object-position: bottom;/* 從下方裁切，不切到頭 */
  border-radius: 8px;
}
.card-title {
  font-size: 18px;
  margin: 10px 0;
}
.card-desc {
  font-size: 14px;
  color: #555;
}
.btn {
  background: #6b4f3f;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background: #8c6b56;
}
.payment-form {
  margin-top: 40px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.form-group label {
  font-weight: bold;
}
.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>