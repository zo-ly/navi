import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function getFavicon(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { query } = req
    const { data } = await axios.get('https://www.google.com/s2/favicons', {
      params: query,
      responseType: 'arraybuffer',
    })
    res.setHeader('Content-Type', 'image/jpeg').send(Buffer.from(data))
  } catch (e) {
    const { status, response } = e as AxiosError
    res.status(status || 500).send(response?.data)
  }
}
