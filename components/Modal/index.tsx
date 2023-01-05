import { FC } from 'react'

interface ModalProps {
  children?: React.ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-black/50"></div>
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  )
}

export default Modal
