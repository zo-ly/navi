export const defaultEngine = 'baidu'

export const enginesMenu: {
  [key: string]: {
    icon: string
    label: string
    link: string
  }
} = {
  google: {
    icon: '/google.svg',
    label: 'Google',
    link: 'https://www.google.com/search?q=',
  },
  baidu: {
    icon: '/baidu.svg',
    label: '百度',
    link: 'https://baidu.com/s?wd=',
  },
  bing: {
    icon: '/bing.svg',
    label: 'Bing',
    link: 'https://www.bing.com/search?q=',
  },
}

export const urlRegex =
  /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
