import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Navbar from '../../components/Navbar'
import { BrowserRouter } from 'react-router-dom'

afterEach(cleanup);

const UI = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
)

describe('<Navbar', () => {
  test('It renders a nav tag with a Navbar class', () => {
    const { container } = render(<UI />)

    expect(container.firstChild.nodeName).toBe('NAV')
    expect(container.firstChild.classList.contains('Navbar')).toBeTruthy()
  })

  test('It renders an h1 tag with the brand text inside an a tag', () => {
    const { getByText } = render(<UI />)
    const brandTextNode = getByText('React Weather')

    expect(brandTextNode.nodeName).toBe('H1')
    expect(brandTextNode.parentNode.nodeName).toBe('A')
  })
})