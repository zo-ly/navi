import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { enginesMenu } from '../utils/constants'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAvailableContext } from '../utils/helper'

const SearchEngines: FC = () => {
  const { currentEngine, setCurrentEngine } = useAvailableContext()
  const [showMenu, setShowMenu] = useState(false)
  const [parent] = useAutoAnimate<HTMLDivElement>()

  const onMenuTrigger = () => {
    setShowMenu((pre) => !pre)
  }

  const onMenuItemClick = (engine: string) => () => {
    setCurrentEngine?.(engine)
    setShowMenu(false)
  }

  useEffect(() => {
    const closeMenu = () => setShowMenu(false)
    document.addEventListener('click', closeMenu)
    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
      ref={parent}
      className="absolute z-20 top-0 h-full"
    >
      {currentEngine && (
        <div
          onClick={onMenuTrigger}
          className="cursor-pointer select-none h-full pl-3.5 flex items-center"
        >
          <Image
            width={20}
            height={20}
            alt="logo"
            src={enginesMenu[currentEngine].icon}
          />
        </div>
      )}
      {showMenu && (
        <div className="absolute z-10 top-0 md:bottom-auto left-0 text-slate-800 bg-white rounded-3xl shadow-md overflow-hidden">
          {Object.entries(enginesMenu)
            .sort(([engineA], [engineB]) => {
              const pivot = -1
              if (engineA === currentEngine) return pivot
              if (engineB === currentEngine) return pivot * -1
              return 0
            })
            .map(([engine, { icon, label }]) => (
              <div
                key={engine}
                onClick={onMenuItemClick(engine)}
                className="h-11 px-3.5 w-40 flex items-center cursor-pointer hover:bg-slate-100"
              >
                <Image src={icon} width={20} height={20} alt="engine" />
                <div className="ml-4 flex-1 truncate">{label}</div>
                {currentEngine === engine && (
                  <Image
                    width={20}
                    height={20}
                    src="/check.svg"
                    alt="checked"
                    className="ml-4"
                  />
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default SearchEngines
