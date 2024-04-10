import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getProducts } from './api'


function App() {
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts().then(setProducts)
  }, [])
  return (
    <ul>
      {products.map(product => {
        return <li key={product.id}>{product.name}</li>
      })}
    </ul>
  )
}

export default App
