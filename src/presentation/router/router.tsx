import '@/presentation/styles/global.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: () => JSX.Element
}

export const Router = ({ makeLogin: MakeLogin }: Props): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
