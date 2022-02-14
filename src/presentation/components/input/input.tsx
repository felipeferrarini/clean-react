import { useFormContext } from '@/presentation/contexts/hooks'
import React from 'react'
import styles from './input-styles.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/prop-types
export const Input: React.FC<Props> = ({ name = '', ...props }) => {
  const { errors } = useFormContext()

  const enableInput: React.FocusEventHandler<HTMLInputElement> = e => {
    e.target.readOnly = false
  }

  const getStatus = (): string => {
    if (errors[name] && errors[name] !== '') {
      return '🔴'
    }

    return '🟢'
  }

  return (
    <div className={styles.inputWrapper}>
      <input {...props} name={name} readOnly onFocus={enableInput} />
      <span
        title={errors[name]}
        className={styles.status}
        data-testid={`${name}-status`}
      >
        {getStatus()}
      </span>
    </div>
  )
}
