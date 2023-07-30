import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> updates when sumbmitted', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const user = userEvent.setup()

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const createButton = screen.getByText('create')

  await user.type(title, 'Hoi')
  await user.type(author, 'Mato')
  await user.type(url, 'hei.fi')
  await user.click(createButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Hoi')
  expect(createBlog.mock.calls[0][0].author).toBe('Mato')
  expect(createBlog.mock.calls[0][0].url).toBe('hei.fi' )
})
