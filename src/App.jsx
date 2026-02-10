import React from 'react'
import Register from '../Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Login'
import { Provider } from 'react-redux'
import { store } from '../store'
import Product from '../Product'

const App = () => {
  return (
    <div>
      <Provider store={store}>

        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product />} />

          </Routes>
        </BrowserRouter>
      </Provider>

    </div>
  )
}

export default App