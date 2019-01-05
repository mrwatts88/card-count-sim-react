const MAX_ARC_DIAMETER = 950
const CENTER_OF_SPOT_ARC_OFFSET_Y = -65
const INSURANCE_LINE_ARC_OFFSET_FROM_SPOTS = 100
const INSURANCE_LINE_WIDTH = 30
const INSURANCE_LINE_ANGLE_OFFSET_FROM_SPOTS = 5
const SPOTS_START_ANGLE = 35
const SPOTS_END_ANGLE = 145
const NUMBER_OF_SPOTS = 6
const SPOT_DIAMETER = 50
const CARD_WIDTH = SPOT_DIAMETER * 1.4
const CARD_HEIGHT = 2.1 * SPOT_DIAMETER
const CARD_WIDTH_WITHIN_IMAGE = Infinity
const CARD_HEIGHT_WITHIN_IMAGE = Infinity
const SPACE_BETWEEN_DEALER_CARDS = 15
const FIRST_DEALER_CARD_X_POSITION_RATIO = 0.65
const DEALER_CARD_POSITION_Y = 25
const CARD_OFFSET_X = 20
const CARD_OFFSET_Y = 30
const CARD_ADJUSTMENT = CARD_WIDTH / 2
const NUMBER_OF_SUITS = 4
const NUMBER_OF_RANKS = 13
const ZERO = 0
const ONE = 1
const TABLE_WRAPPER_CLEARANCE_X = 0
const TABLE_WRAPPER_CLEARANCE_Y = 0
const TABLE_CANVAS_WRAPPER_DIV = 'table-canvas-wrapper'
const SERVER_PROTOCOL = 'http'
const SERVER_HOST_ADDR = 'localhost'
const SERVER_PORT = '3001'
const TABLE_LINE_COLOR = 'white'
const SECONDARY_TABLE_LINE_COLOR = 'yellow'
const CARD_BORDER_COLOR = 'black'
const TABLE_LINE_STROKE_WEIGHT = 3
const CARD_STROKE_WEIGHT = 2
const TABLE_COLOR = '#0C7327'

const INSURANCE_LINE_START_ANGLE =
  SPOTS_START_ANGLE - INSURANCE_LINE_ANGLE_OFFSET_FROM_SPOTS
const INSURANCE_LINE_END_ANGLE =
  SPOTS_END_ANGLE + INSURANCE_LINE_ANGLE_OFFSET_FROM_SPOTS

const DENOMINATION_COLOR_MAP = {
  1: 'white',
  5: 'red',
  25: '#57e571',
  100: 'black',
  500: '#9b4dcc',
  1000: 'yellow',
}

