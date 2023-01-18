import { useContext, useEffect } from 'react'
import { defaultEngine } from './constants'
import { SearchBarContext } from './context'

const STORAGE_KEY = 'SEARCH_ENGINE'

export const getUsableEngine = () => {
  return localStorage.getItem(STORAGE_KEY) || defaultEngine
}

export const useAvailableContext = () => {
  const { currentEngine, ...rest } = useContext(SearchBarContext)

  useEffect(() => {
    if (!currentEngine) return
    localStorage.setItem(STORAGE_KEY, currentEngine)
  }, [currentEngine])

  return { currentEngine, ...rest }
}
