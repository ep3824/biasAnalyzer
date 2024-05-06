import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

interface InputFormProps {
  url: string
}

const InputForm = ({ url }: InputFormProps) => {
  const [messageBody, setMessageBody] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [articleText, setArticleText] = useState('')

  interface ResponseData {
    body: string
  }

  const submitInput = async () => {
    setButtonDisabled(true) // Disable the button during loading
    try {
      const response = await fetch(url)
      const data: ResponseData = await response.json()
      console.log(data)
      setMessageBody(data.body)
    } catch (error) {
      console.error('Failed to submit input', error)
    } finally {
      setButtonDisabled(false)
    }
  }

  return (
    <div>
      <form autoComplete="off" onSubmit={submitInput}>
        <h2>Article Submission for Bias</h2>
        <TextField
          label="article"
          onChange={(e) => setArticleText(e.target.value)}
          required
          type="text"
          value={articleText}
        />
        <Button disabled={buttonDisabled} variant="outlined" type="submit">
          Submit Input
        </Button>
      </form>
      {messageBody && <h1>{messageBody}</h1>}
    </div>
  )
}

export default InputForm
