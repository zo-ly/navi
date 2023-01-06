import React, { CSSProperties, FC } from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

interface ButtonProps {
  type?: 'default' | 'primary'
  danger?: boolean
  block?: boolean
  children?: React.ReactNode
  style?: CSSProperties
}

const Button: FC<ButtonProps> = ({
  children,
  danger,
  block,
  style,
  type = 'default',
}) => {
  return (
    <button
      style={style}
      className={cx(
        'pointer-events-auto transition min-w-[4rem] md:min-w-[6rem] rounded-md py-2 px-5 text-[0.8125rem] font-semibold leading-5 text-center',
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
