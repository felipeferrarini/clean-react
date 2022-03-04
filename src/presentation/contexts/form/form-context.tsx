import { Validation } from '@/presentation/protocols'
import React, { createContext, useCallback, useEffect, useState } from 'react'

type FormValues = {
  [field: string]: string
}

type FormErrors<Values> = {
  [key in keyof Values]: string
}

export type StateProps<Values> = {
  isLoading: boolean
  isValid: boolean
  errors: FormErrors<Values> & { main?: string }
  values: Values
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const initialState: StateProps<any> = {
  isLoading: false,
  isValid: false,
  errors: { main: '' },
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {}
}

export const FormContext = createContext(initialState)

type ProviderProps<Values> = {
  validation: Validation
  initialValues: Values
  children: React.ReactNode | ((props: StateProps<Values>) => React.ReactNode)
}

export const FormContextProvider = <Values extends FormValues = FormValues>({
  children,
  validation,
  initialValues
}: ProviderProps<Values>): JSX.Element => {
  const [state, setState] = useState<StateProps<Values>>({
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

  return (
    <FormContext.Provider value={{ ...state, onChange }}>
      {children instanceof Function
        ? children({ ...state, onChange })
        : children}
    </FormContext.Provider>
  )
}
