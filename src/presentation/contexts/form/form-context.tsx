import React, { createContext, useState } from 'react'

export type StateProps = {
  isLoading: boolean
  errorMessage?: string
}

const initialState: StateProps = {
  isLoading: false
}

export const FormContext = createContext(initialState)

export const FormContextProvider: React.FC = ({ children }) => {
  const [state, _setState] = useState<StateProps>({
    isLoading: false
  })

  return (
    <FormContext.Provider value={{ ...state }}>{children}</FormContext.Provider>
  )
}
