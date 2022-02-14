import { useContext } from 'react'
import { FormContext, StateProps } from '../form'

export const useFormContext = (): StateProps => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
