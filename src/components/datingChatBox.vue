<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  chat: Object,
})

const newMessage = ref('')
const messagesContainer = ref(null)

function sendMessage() {
  if (newMessage.value.trim() !== '') {
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    props.chat.messages.push({ from: '我', text: newMessage.value, time })
    newMessage.value = ''
  }
}

// 監聽 chat.messages，每次更新後自動捲到底
watch(
  () => props.chat.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
)
</script>

<template>
  <div class="chat-box">
    <h2 class="chat-bar">與 <span class="text-primary">{{ chat.name }}</span> 的聊天室</h2>

    <div class="messages" ref="messagesContainer">
      <div
        v-for="(msg, index) in chat.messages"
        :key="index"
        class="message-row"
        :class="msg.from === '我' ? 'me-row' : 'other-row'"
      >
        <div :class="['bubble', msg.from === '我' ? 'me' : 'other']">
          <span class="text">{{ msg.text }}</span>
        </div>
        <span class="time">{{ msg.time }}</span>
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="newMessage"
        type="text"
        placeholder="輸入訊息..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage" class="btn-primary"> <i class="bi bi-send-fill"></i>
</button>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 93%;
}

.chat-bar{
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

.messages {
  flex: 1;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

/* 每一行訊息 */
.message-row {
  display: flex;
  flex-direction: column;
  max-width: 40%;
}

.me-row {
  align-self: flex-end;
  text-align: left;
}

.other-row {
  align-self: flex-start;
  text-align: left;
}

/* 泡泡樣式 */
.bubble {
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-size: 0.95rem;
}

.bubble .text {
  display: block;
}

.me {
   background: linear-gradient(135deg, #ff1a53 0%, #ff7b1a 100%);
  color: white;
}

.other {
  background-color: #eee;
}


.time {
  font-size: 0.7rem;
  color: #9e9e9e;
  margin-top: 2px;
  line-height: 1.2;
  opacity: 0.8;
}


.input-area {
  display: flex;
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
  gap: 0.5rem;
}
.input-area input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.input-area button {
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
}



</style>