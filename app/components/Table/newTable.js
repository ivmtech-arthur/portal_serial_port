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
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import SvgIconVectorUp from '/public/svg/icon_vector_up.svg'
import SvgIconVectorDown from '/public/svg/icon_vector_down.svg'
import { Button, SvgIcon } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { GridFilterPanel } from '@mui/x-data-grid';
import StyledTextFieldSearch from '../TextField/styledTextFieldSearch';
import { Block } from '@mui/icons-material';

const tableData = [
    {
        id: 1,
        name: "Tiger Nixon",
        position: "System Architect",
        office: "Edinburgh",
        age: 61,
        startDate: "2011/04/25",
        salary: "$320,800"
    },
    {
        id: 2, name: "Garrett Winters",
        position: "Accountant",
        office: "Tokyo",
        age: 63,
        startDate: "2011/07/25",
        salary: "$170,750"
    },
    {
        id: 3, name: "Ashton Cox",
        position: "Junior Technical Author",
        office: "San Francisco",
        age: 66,
        startDate: "2009/01/12",
        salary: "$86,000"
    },
    {
        id: 4, name: "Cedric Kelly",
        position: "Senior Javascript Developer",
        office: "Edinburgh",
        age: 22,
        startDate: "2012/03/29",
        salary: "$433,060"
    },
    {
        id: 5, name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: 33,
        startDate: "2008/11/28",
        salary: "$162,700"
    },
    {
        id: 6, name: "Brielle Williamson",
        position: "Integration Specialist",
        office: "New York",
        age: 61,
        startDate: "2012/12/02",
        salary: "$372,000"
    },
    {
        id: 7, name: "Herrod Chandler",
        position: "Sales Assistant",
        office: "San Francisco",
        age: 59,
        startDate: "2012/08/06",
        salary: "$137,500"
    },
    {
        id: 8, name: "Rhona Davidson",
        position: "Integration Specialist",
        office: "Tokyo",
        age: 55,
        startDate: "2010/10/14",
        salary: "$327,900"
    },
    {
        id: 9, name: "Colleen Hurst",
        position: "Javascript Developer",
        office: "San Francisco",
        age: 39,
        startDate: "2009/09/15",
        salary: "$205,500"
    },
    {
        id: 10, name: "Sonya Frost",
        position: "Software Engineer",
        office: "Edinburgh",
        age: 23,
        startDate: "2008/12/13",
        salary: "$103,600"
    },
    {
        id: 11, name: "Jena Gaines",
        position: "Office Manager",
        office: "London",
        age: 30,
        startDate: "2008/12/19",
        salary: "$90,560"
    },
    {
        id: 12, name: "Quinn Flynn",
        position: "Support Lead",
        office: "Edinburgh",
        age: 22,
        startDate: "2013/03/03",
        salary: "$342,000"
    },
    {
        id: 13, name: "Charde Marshall",
        position: "Regional Director",
        office: "San Francisco",
        age: 36,
        startDate: "2008/10/16",
        salary: "$470,600"
    },
    {
        id: 14, name: "Haley Kennedy",
        position: "Senior Marketing Designer",
        office: "London",
        age: 43,
        startDate: "2012/12/18",
        salary: "$313,500"
    },
    {
        id: 15, name: "Tatyana Fitzpatrick",
        position: "Regional Director",
        office: "London",
        age: 19,
        startDate: "2010/03/17",
        salary: "$385,750"
    },
    {
        id: 16, name: "Michael Silva",
        position: "Marketing Designer",
        office: "London",
        age: 66,
        startDate: "2012/11/27",
        salary: "$198,500"
    },
    {
        id: 17, name: "Paul Byrd",
        position: "Chief Financial Officer (CFO)",
        office: "New York",
        age: 64,
        startDate: "2010/06/09",
        salary: "$725,000"
    },
    {
        id: 18, name: "Gloria Little",
        position: "Systems Administrator",
        office: "New York",
        age: 59,
        startDate: "2009/04/10",
        salary: "$237,500"
    },
    {
        id: 19, name: "Bradley Greer",
        position: "Software Engineer",
        office: "London",
        age: 41,
        startDate: "2012/10/13",
        salary: "$132,000"
    },
    {
        id: 20, name: "Dai Rios",
        position: "Personnel Lead",
        office: "Edinburgh",
        age: 35,
        startDate: "2012/09/26",
        salary: "$217,500"
    },
    {
        id: 21, name: "Jenette Caldwell",
        position: "Development Lead",
        office: "New York",
        age: 30,
        startDate: "2011/09/03",
        salary: "$345,000"
    },
    {
        id: 22, name: "Yuri Berry",
        position: "Chief Marketing Officer (CMO)",
        office: "New York",
        age: 40,
        startDate: "2009/06/25",
        salary: "$675,000"
    },
    {
        id: 23, name: "Caesar Vance",
        position: "Pre-Sales Support",
        office: "New York",
        age: 21,
        startDate: "2011/12/12",
        salary: "$106,450"
    },
    {
        id: 24, name: "Doris Wilder",
        position: "Sales Assistant",
        office: "Sidney",
        age: 23,
        startDate: "2010/09/20",
        salary: "$85,600"
    },
    {
        id: 25, name: "Angelica Ramos",
        position: "Chief Executive Officer (CEO)",
        office: "London",
        age: 47,
        startDate: "2009/10/09",
        salary: "$1,200,000"
    },
    {
        id: 26, name: "Gavin Joyce",
        position: "Developer",
        office: "Edinburgh",
        age: 42,
        startDate: "2010/12/22",
        salary: "$92,575"
    },
    {
        id: 27, name: "Jennifer Chang",
        position: "Regional Director",
        office: "Singapore",
        age: 28,
        startDate: "2010/11/14",
        salary: "$357,650"
    },
    {
        id: 28, name: "Brenden Wagner",
        position: "Software Engineer",
        office: "San Francisco",
        age: 28,
        startDate: "2011/06/07",
        salary: "$206,850"
    },
    {
        id: 29, name: "Fiona Green",
        position: "Chief Operating Officer (COO)",
        office: "San Francisco",
        age: 48,
        startDate: "2010/03/11",
        salary: "$850,000"
    },
    {
        id: 30, name: "Shou Itou",
        position: "Regional Marketing",
        office: "Tokyo",
        age: 20,
        startDate: "2011/08/14",
        salary: "$163,000"
    },
    {
        id: 31, name: "Michelle House",
        position: "Integration Specialist",
        office: "Sidney",
        age: 37,
        startDate: "2011/06/02",
        salary: "$95,400"
    },
    {
        id: 32, name: "Suki Burks",
        position: "Developer",
        office: "London",
        age: 53,
        startDate: "2009/10/22",
        salary: "$114,500"
    },
    {
        id: 33, name: "Prescott Bartlett",
        position: "Technical Author",
        office: "London",
        age: 27,
        startDate: "2011/05/07",
        salary: "$145,000"
    },
    {
        id: 34, name: "Gavin Cortez",
        position: "Team Leader",
        office: "San Francisco",
        age: 22,
        startDate: "2008/10/26",
        salary: "$235,500"
    },
    {
        id: 35, name: "Martena Mccray",
        position: "Post-Sales support",
        office: "Edinburgh",
        age: 46,
        startDate: "2011/03/09",
        salary: "$324,050"
    },
    {
        id: 36, name: "Unity Butler",
        position: "Marketing Designer",
        office: "San Francisco",
        age: 47,
        startDate: "2009/12/09",
        salary: "$85,675"
    },
    {
        id: 37, name: "Howard Hatfield",
        position: "Office Manager",
        office: "San Francisco",
        age: 51,
        startDate: "2008/12/16",
        salary: "$164,500"
    },
    {
        id: 38, name: "Hope Fuentes",
        position: "Secretary",
        office: "San Francisco",
        age: 41,
        startDate: "2010/02/12",
        salary: "$109,850"
    },
    {
        id: 39, name: "Vivian Harrell",
        position: "Financial Controller",
        office: "San Francisco",
        age: 62,
        startDate: "2009/02/14",
        salary: "$452,500"
    },
    {
        id: 40, name: "Timothy Mooney",
        position: "Office Manager",
        office: "London",
        age: 37,
        startDate: "2008/12/11",
        salary: "$136,200"
    },
    {
        id: 41, name: "Jackson Bradshaw",
        position: "Director",
        office: "New York",
        age: 65,
        startDate: "2008/09/26",
        salary: "$645,750"
    },
    {
        id: 42, name: "Olivia Liang",
        position: "Support Engineer",
        office: "Singapore",
        age: 64,
        startDate: "2011/02/03",
        salary: "$234,500"
    },
    {
        id: 43, name: "Bruno Nash",
        position: "Software Engineer",
        office: "London",
        age: 38,
        startDate: "2011/05/03",
        salary: "$163,500"
    },
    {
        id: 44, name: "Sakura Yamamoto",
        position: "Support Engineer",
        office: "Tokyo",
        age: 37,
        startDate: "2009/08/19",
        salary: "$139,575"
    },
    {
        id: 45, name: "Thor Walton",
        position: "Developer",
        office: "New York",
        age: 61,
        startDate: "2013/08/11",
        salary: "$98,540"
    },
    {
        id: 46, name: "Finn Camacho",
        position: "Support Engineer",
        office: "San Francisco",
        age: 47,
        startDate: "2009/07/07",
        salary: "$87,500"
    },
    {
        id: 47, name: "Serge Baldwin",
        position: "Data Coordinator",
        office: "Singapore",
        age: 64,
        startDate: "2012/04/09",
        salary: "$138,575"
    },
    {
        id: 48, name: "Zenaida Frank",
        position: "Software Engineer",
        office: "New York",
        age: 63,
        startDate: "2010/01/04",
        salary: "$125,250"
    },
    {
        id: 49, name: "Zorita Serrano",
        position: "Software Engineer",
        office: "San Francisco",
        age: 56,
        startDate: "2012/06/01",
        salary: "$115,000"
    },
    {
        id: 50, name: "Jennifer Acosta",
        position: "Junior Javascript Developer",
        office: "Edinburgh",
        age: 43,
        startDate: "2013/02/01",
        salary: "$75,650"
    },
    {
        id: 51, name: "Cara Stevens",
        position: "Sales Assistant",
        office: "New York",
        age: 46,
        startDate: "2011/12/06",
        salary: "$145,600"
    },
    {
        id: 52, name: "Hermione Butler",
        position: "Regional Director",
        office: "London",
        age: 47,
        startDate: "2011/03/21",
        salary: "$356,250"
    },
    {
        id: 53, name: "Lael Greer",
        position: "Systems Administrator",
        office: "London",
        age: 21,
        startDate: "2009/02/27",
        salary: "$103,500"
    },
    {
        id: 54, name: "Jonas Alexander",
        position: "Developer",
        office: "San Francisco",
        age: 30,
        startDate: "2010/07/14",
        salary: "$86,500"
    },
    {
        id: 55, name: "Shad Decker",
        position: "Regional Director",
        office: "Edinburgh",
        age: 51,
        startDate: "2008/11/13",
        salary: "$183,000"
    },
    {
        id: 56, name: "Michael Bruce",
        position: "Javascript Developer",
        office: "Singapore",
        age: 29,
        startDate: "2011/06/27",
        salary: "$183,000"
    },
    {
        id: 57, name: "Donna Snider",
        position: "Customer Support",
        office: "New York",
        age: 27,
        startDate: "2011/01/25",
        salary: "$112,000"
    }
];

