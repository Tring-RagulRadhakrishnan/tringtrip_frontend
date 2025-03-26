import React from 'react'
import { Routes } from 'react-router-dom'
import AppRoutes from '../routes/AppRoutes'
import Header from './header/Header'

const Layout = () => {
  return (
    <div>
        <Header/>
        <AppRoutes/></div>
  )
}

export default Layout