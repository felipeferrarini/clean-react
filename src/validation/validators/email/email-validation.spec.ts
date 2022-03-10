import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return false if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
