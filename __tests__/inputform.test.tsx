import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import InputForm from '../src/InputForm'

test('loads and displays body of data from fetch', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ body: 'I am data body' }),
    }),
  ) as jest.Mock

  render(<InputForm url="/greeting" />)

  // Click the "Submit Input" button
  await userEvent.click(screen.getByText('Submit Input'))

  expect(await screen.findByRole('heading')).toHaveTextContent('I am data body')

  // Ensure the button is enabled after fetching the data
  expect(screen.getByRole('button')).toBeEnabled()
})
