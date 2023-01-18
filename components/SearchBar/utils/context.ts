import { createContext } from 'react'

interface SearchBarContextProps {
  currentEngine?: string
  setCurrentEngine?: (engine: string) => void
}

export const SearchBarContext = createContext<SearchBarContextProps>({})
