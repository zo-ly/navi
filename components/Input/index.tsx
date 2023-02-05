import { FieldError } from 'react-hook-form'
import { ChangeEvent, FC, forwardRef, useState } from 'react'
import cx from 'classnames'
import styles from './index.module.scss'

interface InputProps {
  label: string
  value?: string
  error?: FieldError
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
}
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ value, error, label, onChange, onBlur }, ref) => {
    const [focused, setFocused] = useState(false)
    const showError = !focused && error
    const labelDisplay = label.split('')
    return (
      <div
        className={cx('relative py-3 mb-2 md:max-w-sm', {
          [styles.error]: showError,
        })}
      >
        <input
          ref={ref}
          required
          type="text"
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          onFocus={() => setFocused(true)}
          className={cx(
            styles.input,
            'block pb-1 pt-2 pl-1 w-full border-b-2 border-solid border-slate-800 focus:outline-none text-slate-900'
          )}
        />
        <span
          className={cx(
            styles.bar,
            'relative block w-full before:left-1/2 after:right-1/2'
          )}
        ></span>
        <label className="absolute text-sm text-neutral-400 pointer-events-none flex left-1 top-4">
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
        {showError && (
          <div className="text-sm text-red-500">{error.message}</div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
