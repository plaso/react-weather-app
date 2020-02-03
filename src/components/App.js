import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import '../assets/stylesheets/App.css';
import PlaceDetail from './PlaceDetail';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/place/:name" component={PlaceDetail} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
