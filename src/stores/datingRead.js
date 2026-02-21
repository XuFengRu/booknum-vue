import { defineStore } from 'pinia'

export const usedatingRead = defineStore('chat', {
  state: () => ({
    conversations: [
      {
        id: 'xiaomei',
        name: '小美',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '她', text: '嗨～週末有空嗎？想說要不要一起去喝杯咖啡☕', time: '10:30' },
          { from: '我', text: '有啊！太剛好了，我正想約妳！週末見囉！', time: '10:32' },
          { from: '她', text: '真的嗎！太有默契了吧😆', time: '10:35' },
          { from: '她', text: '你有特別想去哪一間嗎？還是約上次你提過的那家貓咪咖啡廳？', time: '10:36' },
          { from: '我', text: '貓咪咖啡廳超棒！我記得叫做「呼嚕嚕」，在中山站附近對吧？', time: '10:40' },
          { from: '她', text: '對對對！就是那家～聽說他們的焦糖布丁也很好吃🤤', time: '10:41' },
          { from: '我', text: '那我們約星期六下午兩點？', time: '10:45' },
          { from: '她', text: '好呀，沒問題👌', time: '10:50' },
          { from: '她', text: '超期待的！最近上班好累，剛好可以去吸貓療癒一下', time: '10:51' },
          { from: '我', text: '我也是！這週真的滿操的。對了，那家店好像不能訂位，我們可能要提早一點點去排隊喔。', time: '11:00' },
          { from: '她', text: '瞭解，那我們早點碰面好了', time: '11:05' },
          { from: '她', text: '那 13:40 在捷運站 4 號出口等你？', time: '11:06' },
          { from: '我', text: '完美！那就週末見囉，不見不散～', time: '11:10' },
          { from: '她', text: '不見不散✨ 到時候見！', time: '11:15' },
        ],
        unreadCount: 4, // 模擬多則未讀
      },
      {
        id: 'aili',
        name: '艾莉',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '她', text: '最近在上檔的那部電影看起來超好看的～', time: '昨天 14:05' },
          { from: '我', text: '我也超喜歡那部！聽說評價很高', time: '昨天 14:07' },
        ],
        unreadCount: 0,
      },
      {
        id: 'tingting',
        name: '婷婷',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '她', text: '你昨天推薦的那家拉麵真的很好吃欸！湯頭超讚🍜', time: '09:15' },
        ],
        unreadCount: 1,
      },
      {
        id: 'yazhu',
        name: '雅筑',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '我', text: '下雨天記得帶傘喔！', time: '星期二' },
          { from: '她', text: '謝謝提醒～我已經到公司啦', time: '星期二' },
        ],
        unreadCount: 0,
      },
      {
        id: 'katie',
        name: '凱蒂',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '她', text: '哈哈哈哈這太好笑了吧', time: '星期一' },
        ],
        unreadCount: 0,
      },
      {
        id: 'xinyi',
        name: '欣儀',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '我', text: '哈囉！很高興認識妳', time: '11/15' },
          { from: '她', text: '嗨嗨，我也是！看妳的自介也喜歡打排球？', time: '11/15' },
        ],
        unreadCount: 0,
      },
      {
        id: 'zoe',
        name: '柔伊',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '她', text: '早安呀🌞', time: '11/10' },
        ],
        unreadCount: 0,
      },
      {
        id: 'anna',
        name: '安娜',
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=150&q=80',
        messages: [
          { from: '我', text: '下次再一起去玩桌遊！', time: '11/01' },
          { from: '她', text: '好呀，下次見拜拜👋', time: '11/01' },
        ],
        unreadCount: 0,
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