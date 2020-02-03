import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getWeatherFromCity } from '../services/WeatherService';
import '../assets/stylesheets/PlaceDetail.css';
import { removeDecimals } from '../helpers/Helper';

const usePlaceWeather = (place) => {
  const [data, setData] = useState(null)
  const unmountRef = useRef(false)

  const fetchPlaceWeather = useCallback(async () => {
    try {
      const result = await getWeatherFromCity(place)

      !unmountRef.current && setData(result)
    } catch(err) {
      throw err
    }
  }, [place])

  useEffect(() => () => unmountRef.current = true, [])

  useEffect(() => { fetchPlaceWeather() }, [fetchPlaceWeather])

  const isLoading = data === null

  return [data, isLoading]
}

const Field = ({ field, value }) => (
  <p><strong>{field}:</strong> {value}</p>
)

const PlaceDetail = () => {
  const [placeData, isLoading] = usePlaceWeather('Madrid')

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