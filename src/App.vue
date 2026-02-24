<script setup>
import { RouterView } from 'vue-router'

import { ref } from 'vue'
import DatingSuccessModal from '@/components/datingSuccessModal.vue'

const datingModal = ref(null)

// 提供全域事件監聽
window.addEventListener("match-success", (e) => {
  datingModal.value?.show(e.detail.userName)
})

</script>

<template>
  <RouterView />
  <DatingSuccessModal ref="matchModal" />
</template>

<style>
</style>