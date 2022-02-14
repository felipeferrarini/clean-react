import { render } from '@testing-library/react'
import React from 'react'
import { Login } from './login'

describe('Login component', () => {
  test('should start with initial state', () => {
    const { getByTestId } = render(<Login />)

    const erroWrapper = getByTestId('error-wrapper')

    expect(erroWrapper.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)
  })
})
