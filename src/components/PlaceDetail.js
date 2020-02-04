import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getWeatherFromCity } from '../services/WeatherService';
import { removeDecimals } from '../helpers/Helper';
import '../assets/stylesheets/PlaceDetail.css';

const usePlaceWeather = (place) => {
  const { push } = useHistory()
  const [data, setData] = useState(null)
  const unmountRef = useRef(false)

  const fetchPlaceWeather = useCallback(async () => {
    try {
      const result = await getWeatherFromCity(place)

      !unmountRef.current && setData(result)
    } catch(err) {
      if (err.response && err.response.status === 404) {
        push('/')
      }
      throw err
    }
  }, [place, push])

  useEffect(() => () => unmountRef.current = true, [])

  useEffect(() => { fetchPlaceWeather() }, [fetchPlaceWeather])

  const isLoading = data === null

  return [data, isLoading]
}

const Field = ({ field, value }) => (
  <p><strong>{field}:</strong> {value}</p>
)

const PlaceDetail = () => {
  const { name } = useParams()
  const [placeData, isLoading] = usePlaceWeather(name)

  return (
    <div className="PlaceDetail">
      {isLoading
        ? <p>Cargando...</p>
        : (
          <React.Fragment>
            <div className="block">
              <h1>{placeData.name}</h1>
            </div>
            <hr />
            <div className="main-info block">
              <div className="temperature">
                <p>
                  {removeDecimals(placeData.main.temp)}º
                </p>
                <div className="description">
                  <p>{placeData.weather[0].description}</p>
                </div>
              </div>
              <div>
                <img src={`http://openweathermap.org/img/wn/${placeData.weather[0].icon}@2x.png`} alt="icon" />
              </div>
            </div>
            <hr />
            <div>
              <Field field="Min" value={`${removeDecimals(placeData.main.temp_min)}º`} />
              <Field field="Max" value={`${removeDecimals(placeData.main.temp_max)}º`} />
              <Field field="Real feel" value={`${removeDecimals(placeData.main.feels_like)}º`} />
              <Field field="Humidity" value={`${placeData.main.humidity}%`} />
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default PlaceDetail;