import { createContext } from 'react'
import { defaultEngine } from './constants'

interface SearchBarContextProps {
  currentEngine: string
  setCurrentEngine?: (engine: string) => void
}

export const SearchBarContext = createContext<SearchBarContextProps>({
  currentEngine: defaultEngine,
})
