import { FC } from 'react'

interface Props {
  onClick?: () => void
}

const AddingBookMark: FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer mt-10 flex items-center justify-center px-3 h-20 bg-white rounded-lg md:bg-transparent md:w-28 md:h-28 md:flex-col md:hover:bg-black/5 md:p-0 md:mx-1 md:mt-0"
    >
      <div className="w-12 h-12 rounded-full bg-white pt-3 pl-3 mr-3 md:mx-auto">
        <i
          style={{ backgroundImage: 'url(/add.svg)' }}
          className="block w-6 h-6 bg-cover"
        />
      </div>
      <div className="text-base text-slate-900 dark:md:text-slate-200 mx-3 md:w-auto md:flex-none md:text-center md:text-xs md:mt-3">
        添加快捷方式
      </div>
    </div>
  )
}

export default AddingBookMark
