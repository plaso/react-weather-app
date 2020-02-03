import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Home = () => {
  const [search, setSearch] = useState('')

  const { push } = useHistory()

  const handleChange = (e) => {
    const { value } = e.target

    setSearch(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    push(`/place/${search}`)
  }

  return (
    <div className="Home">
      <form onSubmit={handleSubmit}>
        <input value={search} onChange={handleChange} />
      </form>
    </div>
  );
};

export default Home;