import React from 'react'
import { useState } from 'react'
import './App.css'
import InputForm from './InputForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <InputForm url={'https://jsonplaceholder.typicode.com/posts/1'} />
    </>
  )
}

export default App
