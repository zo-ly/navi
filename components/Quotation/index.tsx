import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import cx from 'classnames'
import { Edu_VIC_WA_NT_Beginner } from '@next/font/google'
import useLeftIn from '../../hooks/useLeftIn'

interface IProps {
  show: boolean
  onClick?: () => void
}

const eduVic = Edu_VIC_WA_NT_Beginner({
  subsets: ['latin'],
})

const Quotation: FC<IProps> = ({ show, onClick }) => {
  const { left, zIndex } = useLeftIn(show, 300)
  const [quote, setQuote] = useState<IQuoteRes>({})
  const { content, translation, author } = quote

  useEffect(() => {
    const fetchQuote = async () => {
      const { data } = await axios.get<IQuoteRes>('/api/quote')
      setQuote(data)
    }
    fetchQuote()
  }, [])

  return (
    <div
      onClick={onClick}
      style={{ zIndex, left }}
      className="relative duration-300 transition-all shadow-lg w-[94%] md:max-w-md mt-2 cursor-pointer"
    >
      <div className={cx(eduVic.className, 'block w-[102%] text-sm')}>
        {content && (
          <div className="relative m-0 pt-20 pb-16 px-4 md:px-6 text-slate-50 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 bg-[length:400%_400%] animate-gradient">
            <i className="absolute top-12 left-3 font-bold text-3xl">“</i>
            <p className="indent-4 block font-bold text-xl">{content}</p>
            <p className="indent-4 mt-2 mb-3">{translation}</p>
            <p className="text-right text-xl">{author}</p>
          </div>
        )}
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

export default Quotation
