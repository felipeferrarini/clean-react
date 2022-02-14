import { useFormContext } from '@/presentation/contexts/hooks'
import React from 'react'
import { Spinner } from '..'
import styles from './form-status-styles.scss'

export const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useFormContext()

  return (
    <div className={styles.errorWrapper} data-testid="error-wrapper">
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}
