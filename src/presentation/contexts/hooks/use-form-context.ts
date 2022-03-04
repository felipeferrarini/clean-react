import { useContext } from 'react'
import { FormContext, StateProps } from '../form'

export const useFormContext = <T = {}>(): StateProps<T> => {
  const context = useContext(FormContext) as StateProps<T>
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
