<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal">
      <h5> 配對成功！</h5>
      <p>你和 {{ userName }} 已成功配對，可以開始聊天囉！</p>
      <button class="btn btn-primary" @click="close">知道了</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const userName = ref('')

function show(name) {
  userName.value = name
  visible.value = true
}

function close() {
  visible.value = false
}

// 🔥 匯出方法，讓外部可以呼叫
defineExpose({ show })
</script>