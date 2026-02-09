<template>
  <div class="container">
    <h1 class="title">購物車</h1>

    <div v-if="cartItems.length > 0" class="cart-list">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <img :src="item.image" :alt="item.name" class="cart-img"/>
        <div class="cart-info">
          <h2 class="cart-title">{{ item.name }}</h2>
          <p class="cart-price">單價：{{ item.price }} 元 / 小時</p>
          <p class="cart-time">租用時間：{{ item.hours }} 小時</p>
          <button class="btn-remove" @click="removeItem(index)">移除</button>
        </div>
      </div>

      <div class="cart-total">
        <h3>總金額：{{ totalPrice }} 元</h3>
        <button class="btn-clear" @click="clearCart">清空購物車</button>
        <button class="btn-checkout" @click="goToPayment">結帳</button>
      </div>
    </div>

    <div v-else class="empty">
      <p>購物車目前是空的 🛒</p>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'CartPage'
});

import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const cartItems = ref([
  { name: "IU (李知恩)", price: 1599, hours: 2, image: "/images/Girlfriend7.jpg" },
  { name: "車銀優 (Cha Eun-woo)", price: 1599, hours: 3, image: "/images/Boyfriend1.jpg" },
  { name: "Jennie Kim", price: 1699, hours: 1, image: "/images/Girlfriend2.jpg" }
]);

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.hours, 0)
);

function removeItem(index) {
  cartItems.value.splice(index, 1);
}

function clearCart() {
  cartItems.value = [];
}

// 跳轉到 Payment.vue
function goToPayment() {
  router.push({ name: 'member-rent-payment' });
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.cart-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: top;
  border-radius: 8px;
  margin-right: 15px;
}
.cart-info {
  flex: 1;
}
.cart-title {
  font-size: 18px;
  margin: 5px 0;
}
.cart-price, .cart-time {
  font-size: 14px;
  color: #555;
}
.btn-remove, .btn-clear, .btn-checkout {
  background: #6b4f3f;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}
.btn-remove:hover, .btn-clear:hover, .btn-checkout:hover {
  background: #8c6b56;
}
.cart-total {
  text-align: right;
  margin-top: 20px;
}
.empty {
  text-align: center;
  color: #777;
}
</style>