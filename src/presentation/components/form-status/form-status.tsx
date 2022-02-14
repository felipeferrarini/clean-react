import React from 'react'
import { Spinner } from '..'
import styles from './form-status-styles.scss'

export const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrapper}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>Error</span>
    </div>
  )
}
