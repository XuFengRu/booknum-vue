<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import MemberCard from "@/components/MemberCard.vue";

const router = useRouter();

const rentItems = ref([
{ name: "雅涵", description: "氣質優雅，適合舞台與陪伴。", price: "NT$ 1200 / 小時", image: "/images/Girlfriend6.jpg" },
{ name: "子睿", description: "外型俊朗，適合約會與活動陪同。", price: "NT$ 800 / 小時", image: "/images/Boyfriend1.jpg" },
{ name: "承澤", description: "成熟穩重，適合正式場合與晚宴。", price: "NT$ 1500 / 小時", image: "/images/Boyfriend4.jpg" },
{ name: "昊陽", description: "陽光活力，適合舞蹈與娛樂陪伴。", price: "NT$ 700 / 小時", image: "/images/Boyfriend3.jpg" },
{ name: "語彤", description: "甜美溫柔，適合音樂與散步。", price: "NT$ 900 / 小時", image: "/images/Girlfriend7.jpg" },
{ name: "若琳", description: "時尚自信，適合潮流約會。", price: "NT$ 1100 / 小時", image: "/images/Girlfriend2.jpg" },
{ name: "景澄", description: "溫暖笑容，適合浪漫陪伴。", price: "NT$ 600 / 小時", image: "/images/Boyfriend2.jpg" },
{ name: "皓宇", description: "帥氣高挑，適合活力約會。", price: "NT$ 1000 / 小時", image: "/images/Boyfriend5.jpg" },
{ name: "芷瑤", description: "冷豔魅力，適合舞台與時尚陪伴。", price: "NT$ 1300 / 小時", image: "/images/Girlfriend4.jpg" }
]);

function openBooking(item) {
  router.push({ 
    name: 'rent-detail', 
    params: { name: item.name },
    query: { description: item.description, price: item.price, image: item.image }
  });
}
</script>

<template>
  <div class="w-100 fade-in-up">
    
    <div class="mb-4 text-center">
      <h2 class="fw-bold text-gradient mb-2">出租清單</h2>
      <p class="text-muted">找到最適合你的專屬陪伴</p>
    </div>

    <div class="row g-4">
      <div v-for="item in rentItems" :key="item.name" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <MemberCard 
          :image="item.image"
          :name="item.name"
          :specialty="item.description"
        >
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <h6 class="text-gradient fw-bold fs-5 mb-0 text-nowrap">{{ item.price }}</h6>
            <button class="btn btn-primary rounded-pill px-3 px-xl-4 fw-bold shadow-sm flex-shrink-0 text-nowrap" @click="openBooking(item)">
              立即預約
            </button>
          </div>
        </MemberCard>
      </div>
    </div>
    
  </div>
</template>