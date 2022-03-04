import { Validation } from '@/presentation/protocols'

export type FormValues = {
  [field: string]: string
}

export type FormErrors<Values> = {
  [key in keyof Values]: string
}

export type FormProps<Values> = {
  isLoading: boolean
  isValid: boolean
  errors: FormErrors<Values> & { main?: string }
  values: Values
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.ChangeEventHandler<HTMLFormElement>
}

export type FormProviderParams<Values> = {
  validation: Validation
  initialValues: Values
  children: React.ReactNode | ((props: FormProps<Values>) => React.ReactNode)
  handleSubmit: (values: Values) => Promise<void> | void
}
