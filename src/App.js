import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Error, Landing, Register } from './pages'
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
        <Route path='register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
