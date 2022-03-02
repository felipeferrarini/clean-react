import { Validation } from '@/presentation/protocols'
import React, { createContext, useEffect, useState } from 'react'

type errors = {
  email?: string
  password?: string
  main?: string
}

type values = {
  email?: string
}

export type StateProps = {
  isLoading: boolean
  errors: errors
  values: values
  setState: React.Dispatch<React.SetStateAction<StateProps>>
}

const initialState: StateProps = {
  isLoading: false,
  errors: {
    email: 'Required field',
    password: 'Required field'
  },
  values: {
    email: ''
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: () => {}
}

export const FormContext = createContext(initialState)

type ProviderProps = {
  validation: Validation
}

export const FormContextProvider: React.FC<ProviderProps> = ({
  children,
  validation
}) => {
  const [state, setState] = useState<StateProps>(initialState)

  useEffect(() => {
    validation.validate({ email: state.values.email })
  }, [state.values.email])

  return (
    <FormContext.Provider value={{ ...state, setState }}>
      {children}
    </FormContext.Provider>
  )
}
