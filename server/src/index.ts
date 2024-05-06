import express, { Request, Response } from 'express'
import cors from 'cors'
import OpenAI from 'openai'
import 'dotenv/config'

const app = express()
//Change this later
app.use(cors({ origin: '*', credentials: true }))
const port = 3000

const openai = new OpenAI()

async function getAICompletion() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  })

  console.log(completion.choices[0])
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!')
})

app.post('/api/analyze', (req: Request, res: Response) => {
  try {
    // getAICompletion()
    res.send({ message: 'Status is ok', body: 'im the body' })
  } catch (err) {
    console.error('Error analyzing: ', err)
    res.status(500).send('Error anlayzing text')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
