import { render } from '@testing-library/react'
import React from 'react'
import { Input } from './input'

describe('Input component', () => {
  test('should Begin with readOnly', () => {
    const { getByTestId } = render(<Input name="field" />)
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
  test('should turn readOnly false on focus', () => {
    const { getByTestId } = render(<Input name="field" />)
    const input = getByTestId('field') as HTMLInputElement
    input.focus()
    expect(input.readOnly).toBe(false)
  })
})
