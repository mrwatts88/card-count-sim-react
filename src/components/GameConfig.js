import React, { Component } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { Button, Grid } from '@material-ui/core'

export default class GameConfig extends Component {
  state = {
    numberOfDecks: '6',
    soft17Behavior: 'h17',
    doubleAfterSplitAllowed: 'yes',
    doubleDownOn: 'Any first 2 cards',
    numberOfSplitHands: '4',
    resplitAcesAllowed: 'no',
    hittingSplitAcesAllowed: 'no',
    surrenderRule: 'none',
    blackjackPays: '3 to 2',
  }

  handleRadioChange = e => this.setState({ [e.target.name]: e.target.value })

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
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid item>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <GameConfigOption
                labelText="Number of decks:"
                groupName="numberOfDecks"
                row
                value={this.state.numberOfDecks}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  disabled
                  value="2"
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel value="6" control={<Radio />} label="6" />
                <FormControlLabel
                  disabled
                  value="8"
                  control={<Radio />}
                  label="8"
                />
              </GameConfigOption>
              <GameConfigOption
                labelText="Dealer soft 17:"
                groupName="soft17Behavior"
                row
                value={this.state.soft17Behavior}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel value="h17" control={<Radio />} label="h17" />
                <FormControlLabel
                  disabled
                  value="s17"
                  control={<Radio />}
                  label="s17"
                />
              </GameConfigOption>
              <GameConfigOption
                labelText="Double after split allowed:"
                groupName="doubleAfterSplitAllowed"
                row
                value={this.state.doubleAfterSplitAllowed}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
                <FormControlLabel
                  disabled
                  value="no"
                  control={<Radio />}
                  label="no"
                />
              </GameConfigOption>
              <GameConfigOption
                labelText="Double down on:"
                groupName="doubleDownOn"
                value={this.state.doubleDownOn}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="Any first 2 cards"
                  control={<Radio />}
                  label="Any first 2 cards"
                />
                <FormControlLabel
                  disabled
                  value="9-11 only"
                  control={<Radio />}
                  label="9-11 only"
                />
                <FormControlLabel
                  disabled
                  value="10-11 only"
                  control={<Radio />}
                  label="10-11 only"
                />
              </GameConfigOption>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <GameConfigOption
                labelText="Max hands to split to:"
                groupName="numberOfSplitHands"
                row
                value={this.state.numberOfSplitHands}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  disabled
                  value="2"
                  control={<Radio />}
                  label="2"
                />
                <FormControlLabel
                  disabled
                  value="3"
                  control={<Radio />}
                  label="3"
                />
                <FormControlLabel value="4" control={<Radio />} label="4" />
              </GameConfigOption>
              <GameConfigOption
                labelText="Resplit Aces allowed:"
                groupName="resplitAcesAllowed"
                row
                value={this.state.resplitAcesAllowed}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  disabled
                  value="yes"
                  control={<Radio />}
                  label="yes"
                />
                <FormControlLabel value="no" control={<Radio />} label="no" />
              </GameConfigOption>
              <GameConfigOption
                labelText="Hitting split Aces allowed:"
                groupName="hittingSplitAcesAllowed"
                row
                value={this.state.hittingSplitAcesAllowed}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  disabled
                  value="yes"
                  control={<Radio />}
                  label="yes"
                />
                <FormControlLabel value="no" control={<Radio />} label="no" />
              </GameConfigOption>
              <GameConfigOption
                labelText="Surrender rule:"
                groupName="surrenderRule"
                row
                value={this.state.surrenderRule}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="none"
                />
                <FormControlLabel
                  disabled
                  value="late"
                  control={<Radio />}
                  label="late"
                />
              </GameConfigOption>
              <GameConfigOption
                labelText="Blackjack pays:"
                groupName="blackjackPays"
                row
                value={this.state.blackjackPays}
                handleRadioChange={this.handleRadioChange}
              >
                <FormControlLabel
                  value="3 to 2"
                  control={<Radio />}
                  label="3 to 2"
                />
                <FormControlLabel
                  disabled
                  value="6 to 5"
                  control={<Radio />}
                  label="6 to 5"
                />
              </GameConfigOption>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="outlined" fullWidth color="secondary">
          Start Game
        </Button>
      </div>
    )
  }
}

const GameConfigOption = props => (
  <Grid item>
    <FormControl component="fieldset">
      <FormLabel>{props.labelText}</FormLabel>
      <RadioGroup
        row={props.row}
        name={props.groupName}
        value={props.value}
        onChange={props.handleRadioChange}
      >
        {props.children}
      </RadioGroup>
    </FormControl>
  </Grid>
)
