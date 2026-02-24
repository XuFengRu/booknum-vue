<script setup>
import { ref, watch, nextTick } from 'vue'
import axios from 'axios'

const props = defineProps({
  chat: Object,
})

const newMessage = ref('')
const messagesContainer = ref(null)

//目前暫時先用 4
const userId = 4

async function sendMessage() {
  if (newMessage.value.trim() !== '') {
    try {
      await axios.post("https://localhost:7091/api/MatchChat", {
        matchedId: props.chat.id,
        senderId: userId,              
        receiverId: props.chat.otherUserId, 
        message: newMessage.value.trim()
      })
      // 等待 SignalR 推播，不需要自己 push
      newMessage.value = ''
    } catch (err) {
      console.error("送訊息失敗:", err)
    }
  }
}

watch(
  () => props.chat.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="d-flex flex-column h-100 w-100 overflow-hidden">
    <div class="border-bottom p-3 d-flex justify-content-between align-items-center flex-shrink-0" style="height: 80px; border-color: rgba(255,255,255,0.4) !important;">
      
      <div class="d-flex align-items-center gap-3 overflow-hidden">
        <img :src="chat.avatar" class="rounded-circle object-fit-cover shadow-sm border border-2 border-white flex-shrink-0" width="45" height="45" alt="avatar" />
        <h5 class="mb-0 fw-bold text-dark text-truncate">{{ chat.name }}</h5>
      </div>
      
      <button class="btn btn-light btn-circle btn-circle-sm flex-shrink-0" title="刪除對話">
        <i class="bi bi-trash-fill"></i>
      </button>
      
    </div>

    <div class="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3" ref="messagesContainer">
      <div
        v-for="(msg, index) in chat.messages"
        :key="index"
        class="d-flex flex-column"
        :class="msg.from === '我' ? 'align-items-end' : 'align-items-start'"
      >
        <div 
          class="message-bubble shadow-sm mb-1"
          :class="msg.from === '我' ? 'bubble-me bg-gradient text-white' : 'bubble-other bg-white text-dark'"
        >
          {{ msg.text }}
        </div>
        <small class="text-muted" style="font-size: 0.75rem;">{{ msg.time }}</small>
      </div>
    </div>

    <div class="border-top p-3 mt-auto" style="border-color: rgba(255,255,255,0.4) !important;">
      <div class="d-flex gap-2 align-items-center">
        <button class="btn btn-light btn-circle btn-circle-sm flex-shrink-0" title="附加檔案">
          <i class="bi bi-paperclip"></i>
        </button>
        
        <input
          v-model="newMessage"
          type="text"
          class="form-control rounded-pill px-4 py-2 border-0 shadow-sm"
          placeholder="輸入訊息..."
          @keyup.enter="sendMessage"
        />
        <button 
          @click="sendMessage" 
          class="btn btn-primary btn-circle btn-circle-sm flex-shrink-0"
          :disabled="!newMessage.trim()"
        >
          <i class="bi bi-send-fill ms-1"></i> 
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-bubble {
  max-width: 75%;
  padding: 12px 18px;
  font-size: 0.95rem;
  line-height: 1.5;
  word-wrap: break-word;
}
.bubble-me {
  border-radius: 20px 20px 4px 20px;
}
.bubble-other {
  border-radius: 20px 20px 20px 4px;
}
</style>