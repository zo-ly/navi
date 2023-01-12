import { FC } from 'react'

const Quotation: FC<{ quote: IQuoteRes }> = ({ quote }) => {
  const { content, translation, author } = quote

  return (
    <div className="block text-sm font-mono mb-8 md:mb-10 md:inline-block ">
      {content && (
        <div className="relative max-w-md m-0 pt-8 pb-6 px-4 md:px-6 text-slate-50 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 bg-[length:400%_400%] animate-gradient">
          <i className="absolute top-3 left-3 font-serif font-bold text-3xl">
            “
          </i>
          <p className="indent-4 block font-bold">{content}</p>
          <p className="indent-4 mt-2 mb-3">{translation}</p>
          <p className="text-right">{author}</p>
        </div>
      )}
    </div>
  )
}

export interface IQuoteRes {
  id?: string
  author?: string
  content?: string
  translation?: string
  assign_date?: string
  share_url?: string
  origin_img_urls?: Array<string>
  poster_img_urls?: Array<string>
  share_img_urls?: Array<string>
  share_urls?: {
    qzone?: string
    shanbay?: string
    wechat?: string
    wechat_user?: string
    weibo?: string
  }
}

export default Quotation
