import { FC, useCallback, useEffect, useRef, useState } from 'react'
import AddingBookMark from './AddingBookMark'
import { IBookMark } from './interface'
import SettingModal from './SettingModal'
import SortableList from './SortableList'
import { getStorage, setStorage } from './helper'

enum ModalStatus {
  Create,
  Edit,
}

const createBookMark = (bookMark: Omit<IBookMark, 'id'>): IBookMark => {
  return { ...bookMark, id: String(Date.now()) }
}

const BookMarks: FC = () => {
  const enableCache = useRef(false)
  const [bookMarks, setBookMarks] = useState<Array<IBookMark>>([])
  const [editingId, setEditingId] = useState<string>()
  const [modalState, setModalState] = useState({
    open: false,
    status: ModalStatus.Create,
  })

  useEffect(() => {
    const bookMarks = getStorage() || []
    setBookMarks(bookMarks)
    setTimeout(() => (enableCache.current = true))
  }, [])

  useEffect(() => {
    if (!enableCache.current) return
    setStorage(bookMarks)
  }, [bookMarks])

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

  const handleCreateBookMark = useCallback(async (data: IBookMark) => {
    const bookMark = await createBookMark(data)
    setBookMarks((pre) => [...pre, bookMark])
  }, [])

  const handleSettingConfirm = useCallback(
    (data: IBookMark) => {
      handleClose()
      if (modalState.status === ModalStatus.Create) {
        handleCreateBookMark(data)
        return
      }
      setBookMarks((pre) => pre.map((i) => (i.id === data.id ? data : i)))
    },
    [handleClose, handleCreateBookMark, modalState.status]
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
      <div className="w-full flex flex-col md:flex-row md:flex-wrap md:justify-center">
        <SortableList
          bookMarks={bookMarks}
          onDragEnd={setBookMarks}
          onSetting={handleSetting}
        />
        <AddingBookMark onClick={addBookMark} />
      </div>
      <SettingModal
        open={modalState.open}
        title={`${
          modalState.status === ModalStatus.Create ? '添加' : '修改'
        }快捷方式`}
        onClose={handleClose}
        onConfirm={handleSettingConfirm}
        onRemove={handleSettingRemove}
        value={bookMarks.find((b) => editingId === b.id)}
      />
    </>
  )
}

export default BookMarks
