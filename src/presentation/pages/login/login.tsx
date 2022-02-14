import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import { FormContextProvider } from '@/presentation/contexts/form'
import React from 'react'
import styles from './login-styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormContextProvider>
        <form className={styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Your email" />
          <Input type="password" name="password" placeholder="Your password" />

          <button
            className={styles.submit}
            type="submit"
            disabled
            data-testid="submit"
          >
            Login
          </button>

          <span className={styles.link}>Create an account</span>

          <FormStatus />
        </form>
      </FormContextProvider>
      <Footer />
    </div>
  )
}
