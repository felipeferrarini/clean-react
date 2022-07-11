import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import faker from 'faker'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('should return EmailValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const validations = ValidationBuilder.field(fieldName).min(5).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)])
  })

  test('should return a list of validations', () => {
    const fieldName = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(fieldName)
      .required()
      .min(length)
      .email()
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, length),
      new EmailValidation(fieldName)
    ])
  })
})
