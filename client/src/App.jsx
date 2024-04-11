import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import bookLogo from './assets/books.png'
import Account from './components/Account'
import Books from './components/Books'
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Register';
import SingleBook from './components/SingleBook';
//import TokenContext from './TokenContext';
export const TokenContext = React.createContext();
function App() {
  
  return (
    <>
      <div className='container'>
        <header />

        <h1><img id='logo-image' src={bookLogo} />Library App</h1>

       
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<SingleBook />}  />
              <Route path="/login" element={<Login  />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        
      </div>




    </>
  )
}

export default App
