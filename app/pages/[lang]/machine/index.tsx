import { CustomCtx, preprocessServerSideProps } from 'lib/serverside-prepro'
import Block from 'components/Common/Element/Block'
import listMachine from "data/machine"
import StyledTextFieldSearch from 'components/TextField/styledTextFieldSearch'
import Table1 from 'components/Table/table1'
import { useStore } from 'store'
import find from 'lodash/find'
import get from 'lodash/get'
import getConfig from 'next/config'
import Popup from 'components/Popup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import SvgIconDeleteGrey from 'public/svg/icon_delete_grey.svg'
import SvgIconDeleteBlack from 'public/svg/icon_delete_black.svg'
import SvgIconEditGrey from 'public/svg/icon_edit_grey.svg'
import SvgIconEditBlack from 'public/svg/icon_edit_black.svg'
import SvgIconMore from 'public/svg/icon_more_arrow_black.svg'
import { IconButton, Icon } from "@mui/material";
import StyledSelectField from 'components/TextField/styledSelectField'
import { withCookies } from 'react-cookie'
import { type } from 'os'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { CustomRequest, internalAPICallHandler } from 'lib/api/handler'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig

const CustomEditButton = (props) => {
    const [hover, setHover] = useState(false)
    const { params, handleClickEdit } = props
    return (
        <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={(event) => {
                setHover(false)
                event.stopPropagation()
                handleClickEdit(params)
            }}
            // sx={{ mr: 2, visibility: { md: 'hidden' } }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >
            {hover ? <SvgIconEditBlack /> : <SvgIconEditGrey />}
        </IconButton>
    )
}

const CustomDeleteButton = (props) => {
    const [hover, setHover] = useState(false)
    const { params, handleClickDelete } = props
    return (<IconButton
        color="primary"
        aria-label="open drawer"
        edge="start"
        onClick={(event) => {
            setHover(false)
            event.stopPropagation();
            handleClickDelete(params)
        }}
        // sx={{ mr: 2, visibility: { md: 'hidden' } }}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
    >
        {hover ? <SvgIconDeleteBlack /> : <SvgIconDeleteGrey />}
    </IconButton>)
}

const CustomMoreButton = (props) => {
    const { handleClickDelete, handleClickEdit, params } = props
    const [showMore, setShowMore] = useState(false)
    return (
        <Block>
            <Block display={showMore ? 'flex' : 'none'} bg='lightGrey1' borderRadius='16px' zIndex='10' position='absolute' right='10%' pl='15px' alignItems='center'>

                <CustomDeleteButton params={params} handleClickDelete={handleClickDelete} />
                <CustomEditButton params={params} handleClickEdit={handleClickEdit} />


            </Block>
            <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={(event) => {
                    event.stopPropagation();
                    setShowMore(true)
                }}
            >
                <SvgIconDeleteGrey />
                {<SvgIconMore />}
            </IconButton>
        </Block>

    )
}