const columns = [
    {
        field: 'id', headerName: "id", width: 90, flex: 1,
    },
    {
        field: 'name',
        headerName: "name",
        flex: 1,
        // valueGetter: (params) => {
        //     const name = params.row.attributes?.name
        //     return name
        // }
    },
    {
        field: 'position',
        headerName: "position",
        flex: 1,
        // valueGetter: (params) => {
        //     const rehabitType = params.row.attributes?.rehabitType
        //     return rehabitType
        // }
    },
    {
        field: 'office',
        headerName: "office",
        flex: 1,
    },
    {
        field: 'age',
        headerName: "age",
        flex: 1,
    },
    {
        field: 'salary',
        headerName: "salary",
        flex: 1,
    },
    {
        field: 'startDate',
        headerName: "startDate",
        flex: 1,
    },
];

const tableColumns = [
    {
        dataField: "name",
        text: "Name",
        sort: true
    },
    {
        dataField: "position",
        text: "Position",
        sort: true
    },
    {
        dataField: "office",
        text: "Office",
        sort: true
    },
    {
        dataField: "age",
        text: "Age",
        sort: true
    },
    {
        dataField: "startDate",
        text: "Start Date",
        sort: true
    },
    {
        dataField: "salary",
        text: "Salary",
        sort: true
    }
];

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
                    "&:img": {
                        display: 'none'
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
            // selected
            // @ts-expect-error
            // renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
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
                    {/* <GridToolbarFilterButton /> */}
                    <StyledTextFieldSearch placeholder="search" />
                </Block>

            }
        </GridToolbarContainer>
    )
}


export default function CustomTable3(props) {
    // const { rows, columns, onRowClick, hideFooter, filter } = props
    // useEffect(() => {
    //     console.log("useEffect filter", filter)
    // }, [filter])
    return (
        <ThemeProvider theme={theme}>
           
            <Box className="relative flex flex-col min-w-0 bg-white bg-clip-border border rounded h-96">
                <Block className="px-3 py-5 mb-0 border-b-2">
                    Export test
                    <Block className="float-right">
                        <Button>Export</Button>
                    </Block>
                </Block>
                <Block className="p-5 min-h-0">

                </Block>
                <DataGrid
                    className=""
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    disableSelectionOnClick={true}
                    // hideFooter={hideFooter}
                    // rowGroupingColumnMode={'single'}
                    // onRowClick={(e) => { onRowClick(e) }}
                    // onRowDoubleClick={(e)=>{onRowClick(e)}}
                    experimentalFeatures={{ newEditingApi: true }}
                    // {...(filter ? {
                    //     filterModel: {
                    //         items: [...filter],
                    //         linkOperator: GridLinkOperator.Or
                    //     }
                    // } : {

                    // })}
                    // group
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
