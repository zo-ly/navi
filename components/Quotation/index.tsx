import { FC, useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const QUOTA_API = '/api/quote'

const Quotation: FC = () => {
  const [data, setData] = useState<QuoteRes>({})
  const [parent] = useAutoAnimate<HTMLDivElement>()

  const fetchData = async () => {
    try {
      const response: QuoteRes = await (await fetch(QUOTA_API)).json()
      setData(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div ref={parent} className="absolute top-24 left-24 text-sm font-mono">
      {data.content && (
        <div className="m-0 py-4 text-slate-50 text-sm bg-gray-100/75 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 bg-[length:400%_400%] animate-gradient">
          <div className="px-4 max-w-md max-h-36 overflow-auto ">
            <p className="block font-bold">{data.content}</p>
            <p className="mt-2 mb-4">{data.translation}</p>
            <p className="text-right">———— {data.author}</p>
          </div>
        </div>
      )}
    </div>
  )
}

interface QuoteRes {
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
