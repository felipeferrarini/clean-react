import { render } from '@testing-library/react'
import React from 'react'
import { Login } from './login'

describe('Login component', () => {
  test('should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)

    const erroWrapper = getByTestId('error-wrapper')

    expect(erroWrapper.childElementCount).toBe(0)
  })
})
