import { Authentication } from '@/domain/usecases'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import { FormContextProvider } from '@/presentation/contexts/form'
import { Validation } from '@/presentation/protocols'
import React, { useCallback } from 'react'
import styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

type FormValues = {
  email: string
  password: string
}

const initalValues: FormValues = {
  email: '',
  password: ''
}

export const Login: React.FC<Props> = ({ validation, authentication }) => {
  const handleSubmit = useCallback(async (values: FormValues) => {
    await authentication.auth(values)
  }, [])

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider
        validation={validation}
        initialValues={initalValues}
        handleSubmit={handleSubmit}
      >
        {({ isValid, isLoading, onSubmit }) => (
          <form className={styles.form} onSubmit={onSubmit}>
            <h2>Login</h2>

            <Input type="email" name="email" placeholder="Your email" />
            <Input
              type="password"
              name="password"
              placeholder="Your password"
            />

            <button
              className={styles.submit}
              type="submit"
              disabled={!isValid || isLoading}
              data-testid="submit"
            >
              Login
            </button>

            <span className={styles.link}>Create an account</span>

            <FormStatus />
          </form>
        )}
      </FormContextProvider>
      <Footer />
    </div>
  )
}
