import includes from 'lodash/includes'

const excludePropsGeneric = [
  'alignItems',
  'justifyContent',
  'color',
  'fontSize',
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'flex',
  'flexWrap',
  'flexDirection',
  'alignItems',
  'alignSelf',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'textAlign',
  'fontFamily',
  'lineHeight',
  'fontWeight',
  'backgroundColor',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderRadius',
  'borderColor',
  'textTransform',
  'textTransfrom',
  'xs',
  'sm',
  'md',
  'arrowPosition',
  'opacity',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'verticalAlign',
  'zIndex',
  'customTheme',
  'entity',
  'entities',
  'level',
  'bg',
  'textDecoration',
  'backgroundPosition',
  'backgroundSize',
  'backgroundRepeat',
  'backgroundImage',
  'background',
  'variant',
  'letterSpacing',
  'author',
  'fontStyle',
  'maxWidth',
  'minWidth',
  'maxHeight',
  'minHeight',
  'overflowX',
  'overflowY',
  'transition',
  'margin',
  'index',
  'truncateLines',
  'xsOffset',
  'smOffset',
  'mdOffset',
  'advertZone',
  'number',
  'className',
  'imageStyle',
  'imgWidth',
  'imgHeight',
  'translateY',
  'translateX',
  'marginLeft',
  'marginTop',
  'marginRight',
  'marginBottom',
  'borderTopRightRadius',
  'borderTopLeftRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
  'borderStyle',
  'borderWidth',
  'fluid',
  'boxShadow',
  'textShadow',
]

const excludePropsBlock = ['alt', 'src', 'type', 'mode', 'width', 'height']

const excludePropsAnchor = [
  'separator',
  'type',
  'overrideHref',
  'width',
  'height',
]

const excludePropsSpan = ['date', 'width', 'height']

const excludePropsImage = []

const excludePropsStop = ['stopColor']

const shouldForwardProp = (prop, type) => {
  switch (type) {
    case 'block':
      return !includes([...excludePropsGeneric, ...excludePropsBlock], prop)
    case 'anchor':
      return !includes([...excludePropsGeneric, ...excludePropsAnchor], prop)
    case 'image':
      return !includes([...excludePropsGeneric, ...excludePropsImage], prop)
    case 'span':
      return !includes([...excludePropsGeneric, ...excludePropsSpan], prop)
    case 'stop':
      return !includes([...excludePropsGeneric, ...excludePropsStop], prop)
    default:
      return !includes(excludePropsGeneric, prop)
  }
}

export { shouldForwardProp }
