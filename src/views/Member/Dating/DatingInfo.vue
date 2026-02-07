<script setup>
import { ref } from "vue";
import EditProfile from "@/components/datingEdit.vue";
import DatingEdit from "@/components/datingEdit.vue";

const isEditing = ref(false);


const person = ref({
  name: "小J",
  age: 28,
  location: "台南市",
  job: "老師",
  avatar: "https://media.vogue.com.tw/photos/685a91da9afad780315cf5ee/2:3/w_2560%2Cc_limit/%25E9%2587%2591%25E6%25B3%25B0%25E4%25BA%25A86.jpg",
  hobbies: ["旅行", "攝影", "咖啡", "爬山", "閱讀", "閱讀", "閱讀", "閱讀", "閱讀", "閱讀"],
  intro: "喜歡旅行和攝影，熱愛探索世界的每個角落。透過鏡頭記錄不同文化、風景與人文故事，在行走中感受城市的溫度與自然的壯麗。無論是巍峨山巒、靜謐海岸，或是街頭巷尾的日常片刻，都能成為靈感來源。喜歡旅行和攝影，熱愛探索世界的每個角落。",
  matches: 24,
  likes: 156,
  preference: {
    gender: "女性",
    ageRange: [25, 35],
    cities: ["台北市", "新北市", "桃園市"],
  },
});


function updateProfile(newData) {
  person.value = {
    ...person.value,
    name: newData.nickname || person.value.name,
    location: newData.location || person.value.location,
    job: newData.job || person.value.job,
    hobbies: newData.hobbies?.length ? newData.hobbies : person.value.hobbies,
    intro: newData.intro || person.value.intro,
    preference: {
      gender: newData.preference?.gender || person.value.preference.gender,
      ageRange: newData.preference?.ageRange?.length
        ? newData.preference.ageRange
        : person.value.preference.ageRange,
      cities: newData.preference?.cities?.length
        ? newData.preference.cities
        : person.value.preference.cities
    }
  };
  isEditing.value = false; // 回到顯示模式
}

function cancelEdit() {
  isEditing.value = false;
}


</script>

<template>
  <div class="innercontainer">
    <div class="content">
    <div v-if="!isEditing" class="card">
  <!-- 左邊照片 -->
  <div class="image-wrapper">
    <img class="avatar" :src="person.avatar" :alt="person.name" />
    <div class="info-overlay">
      <h1>{{ person.name }} {{ person.age }}</h1>
      <p><i class="bi bi-geo-alt"></i>&nbsp;&nbsp;{{ person.location }}</p>
      <p><i class="bi bi-bag-heart"></i>&nbsp;&nbsp;{{ person.job }}</p>
    </div>
  </div>

  <!-- 右邊資訊 -->
  <div class="info">
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
      <p><strong>性別</strong> <span class="pref-tag">{{ person.preference.gender }}</span></p>
      <p><strong>年齡</strong> <span class="pref-tag">{{ person.preference.ageRange[0]}} ~ {{ person.preference.ageRange[1] }} 歲</span></p>
      <p><strong>城市</strong> <span class="pref-tag" v-for="city in person.preference.cities" :key="city">{{ city }}</span>
      </p>
    </div>

    <div class="edit-section">
      <button @click="isEditing = true" class="edit-btn btn-outline-primary"><i class="bi bi-pencil-square"></i>&nbsp;&nbsp;編輯個人資料</button>
    </div>
  </div>
</div>
 <DatingEdit v-else @save="updateProfile" @cancel="cancelEdit"/>
    </div>
  </div>
</template>

<style scoped>
.innercontainer {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
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
  padding: 0.5rem;
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
  border-bottom: 2px solid var(--color-secondary);
  border-top: 2px solid var(--color-primary);
}

.pref-tag {
  background: var(--gradient-main);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
  margin-right: 0.5rem;
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
  font-size: 1rem;
  color: #fff;
  text-align: left;
  padding: 0.8rem 0.6rem;
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
  margin: 1rem;
  gap: 1rem;
}
.stat-card {
  flex: 1;
  padding: 0.2rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border: 2px solid transparent; /* 先設透明邊框 */
  border-image: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  border-image-slice: 1; /* 必須設定，否則不會顯示 */
  width: 100px;
  height: 100px;
}

.stat-card i {
  font-size: 1.3rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-number {
  font-size: 1.4rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.8rem;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (min-width: 1200px) {
  .card {
    display: flex;
    flex-direction: row;
    width: 1100px;
    height: 825px;
    max-width: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  .image-wrapper {
    flex: 1;
    max-width: 50%;
    height: auto;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px 0 0 12px;
    margin-bottom: 0;
  }

  .info {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }


    .info .section:nth-of-type(2) { 
    flex: 0.6; 
    overflow-y: auto; 
  }

     .info .section:nth-of-type(3) { /* 第二個 section 就是自我介紹 */
    flex: 1.4; /* 佔比較大 */
    overflow-y: auto; /* 保險用，避免文字超出 */
  }


  /* 編輯按鈕保持在底部 */
  .info .edit-section {
    flex: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .stat-card {
    flex: none;
    width: 120px;
  }
  .stats-section {
    margin: 0rem;
  }

  .section h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .section p {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
  }

  .hobbies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  #preference {
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    border: 2px solid transparent;
    border-image: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    border-image-slice: 1;
  }

  .info-overlay {
    font-size: 1.2rem;
    padding: 0rem 0.6rem;
  }
}
</style>