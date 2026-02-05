<script setup>
import { ref } from "vue";

const person = ref({
  name: "小J",
  age: 28,
  location: "台南市",
  job: "老師",
  avatar: "https://th.bing.com/th/id/R.a5ca9094a303b292dbefaaf1775c44a5?rik=66PcQh%2blUcFtuA&riu=http%3a%2f%2fmimgnews1.naver.net%2fimage%2f433%2f2018%2f06%2f15%2f0000045940_001_20180615091140923.jpg&ehk=CULPOpQBQsoOvXD97lNay%2f7f%2bOIXESVxpwv4ZRyubWM%3d&risl=&pid=ImgRaw&r=0",
  hobbies: ["旅行", "攝影", "咖啡", "爬山", "閱讀"],
  intro: "喜歡旅行和攝影，熱愛探索世界的每個角落。週末喜歡去郊外走走，享受陽光和咖啡。",
  matches: 24,
  likes: 156,
  preference: {
    gender: "女性",
    ageRange: [25, 35],
    cities: ["台北市", "新北市", "桃園市"],
  },
});
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="card">
        <div class="image-wrapper">
          <img class="avatar" :src="person.avatar" :alt="person.name" />
          <div class="info-overlay">
            <h1>{{ person.name }} {{ person.age }}</h1>
            <p><i class="bi bi-geo-alt"></i>&nbsp;&nbsp;{{ person.location }}</p>
            <p><i class="bi bi-bag-heart"></i>&nbsp;&nbsp;{{ person.job }}</p>
          </div>
        </div>


        <div class="stats-section">
          <div class="stat-card">
            <i class="bi bi-person-check"></i>
            <div class="stat-number">{{ person.matches }}</div>
            <div class="stat-label">配對數</div>
          </div>
          <div class="stat-card">
            <i class="bi bi-heart"></i>
            <div class="stat-number">{{ person.likes }}</div>
            <div class="stat-label">喜歡數</div>
          </div>
        </div>

        <div class="section">
          <h4>興趣愛好</h4>
          <div class="hobbies">
            <span class="tag" v-for="hobby in person.hobbies" :key="hobby">{{ hobby }}</span>
          </div>
        </div>

        <div class="section">
          <h4>自我介紹</h4>
          <p>{{ person.intro }}</p>
        </div>

      <div class="section" id="preference">
  <h4>偏好設定</h4>
  <p><strong>性別&nbsp;&nbsp;&nbsp;</strong>
    <span class="pref-tag">{{ person.preference.gender }}</span>
  </p>
  <p><strong>年齡&nbsp;&nbsp;&nbsp;</strong>
    <span class="pref-tag">{{ person.preference.ageRange[0]}} ~ {{ person.preference.ageRange[1] }} 歲</span>
  </p>
  <p><strong>城市&nbsp;&nbsp;&nbsp;</strong>
    <span class="pref-tag" v-for="city in person.preference.cities" :key="city">{{ city }}</span>
  </p>
</div>

        <!-- 新增編輯按鈕 -->
        <div class="edit-section">
          <button class="edit-btn btn-outline-primary"><i class="bi bi-pencil-square"></i>&nbsp;&nbsp;編輯個人資料</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
}
.card {
  width: 375px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 5px #6e6b6b;
  text-align: center;
  margin: 1rem;
}
.avatar {
  height: 500px;
  width: 375px;
  margin-bottom: 1rem;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}
h1 {
  margin: 0.5rem 0;
  text-align: left;
}
p {
  margin: 0.3rem 0;
  text-align: left;
}
.section {
  padding: 1rem;
  text-align: left;
}
.section h4 {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.3rem;
}
.section p {
  line-height: 1.5;
  color: #444;
}
#preference {
  border-bottom: 1px solid #ff4d94;
  border-top: 1px solid #ff4d94;
}

.pref-tag {
  background: var(--gradient-main);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
  margin-right: 0.4rem;
  margin-top: 0.3rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.image-wrapper {
  height: 500px;
  width: 375px;
  position: relative;
}
.info-overlay {
  width: 200px;
  height: 100px;
  position: absolute;
  bottom: 35px;
  left: 10px;
  font-size: 0.9rem;
  color: #fff;
  text-align: left;
  padding: 0.3rem 0.6rem;
  border-radius: 3px;
  text-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
}
.hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.tag {
  background: var(--gradient-main);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
}

/* 新增按鈕樣式 */
.edit-section {
  padding: 1rem;
  text-align: center;
}
.edit-btn {
  color: #ff4d94;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}
.edit-btn:hover {
  color: #ffe6f2;

}

/* 小卡片樣式 */
.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
}
.stat-card {
  flex: 1;
  border: 1px solid #ff0f0f;
  border-radius: 8px;
  padding: 0.4rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.stat-card i {
  font-size: 1.3rem;
  color: #ff4d94;
}
.stat-number {
  font-size: 1.4rem;
  color: #ff0f0f;
  
}
.stat-label {
  font-size: 0.8rem;
  color: #ff4d94;
}
</style>