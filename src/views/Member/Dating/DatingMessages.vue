<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { usedatingRead } from '@/stores/datingRead'
import ChatBox from '@/components/datingChatBox.vue'
import axios from 'axios'
import * as signalR from '@microsoft/signalr'

const datingRead = usedatingRead()
const selectedChat = ref(null)
const isMobile = ref(false)
const connection = ref(null)

// 🔥 用參數控制，目前暫時先用 4
const userId = 4

function checkMobile() {
  isMobile.value = window.innerWidth <= 992
}

onMounted(async () => {
  window.addEventListener('resize', checkMobile)
  checkMobile()
  document.body.style.overflow = 'hidden'

  // 建立 SignalR 連線
  connection.value = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7091/chatHub")
    .withAutomaticReconnect()
    .build()

  await connection.value.start()

  // 加入使用者群組
  await connection.value.invoke("JoinUser", userId.toString())

  // 監聽訊息推播
  connection.value.on("ReceiveMessage", (message) => {
    const chat = datingRead.conversations.find(c => c.id === message.matchedId)
    if (chat) {
      chat.messages.push({
        chatId: message.chatId, // 🔥 加上 chatId
        from: message.senderId === userId ? '我' : chat.name,
        text: message.message,
        time: new Date(message.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })

      // ✅ 只有接收者才更新未讀數
      if (message.receiverId === userId) {
        chat.unreadCount = message.unreadCount
      }
    }
  })

  // 監聽未讀重置
  connection.value.on("ResetUnread", (data) => {
    const chat = datingRead.conversations.find(c => c.id === data.roomId)
    if (chat) {
      chat.unreadCount = data.unreadCount
    }
  })

  // 監聽解除配對
  connection.value.on("UnMatched", (data) => {
    datingRead.conversations = datingRead.conversations.filter(c => c.id !== data.roomId)
  })

  // 監聽新聊天室建立
  connection.value.on("ChatRoomCreated", (data) => {
    datingRead.conversations.push({
      id: data.roomId,
      name: data.user1Notification?.message || data.user2Notification?.message,
      avatar: "/images/default-avatar.png",
      messages: [],
      unreadCount: 0
    })
  })

  // 撈聊天室清單
  const res = await axios.get(`https://localhost:7091/api/MatchChat/list/${userId}`)
  datingRead.conversations = res.data.map(c => ({
    id: c.roomId,
    name: c.otherUserNickname,
    avatar: c.otherUserPhoto,
    otherUserId: c.otherUserId,
    messages: c.lastMessage ? [{
      chatId: c.lastMessageId, // 🔥 確保有 chatId
      text: c.lastMessage,
      time: new Date(c.lastTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }] : [],
    unreadCount: c.unreadCount
  }))
})

function openChat(chat) {
  selectedChat.value = chat
  datingRead.markAsRead(chat.id)

  // ✅ 先清零前端未讀數
  chat.unreadCount = 0

  // 加入聊天室群組
  connection.value.invoke("JoinRoom", chat.id.toString())

  // 撈聊天室訊息
  axios.get(`https://localhost:7091/api/MatchChat/${chat.id}?userId=${userId}`)
    .then(res => {
      chat.messages = res.data.map(m => ({
        chatId: m.chatId,
        from: m.senderId === userId ? '我' : chat.name,
        text: m.message,
        time: new Date(m.sendAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))

      const lastReadMessageId = chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1].chatId 
        : 0

      axios.post("https://localhost:7091/api/MatchChat/read/reset", {
        roomId: chat.id,
        userId: userId,
        lastReadMessageId: lastReadMessageId
      }).catch(err => {
        console.error("重置未讀失敗:", err)
      })
    })
}

function backToList() {
  selectedChat.value = null
}

function getLastMessage(chat) {
  if (!chat.messages || chat.messages.length === 0) return '暫無訊息'
  let text = chat.messages[chat.messages.length - 1].text
  return text.length > 15 ? text.slice(0, 15) + '...' : text
}

const totalUnread = computed(() => {
  return datingRead.conversations.reduce((sum, chat) => sum + chat.unreadCount, 0)
})
</script>

<template>
  <div class="card glass-skin border-0 rounded-4 chat-container overflow-hidden fade-in-up">
    <div class="row g-0 h-100">
      
      <div class="col-12 col-lg-4 h-100 d-flex flex-column chat-sidebar" v-if="!isMobile || !selectedChat">
        <div class="p-3 border-bottom d-flex align-items-center flex-shrink-0" style="height: 80px; border-color: rgba(255,255,255,0.4) !important;">
          <h4 class="fw-bold mb-0 text-gradient text-truncate">我的訊息</h4>
        </div>

        <div class="flex-grow-1 overflow-auto p-2">
          <div
            v-for="chat in datingRead.conversations"
            :key="chat.id"
            class="chat-list-item d-flex align-items-center p-3 mb-2 rounded-4 transition-all"
            :class="{ 'active': selectedChat?.id === chat.id }"
            @click="openChat(chat)"
          >
            <div class="position-relative me-3 flex-shrink-0">
              <img :src="chat.avatar" class="rounded-circle object-fit-cover shadow-sm border border-2 border-white" width="56" height="56" alt="avatar" />
              <span v-if="chat.unreadCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white">
                {{ chat.unreadCount }}
              </span>
            </div>
            
            <div class="flex-grow-1 min-w-0">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <h6 class="mb-0 fw-bold text-dark text-truncate">{{ chat.name }}</h6>
                <small class="text-muted ms-2 flex-shrink-0">{{ chat.messages[chat.messages.length - 1]?.time }}</small>
              </div>
              <p class="mb-0 small text-muted text-truncate">{{ getLastMessage(chat) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8 h-100 d-flex flex-column" v-if="!isMobile || selectedChat">
        <div class="mb-3 p-3 pb-0 d-lg-none flex-shrink-0" v-if="selectedChat">
          <button class="btn btn-light rounded-pill px-4" @click="backToList">
            <i class="bi bi-chevron-left me-1"></i> 返回列表
          </button>
        </div>

        <div class="flex-grow-1 overflow-hidden d-flex flex-column" v-if="selectedChat">
          <ChatBox :chat="selectedChat" class="flex-grow-1" />
        </div>
        
        <div v-else class="h-100 d-flex align-items-center justify-content-center text-center p-5">
          <div class="text-muted opacity-50">
            <i class="bi bi-chat-heart-fill display-1 mb-3 d-block"></i>
            <h5 class="fw-bold">選擇一個對話開始聊天吧</h5>
            <p class="small">在左側列表點擊大頭貼即可開啟聊天室</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>
.chat-container {
  height: calc(100vh - 140px);
  min-height: 450px;
}
@media (min-width: 992px) {
  .chat-sidebar {
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
}
.chat-list-item {
  cursor: pointer;
  background: transparent;
  transition: all 0.3s ease;
}
.chat-list-item:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateX(4px);
}
.chat-list-item.active {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.min-w-0 {
  min-width: 0;
}
</style>