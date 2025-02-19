import { useState } from 'react'
import './App.css'
import { fetchAllProducts } from './services/Api'
import Nav from './components/Nav/Nav'
import Home from './routes/Home/Home'


function App() {
  const handleOnClick = () => {
    fetchAllProducts().then((res) => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <Home/>
     
    </div>
  )
}

export default App
