import cx from 'classnames'
import {
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import SearchEngines from './SearchEngines'
import { SearchBarContext } from './utils/context'
import { enginesMenu, urlRegex } from './utils/constants'
import { getUsableEngine } from './utils/helper'

const SearchBar: FC = () => {
  const [currentEngine, setCurrentEngine] = useState<string>()
  const inputText = useRef<string>()

  useEffect(() => {
    setCurrentEngine(getUsableEngine())
  }, [])

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    inputText.current = target.value
  }

  const onSearch = () => {
    if (!inputText.current || !currentEngine) return

    const url = urlRegex.test(inputText.current)
      ? inputText.current
      : `${enginesMenu[currentEngine].link}${inputText.current}`
    window.location.href = url.startsWith('https') ? url : `http://${url}`
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    onSearch()
  }
  return (
    <SearchBarContext.Provider value={{ currentEngine, setCurrentEngine }}>
      <div className="relative w-full">
        <SearchEngines />
        <div
          className={cx(
            'flex justify-between items-center',
            'w-full px-3.5 h-11 overflow-hidden',
            'bg-white text-slate-800 border border-gray-200 border-solid rounded-3xl',
            'hover:shadow-md hover:border-gray-50 focus:shadow-md focus:border-gray-50'
          )}
        >
          <input
            type="text"
            className="flex-1 bg-white h-full pl-7 focus-visible:outline-none"
            placeholder={
              currentEngine &&
              `在 ${enginesMenu[currentEngine].label} 上搜索，或者输入一个网址`
            }
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
          <div className="cursor-pointer" onClick={onSearch}>
            <Image src="/search.svg" width={20} height={20} alt="search" />
          </div>
        </div>
      </div>
    </SearchBarContext.Provider>
  )
}

export default SearchBar
