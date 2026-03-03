<template>
  <div class="success-container card">
    <button class="custom-btn" @click="$router.push('/')">
      ← 返回首頁
    </button>
    <h1>交易成功</h1>
    <p>感謝您的購買！</p>
    <router-link to="/" class="custom-link">回首頁</router-link>
  </div>
</template>

<script>
export default {
  name: "ReturnPage",
};
</script>

<style scoped>
/* 💡 Element Plus 的細節覆寫：確保與 input-group-custom 高度及圓角完美契合 */
:deep(.el-date-editor .el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(200, 200, 200, 0.6) inset;
  background-color: #fff;
  height: 48px;
}

:deep(.el-date-editor .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--bs-primary) inset,
    0 0 0 4px rgba(255, 71, 87, 0.15) !important;
  background-color: #fff !important;
}

/* 改掉原本的 custom-back-btn，套用新的按鈕樣式 */
.custom-btn {
  background-color: #ff4757; /* 主色 */
  border: none;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #e84118; /* hover 顏色 */
  box-shadow: 0 0 0 4px rgba(255, 71, 87, 0.15);
}

/* RWD 調整 */
@media (max-width: 1400px) {
  .custom-btn {
    margin: 20px;
  }
}

@media (max-width: 767.98px) {
  .custom-btn {
    margin: 15px;
  }
}

.success-container {
  text-align: center;
  margin-top: 100px;
}

h1 {
  color: #2ecc71; /* 綠色代表成功 */
}

p {
  font-size: 18px;
  margin: 20px 0;
}

.custom-link {
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
}
</style>