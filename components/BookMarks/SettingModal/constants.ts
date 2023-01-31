export const FORM_KEY = 'bookMark'

export const LABEL_GROUP = [
  {
    label: '输入书签名称',
    name: 'name',
  },
  {
    label: '输入书签网址',
    name: 'link',
    rules: {
      required: '请填写此项',
      validate: (v?: string) =>
        (v && /https?:\/\/\S+/.test(v)) || '请输入正确的网址',
    },
  },
]
