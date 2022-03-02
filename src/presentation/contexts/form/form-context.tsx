import { Validation } from '@/presentation/protocols'
import React, { createContext, useEffect, useState } from 'react'

export type StateProps<T extends object = {}> = {
  isLoading: boolean
  errors: T & { main?: string }
  values: T
  setState: React.Dispatch<React.SetStateAction<StateProps>>
}

const initialState: StateProps = {
  isLoading: false,
  errors: { main: '' },
  values: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setState: () => {}
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
        {}
      ),
      main: ''
    }
  })

  console.log(state)

  useEffect(() => {
    validation.validate({ ...state.values })
  }, [state.values])

  return (
    <FormContext.Provider value={{ ...state, setState }}>
      {children}
    </FormContext.Provider>
  )
}
