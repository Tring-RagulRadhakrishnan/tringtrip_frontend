import React from 'react'
import AppRoutes from './routes/AppRoutes'
import {ToastContainer} from "react-toastify"
import Layout from './components/Layout'


function App() {

  return (
    <>
    <ToastContainer autoClose={1900}/>
     <Layout/>
    </>
  )
}

export default App
