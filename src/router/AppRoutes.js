import React from 'react'
import NotFound from '../components/NotFound'
import ItemList from '../components/ItemList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from '../components/NavBar'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<><NavBar /><ItemList /></>} />
        <Route exact path="*" element={<><NavBar /><NotFound /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes