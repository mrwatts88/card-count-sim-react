export default function(p) {
  let ARC_DIAMETER
  const SPOTS_START_ANGLE = 35
  const SPOTS_END_ANGLE = 145
  const NUMBER_OF_SPOTS = 6
  const SPOT_DIAMETER = 50
  const CARD_OFFSET = 20
  const CARD_ADJUSTMENT = (SPOT_DIAMETER * 1.4) / 2
  let numActivePlayers = 0
  let twoClubs
  let players = {}

  const tableCanvasWrapper = document.getElementById('table-canvas-wrapper')
  const canvasWidth = () => tableCanvasWrapper.offsetWidth - 17
  const canvasHeight = () => tableCanvasWrapper.offsetHeight - 22

  p.preload = () => {
    twoClubs = p.loadImage('http://localhost:3000/cards/2_of_clubs.png')
  }

  p.setup = () => {
    p.noLoop()
    p.createCanvas(canvasWidth(), canvasHeight())
    ARC_DIAMETER = p.height * 1.4
  }

  p.draw = () => {
    p.background('green')
    p.push()
    p.noFill()
    p.stroke('white')
    p.angleMode(p.DEGREES)
    p.translate(p.width / 2, -50)
    drawInsuranceLine()
    drawPlayerSpots()
    drawAllPlayersCards()
    p.pop()
  }

  p.updateState = () => {
    p.redraw()
  }

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    numActivePlayers = props.gameState.numPlayers
    players = props.gameState.activePlayers
  }

  const drawInsuranceLine = () => {
    p.arc(
      0,
      0,
      ARC_DIAMETER - 100,
      ARC_DIAMETER - 100,
      SPOTS_START_ANGLE - 5,
      SPOTS_END_ANGLE + 5
    )

    p.arc(
      0,
      0,
      ARC_DIAMETER - 130,
      ARC_DIAMETER - 130,
      SPOTS_START_ANGLE - 5,
      SPOTS_END_ANGLE + 5
    )
  }

  const drawPlayerSpots = () => {
    for (let i = 0; i < NUMBER_OF_SPOTS; ++i) {
      if (i < NUMBER_OF_SPOTS - numActivePlayers) p.stroke('white')
      else p.stroke('yellow')

      p.ellipse(
        getXFromPlayerPosition(i + 1, 0),
        getYFromPlayerPosition(i + 1, 0),
        SPOT_DIAMETER,
        SPOT_DIAMETER
      )
    }
  }

  const drawAllPlayersCards = () => {
    Object.keys(players).forEach(position =>
      drawOnePlayersCardsAtPosition(position, players[position])
    )
  }

  const drawOnePlayersCardsAtPosition = (position, player) => {
    for (const hand of player.hands) {
      p.push()
      p.translate(-CARD_ADJUSTMENT, CARD_ADJUSTMENT)
      for (let i = 0; i < hand.hand.length; ++i) {
        const card = hand.hand[i]
        const cardImage = getCardImage(card)
        p.image(
          cardImage,
          getXFromPlayerPosition(position, i),
          getYFromPlayerPosition(position, i),
          SPOT_DIAMETER * 1.4,
          2.1 * SPOT_DIAMETER
        )
      }
      p.pop()
    }
  }

  const getCardImage = card => {
    return twoClubs
  }

  const getXFromPlayerPosition = (playerPosition, cardPosition) => {
    return (
      (ARC_DIAMETER / 2 + cardPosition * CARD_OFFSET) *
      p.cos(
        ((SPOTS_END_ANGLE - SPOTS_START_ANGLE) / (NUMBER_OF_SPOTS - 1)) *
          (playerPosition - 1) +
          SPOTS_START_ANGLE
      )
    )
  }

  const getYFromPlayerPosition = (playerPosition, cardPosition) => {
    return (
      (ARC_DIAMETER / 2 + cardPosition * CARD_OFFSET) *
      p.sin(
        ((SPOTS_END_ANGLE - SPOTS_START_ANGLE) / (NUMBER_OF_SPOTS - 1)) *
          (playerPosition - 1) +
          SPOTS_START_ANGLE
      )
    )
  }
}
