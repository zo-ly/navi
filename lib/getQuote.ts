import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function getQuote(
  _: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { data } = await axios.get(
      'https://apiv3.shanbay.com/weapps/dailyquote/quote/'
      // 'https://open.iciba.com/dsapi/'
    )
    res.status(200).json(data)
  } catch (e) {
    const { status, response } = e as AxiosError
    res.status(status || 500).send(response?.data)
  }
}
