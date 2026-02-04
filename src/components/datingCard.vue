<script setup>
import { defineProps } from "vue";

const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
 
});
</script>

<template>
  <div class="content">

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


  </div>
</template>

<style scoped>
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
  background: linear-gradient(135deg, #ff1a53 0%, #ff7b1a 100%);;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-block;
}
</style>
