import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function getFavicon(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { query } = req
    if (typeof query.domain !== 'string') throw Error('domain is nil')
    const domain = new URL(query.domain).hostname
    const { data } = await axios.get(
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      {
        responseType: 'arraybuffer',
      }
    )
    res.setHeader('Content-Type', 'image/jpeg').send(Buffer.from(data))
  } catch (e) {
    res.status(404).send(null)
  }
}
