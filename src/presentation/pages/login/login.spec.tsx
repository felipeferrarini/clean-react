import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
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
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)

  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'OK!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({
      validationError
    })

    const erroWrapper = sut.getByTestId('error-wrapper')
    expect(erroWrapper.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(sut, 'email', validationError)

    simulateStatusForField(sut, 'password', validationError)
  })

  test('should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    populateEmailField(sut, email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()

    populatePasswordField(sut, password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({
      validationError
    })

    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })
})
