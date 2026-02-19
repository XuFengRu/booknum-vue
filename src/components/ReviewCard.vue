<script setup>
defineProps({
  review: String,
  name: String,
  job: String,
  avatar: String,
  stars: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div class="card h-100 p-4 text-center">
    <div class="text-warning mb-3">
      <i v-for="n in stars" :key="n" class="bi bi-star-fill"></i>
    </div>
    <p class="text-muted mb-4">"{{ review }}"</p>
    
    <div class="mt-auto d-flex align-items-center justify-content-center gap-3">
      <div class="avatar bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
           style="width:40px;height:40px;">
        {{ avatar }}
      </div>
      <div class="text-start">
        <h6 class="fw-bold m-0">{{ name }}</h6>
        <small class="text-muted">{{ job }}</small>
      </div>
    </div>
  </div>
</template>