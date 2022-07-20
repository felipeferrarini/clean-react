import { Router } from '@/presentation/router'
import React from 'react'
import ReactDOM from 'react-dom'
import { makeLogin } from './factories/pages'

ReactDOM.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('root')
)
