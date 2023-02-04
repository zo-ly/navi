import type { NextApiRequest, NextApiResponse } from 'next'
import getQuote from '../../lib/getQuote'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  switch (req.method) {
    case 'GET':
      return getQuote(req, res)
    default:
      return res.status(400).json({ message: 'Invalid method.' })
  }
}
