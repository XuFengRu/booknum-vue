<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({ chat: Object })
const newMessage = ref('')
const messagesContainer = ref(null)

const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))
const userId = storedUser?.id

function formatMessageTime(sendAt) {
  const msgDate = new Date(sendAt)
  const now = new Date()
  const isSameDay = msgDate.toDateString() === now.toDateString()
  const diffDays = Math.floor((now - msgDate) / (1000 * 60 * 60 * 24))

  if (isSameDay) {
    return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (diffDays === 1 || msgDate.getDate() !== now.getDate()) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return msgDate.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' })
  }
}

async function sendMessage() {
  if (newMessage.value.trim() !== '') {
    try {
      await axios.post('https://localhost:7091/api/MatchChat', {
        matchedId: props.chat.id,
        senderId: userId,
        receiverId: props.chat.otherUserId,
        message: newMessage.value.trim(),
      })
      newMessage.value = ''
    } catch (err) {
      console.error('送訊息失敗:', err)
    }
  }
}

/* 🔹 新增：更新已讀狀態 */
async function updateReadStatus() {
  if (props.chat.messages.length > 0) {
    const lastMsg = props.chat.messages[props.chat.messages.length - 1]
    try {
      await axios.post('https://localhost:7091/api/MatchChat/read/reset', {
        roomId: props.chat.id,
        userId: userId,
        lastReadMessageId: lastMsg.chatId, // 後端需要 ChatId
      })
    } catch (err) {
      console.error('更新已讀失敗:', err)
    }
  }
}

/* 🔹 修改：watch 內加上 updateReadStatus */
watch(
  () => props.chat.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
    updateReadStatus()
  },
  { immediate: true },
)

/* 🔹 新增：mounted 時呼叫一次，確保進聊天室就更新已讀 */
onMounted(() => {
  updateReadStatus()
})
</script>


<template>
  <div class="d-flex flex-column h-100 w-100 overflow-hidden">
    <div class="border-bottom p-3 d-flex justify-content-between align-items-center flex-shrink-0"
      style="height: 80px; border-color: rgba(255, 255, 255, 0.4) !important">
      <div class="d-flex align-items-center gap-3 overflow-hidden">
        <img :src="chat.avatar"
          class="rounded-circle object-fit-cover shadow-sm border border-2 border-white flex-shrink-0" width="45"
          height="45" alt="avatar" />
        <h5 class="mb-0 fw-bold text-dark text-truncate">{{ chat.name }}</h5>
      </div>

      <button class="btn btn-light btn-circle btn-circle-sm flex-shrink-0" title="刪除對話">
        <i class="bi bi-trash-fill"></i>
      </button>
    </div>

    <div class="flex-grow-1 overflow-auto p-4 d-flex flex-column gap-3" ref="messagesContainer">
      <div v-for="(msg, index) in chat.messages" :key="index" class="d-flex flex-column"
        :class="msg.from === '我' ? 'align-items-end' : 'align-items-start'">
        <div class="message-bubble shadow-sm mb-1" :class="msg.from === '我'
            ? 'bubble-me bg-gradient text-white'
            : 'bubble-other bg-white text-dark'
          ">
          {{ msg.text }}
        </div>
        <small class="text-muted" style="font-size: 0.75rem">{{
          formatMessageTime(msg.sendAt)
          }}</small>
      </div>
    </div>

    <div class="border-top p-3 mt-auto" style="border-color: rgba(255, 255, 255, 0.4) !important">
      <div class="d-flex gap-2 align-items-center">
        <button class="btn btn-light btn-circle btn-circle-sm flex-shrink-0" title="附加檔案">
          <i class="bi bi-paperclip"></i>
        </button>

        <input v-model="newMessage" type="text" class="form-control rounded-pill px-4 py-2 border-0 shadow-sm"
          placeholder="輸入訊息..." @keyup.enter="sendMessage" />
        <button @click="sendMessage" class="btn btn-primary btn-circle btn-circle-sm flex-shrink-0"
          :disabled="!newMessage.trim()">
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
