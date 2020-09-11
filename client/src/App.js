import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Navbar from './components/navbar/Navbar'

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
