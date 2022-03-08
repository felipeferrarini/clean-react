import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import React from 'react'
import { Router } from 'react-router-dom'
import { Login } from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory()

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError

  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <Router navigator={history} location="/login">
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'OK!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapperChildCount = (sut: RenderResult, count: number): void => {
  const erroWrapper = sut.getByTestId('error-wrapper')
  expect(erroWrapper.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, elementName: string): void => {
  const el = sut.getByTestId(elementName)
  expect(el).toBeTruthy()
}

const testElementText = (
  sut: RenderResult,
  elementName: string,
  text: string
): void => {
  const el = sut.getByTestId(elementName)
  expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  elementName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(elementName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('Login component', () => {
  beforeEach(() => {
    localStorage.clear()
    cleanup()
  })

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({
      validationError
    })

    testErrorWrapperChildCount(sut, 0)

    testButtonIsDisabled(sut, 'submit', true)

    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
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
    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    testStatusForField(sut, 'password')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    testStatusForField(sut, 'email')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)

    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()

    await act(async () => {
      await simulateValidSubmit(sut)
      await simulateValidSubmit(sut)
    })
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({
      validationError
    })

    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit(sut)

    testElementText(sut, 'main-error', error.message)
    testErrorWrapperChildCount(sut, 1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')

    register.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(history.location.pathname).toBe('/signup')
  })
})
