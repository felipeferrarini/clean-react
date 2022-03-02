import { useFormContext } from '@/presentation/contexts/hooks'
import React from 'react'
import styles from './input-styles.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/prop-types
export const Input: React.FC<Props> = ({ name = '', ...props }) => {
  const { errors, setState } = useFormContext()

  const enableInput: React.FocusEventHandler<HTMLInputElement> = (
    event
  ): void => {
    event.target.readOnly = false
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    setState(prev => ({
      ...prev,
      values: {
        [event.target.name]: event.target.value
      }
    }))
  }

  const getStatus = (): string => {
    if (errors[name] && errors[name] !== '') {
      return '🔴'
    }

    return '🟢'
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        data-testid={name}
        name={name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
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
