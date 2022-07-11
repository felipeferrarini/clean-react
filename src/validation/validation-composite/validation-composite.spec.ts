import { FieldValidationSpy } from '@/validation/test'
import faker from 'faker'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpies)
  return {
    sut,
    fieldValidationsSpies
  }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpies } = makeSut(fieldName)
    const errorMessage = faker.random.words()

    fieldValidationsSpies[0].error = new Error(errorMessage)
    fieldValidationsSpies[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  it('Should returns falsy if there is no error', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
