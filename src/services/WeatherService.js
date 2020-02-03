import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5'
})

export const getWeatherFromCity = (city) => http.get(`/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`).then(response => response.data)