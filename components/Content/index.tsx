import { FC } from 'react'
import cx from 'classnames'
import Image from 'next/image'
import { Dancing_Script } from '@next/font/google'
import SearchBar from '../SearchBar'
import BookMarks from '../BookMarks'

interface IProps {
  zIndex?: number
  onClick?: () => void
}

const dancingS = Dancing_Script({
  subsets: ['latin'],
})

const Content: FC<IProps> = ({ zIndex, onClick }) => {
  return (
    <div
      style={{ zIndex }}
      onClick={onClick}
      className="relative z-[1] min-h-[83vh] md:min-h-[93vh] flex flex-col items-center pt-4 pb-8 bg-slate-100 dark:bg-slate-800 shadow-md rounded-lg"
    >
      <h1 className="text-5xl my-20 flex justify-center items-center">
        <span className={cx(dancingS.className, 'mr-5 font-bold')}>
          Hi there
        </span>
        <Image src="/hi.gif" width={48} height={48} alt="hi" className="mb-1" />
      </h1>
      <div className="w-full max-w-xl px-4">
        <SearchBar />
      </div>
      <div className="w-full px-4 mt-8 mx-auto md:max-w-[38rem]">
        <BookMarks />
      </div>
    </div>
  )
}

export default Content
