import * as React from 'react'
import Block from '/components/Common/Element/Block'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

function MuiDialog(props) {
  const { isOpen, closePopup, ToolbarElement } = props
  const [open, setOpen] = React.useState(isOpen ? isOpen : false)

  const handleClose = () => {
    setOpen(false)
    closePopup()
  }

  return (
    <Block zIndex="1501">
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        // TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {props.children}
        {/* <List>
         
        </List> */}
      </Dialog>
    </Block>
  )
}

export default MuiDialog
