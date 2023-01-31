import { FC } from 'react'
import { useFormState } from 'react-hook-form'
import Footer, { IFooter } from '../../../Modal/Footer'
import { IFormBookMark } from '..'
import { FORM_KEY } from '../constants'

const SettingFooter: FC<IFooter> = (props) => {
  const { isValid } = useFormState<IFormBookMark>({ name: `${FORM_KEY}.link` })
  return <Footer {...props} confirmDisabled={!isValid} />
}

export default SettingFooter
