import map from 'lodash/map'
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'
import last from 'lodash/last'
import { css } from 'styled-components'

import colors from './colors'

const baseFontSize = 16
const breakpointValues = [0, 430, 900, 1440]
const breakpoints = map(
  breakpointValues,
  (breakpointValue) => `${breakpointValue}px`
)

breakpoints.xs = breakpoints[0]
breakpoints.sm = breakpoints[1]
breakpoints.md = breakpoints[2]
breakpoints.lg = breakpoints[3]

const mq = reduce(
  keys(breakpoints),
  (acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `
    return acc
  },
  {}
)

export default {
  colors,
  fonts: {
    roboto: 'Roboto, sans-serif',
    jost: '"Jost",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif',
    notoSansTc: "'Noto Sans TC', sans-serif",
  },
  breakpoints,
  variables: {
    baseFontSize,
  },
  mq,
}
