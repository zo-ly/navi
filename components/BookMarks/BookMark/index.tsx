import { FC } from 'react'
import cx from 'classnames'
import Image from 'next/image'

interface BookMarkProps {
  icon: string
  name: string
  onSetting?: () => void
}

const BookMark: FC<BookMarkProps> = ({ icon, name, onSetting }) => {
  return (
    <div
      className={cx(
        'relative transition group cursor-pointer',
        'bg-gray-100 rounded-lg flex items-center mb-3 px-3 h-20',
        'md:bg-transparent md:flex-col md:justify-center md:mb-0 md:w-28 md:h-28 md:hover:bg-white/10'
      )}
    >
      <div className="w-12 h-12 rounded-full bg-white pt-3 pl-3 md:mx-auto">
        <i
          style={{ backgroundImage: `url(${icon})` }}
          className="block w-6 h-6 bg-cover"
        />
      </div>
      <div className="text-base flex-1 w-0 truncate mx-3 md:w-auto md:flex-none md:text-center md:text-xs md:mt-3">
        {name}
      </div>
      <div
        className={cx(
          'transition-opacity delay-[0ms] w-16 h-full',
          'flex justify-between items-center',
          'md:h-auto md:absolute md:top-2 md:left-0 md:w-full md:flex-row-reverse md:px-1',
          'md:opacity-0 md:group-hover:opacity-100 md:group-hover:delay-500'
        )}
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
        />
      </div>
    </div>
  )
}

export default BookMark
