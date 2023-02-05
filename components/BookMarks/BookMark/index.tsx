import { FC, MouseEvent, useCallback, useRef, useState } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import { IBookMark } from '../interface'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from './helper'

interface BookMarkProps extends IBookMark {
  onSetting?: () => void
}

const BookMark: FC<BookMarkProps> = ({ id, link, name, onSetting }) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const [errorOrLoading, setErrorOrLoading] = useState(true)
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 20 : 10,
  }
  const handleAClick = useCallback(
    (e: MouseEvent) => {
      window.open(link, e.metaKey || e.ctrlKey ? '_blank' : '_self')
    },
    [link]
  )

  const handleImgLoad = useCallback(() => {
    setErrorOrLoading(false)
  }, [])

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <a
        onClick={handleAClick}
        className={cx(
          'touch-manipulation',
          'relative transition group cursor-pointer',
          'flex items-center mb-3 px-3 h-20 border-b-2 border-sky-400 border-dashed',
          'md:border-none md:rounded-lg md:bg-transparent md:flex-col md:justify-center md:mb-0 md:w-28 md:h-28 md:hover:bg-black/5'
        )}
      >
        <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center md:mx-auto">
          {errorOrLoading && <i className="text-center text-3xl">{'🔖'}</i>}
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            style={{ display: errorOrLoading ? 'none' : 'block' }}
            ref={imgRef}
            alt="icon"
            width={24}
            height={24}
            src={`/api/favicon?domain=${link}&sz=64`}
            onLoad={handleImgLoad}
            onError={() => setErrorOrLoading(true)}
          />
        </div>
        <div className="text-base text-slate-900 dark:text-slate-200 flex-1 w-0 truncate mx-3 md:w-auto md:flex-none md:text-center md:text-xs md:mt-3">
          {name}
        </div>
        <div
          className={cx(
            'transition-opacity delay-[0ms] w-16 h-full',
            'flex justify-between items-center',
            'md:h-auto md:absolute md:top-2 md:left-0 md:w-full md:flex-row-reverse md:px-1',
            'md:opacity-0 md:group-hover:opacity-100 md:group-hover:delay-500'
          )}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div
            className="flex justify-center items-center p-0.5 rounded-full md:hover:bg-black/10"
            onClick={onSetting}
          >
            <Image
              src="/setting.svg"
              width={20}
              height={20}
              alt="edit"
              className="md:scale-75"
            />
          </div>
          <Image
            src="/drag.svg"
            width={20}
            height={20}
            alt="drag"
            className="md:scale-75 cursor-grab"
            {...listeners}
          />
        </div>
      </a>
    </div>
  )
}

export default BookMark
