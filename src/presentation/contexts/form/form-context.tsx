import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { FormErrors, FormProps, FormProviderParams, FormValues } from './types'

const initialState: FormProps<any> = {
  isLoading: false,
  isValid: false,
  errors: { main: '' },
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit: () => {}
}

export const FormContext = createContext(initialState)

export const FormContextProvider = <Values extends FormValues = FormValues>({
  children,
  validation,
  initialValues,
  handleSubmit
}: FormProviderParams<Values>): JSX.Element => {
  const [state, setState] = useState<FormProps<Values>>({
    ...initialState,
    values: initialValues
  })

  useEffect(() => {
    setState(prev => ({
      ...prev,
      errors: {
        ...Object.keys(initialValues).reduce(
          (errors, key) => ({
            ...errors,
            [key]: validation.validate(key, initialValues[key])
          }),
          prev.errors as FormErrors<Values>
        )
      }
    }))
  }, [])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event): void => {
      const { name, value } = event.target

      setState(prev => {
        const values = { ...prev.values, [name]: value }
        const errors = {
          ...prev.errors,
          [name]: validation.validate(name, value)
        }
        const isValid = Object.keys(errors).reduce(
          (isValid, key) => isValid && !errors[key],
          true
        )

        return {
          ...prev,
          values,
          errors,
          isValid
        }
      })
    },
    [validation]
  )

  const onSubmit = useCallback<React.ChangeEventHandler<HTMLFormElement>>(
    async e => {
      e.preventDefault()
      try {
        if (state.isLoading || !state.isValid) return

        setState(prev => ({ ...prev, isLoading: true }))
        await handleSubmit(state.values)
        setState(prev => ({ ...prev, isLoading: false }))
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          errors: { ...prev.errors, main: error.message }
        }))
      }
    },
    [state.values, state.isLoading, state.isValid, handleSubmit]
  )

  return (
    <FormContext.Provider value={{ ...state, onChange, onSubmit }}>
      {children instanceof Function &&
        children({ ...state, onChange, onSubmit })}
    </FormContext.Provider>
  )
}

export const useFormContext = <T extends {} = {}>(): FormProps<T> => {
  return useContext(FormContext) as FormProps<T>
}
