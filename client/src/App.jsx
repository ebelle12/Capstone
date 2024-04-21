import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from './components/Account'
import Books from './components/Books'
import Checkout from './components/Checkout'
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Form from './components/Register';
import SingleBook from './components/SingleBook';
import './App.css';
//import TokenContext from './TokenContext';
export const TokenContext = React.createContext();
function App() {
  const [user, setUser] = useState(false);

  return (
    <>
      <div className='container'>
        <BrowserRouter>
          <Navigation cartItems="2" setUser={setUser} user={user} />
          <main>
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<SingleBook user={user} />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Books />} />
            </Routes>
          
          </main>
        </BrowserRouter>
      </div>




    </>
  )
}

export default App
