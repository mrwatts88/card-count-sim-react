export function computeColorFromHexAndLuminance(hex, lum) {
  let rgb = '#'
  let c

  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  lum = lum || 0

  for (let i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }

  return rgb
}

export function rgb2hex(rgb) {
  if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  const hex = x => ('0' + parseInt(x).toString(16)).slice(-2)
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
}
