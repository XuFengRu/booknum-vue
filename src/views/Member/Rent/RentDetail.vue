<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
// 💡 引入 Element Plus 的 DatePicker
import { ElDatePicker } from "element-plus";
import "element-plus/dist/index.css";

const route = useRoute();
const router = useRouter();
const cart = useCartStore();

const name = route.params.name;
const description = route.query.description;
const price = route.query.price; 
const image = route.query.image;

const priceNumber = parseInt(price.replace(/[^0-9]/g, ""), 10);
const startDate = ref("");
const endDate = ref("");

// 💡 替換原本的 minDate，改用 Element Plus 的 disabled-date 函式
const disabledStartDate = (time) => {
  const min = new Date();
  // 限制只能選 7 天後的日期
  min.setDate(min.getDate() + 6); 
  return time.getTime() < min.getTime();
};

const disabledEndDate = (time) => {
  if (startDate.value) {
    // 結束日期的面板，不能早於選擇的開始日期
    const startDay = new Date(startDate.value);
    startDay.setHours(0, 0, 0, 0);
    return time.getTime() < startDay.getTime();
  }
  return disabledStartDate(time);
};

const hours = computed(() => {
  if (!startDate.value || !endDate.value) return 0;
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diffMs = end - start;
  if (diffMs <= 0) return 0;
  return Math.floor(diffMs / (1000 * 60 * 60)); 
});

const totalAmount = computed(() => hours.value * priceNumber);

function validateBooking() {
  if (!startDate.value || !endDate.value) {
    alert("請選擇開始與結束時間！");
    return false;
  }
  if (hours.value <= 0) {
    alert("結束時間必須晚於開始時間，且至少滿 1 小時！");
    return false;
  }
  return true;
}

function goToPayment() {
  if (validateBooking()) router.push({ name: 'member-rent-payment' });
}

function addToCart() {
  if (validateBooking()) {
    cart.addItem({
      name, description, price, image,
      startDate: startDate.value, endDate: endDate.value,
      hours: hours.value, totalAmount: totalAmount.value
    });
    router.push({ name: 'member-rent-cart' });
  }
}

function addExtra() { alert("加購方案功能尚未完成 🚧"); }
function goBack() { router.back(); }
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    
    <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1440px;">
      
      <button @click="goBack" 
              class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn" 
              title="返回列表">
        <i class="bi bi-arrow-left"></i>
      </button>

      <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto" style="max-width: 1300px; height: 650px;">
        <div class="row g-0 h-100">
          
          <div class="col-lg-4 h-100 position-relative">
            <img :src="image" :alt="name" class="w-100 h-100 object-fit-cover" style="object-position: center;" />
          </div>

          <div class="col-lg-4 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end ">
            <div class="mb-3">
              <span class="badge bg-danger rounded-pill px-3 py-1 shadow-sm">專屬陪伴</span>
            </div>
            
            <h2 class="fw-bolder text-dark mb-4 display-6">{{ name }}</h2>
            <p class="text-muted lh-lg mb-4 flex-grow-1">{{ description }}</p>
            
            <div class="mt-auto p-4 bg-light rounded-4 border ">
              <p class="text-muted small fw-bold mb-1">租賃費率</p>
              <h4 class="text-gradient fw-bold mb-0">{{ price }}</h4>
            </div>
          </div>

          <div class="col-lg-4 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
            <h5 class="fw-bold text-dark mb-4">選擇時間</h5>

            <div class="mb-3">
              <label class="form-label fw-bold text-muted small ms-1">開始時間</label>
              <div class="input-group-custom mb-0">
                <el-date-picker 
                  v-model="startDate" 
                  type="datetime" 
                  placeholder="選擇開始時間" 
                  format="YYYY/MM/DD HH:mm" 
                  value-format="YYYY-MM-DDTHH:mm" 
                  size="large" 
                  style="width: 100%;" 
                  :disabled-date="disabledStartDate"
                />
                <i class="bi bi-clock"></i>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold text-muted small ms-1">結束時間</label>
              <div class="input-group-custom mb-0">
                <el-date-picker 
                  v-model="endDate" 
                  type="datetime" 
                  placeholder="選擇結束時間" 
                  format="YYYY/MM/DD HH:mm" 
                  value-format="YYYY-MM-DDTHH:mm" 
                  size="large" 
                  style="width: 100%;" 
                  :disabled-date="disabledEndDate"
                />
                <i class="bi bi-clock-history"></i>
              </div>
            </div>

            <div class="bg-white p-4 rounded-4 shadow-sm border mb-4" v-if="hours > 0">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted fw-bold small">預約時數</span>
                <span class="fw-bold text-dark">{{ hours }} 小時</span>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
                <span class="text-dark fw-bolder">總計金額</span>
                <h4 class="text-primary fw-bolder mb-0">NT$ {{ totalAmount.toLocaleString() }}</h4>
              </div>
            </div>

            <div class="mt-auto d-flex flex-column gap-3">
              <div class="d-flex gap-2">
                <button class="btn btn-light rounded-pill flex-fill text-nowrap shadow-sm fw-bold border border-light-subtle" @click="addToCart">加入購物車</button>
                <button class="btn btn-warning rounded-pill flex-fill text-nowrap shadow-sm fw-bold" @click="addExtra">加購</button>
              </div>
              <button class="btn btn-primary rounded-pill flex-fill text-nowrap shadow-sm fw-bold" @click="goToPayment">立即結帳</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 💡 Element Plus 的細節覆寫：確保與 input-group-custom 高度及圓角完美契合 */
:deep(.el-date-editor .el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(200, 200, 200, 0.6) inset;
  background-color: #fff;
  height: 48px; /* 強制對齊原本的高度 */
}

:deep(.el-date-editor .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--bs-primary) inset, 0 0 0 4px rgba(255, 71, 87, 0.15) !important;
  background-color: #fff !important;
}

.custom-back-btn {
  position: absolute !important;
  left: 0px !important;
  top: 0px; 
  z-index: 1050;
}

@media (max-width: 1400px) {
  .custom-back-btn {
    left: 20px !important;
    top: 20px;
  }
}

@media (max-width: 991.98px) {
  .card { height: auto !important; }
  .col-lg-4 { height: auto !important; }
  .col-lg-4 img { height: 400px; }
}

@media (max-width: 767.98px) {
  .custom-back-btn {
    left: 15px !important;
    top: 15px;
  }
}
</style>