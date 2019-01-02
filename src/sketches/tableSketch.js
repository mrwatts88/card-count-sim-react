export default function(p) {
  let ARC_DIAMETER
  const SPOTS_START_ANGLE = 35
  const SPOTS_END_ANGLE = 145
  const NUMBER_OF_SPOTS = 6
  const SPOT_DIAMETER = 50
  const TABLE_WIDTH = 600
  const TABLE_HEIGHT = 400
  let numActivePlayers = 0

  p.setup = () => {
    p.noLoop()
    p.createCanvas(TABLE_WIDTH, TABLE_HEIGHT)
    ARC_DIAMETER = p.height * 1.4
  }

  p.draw = () => {
    p.background('green')
    p.push()
    p.noFill()
    p.stroke('white')
    p.angleMode(p.DEGREES)
    p.translate(p.width / 2, 0)
    drawInsuranceLine()
    drawPlayerSpots()
    p.pop()
  }

  p.updateState = () => {
    p.redraw()
  }

  p.myCustomRedrawAccordingToNewPropsHandler = props => {
    numActivePlayers = props.numActivePlayers
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
        (ARC_DIAMETER / 2) *
          p.cos(
            ((SPOTS_END_ANGLE - SPOTS_START_ANGLE) / (NUMBER_OF_SPOTS - 1)) *
              i +
              SPOTS_START_ANGLE
          ),
        (ARC_DIAMETER / 2) *
          p.sin(
            ((SPOTS_END_ANGLE - SPOTS_START_ANGLE) / (NUMBER_OF_SPOTS - 1)) *
              i +
              SPOTS_START_ANGLE
          ),
        SPOT_DIAMETER,
        SPOT_DIAMETER
      )
    }
  }
}
