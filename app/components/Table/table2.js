import CustomTable from "./table";
import Block from '/components/Common/Element/Block'
import SvgIcon from "@mui/material";
import SvgIconDeleteGrey from '/public/svg/icon_delete_grey.svg'
import SvgIconDeleteBlack from '/public/svg/icon_delete_black.svg'
import SvgIconArrowGrey from '/public/svg/icon_more_arrow_grey.svg'
import SvgIconArrowBlack from '/public/svg/icon_more_arrow_black.svg'
import SvgIconStarFill from '/public/svg/icon_star_fill.svg'
import SvgIconStarEmpty from '/public/svg/icon_star_empty.svg'
import { useEffect, useState } from "react";
import { IconButton, Icon } from "@mui/material";
import { Button } from "@mui/material";
import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import StyledBodyBold1 from "../Common/Element/bodyBold1";
// const CustDeleteButton = () => {
//     return (

//     )
// }

const CustomScoreField = (props) => {
    const { params } = props
    const [hover, setHover] = useState(false)
    const score = 3
    return (
        <Block display='flex'>
            {map([1, 2, 3, 4, 5], (item, index) => {
                if (score >= item)
                    return (<SvgIconStarFill />)
                else {
                    return (<SvgIconStarEmpty />)
                }
            })}


        </Block>
    )
}

const CustomMoreButton = (props) => {
    const { params,handleClickMore } = props
    const [hover, setHover] = useState(false)
    return (
        <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={(event) => {
                setHover(false)
                event.stopPropagation()
                handleClickMore(params)
            }}
            // sx={{ mr: 2, visibility: { md: 'hidden' } }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
        >
            {hover ? <SvgIconArrowBlack /> : <SvgIconArrowGrey />}
        </IconButton>
    )
}


const Table2 = (props) => {
    const { handleClickMore, groupedRows, onRowClick, } = props
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'exerciseName',
            headerName: 'Exercise Name',
            width: 300,
            editable: true,
            renderCell: (params) => {
                let name = ""
                if (params.row.attributes?.exercise_video?.data?.attributes?.exerciseName)
                    name = params.row.attributes.exercise_video.data.attributes.exerciseName
                return (<div>{name}</div>)
            }
        },
        {
            field: 'excerciseDuration',
            headerName: 'Time',
            width: 150,
            editable: true,
            renderCell: (params) => {
                let duration = null

                if (params.row.attributes?.exercise_video?.data?.attributes?.exerciseDuration)
                    duration = params.row.attributes.exercise_video.data.attributes.exerciseDuration
                return (<div>{duration}</div>)
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            editable: true,
            renderCell: (params) => {
                return (<Block>Completed</Block>)
            }
        },
        {
            field: 'score',
            headerName: 'score',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                // const score = params.row.score
                return <CustomScoreField params={params} />
            }
        },
        {
            field: 'attributes.exerciseTimestamp',
            headerName: 'finished Time',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'more',
            headerName: '',
            width: 50,
            align: 'center',
            renderCell: (params) => {
                return <CustomMoreButton params={params} handleClickMore={handleClickMore}/>
            }
        },
        {

        }
    ];

    const tables = map(groupedRows, (rows, index) => {
        return (<Block>
            <StyledBodyBold1>{index}</StyledBodyBold1>
            <CustomTable columns={columns} rows={rows} hideFooter />
        </Block>)
    })

    return (
        <Block>
            {/* <CustomTable rows={rows} columns={columns} onRowClick={onRowClick} hideFooter />
            <CustomTable rows={rows} columns={columns} onRowClick={onRowClick} hideFooter />
            <CustomTable rows={rows} columns={columns} onRowClick={onRowClick} hideFooter /> */}
            {tables}
        </Block>

    )
}

export default Table2