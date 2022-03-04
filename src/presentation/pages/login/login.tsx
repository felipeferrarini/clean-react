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
}

export const Login: React.FC<Props> = ({ validation }) => {
  const handleSubmit = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }, [])

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider
        validation={validation}
        initialValues={{
          email: '',
          password: ''
        }}
        handleSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }}
      >
        {({ isValid, onSubmit }) => (
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
              disabled={!isValid}
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
