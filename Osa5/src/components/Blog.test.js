import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'best author',
    url: 'randomurl',
    likes: 10,
    user: {
      name: 'Rick Astley'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const element = component.getByText(
    'Component testing is done with react-testing-library best author'
  )
  expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('renders url', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'best author',
    url: 'randomurl',
    likes: 10,
    user: {
      name: 'Rick Astley'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'best author'
  )

  const element = component.getByText(
    'Component testing is done with react-testing-library best author'
  )
  expect(element).toBeDefined()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'best author'
  )
})

test('doesnt render url or likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'best author',
    url: 'randomurl',
    likes: 10,
    user: {
      name: 'Rick Astley'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.hiddenContent')
  expect(div).toHaveStyle('display: none')
})

test('renders url or likes when button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'best author',
    url: 'randomurl',
    likes: 10,
    user: {
      name: 'Rick Astley'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.hiddenContent')
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')
  expect(component.container).toHaveTextContent('randomurl')
  expect(component.container).toHaveTextContent(10)
})