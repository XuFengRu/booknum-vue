<script setup>
import { ref } from 'vue'
import { usedatingRead } from '@/stores/datingRead'
import ChatBox from '@/components/datingChatBox.vue'

const datingRead = usedatingRead()
const selectedChat = ref(null)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}
window.addEventListener('resize', checkMobile)
checkMobile()

function openChat(chat) {
  selectedChat.value = chat
  datingRead.markAsRead(chat.id) // 進入聊天後標記已讀
}
function backToList() {
  selectedChat.value = null
}

function getLastMessage(chat) {
  if (!chat.messages || chat.messages.length === 0) return ''
  let text = chat.messages[chat.messages.length - 1].text
  return text.length > 10 ? text.slice(0, 10) + '...' : text
}
</script>

<template>
  <div class="innercontainer" :class="{ mobile: isMobile }">
    <!-- 訊息列表 -->
    <div class="content" v-if="!isMobile || !selectedChat">
      <h2 class="text-gradient">&nbsp;&nbsp;我的訊息</h2>
      <p>
        <span class="text-primary"
          >&nbsp;&nbsp;&nbsp;&nbsp;{{ datingRead.conversations.length }}</span
        >&nbsp;個對話
      </p>
      <div class="chat-list">
        <div
          v-for="chat in datingRead.conversations"
          :key="chat.id"
          class="chat-item"
          @click="openChat(chat)"
        >
          <img class="avatar" :src="chat.avatar" alt="avatar" />
          <div class="text">
            <h3 class="name-wrapper">
              {{ chat.name }}
              <span v-if="chat.unreadCount > 0" class="badge">{{ chat.unreadCount }}</span>
            </h3>

            <p class="preview">
              {{ getLastMessage(chat) }}
              <span class="preview-time">{{ chat.messages[chat.messages.length - 1].time }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天內容 -->
    <div class="chat" v-if="!isMobile || selectedChat">
      <button v-if="isMobile" class="back-btn" @click="backToList">← 返回</button>
      <ChatBox v-if="selectedChat" :chat="selectedChat" />
      <div v-else class="empty-chat">選擇一個對話開始聊天</div>
    </div>
  </div>
</template>
<style scoped>
.name-wrapper {
  display: inline-flex;
  align-items: center; /* 垂直置中 */
  gap: 6px;
}

.badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background-color: red;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 12px; /* 圓角 */
}

.innercontainer {
  display: flex;
  height: 100vh;
  flex-direction: row; /* 桌面版預設橫向 */
}
.innercontainer.mobile {
  flex-direction: column; /* 手機版改成縱向 */
}

/* 右邊聊天 */
.chat {
  flex: 1;
  background-color: #fff;
  padding: 1rem;
  overflow-y: auto; /* 列表可滾動 */
}

.content {
  width: 300px;
  border-right: 1px solid #ddd;
  background: #fff;
  min-height: 100vh; /* 改成 min-height */
}
.chat-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f5ebeb;
  border-top: 1px solid #f5ebeb;
}
.chat-item:hover {
  color: #ff3366;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}
.text {
  flex: 1;
}
.preview {
  color: #666;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
}
.preview-time {
  font-size: 0.8rem;
  color: #aaa;
}

.empty-chat {
  color: #999;
  text-align: center;
  margin-top: 25%;
  font-size: 1.2rem;
}
.back-btn {
  margin-bottom: 1rem;
  background: none;
  border: none;
  color: #ff3366;
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .content {
    width: 100%;
    border-right: none;
  }
  .chat {
    width: 100%;
  }
}
</style>
