<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
  isAction: {
    type: Boolean,
    default: true, // 預設顯示按鈕
  },
});

const emit = defineEmits(["reject", "like"]);

const handleReject = () => {
  emit("reject", props.person);
};

const handleLike = () => {
  emit("like", props.person);
};
</script>

<template>
  <div class="card-content">
    <!-- 左邊按鈕 -->
    <button
      v-if="isAction"
      class="reject"
      @click="handleReject"
    >
      <i class="bi bi-x-lg"></i>
    </button>

    <!-- 卡片 -->
    <div class="card">
      <div class="image-wrapper">
        <img class="avatar" :src="person.avatar" :alt="person.name" />
        <!-- 左下角資訊 -->
        <div class="info-overlay">
          <h1>{{ person.name }} {{ person.age }}</h1>
          <p><i class="bi bi-geo-alt"></i>&nbsp;&nbsp;{{ person.location }}</p>
          <p><i class="bi bi-bag-heart"></i>&nbsp;&nbsp;{{ person.job }}</p>
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
    </div>

    <!-- 右邊按鈕 -->
    <button
      v-if="isAction"
      class="like"
      @click="handleLike"
    >
      <i class="bi bi-heart-fill"></i>
    </button>
  </div>
</template>

<style scoped>
.card-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem; /* 按鈕和卡片之間的間距 */
  flex-direction: row; /* 強制水平排列 */

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
  background: linear-gradient(135deg, #ff1a53 0%, #ff7b1a 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
}

/* 按鈕樣式 */
.reject:hover {
  background: var(--gradient-hover);
  box-shadow: 0 10px 20px rgba(var(--color-primary-rgb), 0.3);
}
.like:hover {
  background: var(--gradient-main);
  box-shadow: 0 10px 20px rgba(var(--color-primary-rgb), 0.3);
}
.reject,
.like {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.reject {
  background-color: #ff4d4d;
  color: #fff;
}
.like {
  background-color: #ff4081;
  color: #fff;
}
</style>