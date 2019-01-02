import React, { Component } from 'react'
import Row from 'react-bootstrap/lib/Row'
import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import P5Wrapper from 'sketches/P5Wrapper'
import tableSketch from 'sketches/tableSketch'
import 'components/App.css'

class App extends Component {
  state = {
    numActivePlayers: 0,
  }

  addPlayer = () => {
    if (this.state.numActivePlayers > 5) return
    this.setState({
      numActivePlayers: this.state.numActivePlayers + 1,
    })
  }

  render() {
    return (
      <div className="App">
        <Row className="show-grid">
          <Col id="table-sketch-col" xs={12} md={8}>
            <P5Wrapper
              numActivePlayers={this.state.numActivePlayers}
              sketch={tableSketch}
            />
          </Col>
          <Col id="settings-col" xs={12} md={4}>
            <Button type="primary" onClick={this.addPlayer}>
              Add Player
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