export default p => {
  let ARC_DIAMETER, ARC_RADIUS, INSURANCE_LINE_DIAMETER
  let numActivePlayers = ZERO
  let cardImages = []
  let players = {}
  let dealer = {}

  const tableCanvasWrapper = document.getElementById(TABLE_CANVAS_WRAPPER_DIV)

  const canvasWidth = () =>
    tableCanvasWrapper.offsetWidth - TABLE_WRAPPER_CLEARANCE_X

  const canvasHeight = () =>
    tableCanvasWrapper.offsetHeight - TABLE_WRAPPER_CLEARANCE_Y

  p.preload = () => {
    for (let suitEnum = ZERO; suitEnum < NUMBER_OF_SUITS; ++suitEnum) {
      cardImages.push([])
      for (let rank = ONE; rank <= NUMBER_OF_RANKS; ++rank)
        cardImages[suitEnum][rank] = p.loadImage(
          `${SERVER_PROTOCOL}://${SERVER_HOST_ADDR}:${SERVER_PORT}/cards/${suitEnum}_${rank}.png`
        )
    }
  }

  p.setup = () => {
    p.noLoop()
    p.createCanvas(canvasWidth(), canvasHeight())
    ARC_DIAMETER = Math.min((canvasWidth() * 2) / 3, canvasHeight()) * 1.4
    ARC_DIAMETER = Math.min(MAX_ARC_DIAMETER, ARC_DIAMETER)
    ARC_RADIUS = ARC_DIAMETER / 2
    INSURANCE_LINE_DIAMETER =
      ARC_DIAMETER - INSURANCE_LINE_ARC_OFFSET_FROM_SPOTS
  }

  p.draw = () => {
    p.background(TABLE_COLOR)
    p.noFill()

    p.push()
    p.stroke(TABLE_LINE_COLOR)
    p.angleMode(p.DEGREES)
    p.translate(canvasWidth() / 2, CENTER_OF_SPOT_ARC_OFFSET_Y)

    p.push()
    p.strokeWeight(TABLE_LINE_STROKE_WEIGHT)
    drawInsuranceLine()
    drawPlayerSpots()
    p.pop()

    drawAllPlayersData()
    p.pop()

    drawDealersCards()
  }

  p.windowResized = () => {
    p.resizeCanvas(canvasWidth(), canvasHeight())
    ARC_DIAMETER = Math.min((canvasWidth() * 2) / 3, canvasHeight()) * 1.4
    ARC_DIAMETER = Math.min(MAX_ARC_DIAMETER, ARC_DIAMETER)
    ARC_RADIUS = ARC_DIAMETER / 2
    INSURANCE_LINE_DIAMETER =
      ARC_DIAMETER - INSURANCE_LINE_ARC_OFFSET_FROM_SPOTS
    p.redraw()
  }

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    players = props.gameState.activePlayers
    numActivePlayers = Object.keys(players).length
    dealer = props.gameState.dealer
  }

  p.updateState = () => p.redraw()

  const drawInsuranceLine = () => {
    const arcCenterX = ZERO
    const arcCenterY = ZERO

    p.arc(
      arcCenterX,
      arcCenterY,
      INSURANCE_LINE_DIAMETER,
      INSURANCE_LINE_DIAMETER,
      INSURANCE_LINE_START_ANGLE,
      INSURANCE_LINE_END_ANGLE
    )

    p.arc(
      arcCenterX,
      arcCenterX,
      INSURANCE_LINE_DIAMETER + INSURANCE_LINE_WIDTH,
      INSURANCE_LINE_DIAMETER + INSURANCE_LINE_WIDTH,
      INSURANCE_LINE_START_ANGLE,
      INSURANCE_LINE_END_ANGLE
    )
  }

  const drawPlayerSpots = () => {
    for (
      let spotPosition = ZERO;
      spotPosition < NUMBER_OF_SPOTS;
      ++spotPosition
    ) {
      if (spotPosition < numActivePlayers) p.stroke(SECONDARY_TABLE_LINE_COLOR)
      else p.stroke(TABLE_LINE_COLOR)

      const playerPosition = spotPosition + ONE
      const ignoreSecondParameter = ZERO

      p.ellipse(
        getXPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
        getYPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
        SPOT_DIAMETER,
        SPOT_DIAMETER
      )
    }
  }

  const drawDealersCards = () => {
    if (!dealer || !dealer.hands || !dealer.hands[ZERO]) return

    const dealersHand = dealer.hands[ZERO].hand

    for (
      let cardPosition = ZERO;
      cardPosition < dealersHand.length;
      ++cardPosition
    ) {
      const card = dealersHand[cardPosition]
      const cardImage = getCardImage(card)
      const xPosition =
        canvasWidth() * FIRST_DEALER_CARD_X_POSITION_RATIO -
        cardPosition * (CARD_WIDTH + SPACE_BETWEEN_DEALER_CARDS)

      p.image(
        cardImage,
        xPosition,
        DEALER_CARD_POSITION_Y,
        CARD_WIDTH,
        CARD_HEIGHT,
        ZERO,
        ZERO,
        CARD_WIDTH_WITHIN_IMAGE,
        CARD_HEIGHT_WITHIN_IMAGE
      )

      p.push()
      p.stroke(CARD_BORDER_COLOR)
      p.strokeWeight(CARD_STROKE_WEIGHT)
      p.rect(xPosition, DEALER_CARD_POSITION_Y, CARD_WIDTH, CARD_HEIGHT)
      p.pop()
    }
  }

  const drawAllPlayersData = () =>
    Object.keys(players).forEach(position =>
      drawPlayerData(position, players[position])
    )

  const drawPlayerData = (playerPosition, player) => {
    if (!player) return

    for (const hand of player.hands) {
      drawBet(playerPosition, hand)
      drawHand(playerPosition, hand)
    }
  }

  const drawBet = (playerPosition, hand) => {
    if (!hand) return

    const ignoreSecondParameter = ZERO
    const topChipColor = determineTopChipColor(hand.bet)
    const chipText = formatChipText(hand.bet)
    const chipTextSize = determineChipTextSize(chipText)

    p.push()
    p.strokeWeight(2)
    p.stroke(0, 0, 0, 100)
    p.fill(topChipColor)
    p.ellipse(
      getXPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
      getYPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
      SPOT_DIAMETER * 0.6,
      SPOT_DIAMETER * 0.6
    )
    p.pop()

    p.push()
    p.noStroke()
    p.textSize(chipTextSize)
    p.textStyle(p.BOLD)
    p.textFont('Helvetica')
    p.rectMode(p.CENTER)
    p.textAlign(p.CENTER, p.CENTER)

    p.fill(topChipColor === 'black' ? 'white' : 'black')
    p.text(
      chipText,
      2 + getXPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
      1 + getYPositionFromPlayerPosition(playerPosition, ignoreSecondParameter),
      SPOT_DIAMETER,
      SPOT_DIAMETER
    )
    p.pop()
  }

  const determineChipTextSize = text => {
    const length = text.length
    if (length < 2) return 22
    if (length < 3) return 20
    if (length < 4) return 16
    return 14
  }

  const formatChipText = bet => {
    if (bet < 1000) return bet.toString()
    return bet / 1000 + 'k'
  }

  const drawHand = (playerPosition, hand) => {
    if (!hand || !hand.hand) return

    p.push()
    p.translate(-CARD_ADJUSTMENT, CARD_ADJUSTMENT)
    p.stroke(CARD_BORDER_COLOR)
    p.strokeWeight(CARD_STROKE_WEIGHT)

    for (
      let cardPosition = ZERO;
      cardPosition < hand.hand.length;
      ++cardPosition
    ) {
      const card = hand.hand[cardPosition]
      const cardImage = getCardImage(card)

      const xPosition = getXPositionFromPlayerPosition(
        playerPosition,
        cardPosition
      )

      const yPosition = getYPositionFromPlayerPosition(
        playerPosition,
        cardPosition
      )

      p.image(
        cardImage,
        xPosition,
        yPosition,
        CARD_WIDTH,
        CARD_HEIGHT,
        ZERO,
        ZERO,
        CARD_WIDTH_WITHIN_IMAGE,
        CARD_HEIGHT_WITHIN_IMAGE
      )

      p.rect(xPosition, yPosition, CARD_WIDTH, CARD_HEIGHT)
    }

    p.pop()
  }

  const determineTopChipColor = bet => {
    if (bet === 0) return p.color(0, 0, 0, 0)
    const denominations = Object.keys(DENOMINATION_COLOR_MAP)
    let denominationIndex = denominations.length - 1
    let betModDenomination = bet

    while (betModDenomination !== 0)
      betModDenomination %= denominations[denominationIndex--]

    return DENOMINATION_COLOR_MAP[denominations[++denominationIndex]]
  }

  const getCardImage = card => cardImages[card.suit][card.value]

  const getXPositionFromPlayerPosition = (playerPosition, cardPosition) =>
    getPositionFromPlayerPosition(
      playerPosition,
      cardPosition,
      CARD_OFFSET_X,
      p.cos.bind(p)
    )

  const getYPositionFromPlayerPosition = (playerPosition, cardPosition) =>
    getPositionFromPlayerPosition(
      playerPosition,
      cardPosition,
      CARD_OFFSET_Y,
      p.sin.bind(p)
    )

  const getPositionFromPlayerPosition = (
    playerPosition,
    cardPosition,
    cardOffset,
    trigFunction
  ) =>
    (ARC_RADIUS + cardPosition * cardOffset) *
    trigFunction(
      ((SPOTS_END_ANGLE - SPOTS_START_ANGLE) / (NUMBER_OF_SPOTS - ONE)) *
        (playerPosition - ONE) +
        SPOTS_START_ANGLE
    )
}
