import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import PlaceDetail from '../../components/PlaceDetail'
import * as WeatherService from '../../services/WeatherService'

afterEach(cleanup)

const UI = () => (
  <MemoryRouter initialEntries={['/place/madrid']}>
    <PlaceDetail />
    <LocationDisplay />
  </MemoryRouter>
)

const LocationDisplay = () => {
  const { pathname } = useLocation()
  return (<p data-testid="location">{pathname}</p>)
}

describe('PlaceDetail', () => {
  test(
    'It renders PlaceDetail with a loading state, after fetching data, it renders the content',
    async () => {
      WeatherService.getWeatherFromCity = jest.fn().mockImplementation(() => Promise.resolve({
        name: 'Madrid',
        main: {
          temp: 20,
          temp_min: 10,
          temp_max: 30,
          feels_like: 18,
          humidity: 10
        },
        weather: [{
          description: 'description',
          icon: 'icon'
        }]
      }))

      const { container, queryByText } = render(<UI />)

      expect(container.firstChild.classList.contains('PlaceDetail')).toBeTruthy()
      expect(container.firstChild.nodeName).toBe('DIV')

      expect(queryByText('Cargando...')).not.toBeNull()

      await wait(() => expect(queryByText('Cargando...')).toBeNull())
    }
  )

  test('It change route to "/" if it returns a 404 status', async () => {
    WeatherService.getWeatherFromCity = jest.fn().mockImplementation(() => Promise.reject({ response: { status: 404 } }))

    const { getByTestId, queryByText } = render(<UI />)

    expect(getByTestId('location').textContent).toBe('/place/madrid')

    expect(queryByText('Cargando...')).not.toBeNull()

    await wait(() => expect(getByTestId('location').textContent).toBe('/'))
  })
})