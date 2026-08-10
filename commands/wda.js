export default async (event) => {
  try {
    await event.reply({
      type: 'text',
      text: '請選擇',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              type: 'message',
              label: '能源',
              text: '能源',
            },
          },
          {
            type: 'action',
            action: {
              type: 'message',
              label: '金屬',
              text: '金屬',
            },
          },
        {
            type: 'action',
            action: {
              type: 'message',
              label: '農產品',
              text: '農產品',
            },
          },
        ],
      },
    })
  } catch (error) {
    console.error(error)
  }
}