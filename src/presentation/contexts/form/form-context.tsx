import React, { createContext, useState } from 'react'

type errors = {
  email?: string
  password?: string
  main?: string
}

export type StateProps = {
  isLoading: boolean
  errors: errors
}

const initialState: StateProps = {
  isLoading: false,
  errors: {
    email: 'Required field',
    password: 'Required field'
  }
}

export const FormContext = createContext(initialState)

export const FormContextProvider: React.FC = ({ children }) => {
  const [state, _setState] = useState<StateProps>(initialState)

  return (
    <FormContext.Provider value={{ ...state }}>{children}</FormContext.Provider>
  )
}
