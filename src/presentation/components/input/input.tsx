import { useFormContext } from '@/presentation/contexts/form'
import React from 'react'
import styles from './input-styles.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string
}

export const Input = ({ name = '', ...props }: Props): JSX.Element => {
  const { errors, onChange } = useFormContext()

  const enableInput: React.FocusEventHandler<HTMLInputElement> = (
    event
  ): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    if (errors[name] && errors[name] !== '') {
      return '🔴'
    }

    return '🟢'
  }

  const getTitle = (): string => {
    if (errors[name] && errors[name] !== '') {
      return errors[name]
    }

    return 'OK!'
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        data-testid={name}
        name={name}
        readOnly
        onFocus={enableInput}
        onChange={onChange}
      />
      <span
        title={getTitle()}
        className={styles.status}
        data-testid={`${name}-status`}
      >
        {getStatus()}
      </span>
    </div>
  )
}
