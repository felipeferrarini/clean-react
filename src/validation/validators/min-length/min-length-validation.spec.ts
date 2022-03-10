import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength)

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const sut = makeSut(5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if value is valid', () => {
    const sut = makeSut(5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
