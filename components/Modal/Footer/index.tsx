import { FC } from 'react'
import Button from '../../Button'

export interface IFooter {
  onCancel?: Callback
  onRemove?: Callback
  onConfirm?: Callback
  deleteAllowed?: boolean
  confirmDisabled?: boolean
}

type Callback = () => void

const Footer: FC<IFooter> = ({
  onCancel,
  onConfirm,
  onRemove,
  deleteAllowed,
  confirmDisabled,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4">
      {deleteAllowed && (
        <Button onClick={onRemove} danger type="primary">
          移除
        </Button>
      )}
      <div className="flex flex-1 justify-end items-center">
        <Button onClick={onCancel}>取消</Button>
        <Button
          type="primary"
          onClick={onConfirm}
          disabled={confirmDisabled}
          style={{ marginLeft: 20 }}
        >
          完成
        </Button>
      </div>
    </div>
  )
}

export default Footer
