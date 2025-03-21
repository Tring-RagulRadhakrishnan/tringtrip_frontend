import React from 'react'
import AppRoutes from './routes/AppRoutes'
import {ToastContainer} from "react-toastify"


function App() {

  return (
    <>
    <ToastContainer autoClose={1900}/>
     <AppRoutes/>
    </>
  )
}

export default App
