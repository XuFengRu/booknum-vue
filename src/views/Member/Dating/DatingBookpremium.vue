<script setup>

const plans = [
  { 
    id: 'plan1', 
    name: '1 個月方案', 
    months: 1, 
    price: 390, 
    monthly: 390, 
    discount: 0, 
    label: '' 
  },
  { 
    id: 'plan3', 
    name: '3 個月方案', 
    months: 3, 
    price: 890, 
    monthly: 297, 
    discount: 24, 
    label: '最受歡迎' 
  },
  { 
    id: 'plan6', 
    name: '6 個月方案', 
    months: 6, 
    price: 1590, 
    monthly: 265, 
    discount: 32, 
    label: '' 
  }
]
</script>

<template>
  <div class="container">

    <!-- 右邊內容置中 -->
    <div class="content">
      <div class="inner">
        <h1>升級至 BookPremium</h1>
        <p class="subtitle">解鎖所有進階功能，提升你的配對成功率</p>

        <!-- 功能區塊 -->
        <div class="features">
          <div class="feature"><i class="bi-fire text-gradient"></i>&nbsp;&nbsp;<span class="text-gradient">無限次喜歡</span> - 不受每日喜歡數次限制</div>
          <div class="feature"><i class="bi-heart text-gradient"></i>&nbsp;&nbsp;<span class="text-gradient">查看誰喜歡你</span> - 立即查看所有喜歡你的人</div>
          <div class="feature"><i class="bi-chat-dots text-gradient"></i>&nbsp;&nbsp;<span class="text-gradient">優先訊息</span> - 搶先發送訊息，留下第一印象</div>
        </div>

        <!-- 方案卡片 -->
        <h2 class="plan-title">選擇方案</h2>
        <div class="plans">
          <div v-for="plan in plans" :key="plan.id" class="plan-card">
            <div class="top">
              <h4 class="mb-3">{{ plan.name }}</h4>
              <h3 class="text-gradient">NT$ {{ plan.price }}</h3>
              <span style="font-size: 0.75rem ">（約 NT$ {{ plan.monthly }}/月）</span>
              <span v-if="plan.label" class="tag">{{ plan.label }}</span>
            </div>
            <div class="bottom ">
              <p v-if="plan.discount >= 0" style="font-style: italic;"> 省下 {{ plan.discount }}%</p>
              <button class="upgrade-btn">立即升級</button>
            </div>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="footer-note">
           隨時取消訂閱｜安全的付款機制｜立即生效
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}


/* Content 區塊 */
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background: linear-gradient(180deg, #fffdf7, #fff8e1);

  min-height: 100vh; /* 保證至少跟視窗一樣高 */
  width: 100%;
}


.inner {
  max-width: 900px;
  width: 100%;
  text-align: center; 
}


h1 {
background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #555;
  margin-bottom: 2rem;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.feature {
  background-color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
  margin-bottom: 0.5rem;
  font-size: 1rem;
  width: 90%;
  max-width: 780px;
}


.plan-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}


.plans {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.plan-card {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #f0e5bb; /* 金黃邊框 */
  box-shadow: 0 0 10px rgba(238, 223, 163, 0.4); /* 金黃光暈 */
  padding: 1rem;
  width: 250px;
  position: relative;
  text-align: center;
  transition: 0.3s ease;
}

.plan-card:hover {
  border-color: #ffe88c;
  box-shadow: 0 0 14px rgba(255, 221, 86, 0.6);
  transform: scale(1.03); 
}


.top h3 {
  margin: 0;
}

.top p {
  margin: 0.5rem 0;
  color: #333;
}


.tag {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
  color: #333;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
}


.bottom {
  margin-top: 0.2rem;
}


.upgrade-btn {
  background: linear-gradient(135deg, #ffdd56, var(--color-secondary));
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.upgrade-btn:hover {
  background: linear-gradient(135deg, #fed11b, #ffde69);
  transform: translateY(-2px); 
}


.footer-note {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
}

i {
  margin: 0;
  color: #ffdd56;
  font-weight: bold;
}


</style>