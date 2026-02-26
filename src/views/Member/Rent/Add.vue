<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cart";
import { useRouter, useRoute } from "vue-router";
import { ElInputNumber } from "element-plus";

const cart = useCartStore();
const services = ref([]);
const router = useRouter();
const route = useRoute();

// ✅ 接收從 RentDetail.vue 傳過來的 parentId
const parentId = route.query.parentId;

// 找出對應的租人
const rent = cart.items.find(i => i.type === "租賃人" && i.id == parentId);

async function fetchServices() {
  try {
    const res = await axios.get("https://localhost:7091/api/Service");
    services.value = res.data.map(s => ({
      ...s,
      selectedHour: 1 // 預設選擇 1 小時
    }));
  } catch (err) {
    console.error("❌ 無法取得加購方案:", err);
  }
}

function addServiceToCart(service) {
  if (!rent) {
    alert("找不到對應的租人，請重新建立預約！");
    return;
  }

  const chosenHour = service.selectedHour || 1;

  // ✅ 防呆檢查分筆
  if (chosenHour > rent.hours) {
    alert(`加購時數不能超過該租人的預約時數 (${rent.hours} 小時)！`);
    return;
  }

  const unitPrice = service.price / service.hour;
  const total = unitPrice * chosenHour;

  cart.addItem({
    id: crypto.randomUUID(),      // ✅ 唯一識別碼
    name: service.serviceName,
    description: service.description,
    price: unitPrice,
    hours: chosenHour,
    totalAmount: total,
    type: "加購方案",
    parentId: parentId            // ✅ 綁定到正確的租人
  });

  alert(`已加入加購方案：${service.serviceName} (${chosenHour} 小時)`);
}

// 返回租賃列表
function goBackToRent() {
  router.push({ name: "member-rent" });
}

// 直接結帳 → 跳轉到購物車
function goToCart() {
  router.push({ name: "member-rent-cart" });
}

onMounted(fetchServices);
</script>

<template>
  <div class="w-100 fade-in-up d-flex justify-content-center pb-4">
    <div class="position-relative d-flex justify-content-center w-100" style="max-width: 1440px;">

      <button @click="goBackToRent" class="btn btn-light shadow-sm btn-circle btn-circle-md custom-back-btn"
        title="返回租賃列表">
        <i class="bi bi-arrow-left"></i>
      </button>

      <div class="card overflow-hidden border-0 shadow-lg rounded-5 w-100 mx-auto"
        style="max-width: 1300px; min-height: 650px;">
        <div class="row g-0 h-100">

          <!-- 左側標題 -->
          <div class="col-lg-4 h-100 p-4 p-xl-5 bg-white d-flex flex-column border-end">
            <div class="mb-3">
              <span class="badge bg-warning rounded-pill px-3 py-1 shadow-sm">加購方案</span>
            </div>
            <h2 class="fw-bolder text-dark mb-4 display-6">選擇加購服務</h2>
            <p class="text-muted lh-lg mb-4 flex-grow-1">
              提供額外的服務方案，讓您的租賃體驗更加完整。
            </p>

            <!-- 操作按鈕 -->
            <div class="mt-auto d-flex flex-column gap-2">
              <button class="btn btn-light rounded-pill fw-bold shadow-sm" @click="goBackToRent">
                返回租賃列表
              </button>
              <button class="btn btn-primary rounded-pill fw-bold shadow-sm" @click="goToCart">
                直接結帳
              </button>
            </div>
          </div>

          <!-- 右側方案列表 -->
          <div class="col-lg-8 h-100 p-4 p-xl-5 bg-light d-flex flex-column">
            <h5 class="fw-bold text-dark mb-4">可選擇的加購方案</h5>

            <div class="row g-4">
              <div v-for="s in services" :key="s.serviceId" class="col-md-6">
                <div class="card shadow-sm rounded-4 h-100">
                  <div class="card-body d-flex flex-column">
                    <h5 class="fw-bold text-dark mb-2">{{ s.serviceName }}</h5>
                    <p class="text-muted small mb-2">{{ s.description || "無描述" }}</p>

                    <!-- 可調整時數 -->
                    <label class="fw-bold small text-muted mb-1">選擇時數</label>
                    <el-input-number v-model="s.selectedHour" :min="1" :max="rent ? rent.hours : s.hour" size="small"
                      class="mb-2" /> <!-- ✅ 自閉合 -->

                    <!-- 計算金額 -->
                    <p class="mb-3">
                      <span class="fw-bold">金額：</span>
                      NT$ {{ (s.price / s.hour * s.selectedHour).toLocaleString() }}
                    </p>

                    <button class="btn btn-primary mt-auto rounded-pill fw-bold" @click="addServiceToCart(s)">
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>