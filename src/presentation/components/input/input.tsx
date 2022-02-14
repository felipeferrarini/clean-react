import React from 'react'
import styles from './input-styles.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = props => {
  const enableInput: React.FocusEventHandler<HTMLInputElement> = e => {
    e.target.readOnly = false
  }

  return (
    <div className={styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={styles.status}>🔴</span>
    </div>
  )
}
