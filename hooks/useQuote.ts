import axios from 'axios'
import useSWR from 'swr'
import { IQuoteV2Res } from '../components/Quotation'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function useQuote() {
  const { data, isLoading, error } = useSWR<IQuoteV2Res>('/api/quote', fetcher)
  return { data: data || {}, isLoading, error }
}
