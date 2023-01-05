import { FC, useState } from 'react'
import cx from 'classnames'
import { Inter } from '@next/font/google'
import BookMark from './BookMark'
import AddingBookMark from './AddingBookMark'
import Modal from '../Modal'

const inter = Inter({ subsets: ['latin'] })
const bookMarks = [
  {
    favicon: 'https://google.com/favicon.ico',
    name: 'Google',
  },
  {
    favicon: 'https://baidu.com/favicon.ico',
    name: '百度',
  },
]

const BookMarks: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const handleSetting = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <div
        className={cx(
          inter.className,
          'mt-8 w-full flex flex-col md:flex-row md:flex-wrap md:justify-center'
        )}
      >
        {Array(3)
          .fill(0)
          .map(() =>
            bookMarks.map(({ favicon, name }) => {
              return (
                <BookMark
                  key={favicon}
                  icon={favicon}
                  name={name}
                  onSetting={handleSetting}
                />
              )
            })
          )}
        <AddingBookMark />
      </div>
      <Modal open={showModal} onClose={handleClose}>
        <div>
          <h1>修改快捷方式</h1>
        </div>
      </Modal>
    </>
  )
}

export default BookMarks
