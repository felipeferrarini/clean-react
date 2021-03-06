import { useFormContext } from '@/presentation/contexts/form'
import React from 'react'
import { Spinner } from '..'
import styles from './form-status-styles.scss'

export const FormStatus: React.FC = () => {
  const { isLoading, errors } = useFormContext()

  return (
    <div className={styles.errorWrapper} data-testid="error-wrapper">
      {isLoading && <Spinner className={styles.spinner} />}
      {errors.main && (
        <span data-testid="main-error" className={styles.error}>
          {errors.main}
        </span>
      )}
    </div>
  )
}
