import Color from 'color'

export default function getContrastYIQ(color: string, dark = '#000', light = '#fff') {
  const col = Color(color)
  const r = col.red()
  const g = col.green()
  const b = col.blue()
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return Color((yiq >= 128) ? dark : light)
}
