import { FC, useCallback, useState } from 'react'
import cx from 'classnames'
import { Inter } from '@next/font/google'
import AddingBookMark from './AddingBookMark'
import { IBookMark } from './interface'
import SettingModal, { ModalStatus } from './SettingModal'
import SortableList from './SortableList'

const inter = Inter({ subsets: ['latin'] })

const BookMarks: FC = () => {
  const [bookMarks, setBookMarks] = useState<Array<IBookMark>>([])
  const [editingId, setEditingId] = useState<string>()
  const [modalState, setModalState] = useState({
    open: false,
    status: ModalStatus.Create,
  })
  const handleSetting = useCallback(
    (id: string) => () => {
      setEditingId(id)
      setModalState({ open: true, status: ModalStatus.Edit })
    },
    []
  )

  const handleClose = useCallback(() => {
    setModalState((pre) => ({ ...pre, open: false }))
  }, [])

  const addBookMark = useCallback(() => {
    setEditingId(undefined)
    setModalState({ open: true, status: ModalStatus.Create })
  }, [])

  const handleSettingConfirm = useCallback(
    (data: IBookMark) => {
      handleClose()
      setBookMarks((pre) => {
        if (modalState.status === ModalStatus.Create) {
          return [...pre, data]
        }

        return pre.map((i) => (i.id === data.id ? data : i))
      })
    },
    [handleClose, modalState]
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
      <div
        className={cx(
          inter.className,
          'mt-8 w-full flex flex-col md:flex-row md:flex-wrap md:justify-center'
        )}
      >
        <SortableList
          bookMarks={bookMarks}
          onDragEnd={setBookMarks}
          onSetting={handleSetting}
        />
        <AddingBookMark onClick={addBookMark} />
      </div>
      <SettingModal
        open={modalState.open}
        status={modalState.status}
        onClose={handleClose}
        onConfirm={handleSettingConfirm}
        onRemove={handleSettingRemove}
        value={bookMarks.find((b) => editingId === b.id)}
      />
    </>
  )
}

export default BookMarks
