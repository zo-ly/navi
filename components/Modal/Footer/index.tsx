import { FC } from 'react'
import Button from '../../Button'

interface Actions {
  onCancel?: Callback
  onRemove?: Callback
  onConfirm?: Callback
}

type Callback = () => void

const Footer: FC<Actions> = ({ onCancel, onConfirm, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4">
      <Button onClick={onRemove} danger type="primary">
        移除
      </Button>
      <div className="flex flex-1 justify-end items-center">
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onConfirm} type="primary" style={{ marginLeft: 20 }}>
          完成
        </Button>
      </div>
    </div>
  )
}

export default Footer
