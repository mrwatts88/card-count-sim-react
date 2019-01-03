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
            <div id="table-canvas-wrapper">
              <P5Wrapper gameState={gameState} sketch={tableSketch} />
            </div>
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

const gameState = {
  numPlayers: 2,
  ruleSet: { h17: true },
  roundIsOver: false,
  activePlayers: {
    '1': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
    '2': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
    '3': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
    '4': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
    '5': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
    '6': {
      hands: [
        {
          bustedOrDiscarded: false,
          bet: 0,
          hand: [
            { suit: 3, value: 2 },
            { suit: 2, value: 11 },
            { suit: 1, value: 3 },
            { suit: 3, value: 4 },
            { suit: 3, value: 4 },
          ],
        },
      ],
      currentHandIndex: 0,
    },
  },
  dealer: {
    hands: [
      {
        bustedOrDiscarded: false,
        bet: 0,
        hand: [{ suit: 1, value: 1 }, { suit: 3, value: 7 }],
      },
    ],
    currentHandIndex: 0,
  },
}
