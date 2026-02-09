<template>
  <div class="container">
    <h1 class="title">我的預約</h1>

    <!-- 預約清單 -->
    <div class="grid">
      <div v-for="booking in bookings" :key="booking.id" class="card">
        <img :src="booking.image" :alt="booking.name" class="card-img"/>
        <h2 class="card-title">{{ booking.name }}</h2>
        <p class="card-desc">{{ booking.description }}</p>
        <p class="card-price">預約時間：{{ booking.date }}</p>
        <p class="card-status">狀態：{{ booking.status }}</p>

        <div class="card-actions">
          <!-- 狀態判斷 -->
          <template v-if="booking.status === '已取消'">
            <button class="btn disabled">已取消</button>
            <button class="btn" @click="rebook(booking.id)">重新預約</button>
            <button class="btn" @click="viewDetail(booking.id)">查看詳情</button>
          </template>
          <template v-else>
            <button class="btn" @click="cancelBooking(booking.id)">取消預約</button>
            <button class="btn" @click="viewDetail(booking.id)">查看詳情</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'BookingPage'
});

import { ref } from "vue";

const bookings = ref([
  {
    id: 1,
    name: "IU (李知恩)",
    description: "甜美溫柔，適合音樂與散步。",
    date: "2026-02-10 14:00",
    status: "已確認",
    image: "/images/Girlfriend7.jpg"
  },
  {
    id: 2,
    name: "車銀優 (Cha Eun-woo)",
    description: "外型俊朗，適合約會與活動陪同。",
    date: "2026-02-12 19:30",
    status: "待付款",
    image: "/images/Boyfriend1.jpg"
  },
  {
    id: 3,
    name: "Jennie Kim",
    description: "時尚自信，適合潮流約會。",
    date: "2026-02-15 16:00",
    status: "已完成",
    image: "/images/Girlfriend2.jpg"
  }
]);

function cancelBooking(id) {
  const confirmCancel = confirm("確認取消預約？");
  if (confirmCancel) {
    const booking = bookings.value.find(b => b.id === id);
    if (booking) booking.status = "已取消";
  }
}

function rebook(id) {
  const booking = bookings.value.find(b => b.id === id);
  if (booking) booking.status = "已確認";
  alert(`已重新預約：${id}`);
}

function viewDetail(id) {
  alert(`查看預約詳情：${id}`);
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
  height: 300px;
  object-fit: cover;
  object-position: top;
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
.card-price, .card-status {
  font-weight: bold;
  margin: 8px 0;
}
.card-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.btn {
  background: #6b4f3f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background: #8c6b56;
}
.btn.disabled {
  background: #aaa;
  cursor: not-allowed;
}
</style>