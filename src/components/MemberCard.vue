<script setup>
defineProps({
  image: String,
  name: String,
  tag: String,
  tagColor: {
    type: String, 
    default: 'danger' 
  }, 
  specialty: String,
  price: String
})
</script>

<template>
  <div class="card h-100">
    <div class="position-relative p-2">
      <img :src="image" class="card-img-top" :alt="name" style="border-radius: 20px 20px 0 0; height: 300px; object-fit: cover;">
    </div>
    
    <div class="card-body px-4 pb-4 pt-2 text-start">
      <span v-if="tag" :class="`badge bg-${tagColor} rounded-pill mb-2 px-2`">
        {{ tag }}
      </span>
      
      <h5 class="card-title fw-bold mb-1">{{ name }}</h5>
      <p class="card-text text-muted small text-uppercase mb-2">{{ specialty }}</p>
      <h6 class="text-gradient fw-bold fs-5">{{ price }}</h6>
    </div>
  </div>
</template>