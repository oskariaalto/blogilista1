import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'Hjeissan',
    author: 'Osakri',
    likes: 0,
    url: 'heippa.fi',
    user:{
      name: 'Oskari'
    }
  }

  const likeHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog blog = {blog} addLike={likeHandler} />
    ).container
  })

  test('renders title', async () => {
    const div = container.querySelector('.showContent')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking show works', async () => {

    const user = userEvent.setup()

    const button =  screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.showContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button works', async () => {
    const user = userEvent.setup()

    const button =  screen.getByText('like')
    await user.dblClick(button)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})



