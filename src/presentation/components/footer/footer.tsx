import React, { memo } from 'react'
import styles from './footer-styles.scss'

export const FooterComponent: React.FC = () => (
  <footer className={styles.footer} />
)

export const Footer = memo(FooterComponent)
