import {
  ChangeEvent,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Input from '../../Input'
import Modal, { IModal } from '../../Modal'
import { IBookMark } from '../interface'

interface ISettingModal extends Omit<IModal, 'onConfirm' | 'onRemove'> {
  title?: ReactNode
  value?: IBookMark
  onConfirm?: (v: IBookMark) => void
  onRemove?: (v: IBookMark) => void
}

const SettingModal: FC<ISettingModal> = ({
  open,
  title,
  value,
  onConfirm,
  onRemove,
  onClose,
}) => {
  const [bookMark, setBookMark] = useState<IBookMark>()

  useEffect(() => {
    if (!open) return
    setBookMark(value)
  }, [value, open])

  const handleChange = useCallback(
    (key: 'name' | 'link') => (e: ChangeEvent<HTMLInputElement>) => {
      setBookMark((pre) => ({ ...pre!, [key]: e.target.value }))
    },
    []
  )

  const handleConfirm = useCallback(async () => {
    if (!bookMark?.link) return
    onConfirm?.(bookMark)
  }, [bookMark, onConfirm])

  const handleRemove = useCallback(() => {
    if (!bookMark?.id) return
    onRemove?.(bookMark)
  }, [bookMark, onRemove])

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      onRemove={handleRemove}
      deleteAllowed={!!bookMark?.id}
      confirmDisabled={!bookMark?.link}
    >
      <div>
        <h1 className="font-bold text-lg">{title}</h1>
        <div className="mt-2">
          {LABEL_GROUP.map(({ key, name }) => (
            <Input
              key={key}
              label={name}
              value={bookMark?.[key] || ''}
              onChange={handleChange(key)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

const LABEL_GROUP: Array<{ name: string; key: 'name' | 'link' }> = [
  {
    name: '输入书签名称',
    key: 'name',
  },
  {
    name: '输入书签网址',
    key: 'link',
  },
]

export default SettingModal
