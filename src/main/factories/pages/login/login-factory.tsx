import { RemoteAuthentication } from '@/data/usecases/authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationBuilder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validation-composite'
import React from 'react'

export const makeLogin = (): JSX.Element => {
  const url = 'http://fordevs.herokuapp.com/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
