import React from 'react'
import styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

// eslint-disable-next-line react/prop-types
export const Spinner: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={`${styles.spinner} ${className}`} {...props}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
