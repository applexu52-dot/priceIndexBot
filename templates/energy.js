export default () => ({
  type: 'bubble',
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'USD',
        weight: 'bold',
        color: '#1DB446',
        size: 'sm',
      },
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '前一交易日收盤價',
            color: '#171717',
            size: 'sm',
            flex: 6
          },
          {
            type: 'text',
            text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
            wrap: true,
            color: '#18b71b',
            weight: 'bold',
            size: 'lg',
            flex: 3,
            margin: 'xxl'
          }
        ],
      },
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '近三個月均價',
            color: '#171717',
            size: 'sm',
            flex: 6
          },
          {
            type: 'text',
            text: '10:00 - 23:00',
            wrap: true,
            color: '#0033fd',
            weight: 'bold',
            size: 'lg',
            flex: 3,
            margin: 'xxl'
          }
        ]
      },
      {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '三年前近三個月均價',
            color: '#888888',
            size: 'sm',
            flex: 6
          },
          {
            type: 'text',
            text: '10:00 - 23:00',
            wrap: true,
            color: '#0633e8',
            weight: 'bold',
            size: 'lg',
            flex: 3,
            margin: 'xxl'
          }
        ]
      },
            {
        type: 'box',
        layout: 'baseline',
        spacing: 'sm',
        contents: [
          {
            type: 'text',
            text: '五年前近三個月均價',
            color: '#888888',
            size: 'sm',
            flex: 6
          },
          {
            type: 'text',
            text: '10:00 - 23:00',
            wrap: true,
            color: '#1c3cbb',
            weight: 'bold',
            size: 'lg',
            flex: 3,
            margin: 'xxl'
          }
        ]
      },
      {
        type: 'text',
        text: '',
        size: 'xs',
        color: '#aaaaaa',
      },
    ],
  },
  styles: {
    footer: {
      separator: true,
    },
  },
})