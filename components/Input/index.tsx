import { FC } from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

interface InputProps {
  label: string
}

const Input: FC<InputProps> = ({ label }) => {
  const labelDisplay = label.split('')
  return (
    <div className="relative py-3 mb-2 md:max-w-sm">
      <input
        required
        type="text"
        className={cx(
          styles.input,
          'block pb-1 pt-2 pl-1 w-full border-b border-solid border-neutral-800 focus:outline-none'
        )}
      />
      <span
        className={cx(
          styles.bar,
          'relative block w-full before:left-1/2 after:right-1/2'
        )}
      ></span>
      <label className="absolute text-lg text-neutral-400 pointer-events-none flex left-1 top-4">
        {labelDisplay.map((l, idx) => (
          <span
            key={idx}
            className={cx(styles.char, 'transition translate-y')}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {l}
          </span>
        ))}
      </label>
    </div>
  )
}

export default Input
