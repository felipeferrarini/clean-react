import {
  EmailValidation,
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
})
