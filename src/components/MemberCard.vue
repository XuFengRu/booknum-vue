<script setup>
defineProps({
  image: String,
  name: String,
  tag: String,     // 例如：NEW ARRIVAL
  tagColor: {      // 控制標籤顏色 (danger, secondary, dark...)
    type: String, 
    default: 'danger' 
  }, 
  specialty: String, // 專長/地點
  price: String
})
</script>

<template>
  <div class="card card-hover h-100 border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="position-relative">
      <img :src="image" class="card-img-top object-fit-cover" height="320" :alt="name">
    </div>
    
    <div class="card-body p-4 text-start">
      <span v-if="tag" :class="`badge bg-${tagColor} rounded-1 mb-2 px-2 py-1`"
        style="font-size: 0.7rem; letter-spacing: 1px;">
        {{ tag }}
      </span>
      
      <h5 class="card-title fw-bold mb-1">{{ name }}</h5>
      <p class="card-text text-muted small text-uppercase mb-2">{{ specialty }}</p>
      <h6 class="text-gradient fw-bold fs-5">{{ price }}</h6>
    </div>
  </div>
</template>