const MachineList = (props) => {
    const { cookies, profile } = props
    const token = cookies.get("userToken")
    console.log("MachineList props", props)
    const {
        state: {
            site: { lang },
            user: { userProfile }
        },
        dispatch,
    } = useStore()
    const listMachineString = get(listMachine, lang)
    const [editState, setEditState] = useState({})
    const [filter, setFilter] = useState([])
    const [selectedField, setSelectedField] = useState('id')
    const [record, setRecord] = useState({})
    const [fieldValue, setFieldValue] = useState('test')
    const [serverErrorMessage, setServerErrorMessage] = useState(null)
    const router = useRouter()
    const columns = [
        {
            field: 'id', headerName: listMachineString.headerName.id, width: 90, flex: 1,
        },
        {
            field: 'attributes.name',
            headerName: listMachineString.headerName.name,
            flex: 1,
            valueGetter: (params) => {
                const name = params.row.attributes?.name
                return name
            }
        },
        {
            field: 'attributes.rehabitType',
            headerName: listMachineString.headerName.rehabitType,
            flex: 1,
            valueGetter: (params) => {
                const rehabitType = params.row.attributes?.rehabitType
                return rehabitType
            }
        },
        {
            field: 'attributes.physiotherapist',
            headerName: listMachineString.headerName.physiotherapist,
            flex: 1,
            valueGetter: (params) => {
                const name = params.row.attributes?.physio?.data?.attributes?.name
                return name
            }
        },
        {
            field: 'attributes.subscriptionEndDate',
            headerName: listMachineString.headerName.subscriptionEndDate,
            flex: 1,

            valueGetter: (params) => {
                const subscriptionEndDate = params.row.attributes?.subscriptionEndDate
                return subscriptionEndDate
            }
        },
        {
            field: 'edit',
            headerName: '',
            width: 50,
            align: 'center',
            flex: 0.2,
            renderCell: (params) => {

                return (
                    <CustomEditButton params={params} handleClickEdit={handleClickEdit} />
                )
            }
        },
        {
            field: 'delete',
            headerName: '',
            width: 50,
            align: 'center',
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <CustomDeleteButton params={params} handleClickDelete={handleClickDelete} />
                )
            }
        }
    ];

    const tabletColumns = [
        {
            field: 'id', headerName: listMachineString.headerName.id, width: 90, flex: 1,
        },
        {
            field: 'attributes.name',
            headerName: listMachineString.headerName.name,
            flex: 1,
            valueGetter: (params) => {
                const name = params.row.attributes?.name
                return name
            }
        },
        {
            field: 'attributes.rehabitType',
            headerName: listMachineString.headerName.rehabitType,
            flex: 1,
            valueGetter: (params) => {
                const rehabitType = params.row.attributes?.rehabitType
                return rehabitType
            }
        },
        {
            field: 'edit',
            headerName: '',
            width: 50,
            align: 'center',
            flex: 0.2,
            renderCell: (params) => {

                return (
                    <CustomEditButton params={params} handleClickEdit={handleClickEdit} />
                )
            }
        },
        {
            field: 'delete',
            headerName: '',
            width: 50,
            align: 'center',
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <CustomDeleteButton params={params} handleClickDelete={handleClickDelete} />
                )
            }
        }
    ];

    const mobileColumns = [
        {
            field: 'id', headerName: listMachineString.headerName.id, width: 90, flex: 1,
        },
        {
            field: 'attributes.name',
            headerName: listMachineString.headerName.name,
            flex: 1,
            valueGetter: (params) => {
                const name = params.row.attributes?.name
                return name
            }
        },
        {
            field: 'attributes.rehabitType',
            headerName: listMachineString.headerName.rehabitType,
            flex: 1,
            valueGetter: (params) => {
                const rehabitType = params.row.attributes?.rehabitType
                return rehabitType
            }
        },
        {
            field: 'more',
            headerName: '',
            width: 50,
            align: 'center',
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (<CustomMoreButton params={params} handleClickDelete={handleClickDelete} handleClickEdit={handleClickEdit} />)
            }
        }
    ];

    const mappingList = [
        {
            node: '1',
            func: () => {
                dispatch({
                    type: 'showPopup',
                    payload: {
                        popup: true,
                        popupType: 'editMachine',
                        isGlobal: false,
                    },
                })
            },
        },
        {
            node: '2',
            func: () => {
                dispatch({
                    type: 'showPopup',
                    payload: {
                        popup: true,
                        popupType: 'messageEditMachineConfirm',
                        isGlobal: false,
                    },
                })
            }
        },
        {
            node: '3',
            func: () => {
                dispatch({
                    type: 'showPopup',
                    payload: {
                        popup: true,
                        popupType: 'messageEditMachineCancel',
                        isGlobal: false,
                    },
                })
            }
        },
        {
            node: '4',
            func: (serverErrorMessage) => {
                setServerErrorMessage(serverErrorMessage)
                dispatch({
                    type: 'showPopup',
                    payload: {
                        popup: true,
                        popupType: 'generalError',
                        isGlobal: false,
                    },
                })
            }
        }
    ]
    const updateParentState = (updateField) => {
        let newState = { ...editState, ...updateField }
        setEditState({ ...newState })
    }

    const handleClickDelete = (e?) => {
        setRecord(e.row)
        dispatch({
            type: 'showPopup',
            payload: {
                popup: true,
                popupType: 'messageDeleteMachine',
                isGlobal: false,
            },
        })
    }

    const handleClickEdit = (e?) => {
        // console.log("e", e)
        setRecord(e.row)
        dispatch({
            type: 'showPopup',
            payload: {
                popup: true,
                popupType: 'editMachine',
                isGlobal: false,
            },
        })
    }

    const handleDelete = () => {

    }

    const handleRowClick = (state) => {
        router.push(`/${lang}/Machine-list/${state.row.id}/dashboard`)
    }

    return (
        <Block>
            <Block
                color='midGrey1'
                fontWeight={{ _: 500, md: 700 }}
                fontSize={{ _: '24px', md: '30px' }}
                lineHeight={{ _: '29px', md: '36px' }}
                pt={{ md: '40px' }}
            >
                {listMachineString.hello}
            </Block>
            <Block
                color='darkGrey1'
                fontWeight={{ _: 700, md: 600 }}
                fontSize={{ _: '30px', md: '48px' }}
                lineHeight={{ _: '36px', md: '58px' }}
            >{profile && (profile.doctorPhysioProfile?.name || profile.username)}</Block>
            <Block width={{ md: '50%', _: '100%' }} pt={{ _: '20px' }}>
                <StyledTextFieldSearch placeholder={listMachineString.placeholderSearch} id="search" name="search"
                    onChange={(e) => {
                        setFilter([
                            {
                                id: 1,
                                columnField: selectedField,
                                operatorValue: "contains",
                                value: e.target.value
                            },
                        ])
                    }} />
            </Block>

            <


            <StyledSelectField style={{ visibility: 'hidden' }} placeholder='field search' id="selectField" defaultValue={listMachineString.headerName.name} options={columns.map((item, index) => {
                if (item.headerName != "")
                    return { label: item.headerName, value: item.headerName }
            })} onChange={(value) => {

                setSelectedField(find(columns, (item) => item.headerName == value)?.field)
                }} />
            
            <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCartIcon />
            </IconButton>

            <Block boxShadow='0px 10p   x 30px rgba(0, 0, 0, 0.1)' borderRadius='32px' mb='30px'>
                <Block display={{ _: 'none', md: 'block' }}>
                    <Table1 handleClickDelete={() => { handleClickDelete() }} handleClickEdit={() => { handleClickEdit() }} rows={props.data} onRowClick={(e) => { handleRowClick(e) }} filter={filter} columns={columns} />
                </Block>
                <Block display={{ _: 'none', sm: 'block', md: 'none' }}>
                    <Table1 handleClickDelete={() => { handleClickDelete() }} handleClickEdit={() => { handleClickEdit() }} rows={props.data} onRowClick={(e) => { handleRowClick(e) }} filter={filter} columns={tabletColumns} />
                </Block>
                <Block display={{ _: 'none', xs: 'block', sm: 'none' }}>
                    <Table1 handleClickDelete={() => { handleClickDelete() }} handleClickEdit={() => { handleClickEdit() }} rows={props.data} onRowClick={(e) => { handleRowClick(e) }} filter={filter} columns={mobileColumns} />
                </Block>
            </Block>
            <Popup type="local" propsToPopup={{ updateParentState: (value) => { updateParentState(value) }, mappingList: mappingList, editState: editState, data: record, physioData: props.physioData, subscriptionData: props.subscriptionData, profile: profile, serverErrorMessage: serverErrorMessage }} />
        </Block>
    )
}

export async function getServerSideProps(ctx: CustomCtx) {
    const preProps = await preprocessServerSideProps(ctx)
    if (preProps.redirect)
        return preProps

    const { profile, token, siteConfig } = ctx?.props || {}
    const { slug, lang } = ctx.params
    const collection = 'machine'
    const userType = profile?.userType
    var customRequest: CustomRequest = {
        query: {
            collection,

        },
        method: ctx.req.method,
    }
 
    
    const data = await internalAPICallHandler(customRequest,collection).then((data) => { 
        return data
    }).catch((e) => { 
        console.log("error getserversideProps",e)
    })

    console.log("getServersideProps ctx", data)
    
    return {
        props: {
            // contentData,
            data,
            // physioData,
            // subscriptionData,
            headerTheme: 'white',
            headerPosition: 'fixed',
            // profile,
            // siteConfig
        },
    }
}

export default withCookies(MachineList)