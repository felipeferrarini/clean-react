import React, { memo } from 'react'
import { Logo } from '..'
import styles from './login-header-styles.scss'

const LoginHeaderComponent: React.FC = () => (
  <header className={styles.header}>
    <Logo />
    <h1>4Dev - Survey for Develpers</h1>
  </header>
)

export const LoginHeader = memo(LoginHeaderComponent)
