import type { NextApiRequest, NextApiResponse } from 'next'
import getFavicon from '../../lib/getFavicon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  switch (req.method) {
    case 'GET':
      return getFavicon(req, res)
    default:
      return res.status(400).json({ message: 'Invalid method.' })
  }
}
