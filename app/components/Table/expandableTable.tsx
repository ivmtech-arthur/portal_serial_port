import MUIDataTable, { MUIDataTableOptions, MUIDataTableProps } from "mui-datatables";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Block from 'components/Common/Element/Block'
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
  GridLinkOperator,
  GridFooter,
  GridPagination,
  GridCallbackDetails
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import SvgIconVectorUp from '/public/svg/icon_vector_up.svg'
import SvgIconVectorDown from '/public/svg/icon_vector_down.svg'
import { Button, Collapse, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon, TableFooter, TablePagination, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { GridFilterPanel } from '@mui/x-data-grid';
import StyledTextFieldSearch from '../TextField/styledTextFieldSearch';
import type { } from '@mui/x-data-grid/themeAugmentation';
import StyledTextSelectField from 'components/TextField/styledTextSelectField';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StyledDropDownButton from 'components/TextField/styledDropDownButton';

const theme = createTheme({
  components: {
    MUIDataTable: {
      styleOverrides: {
        root: {
          padding: '1.25rem'
        },
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          margin: 0,
          borderRadius: 0,
          fontFamily: 'Inter',
          backgroundColor: 'white',
          color: '#6c757d',
          border: "1px solid #dee2e6",
          "&:hover": {
            translate: '0px -5px',
            backgroundColor: '#dee2e6',
            // color: '#dee2e6',
          },
          "&:img": {
            display: 'none'
          },
          "&.Mui-selected": {
            backgroundColor: '#3B7DDD',
            textDecorationLine: 'underline',
            color: 'white',
            "&:hover": {
              translate: '0px -5px',
              backgroundColor: '#3B7DDD',
              // color: '#3B7DDD',
            },
          }
        },
      }
    },
    MuiSelect: {
      styleOverrides: {
        // select: {
        //     ":focus": {
        //         border: "1px solid red"
        //     }
        // },
        outlined: {
          padding: '0',
          paddingLeft: '5px',

        },
        icon: {
          // display: 'none'
          color: 'white'
        }
      }
    },
    MuiPagination: {
      styleOverrides: {

      }
    }
  },

})


function CustomPagination(props) {
  const { changeRowsPerPage, rowPerPage, changePage, page, rowCount, pageNum } = props
  const [localPage, setLocalPage] = useState("");

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    changePage(0)

  };


  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    changePage(Math.max(0, pageNum - 1))
  };

  return (
    <Block className="flex justify-between">

      <StyledDropDownButton id="search" width="60px" options={[5, 10, 25, 50]} value={rowPerPage} onChange={(e: SelectChangeEvent) => {
        changeRowsPerPage(parseInt(e.target.value))
      }} theme={theme} />

      <Block className="flex">
        <IconButton
          className="rounded-none h-8 border-[#dee2e6]"
          sx={{
            "&:hover": {
              translate: '0px -5px',
              backgroundColor: '#dee2e6',
            },
            width: '32px',
            height: '32px',
            borderRadius: 0,
            border: "1px solid",
            borderColor: "primary.main"
          }}
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <Pagination
          className=""
          color="primary"
          page={page + 1}
          count={pageNum}
          onChange={(event, value) => changePage(value - 1)}
        />
        <IconButton
          className="rounded-none h-8 border-[#dee2e6]"
          //  sx={{

          //  }}
          sx={{
            "&:hover": {
              translate: '0px -5px',
              backgroundColor: '#dee2e6',
              // color: '#dee2e6',
            },
            width: '32px',
            height: '32px',
            borderRadius: 0,
            border: "1px solid",
            borderColor: "primary.main"
          }}
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(page) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Block>
      {/* <TablePagination/> */}

    </Block>

  );
}

const ExpandableRowTable = (props) => {
  const columns = [
    {
      name: "Name"
    },
    {
      name: "Title"
    },
    {
      name: "Location"
    },
    {
      name: "Age"
    },
    {
      name: "Salary"
    }
  ];
  const data = [
    ["Gabby George", "Business Analyst", "Minneapolis", 30, 100000],
    ["Business Analyst", "Business Consultant", "Dallas", 55, 200000],
    ["Jaden Collins", "Attorney", "Santa Ana", 27, 500000],
    ["Franky Rees", "Business Analyst", "St. Petersburg", 22, 50000],
    ["Aaren Rose", "Business Consultant", "Toledo", 28, 75000],
    ["Blake Duncan", "Business Management Analyst", "San Diego", 65, 94000],
    ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, 210000],
    ["Lane Wilson", "Commercial Specialist", "Omaha", 19, 65000],
    ["Robin Duncan", "Business Analyst", "Los Angeles", 20, 77000],
    ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, 135000],
    ["Harper White", "Attorney", "Pittsburgh", 52, 420000],
    ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, 150000],
    ["Frankie Long", "Industrial Analyst", "Austin", 31, 170000],
    ["Brynn Robbins", "Business Analyst", "Norfolk", 22, 90000],
    ["Justice Mann", "Business Consultant", "Chicago", 24, 133000],
    ["Addison Navarro", "Business Management Analyst", "New York", 50, 295000],
    ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, 200000],
    ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, 400000],
    ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, 110000],
    ["Danny Leon", "Computer Scientist", "Newark", 60, 220000],
    ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, 180000],
    ["Jesse Hall", "Business Analyst", "Baltimore", 44, 99000],
    ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, 90000],
    ["Terry Macdonald", "Commercial Specialist", "Miami", 39, 140000],
    ["Justice Mccarthy", "Attorney", "Tucson", 26, 330000],
    ["Silver Carey", "Computer Scientist", "Memphis", 47, 250000],
    ["Franky Miles", "Industrial Analyst", "Buffalo", 49, 190000],
    ["Glen Nixon", "Corporate Counselor", "Arlington", 44, 80000],
    [
      "Gabby Strickland",
      "Business Process Consultant",
      "Scottsdale",
      26,
      45000
    ],
    ["Mason Ray", "Computer Scientist", "San Francisco", 39, 142000]
  ];

  const options: MUIDataTableOptions = {
    filter: true,
    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
      return (
        <CustomPagination pageNum={data.length / rowPerPage} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
      );
    },
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    filterType: "dropdown",
    // responsive: "scrollMaxHeight",
    rowsPerPage: 5,
    expandableRows: true,
    selectableRowsHideCheckboxes: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <Block>
          Collase Element to be added
        </Block>
      );
    },
    page: 1
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Block className="p-5 min-h-0"> */}
      <MUIDataTable
        title={"ACME Employee list"}
        data={data}
        columns={columns}
        options={options}
      />
      {/* </Block> */}

    </ThemeProvider>

  );
};

export default ExpandableRowTable;
