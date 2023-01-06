import { FC } from 'react'
import Button from '../../Button'

const Footer: FC = () => {
  return (
    <div className="flex items-center justify-between bg-gray-50 p-4">
      <Button danger type="primary">
        移除
      </Button>
      <div className="flex flex-1 justify-end items-center">
        <Button>取消</Button>
        <Button type="primary" style={{ marginLeft: 20 }}>
          完成
        </Button>
      </div>
    </div>
  )
}

export default Footer
