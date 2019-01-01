import React, { Component } from 'react'
import 'components/App.css'
import Button from 'react-bootstrap/lib/Button'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>{' '}
      </div>
    )
  }
}

export default App
