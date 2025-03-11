import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import {Routes , Route} from "react-router-dom"
import { MainPage } from './pages/mainPage.tsx'
import { StorePage } from './pages/storePage.tsx'
import { AboutPage } from './pages/aboutPage.tsx'

import { HeaderNavBar } from './components/HeaderNavBar.tsx'
import { Container } from 'react-bootstrap'
import { ShoppingCartContextProvider } from './context/ShoppingCartContext.tsx'

function App() {
  
  return (
    <ShoppingCartContextProvider>
      <HeaderNavBar/>
      <Container>
        <Routes>
          <Route path='/' element={ <MainPage /> } />
          <Route path='/about' element={ <AboutPage /> } />
          <Route path='/store' element={ <StorePage /> } />
        </Routes>
      </Container>
    </ShoppingCartContextProvider>
  )
}

export default App
