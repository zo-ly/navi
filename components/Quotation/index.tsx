import { FC, useEffect, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const QUOTA_API = '/api/quote'

const Quotation: FC = () => {
  const [data, setData] = useState<QuoteRes>({})
  const [parent] = useAutoAnimate<HTMLDivElement>()

  const fetchData = async () => {
    try {
      const response = await fetch(QUOTA_API)
      if (!response.ok) {
        return
      }
      const result: QuoteRes = await response.json()
      setData(result)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div ref={parent} className="block md:inline-block text-sm font-mono">
      {data.content && (
        <div className="overflow-hidden relative max-w-md m-0 pt-8 pb-6 text-slate-50 text-sm rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 bg-[length:400%_400%] animate-gradient">
          <div className="box-content pl-4 pr-5 w-full max-h-32 overflow-y-auto">
            <div className="pr-6">
              <i className="absolute top-3 left-3 font-serif font-bold text-3xl">
                “
              </i>
              <p className="indent-4 block font-bold">{data.content}</p>
              <p className="indent-4 mt-2 mb-3">{data.translation}</p>
              <p className="text-right">{data.author}</p>
            </div>
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
