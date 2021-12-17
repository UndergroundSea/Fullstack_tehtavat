import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'best author',
    url: 'randomurl',
    likes: 10
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
    likes: 10
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
    likes: 10
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).not.toHaveTextContent(
    'randomurl'
  )

  expect(component.container).not.toHaveTextContent(
    10
  )
})