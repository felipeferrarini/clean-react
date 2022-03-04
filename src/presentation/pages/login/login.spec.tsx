import { ValidationSpy } from '@/presentation/test'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import faker from 'faker'
import React from 'react'
import { Login } from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = ''

    const erroWrapper = sut.getByTestId('error-wrapper')
    expect(erroWrapper.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('OK!')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('OK!')
  })

  test('should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = sut.getByTestId('email') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()

    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  it('Should show email error if validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email') as HTMLInputElement
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('Should show password error if validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('OK!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('OK!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = null

    const emailInput = sut.getByTestId('email') as HTMLInputElement
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
})
