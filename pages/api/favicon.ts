import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export type IApiFaviconRes = {
  faviconB64: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiFaviconRes | unknown>
) {
  try {
    const { query } = req
    const { data } = await axios.get('https://www.google.com/s2/favicons', {
      params: query,
      responseType: 'arraybuffer',
    })
    const returnedB64 = Buffer.from(data).toString('base64')
    res.status(200).json({ faviconB64: `data:image/png;base64,${returnedB64}` })
  } catch (e) {
    const { status, response } = e as AxiosError
    res.status(status || 500).send(response?.data)
  }
}
