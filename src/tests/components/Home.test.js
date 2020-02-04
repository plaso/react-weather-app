import React from 'react'
import { useLocation, MemoryRouter } from 'react-router-dom'
import { cleanup, render, fireEvent, wait } from '@testing-library/react'
import Home from '../../components/Home'

afterEach(cleanup)

const UI = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Home />
      <LocationDisplay />
    </MemoryRouter>
  )
};

const LocationDisplay = () => {
  const { pathname } = useLocation()
  return (<p data-testid="location">{pathname}</p>)
}

describe('Home', () => {
  test('It renders a div with Home className', () => {
    const { container } = render(<UI />)

    expect(container.firstChild.nodeName).toBe('DIV')
    expect(container.firstChild.classList.contains('Home')).toBeTruthy()
  })

  test('It renders a form with an input and a submit button', () => {
    const { getByTestId, getByText } = render(<UI />)

    const input = getByTestId('search')
    expect(input.nodeName).toBe('INPUT')
    expect(input.parentNode.nodeName).toBe('FORM')
    
    const button = getByText('Search')
    expect(button.nodeName).toBe('BUTTON')
    expect(button.getAttribute('type')).toBe('submit')
    expect(button.parentNode.nodeName).toBe('FORM')
  })

  test('Firing an onChange event at input, will change its value', async () => {
    const { getByTestId } = render(<UI />)

    const input = getByTestId('search')
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'madrid' } })

    await wait(() => expect(input.value).toBe('madrid'))
  })

  test('After setting a value, onSubmit will redirect to "/place/:value"', async() => {
    const { getByTestId, getByText } = render(<UI />)

    expect(getByTestId('location').textContent).toBe('/')

    const input = getByTestId('search')
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'madrid' } })

    await wait(() => expect(input.value).toBe('madrid'))

    const button = getByText('Search')
    fireEvent.click(button)

    expect(getByTestId('location').textContent).toBe('/place/madrid')
  })
})