<script setup>
import { ref } from "vue";
import MemberCard from "@/components/MemberCard.vue";

defineOptions({
  name: 'BookingPage'
});

const bookings = ref([
  { 
    id: 1, 
    name: "雅涵", 
    description: "氣質優雅，適合舞台與陪伴。", 
    date: "2026-02-10 14:00", 
    status: "已確認", 
    image: "/images/Girlfriend6.jpg", 
    price: "NT$ 1200 / 小時" 
  },
  { 
    id: 2, 
    name: "子睿", 
    description: "外型俊朗，適合約會與活動陪同。", 
    date: "2026-02-12 19:30", 
    status: "待付款", 
    image: "/images/Boyfriend1.jpg", 
    price: "NT$ 800 / 小時" 
  },
  { 
    id: 3, 
    name: "承澤", 
    description: "成熟穩重，適合正式場合與晚宴。", 
    date: "2026-02-15 16:00", 
    status: "已完成", 
    image: "/images/Boyfriend4.jpg", 
    price: "NT$ 1500 / 小時" 
  }
]);


const getStatusColor = (status) => {
  switch (status) {
    case '已確認': return 'success';
    case '待付款': return 'warning';
    case '已完成': return 'secondary';
    case '已取消': return 'dark';
    default: return 'primary';
  }
};

function cancelBooking(id) {
  if (confirm("確認取消預約？")) {
    const booking = bookings.value.find(b => b.id === id);
    if (booking) booking.status = "已取消";
  }
}

function rebook(id) {
  const booking = bookings.value.find(b => b.id === id);
  if (booking) booking.status = "已確認";
  alert(`已為您重新預約！`);
}

function viewDetail(id) {
  alert(`即這樣為您跳轉至訂單 ${id} 詳情...`);
}
</script>

<template>
  <div class="w-100 fade-in-up">
    <div class="mb-4 text-center">
      <h2 class="fw-bolder text-gradient mb-2">我的預約</h2>
      <p class="text-muted">管理您的專屬陪伴行程</p>
    </div>

    <div class="row g-4">
      <div v-for="booking in bookings" :key="booking.id" class="col-12 col-sm-6 col-md-4 col-lg-3">

        <MemberCard :image="booking.image" :name="booking.name" :specialty="booking.description" :tag="booking.status"
          :tag-color="getStatusColor(booking.status)">
          <div class="d-flex flex-column gap-3">
            <div class="text-dark fw-bold d-flex align-items-center fs-6">
              <i class="bi bi-clock-fill text-gradient me-2"></i>
              {{ booking.date }}
            </div>

            <div class="d-flex gap-2 mt-2">
              <template v-if="booking.status === '已取消'">
                <button class="btn btn-primary rounded-pill flex-fill text-nowrap shadow-sm fw-bold px-2"
                  @click="rebook(booking.id)">
                  重新預約
                </button>
                <button class="btn btn-light rounded-pill flex-fill text-nowrap fw-bold px-2"
                  @click="viewDetail(booking.id)">
                  詳情
                </button>
              </template>

              <template v-else>
                <button class="btn btn-light border text-danger rounded-pill flex-fill text-nowrap fw-bold px-2"
                  @click="cancelBooking(booking.id)">
                  取消
                </button>
                <button class="btn btn-primary rounded-pill flex-fill text-nowrap shadow-sm fw-bold px-2"
                  @click="viewDetail(booking.id)">
                  詳情
                </button>
              </template>
            </div>
          </div>
        </MemberCard>

      </div>
    </div>

  </div>
</template>