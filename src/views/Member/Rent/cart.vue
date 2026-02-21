<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

defineOptions({
  name: 'CartPage'
});

const router = useRouter();

// 這裡保留你原本的測試資料
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
  const confirmClear = confirm("確定要清空購物車嗎？");
  if (confirmClear) {
    cartItems.value = [];
  }
}

function goToPayment() {
  router.push({ name: 'member-rent-payment' });
}

</script>

<template>
  <div class="w-100 fade-in-up">
    
    <div class="mb-4 text-center">
      <h2 class="fw-bold text-gradient mb-2">購物車</h2>
      <p class="text-muted">確認您的專屬預約清單</p>
    </div>

    <div v-if="cartItems.length > 0" class="row g-4">
      
      <div class="col-lg-8">
        <div class="d-flex flex-column gap-3">
          
          <div v-for="(item, index) in cartItems" :key="index" class="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="row g-0 align-items-center p-3 p-md-4 bg-white">
              
              <div class="col-auto">
                <img :src="item.image" :alt="item.name" class="rounded-4 object-fit-cover shadow-sm" style="width: 110px; height: 110px; object-position: center;"/>
              </div>
              
              <div class="col px-4 d-flex flex-column justify-content-center">
                <h5 class="fw-bolder text-dark mb-2">{{ item.name }}</h5>
                <p class="text-muted small mb-2 fw-bold">單價：NT$ {{ item.price.toLocaleString() }} / 小時</p>
                <div>
                  <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill shadow-sm">
                    預約時數：{{ item.hours }} 小時
                  </span>
                </div>
              </div>
              
              <div class="col-auto text-end ps-3 d-flex flex-column align-items-end justify-content-between h-100">
                <button class="btn btn-light btn-circle btn-circle-sm flex-shrink-0" title="刪除對話">
                  <i class="bi bi-trash-fill"></i>
                </button>
                <h5 class="fw-bolder text-gradient mb-0">NT$ {{ (item.price * item.hours).toLocaleString() }}</h5>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      <div class="col-lg-4 ">
        <div class="card border-0 shadow-sm rounded-4 p-4 p-xl-5 position-sticky" style="top: 100px;">
          <h5 class="fw-bolder text-dark mb-4"><i class="bi bi-receipt text-primary me-2"></i>訂單摘要</h5>
          
          <div class="d-flex justify-content-between mb-3 text-muted">
            <span class="fw-bold">項目總數</span>
            <span class="fw-bold text-dark">{{ cartItems.length }} 項</span>
          </div>
          
          <hr class="border-light-subtle my-3">
          
          <div class="d-flex justify-content-between align-items-end mb-4">
            <span class="text-dark fw-bold mb-1">總計金額</span>
            <h3 class="fw-bolder text-primary mb-0">NT$ {{ totalPrice.toLocaleString() }}</h3>
          </div>
          
          <div class="d-flex flex-column gap-3 mt-4">
            <button class="btn btn-primary rounded-pill w-100 fw-bold shadow-sm py-2" @click="goToPayment">
              前往結帳
            </button>
            <button class="btn btn-light rounded-pill w-100 fw-bold text-danger border border-light-subtle py-2" @click="clearCart">
              清空購物車
            </button>
          </div>
        </div>
      </div>

    </div>

    <div v-else class="text-center py-5 my-5 fade-in-up">
        <div class="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm mx-auto mb-4 border" 
             style="width: 100px; height: 100px; color: var(--text-muted);">
        <i class="bi bi-cart-x display-4"></i>
      </div>
      <h3 class="fw-bolder text-dark mb-3">您的購物車是空的</h3>
      <p class="text-muted mb-4">目前還沒有選擇任何陪伴服務，快去尋找屬於您的專屬心動吧！</p>

      <RouterLink to="/member/rent" class="btn btn-primary rounded-pill fw-bold shadow-sm fs-5">
        <i class="bi bi-search-heart me-2"></i>去逛逛
      </RouterLink>

    </div>

  </div>
</template>
