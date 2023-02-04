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

const eduVic = Dancing_Script({
  subsets: ['latin'],
})

const Content: FC<IProps> = ({ zIndex, onClick }) => {
  return (
    <div
      style={{ zIndex }}
      onClick={onClick}
      className="absolute overflow-auto z-[1] inset-6 md:inset-7 right-0 flex flex-col items-center mx-auto p-4 bg-slate-100 dark:bg-slate-800 shadow-md rounded-lg"
    >
      <h1 className="text-5xl my-20 flex justify-center items-center">
        <span className={cx(eduVic.className, 'mr-5 font-bold')}>Hi there</span>
        <Image src="/hi.gif" width={48} height={48} alt="hi" className="mb-1" />
      </h1>
      <div className="w-full max-w-xl ">
        <SearchBar />
      </div>
      <BookMarks />
    </div>
  )
}

export default Content
