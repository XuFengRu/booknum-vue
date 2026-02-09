<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const router = useRouter();
const cart = useCartStore();

// 從路由接收資料
const name = route.params.name;
const description = route.query.description;
const price = route.query.price; // e.g. "NT$ 1499 / 小時"
const image = route.query.image;

// 取出數字部分
const priceNumber = parseInt(price.replace(/[^0-9]/g, ""), 10);

const startDate = ref("");
const endDate = ref("");

// 防呆：只能選七天後的日期
const minDate = computed(() => {
  const now = new Date();
  now.setDate(now.getDate() + 7);
  return now.toISOString().slice(0,16);
});

// 計算總時數（只取整數小時，不顯示分鐘）
const hours = computed(() => {
  if (!startDate.value || !endDate.value) return 0;
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diffMs = end - start;
  if (diffMs <= 0) return 0;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 直接取整數小時
  return diffHours;
});

// 計算總額
const totalAmount = computed(() => {
  return hours.value * priceNumber;
});

function goToPayment() {
  if (!startDate.value || !endDate.value) {
    alert("請選擇開始與結束時間！");
    return;
  }
  if (hours.value <= 0) {
    alert("結束時間必須晚於開始時間，且至少滿 1 小時！");
    return;
  }
  router.push({ name: 'member-rent-payment' });
}

function addToCart() {
  if (!startDate.value || !endDate.value) {
    alert("請選擇開始與結束時間！");
    return;
  }
  if (hours.value <= 0) {
    alert("結束時間必須晚於開始時間，且至少滿 1 小時！");
    return;
  }
  // 加入 Pinia 購物車
  cart.addItem({
    name,
    description,
    price,
    image,
    startDate: startDate.value,
    endDate: endDate.value,
    hours: hours.value,
    totalAmount: totalAmount.value
  });
  // 跳轉到購物車頁面
  router.push({ name: 'member-rent-cart' });
}

function addExtra() {
  alert("加購方案功能尚未完成 🚧");
}

function goBack() {
  router.back();
}
</script>

<template>
  <div class="container">
    <div class="detail-layout">
      <!-- 左邊照片 -->
      <div class="detail-left">
        <img :src="image" :alt="name" class="detail-img"/>
      </div>

      <!-- 中間詳細資料 -->
      <div class="detail-middle">
        <h1 class="detail-title">{{ name }}</h1>
        <p class="detail-desc">{{ description }}</p>
        <p class="detail-price">租金：{{ price }}</p>
      </div>

      <!-- 右邊日期選擇 -->
      <div class="detail-right">
        <label>開始時間：</label>
        <input type="datetime-local" v-model="startDate" :min="minDate" />

        <label class="mt-3">結束時間：</label>
        <input type="datetime-local" v-model="endDate" :min="startDate" />

        <p v-if="hours > 0" class="mt-3 fw-bold">共 {{ hours }} 小時</p>
        <p v-if="hours > 0" class="mt-1 text-primary fw-bold">總額：NT$ {{ totalAmount }}</p>
      </div>
    </div>

    <!-- 下方操作按鈕 -->
    <div class="detail-actions">
      <button class="btn" @click="goToPayment">直接結帳</button>
      <button class="btn" @click="addToCart">加入購物車</button>
      <button class="btn" @click="addExtra">加購方案</button>
      <button class="btn cancel" @click="goBack">返回</button>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 1200px; margin: auto; padding: 20px; }
.detail-layout { display: flex; gap: 20px; }
.detail-left, .detail-middle, .detail-right { flex: 1; }
.detail-img { width: 100%; height: 400px; object-fit: cover; object-position: top; border-radius: 8px; }
.detail-title { font-size: 24px; margin-bottom: 10px; }
.detail-desc { font-size: 16px; color: #555; margin-bottom: 10px; }
.detail-price { font-weight: bold; margin-bottom: 20px; }
.detail-actions { margin-top: 20px; display: flex; justify-content: center; gap: 15px; }
.btn { background: #6b4f3f; color: #fff; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
.btn:hover { background: #8c6b56; }
.cancel { background: #aaa; }
</style>