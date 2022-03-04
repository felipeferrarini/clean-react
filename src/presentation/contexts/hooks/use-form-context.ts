import { useContext } from 'react'
import { FormContext } from '../form'
import { FormProps } from '../form/types'

export const useFormContext = <T = {}>(): FormProps<T> => {
  const context = useContext(FormContext) as FormProps<T>
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
