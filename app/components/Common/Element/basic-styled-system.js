import {
  layout,
  color,
  colorStyle,
  space,
  typography,
  border,
  flexbox,
  position,
  background,
  shadow
} from 'styled-system'

import { system } from 'styled-system'

import colors from '../../../styles/theme/colors'

const textDecoration = system({
  textDecoration: {
    prop: 'textDecoration',
    property: 'textDecoration',
  },
})

const textTransform = system({
  textTransform: {
    prop: 'textTransform',
    property: 'textTransform',
  },
})

const transition = system({
  transition: true,
})

const transform = system({
  translateX: {
    property: 'transform',
    transform: (value) => `translateX(${value})`,
  },
  translateY: {
    property: 'transform',
    transform: (value) => `translateY(${value})`,
  },
  transform: {
    property: 'transform',
    transform: (value) => `translate(${value})`,
  },
  transformScale: {
    property: 'transform',
    transform: (value) => `scale(${value})`,
  },
})

const custBG = system({
  bgImg: {
    property: 'background-image',
    'background-image': (value) => value,
  },
})

const cursor = system({
  cursor: {
    property: 'cursor',
    cursor: (value) => value,
  },
})

const whiteSpace = system({
  whiteSpace: {
    property: 'white-space',
    'white-space': (value) => value,
  },
})

const visibility = system({
  visibility: {
    property: 'visibility',
    visibility: (value) => value,
  },
})

const restCustProps =  system({
  stopColor: {
    property: 'stop-color',
    scale: 'colors',
  },
})

/*
Refs: https://styled-system.com/api
*/
const basicStyledSystem = [
  typography, // fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textAlign, and fontStyle
  layout, // width, height, display, minWidth, minHeight, maxWidth, maxHeight, size, verticalAlign, overflow, overflowX, and overflowY
  space, // margin, marginTop, marginRight, marginBottom, marginLeft, marginX, marginY, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingX, paddingY
  color, // color, background, backgroundColor
  border, // border, borderWidth, borderStyle, borderColor, borderRadius, borderTop, borderTopWidth, borderTopStyle, borderTopColor, borderTopLeftRadius, borderTopRightRadius, borderRight, borderRightWidth, borderRightStyle, borderRightColor, borderBottom, borderBottomWidth, borderBottomStyle, borderBottomColor, borderBottomLeftRadius, borderBottomRightRadius, borderLeft, borderLeftWidth, borderLeftStyle, borderLeftColor, borderX, and borderY
  flexbox, // alignItems, alignContent, justifyItems, justifyContent, flexWrap, flexDirection, flex, flexGrow, flexShrink, flexBasis, justifySelf, alignSelf, and order
  position, // position, zIndex, top, right, bottom, and left
  background, // backgroundImage, backgroundSize, backgroundPosition, and backgroundRepeat
  shadow, //textShadow,boxShadow
  textDecoration,
  textTransform,
  transform,
  transition,
  cursor,
  whiteSpace,
  visibility,
  custBG,
  restCustProps
]

export default basicStyledSystem
