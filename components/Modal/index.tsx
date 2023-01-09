import { FC, useEffect } from 'react'
import { useFadeState, useLockScroll } from '../../utils/hooks'
import Footer, { IFooter } from './Footer'

export interface IModal extends Omit<IFooter, 'onCancel'> {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

const Modal: FC<IModal> = ({
  open,
  children,
  onClose,
  onConfirm,
  onRemove,
  deleteAllowed,
  confirmDisabled,
}) => {
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
              <i
                onClick={onClose}
                style={{ backgroundImage: 'url(/close.svg)' }}
                className="absolute cursor-pointer top-4 right-6 block w-6 h-6 bg-cover md:hover:bg-black/10 rounded-full"
              />
              {children}
            </div>
            <Footer
              onConfirm={onConfirm}
              onCancel={onClose}
              onRemove={onRemove}
              deleteAllowed={deleteAllowed}
              confirmDisabled={confirmDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
