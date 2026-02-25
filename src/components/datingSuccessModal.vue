<template>
  <teleport to="body">
    <div v-if="visible" class="custom-backdrop">
      <div class="custom-modal">
        <h5>配對成功！</h5>
        <p>你和 {{ userName }} 已成功配對，可以開始聊天囉！</p>
        <button class="btn btn-primary" @click="close">知道了</button>
      </div>
    </div>
  </teleport>
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

defineExpose({ show, close })
</script>

<style>
.custom-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.custom-modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  height: 200px;
  min-width: 300px;
  text-align: center;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>