import React, { CSSProperties, FC } from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

interface ButtonProps {
  type?: 'default' | 'primary'
  danger?: boolean
  block?: boolean
  children?: React.ReactNode
  style?: CSSProperties
  disabled?: boolean
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  children,
  danger,
  block,
  style,
  disabled,
  onClick,
  type = 'default',
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={cx(
        'pointer-events-auto transition min-w-[5rem] md:min-w-[6rem] rounded-md py-2 px-5 text-[0.8125rem] font-semibold leading-5 text-center disabled:opacity-50',
        {
          [styles.primary]: type === 'primary',
          [styles.default]: type === 'default',
          [styles.danger]: danger,
          [styles.block]: block,
        }
      )}
    >
      {children}
    </button>
  )
}

export default Button
