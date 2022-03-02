import { Validation } from '@/presentation/protocols'
import React, { createContext, useState } from 'react'

export type StateProps<T extends object = {}> = {
  isLoading: boolean
  errors: T & { main?: string }
  values: T
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const initialState: StateProps = {
  isLoading: false,
  errors: { main: '' },
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {}
}

export const FormContext = createContext(initialState)

type ProviderProps = {
  validation: Validation
  initialValues: object
}

export const FormContextProvider: React.FC<ProviderProps> = ({
  children,
  validation,
  initialValues
}) => {
  const [state, setState] = useState<StateProps>({
    ...initialState,
    values: initialValues,
    errors: {
      ...Object.keys(initialValues).reduce(
        (errors, key) => ({
          ...errors,
          [key]: initialValues[key] ? '' : 'Required field'
        }),
        initialState.errors
      )
    }
  })

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    const { name, value } = event.target

    setState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value
      }
    }))

    validation.validate(name, value)
  }

  return (
    <FormContext.Provider value={{ ...state, onChange }}>
      {children}
    </FormContext.Provider>
  )
}
