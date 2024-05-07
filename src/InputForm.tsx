import React, { useState } from 'react'
import { TextField, Button, CircularProgress, Box } from '@mui/material'

interface InputFormProps {
  url: string
}

const InputForm = ({ url }: InputFormProps) => {
  const [messageBody, setMessageBody] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [articleText, setArticleText] = useState('')

  const submitInput = async (e: React.FormEvent) => {
    console.log('IS THS ON')
    e.preventDefault()
    setButtonDisabled(true) // Disable the button during loading
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: articleText,
        }),
      })
      const data = await response.json()
      setMessageBody(data.message || 'Default message')
    } catch (error) {
      console.error('Failed to submit input', error)
    } finally {
      setButtonDisabled(false)
      setArticleText('')
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
          multiline
          type="text"
          value={articleText}
        />
        <Button disabled={buttonDisabled} variant="outlined" type="submit">
          Submit Input
        </Button>
      </form>
      {buttonDisabled && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {messageBody && <h1>{messageBody}</h1>}
    </div>
  )
}

export default InputForm
