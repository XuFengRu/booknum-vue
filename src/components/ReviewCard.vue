<script setup>
defineProps({
  review: String, // 評論內容
  name: String,   // 使用者名稱
  job: String,    // 職業/身分
  avatar: String, // 頭像顯示的英文字母 (例如 S, M, A)
  stars: {        // 星星數 (預設給 5 顆，也可以之後改傳數字)
    type: String,
    default: '★★★★★'
  }
})
</script>

<template>
  <div class="card card-hover h-100 border-0 shadow-sm rounded-4 p-4 text-center">
    <div class="text-warning mb-3">{{ stars }}</div>
    <p class="text-muted mb-4">"{{ review }}"</p>
    
    <div class="mt-auto d-flex align-items-center justify-content-center gap-3">
      <div class="avatar bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center" 
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