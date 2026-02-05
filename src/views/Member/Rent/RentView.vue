<template>
  <div class="container">
    <h1 class="title">出租清單</h1>

    <!-- 出租卡片 -->
    <div class="grid">
      <div v-for="item in rentItems" :key="item.name" class="card">
        <img :src="item.image" :alt="item.name" class="card-img"/>
        <h2 class="card-title">{{ item.name }}</h2>
        <p class="card-desc">{{ item.description }}</p>
        <p class="card-price">租金：{{ item.price }}</p>
        <button class="btn" @click="openBooking(item)">立即預約</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'RentPage'
});

import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const rentItems = ref([
  { name: "葉舒華 (Shuhua)", description: "(G)I-DLE 成員，氣質優雅，適合舞台與陪伴。", price: "NT$ 1499 / 小時", image: "/images/Girlfriend6.jpg" },
  { name: "車銀優 (Cha Eun-woo)", description: "韓國藝人，外型俊朗，適合約會與活動陪同。", price: "NT$ 1599 / 小時", image: "/images/Boyfriend1.jpg" },
  { name: "邁茲·米克森 (Mads Mikkelsen)", description: "丹麥演員，成熟穩重，適合正式場合與晚宴。", price: "NT$ 1799 / 小時", image: "/images/Boyfriend4.jpg" },
  { name: "J-hope (鄭號錫)", description: "BTS 成員，陽光活力，適合舞蹈與娛樂陪伴。", price: "NT$ 1699 / 小時", image: "/images/Boyfriend3.jpg" },
  { name: "IU (李知恩)", description: "韓國歌手兼演員，甜美溫柔，適合音樂與散步。", price: "NT$ 1599 / 小時", image: "/images/Girlfriend7.jpg" },
  { name: "Jennie Kim", description: "BLACKPINK 成員，時尚自信，適合潮流約會。", price: "NT$ 1699 / 小時", image: "/images/Girlfriend2.jpg" },
  { name: "丁海寅 (Jung Hae-in)", description: "韓國演員，溫暖笑容，適合浪漫陪伴。", price: "NT$ 1499 / 小時", image: "/images/Boyfriend2.jpg" },
  { name: "金珉奎 (Mingyu)", description: "SEVENTEEN 成員，帥氣高挑，適合活力約會。", price: "NT$ 1599 / 小時", image: "/images/Boyfriend5.jpg" },
  { name: "Karina (柳智敏)", description: "aespa 隊長，冷豔魅力，適合舞台與時尚陪伴。", price: "NT$ 1699 / 小時", image: "/images/Girlfriend4.jpg" }
]);

function openBooking(item) {
  // 跳轉到 RentDetail.vue，並帶上完整資料
  router.push({ 
    name: 'rent-detail', 
    params: { name: item.name },
    query: { description: item.description, price: item.price, image: item.image }
  });
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
.card-price {
  font-weight: bold;
  margin: 8px 0;
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
</style>