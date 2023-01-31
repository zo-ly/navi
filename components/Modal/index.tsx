import React, { FC, useEffect } from 'react'
import { useFadeState, useLockScroll } from '../../utils/hooks'

export interface IModal {
  open?: boolean
  children?: React.ReactNode
  footer?: React.ReactNode
  onClose?: () => void
}

const Modal: FC<IModal> = ({ open, footer, children, onClose }) => {
  const [lock, unlock] = useLockScroll()
  const [display, opacity] = useFadeState(open)

  useEffect(() => {
    open ? lock() : unlock()
  }, [lock, open, unlock])

  return (
    <div className="relative z-50">
      <div
        style={{ opacity, display }}
        className="transition-opacity duration-300"
      >
        <div className="fixed inset-0 bg-black/50"></div>
        <div className="fixed h-full inset-0 flex justify-center items-center px-4">
          <div className="relative w-full max-w-md bg-white rounded-lg overflow-hidden">
            <div className="py-4 px-6">
              <span className="absolute cursor-pointer top-3 right-3 p-1 md:hover:bg-black/10 rounded-full">
                <i
                  onClick={onClose}
                  style={{ backgroundImage: 'url(/close.svg)' }}
                  className="block w-6 h-6 bg-cover"
                />
              </span>
              {children}
            </div>
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
