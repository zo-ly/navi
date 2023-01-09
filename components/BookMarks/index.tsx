import { FC, useCallback, useState } from 'react'
import cx from 'classnames'
import { Inter } from '@next/font/google'
import BookMark from './BookMark'
import AddingBookMark from './AddingBookMark'
import { BookMarksContext, IBookMark } from './utils/context'
import SettingModal, { ModalStatus } from './SettingModal'

const inter = Inter({ subsets: ['latin'] })

const BookMarks: FC = () => {
  const [bookMarks, setBookMarks] = useState<Array<IBookMark>>([])
  const [editingId, setEditingId] = useState<string>()
  const [modalStatus, setModalStatus] = useState<ModalStatus>(
    ModalStatus.Closed
  )
  const handleSetting = useCallback(
    (id: string) => () => {
      setEditingId(id)
      setModalStatus(ModalStatus.Edit)
    },
    []
  )

  const handleClose = useCallback(() => {
    setModalStatus(ModalStatus.Closed)
  }, [])

  const addBookMark = useCallback(() => {
    setEditingId(undefined)
    setModalStatus(ModalStatus.Create)
  }, [])

  const handleSettingConfirm = useCallback(
    (data: IBookMark) => {
      setBookMarks((pre) => {
        if (modalStatus === ModalStatus.Create) {
          return [...pre, data]
        }

        return pre.map((i) => (i.id === data.id ? data : i))
      })
      handleClose()
    },
    [handleClose, modalStatus]
  )

  const handleSettingRemove = useCallback(
    (data: IBookMark) => {
      setBookMarks((pre) => pre.filter((i) => i.id !== data.id))
      handleClose()
    },
    [handleClose]
  )

  return (
    <>
      <BookMarksContext.Provider value={{ bookMarks, setBookMarks }}>
        <div
          className={cx(
            inter.className,
            'mt-8 w-full flex flex-col md:flex-row md:flex-wrap md:justify-center'
          )}
        >
          {bookMarks.map(({ id, favicon, name, link }) => {
            return (
              <BookMark
                key={id}
                name={name}
                link={link}
                favicon={favicon}
                onSetting={handleSetting(id)}
              />
            )
          })}
          <AddingBookMark onClick={addBookMark} />
        </div>
      </BookMarksContext.Provider>
      <SettingModal
        status={modalStatus}
        onClose={handleClose}
        onConfirm={handleSettingConfirm}
        onRemove={handleSettingRemove}
        value={bookMarks.find((b) => editingId === b.id)}
      />
    </>
  )
}

export default BookMarks
