import { Footer, Input, LoginHeader, Spinner } from '@/presentation/components'
import React from 'react'
import styles from './login-styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />
      <form className={styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Your email" />
        <Input type="password" name="password" placeholder="Your password" />

        <button className={styles.submit} type="submit">
          Login
        </button>

        <span className={styles.link}>Create an account</span>

        <div className={styles.errorWrapper}>
          <Spinner className={styles.spinner} />
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
