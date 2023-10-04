import Block from '/components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from '/store'
import { useRouter } from 'next/router'
import { withCookies } from 'react-cookie'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled as muiStyled } from '@mui/material/styles'

    // import { compose } from 'styled-system'
    // import basicStyledSystem from './basic-styled-system'
import { shouldForwardProp } from '../Common/Element/styled-props-handler'
import styled from 'styled-components'

const StyledListItem = (props) => {
    const {onClick,selected} = props
    // console.log("StyledListItem")
    let Container = styled(ListItem)`
        /* background-color: blue; */
        &:hover {
            background-color: white;
        }
    `

    return(
        <Container>
            {props.children}
        </Container>
    )
}

const MenuLHS = (props) => {
    const { cookies } = props
    const {
        state: {
            user: { role },
        },
        dispatch,
    } = useStore()

    const router = useRouter()
    const logout = () => {
        cookies.remove('token', { path: '/' })
        cookies.remove('role', { path: '/' })
        dispatch({ type: 'setAuthenticated', payload: { authenticated: false } })
        router.push('/')
    }

    const path_dashboard = '/dashboard'
    const path_user = '/user'
    const path_user_verification = '/user-verifications'
    const path_stories = '/user-stories'
    const path_photo = '/user-photos'
    const path_user_product = '/user-products'
    const path_push_message = '/push-messages'

    const dashboardItems = [
        {
            label: 'Dashboard',
            path: path_dashboard,
            roles: ['admin'],
            key: 'Dashboard'
        },
    ]

    const otherItem = [
        {
            label: 'Users',
            path: path_user,
            roles: ['admin'],
            key: 'Users'
        },
        {
            label: 'Users Verification',
            path: path_user_verification,
            roles: ['admin'],
            key: 'Users Verification'
        },
        {
            label: 'Users Stories',
            path: path_stories,
            roles: ['admin'],
            key: 'Users Stories'
        },
        {
            label: 'Photos',
            path: path_photo,
            roles: ['admin'],
            key: 'Photos'
        },
        {
            label: 'VIP',
            path: path_user_product,
            roles: ['admin'],
            key: 'User Products'
        },
        {
            label: 'Push Messages',
            path: path_push_message,
            roles: ['admin'],
            key: 'Push Message'
        },
        {
            label: 'Logout',
            onClick: logout,
            roles: ['admin'],
            key: 'Logout'
        },
    ]

    const dashboardList = dashboardItems.map((value, index) => {
        const handleClick = () => {
            if (get(value, 'onClick')) {
                value.onClick()
            }

            if (get(value, 'path')) {
                router.push(value.path)
            }
        }

        return (
            <StyledListItem disablePadding onClick={handleClick} selected={router.pathname == path_dashboard} key={value.key}>
                <ListItemButton>
                    <ListItemText primary={value.label} />
                </ListItemButton>
            </StyledListItem>
        )
    })

    const otherList = otherItem.map((value, index) => {
        const handleClick = () => {
            if (get(value, 'onClick')) {
                value.onClick()
            }

            if (get(value, 'path')) {
                router.push(value.path)
            }
        }

        return (
            <StyledListItem disablePadding onClick={handleClick} key={value.key} selected={router.pathname == value.path}>
                <ListItemButton>
                    <ListItemText primary={value.label} />
                </ListItemButton>
            </StyledListItem>
        )
    })


    return (
        <Block>
            {role}
            <Block>
                <List>
                    {dashboardList}
                    {otherList}
                </List>

            </Block>
        </Block>
    )
}

export default withCookies(MenuLHS)
