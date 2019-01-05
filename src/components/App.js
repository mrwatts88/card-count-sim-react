import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import P5Wrapper from 'sketches/P5Wrapper'
import tableSketch from 'sketches/tableSketch'
import 'components/App.css'

class App extends Component {
  state = {
    numActivePlayers: 0,
    activeTab: 1,
  }

  addPlayer = () => {
    if (this.state.numActivePlayers > 5) return
    this.setState({
      numActivePlayers: this.state.numActivePlayers + 1,
    })
  }

  handleTabSelect = (e, activeTab) => this.setState({ activeTab })

  render() {
    return (
      <div className="App">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} lg={8}>
            <div id="table-canvas-wrapper">
              <P5Wrapper gameState={gameState} sketch={tableSketch} />
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <AppBar position="static">
              <Tabs
                variant="fullWidth"
                value={this.state.activeTab}
                onChange={this.handleTabSelect}
              >
                <Tab label="Game Config" />
                <Tab label="Play" />
              </Tabs>
            </AppBar>
            {this.state.activeTab === 0 && <span>Game Config</span>}
            {this.state.activeTab === 1 && <span>Play</span>}
          </Grid>
        </Grid>
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
          bet: 1,
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
          bet: 1,
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
          bet: 1,
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
          bet: 1,
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
          bet: 1,
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
