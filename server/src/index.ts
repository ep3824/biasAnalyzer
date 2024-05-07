import express, { Request, Response } from 'express'
import cors from 'cors'
import OpenAI from 'openai'
import 'dotenv/config'

const app = express()
//Change this later
app.use(cors({ origin: '*', credentials: true }))
const port = 3000

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.use(express.json())

async function getAIResponse(prompt: string) {
  console.log('prompt in getAI ', prompt)
  if (!prompt) {
    throw new Error('Prompt cannot be empty')
  }
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })

    // Handle response
    console.log(response.choices[0].message.content)
    return response.choices[0].message.content
  } catch (error) {
    console.error(error)
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!')
})

app.post('/api/analyze', async (req: Request, res: Response) => {
  console.log('req body in POST route ', req.body)

  try {
    // getAICompletion()
    // res.send({ message: 'Status is ok', body: 'im the body' })
    const response = await getAIResponse(req.body.prompt)
    res.send({ message: response })
  } catch (err) {
    console.error('Error analyzing: ', err)
    res.status(500).send('Error anlayzing text')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
