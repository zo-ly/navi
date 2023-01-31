import { FC, ReactNode, useCallback, useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import Input from '../../Input'
import Modal, { IModal } from '../../Modal'
import { IBookMark } from '../interface'
import { FORM_KEY, LABEL_GROUP } from './constants'
import SettingFooter from './SettingFooter'

interface ISettingModal extends Omit<IModal, 'onConfirm' | 'onRemove'> {
  title?: ReactNode
  value?: IBookMark
  onConfirm?: (v: IBookMark) => void
  onRemove?: (v: IBookMark) => void
}

export interface IFormBookMark {
  [FORM_KEY]?: IBookMark
}

const SettingModal: FC<ISettingModal> = ({
  open,
  title,
  value,
  onConfirm,
  onRemove,
  onClose,
}) => {
  const methods = useForm<IFormBookMark>({
    mode: 'onChange',
    defaultValues: { bookMark: { name: '', link: '' } },
  })
  const { setValue, handleSubmit, clearErrors, reset } = methods

  useEffect(() => {
    if (!open) return
    clearErrors()
    value ? setValue(FORM_KEY, value) : reset()
  }, [value, open, setValue, clearErrors, reset])

  const onSubmit = useCallback(
    async (data: IFormBookMark) => {
      if (!data.bookMark?.link) return
      onConfirm?.(data.bookMark)
    },
    [onConfirm]
  )

  const handleRemove = useCallback(() => {
    if (!value?.id) return
    onRemove?.(value)
  }, [onRemove, value])

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        onClose={onClose}
        footer={
          <SettingFooter
            onConfirm={handleSubmit(onSubmit)}
            onRemove={handleRemove}
            onCancel={onClose}
            deleteAllowed={!!value?.id}
          />
        }
      >
        <div>
          <h1 className="font-bold text-lg">{title}</h1>
          <div className="mt-2">
            {LABEL_GROUP.map(({ label, name, rules }) => (
              <Controller
                key={name}
                rules={rules}
                name={`${FORM_KEY}.${name}`}
                render={({ field, fieldState }) => {
                  return (
                    <Input {...field} error={fieldState.error} label={label} />
                  )
                }}
              />
            ))}
          </div>
        </div>
      </Modal>
    </FormProvider>
  )
}

export default SettingModal
