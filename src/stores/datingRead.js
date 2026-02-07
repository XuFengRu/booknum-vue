import { defineStore } from 'pinia'

export const usedatingRead = defineStore('chat', {
  state: () => ({
    conversations: [
      {
        id: 'xiaomei',
        name: '小美',
        avatar: 'https://pic3.zhimg.com/v2-b1136c6d946d263709a7461de8b0f9a2_r.jpg',
        messages: [
          { from: '她', text: '嗨～週末有空嗎？', time: '10:30' },
          { from: '我', text: '有啊！我們週末見囉！', time: '10:32' },
        ],
        unreadCount: 2, // 新增：未讀數量
      },
      {
        id: 'aili',
        name: '艾莉',
        avatar: 'https://www.63099.net/zb_users/upload/2024/09/1725899463861.png',
        messages: [
          { from: '她', text: '最近在看那部電影～', time: '14:05' },
          { from: '我', text: '我也超喜歡那部！', time: '14:07' },
        ],
        unreadCount: 0, // 沒有未讀
      },
    ],
  }),
  actions: {
    markAsRead(id) {
      const chat = this.conversations.find((c) => c.id === id)
      if (chat) chat.unreadCount = 0
    },
    addMessage(id, msg) {
      const chat = this.conversations.find((c) => c.id === id)
      if (chat) {
        chat.messages.push(msg)
        chat.unreadCount++
      }
    },
  },
})
