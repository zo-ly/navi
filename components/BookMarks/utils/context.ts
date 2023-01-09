import { createContext } from 'react'

interface ContextProps {
  bookMarks: Array<IBookMark>
  setBookMarks?: (bm: Array<IBookMark>) => void
}

export interface IBookMark {
  id: string
  name?: string
  favicon?: string
  link: string
}

export const BookMarksContext = createContext<ContextProps>({
  bookMarks: [],
})
