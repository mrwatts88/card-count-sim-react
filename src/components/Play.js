import React, { Component } from 'react'
import { Button, Grid } from '@material-ui/core'
import { computeColorFromHexAndLuminance, rgb2hex } from '../util/colorUtils'

export default class Play extends Component {
  onChipMouseDown = e => {
    const hexColor = rgb2hex(e.currentTarget.style.background)
    const newColor = computeColorFromHexAndLuminance(hexColor, -0.1)
    e.currentTarget.style.background = newColor
    e.currentTarget.style.boxShadow = '1px 1px'
  }

  onChipMouseUp = e => {
    const hexColor = rgb2hex(e.currentTarget.style.background)
    const newColor = computeColorFromHexAndLuminance(hexColor, 0.11)
    e.currentTarget.style.background = newColor
    e.currentTarget.style.boxShadow = '1px 1px 1px 1px'
  }

  render() {
    return (
      <div
        style={{
          margin: '15px',
          padding: '15px',
          border: '1px solid lightgrey',
        }}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="stretch"
              style={{ paddingBottom: '15px' }}
            >
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#FFFFFF' }}
                  className="betting-chip-button"
                >
                  1
                </button>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#FF0000' }}
                  className="betting-chip-button"
                >
                  5
                </button>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#57e571' }}
                  className="betting-chip-button"
                >
                  25
                </button>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#000000' }}
                  className="betting-chip-button"
                >
                  <span style={{ color: 'white' }}>100</span>
                </button>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#9b4dcc' }}
                  className="betting-chip-button"
                >
                  500
                </button>
              </Grid>
              <Grid style={{ textAlign: 'center' }} item xs={2}>
                <button
                  type="button"
                  onMouseDown={this.onChipMouseDown}
                  onMouseUp={this.onChipMouseUp}
                  style={{ background: '#FFFF00' }}
                  className="betting-chip-button"
                >
                  1000
                </button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" fullWidth disabled color="secondary">
              Place Bets
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}
