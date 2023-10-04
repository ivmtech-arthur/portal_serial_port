import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import {
    createTheme,
    ThemeProvider,
    styled as muiStyled,
} from '@mui/material/styles'

import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridLinkOperator
} from '@mui/x-data-grid';
import { DataGridPremium } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import SvgIconVectorUp from '/public/svg/icon_vector_up.svg'
import SvgIconVectorDown from '/public/svg/icon_vector_down.svg'
import { SvgIcon } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { GridFilterPanel } from '@mui/x-data-grid';
import StyledTextFieldSearch from '../TextField/styledTextFieldSearch';
import { Block } from '@mui/icons-material';
const theme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter',
                    border: "none",
                    // width: 'auto,
                    // borderRadius: '32px',
                },
                main: {
                    border: "1px solid black",
                    borderRadius: '32px',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // alignItems: 'center',
                },
                row: {
                    // backgroundColor: 'red',
                }
            },
            defaultProps: {
                main: {

                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    fontFamily: 'Inter',
                    backgroundColor: 'white',
                    color: '#BF94E4',
                    "&:hover": {
                        translate: '0px -5px',
                        backgroundColor: 'white',
                        color: '#570680',
                    },
                    "&.Mui-selected": {
                        backgroundColor: 'white',
                        textDecorationLine: 'underline',
                        color: '#570680',
                        "&:hover": {
                            translate: '0px -5px',
                            backgroundColor: 'white',
                            color: '#570680',
                        },
                    }
                },
            }
        },
        MuiPagination: {
            styleOverrides: {

            }
        }
    },

})

const useStyles = makeStyles({
    grid: {
        margin: 'auto',
    }
});

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const classes = useStyles();
    return (
        <Pagination
            className={classes.grid}
            color="primary"
            // variant="outlined"
            // shape="rounded"
            page={page + 1}
            count={pageCount}
            selected
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}


const CustomGridFilterPanel = (props) => {
    return (
        <GridFilterPanel />
    )
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            {
                <Block>
                    <GridToolbarFilterButton />
                    <StyledTextFieldSearch placeholder="search" />
                </Block>

            }
        </GridToolbarContainer>
    )
}


export default function CustomTable(props) {
    const { rows, columns, onRowClick, hideFooter, filter } = props
    useEffect(() => {
        console.log("useEffect filter",filter)
    },[filter])
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick={true}
                    hideFooter={hideFooter}
                    rowGroupingColumnMode={'single'}
                    onRowClick={(e) => { onRowClick(e) }}
                    // onRowDoubleClick={(e)=>{onRowClick(e)}}
                    // experimentalFeatures={{ newEditingApi: true }}
                    {...(filter ? {
                        filterModel:{
                            items: [...filter],
                            linkOperator: GridLinkOperator.Or
                        }
                    } : {

                    })}
                    group
                    components={{
                        Pagination: CustomPagination,
                        FilterPanel: CustomGridFilterPanel,
                        // Toolbar: CustomToolbar,
                        ColumnSortedAscendingIcon: SvgIconVectorDown,
                        ColumnSortedDescendingIcon: SvgIconVectorUp,
                    }}
                />
            </Box>
        </ThemeProvider>

    );
}

