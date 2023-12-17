import axios from 'axios'
import useSWR from 'swr'
import { IQuoteRes } from '../components/Quotation'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export default function useQuote() {
  const { data, isLoading, error } = useSWR<IQuoteRes>('/api/quote', fetcher)
  return { data: data || {}, isLoading, error }
}
