import React from 'react'
import './App.css'
import InputForm from './InputForm'

function App() {
  return (
    <>
      <InputForm url={'http://192.168.70.11:3000/api/analyze'} />
    </>
  )
}

export default App
