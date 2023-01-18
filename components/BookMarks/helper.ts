import { IBookMark } from './interface'

const BOOK_MARKS_KEY = 'STORAGE_BOOK_MARKS'

export const setStorage = (bookMarks: Array<IBookMark>) => {
  try {
    localStorage.setItem(BOOK_MARKS_KEY, JSON.stringify(bookMarks))
    return true
  } catch (e) {
    return false
  }
}

export const getStorage = (): Array<IBookMark> | null => {
  const bookMarks = localStorage.getItem(BOOK_MARKS_KEY)
  return bookMarks && JSON.parse(bookMarks)
}
