import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputForm from '../src/InputForm'

test('submits data and displays result', async () => {
  const mockResponse = { message: 'Response from server' }

  // Mock the fetch function to return the desired response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    }),
  ) as jest.Mock

  render(<InputForm url="http://localhost:3000/api/analyze" />)

  // Simulate entering text in the TextField
  const articleTextField = screen.getByLabelText('article', { exact: false })
  await userEvent.type(articleTextField, 'Test input')

  // Click the "Submit Input" button, wrapping in act
  const submitButton = screen.getByRole('button', { name: /submit input/i })
  await act(async () => {
    await userEvent.click(submitButton)
  })

  // Wait for the fetch to complete and the message to be updated
  await waitFor(() => {
    // Ensure fetch was called with the right parameters
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/analyze',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'Test input' }),
      }),
    )

    // Check that the message is displayed correctly
    expect(screen.getByText(mockResponse.message)).toBeInTheDocument()
  })
})
