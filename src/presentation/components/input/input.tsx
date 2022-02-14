import React from 'react'
import styles from './input-styles.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = props => {
  return (
    <div className={styles.inputWrapper}>
      <input {...props} />
      <span className={styles.status}>🔴</span>
    </div>
  )
}
