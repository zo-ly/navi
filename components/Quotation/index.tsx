import { FC } from 'react'
import cx from 'classnames'
import { Edu_VIC_WA_NT_Beginner } from 'next/font/google'
import useLeftIn from '../../hooks/useLeftIn'
import useQuote from '../../hooks/useQuote'

interface IProps {
  show: boolean
  onClick?: () => void
}

const eduVic = Edu_VIC_WA_NT_Beginner({
  subsets: ['latin'],
})

const Quotation: FC<IProps> = ({ show, onClick }) => {
  const { left, zIndex } = useLeftIn(show, 300)
  const { data: quote, error, isLoading } = useQuote()
  const { content, translation, author } = quote
  const nothing = error || isLoading || !content

  if (nothing) return null
  return (
    <div
      onClick={onClick}
      style={{ zIndex }}
      className="absolute top-0 left-0 w-full h-full bg-transparent"
    >
      <div
        style={{ zIndex, left }}
        className="fixed top-2 left-0 duration-300 transition-all w-[95%] md:max-w-md cursor-pointer"
      >
        <div className={cx(eduVic.className, 'block text-sm')}>
          <div className="relative m-0 pt-12 pb-10 px-4 md:px-6 shadow-lg shadow-black/30 text-slate-50 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 bg-[length:400%_400%] animate-gradient">
            <i className="absolute top-12 left-3 font-bold text-4xl">“</i>
            <p className="indent-6 md:indent-4 block font-bold text-xl">
              {content}
            </p>
            <p className="indent-6 md:indent-4 mt-2 mb-3 text-sm">
              {translation}
            </p>
            <p className="text-right font-bold text-md">{author}</p>
          </div>
        </div>
      </div>
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

export interface IQuoteV2Res {
  caption?: string
  content?: string
  dateline?: string
  fenxiang_img?: string
  love?: string
  note?: string
  picture?: string
  picture2?: string
  picture3?: string
  picture4?: string
  sid?: string
  tags?: string[]
}

export default Quotation
