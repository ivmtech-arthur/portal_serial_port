import MUIDataTable, { MUIDataTableOptions,MUIDataTableToolbar, MUIDataTableProps, MUIDataTableColumn, MUIDataTableColumnDef } from "mui-datatables";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Theme, ButtonGroup, Drawer } from "@mui/material";
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect,useRef } from 'react';
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
import BasicButton from "components/Button/BasicButton";
import { Add, Download, Filter, FilterList, MoreVert, Search } from "@mui/icons-material";
import { muiTheme } from "styles/mui";
import { DownloadCloud } from "react-feather";
import FilterForm from "./filterForm";

function CustomToolbar(props) { 

  return (<>
    {/* <Button variant="outlined">test</Button> */}
    <BasicButton variant="text" tooltip="Add Record"><Add/></BasicButton>
  </>)
}


function CustomDownloadIcon(props) { 
  // const ref = props.tableRef();
  console.log("toolbar", props)
  return (
    <IconButton><KeyboardArrowDownIcon/></IconButton>
  )
}

function MobileToolbar(props) { 
  const { setDrawerOpen } = props
  const buttons = [
    <BasicButton size="large"  key="search"><Search/></BasicButton>,
    <BasicButton size="large" onClick={() => { 
      setDrawerOpen(true)
    }} key="filter"><FilterList/></BasicButton>,
    <BasicButton size="large" key="download"><DownloadCloud/></BasicButton>,
    <BasicButton key="add"><Add/></BasicButton>,
  ];

  const [open,setOpen] = useState(false)
  return (
    <Box
      sx={{
        // width: "100px",
        // scale: '1.3',
        // transformOrigin: '100% 100% 0',
        // transform
        right: 10,
        bottom: 50,
        position: 'fixed',
        // display: 'flex',
        '& > *': {
          marginX: 1,
        },
      }}
    >
      <Collapse in={open} >
        <ButtonGroup
          // sx={{
          //   transformOrigin: '100% 100% 0',
          // }}
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {buttons}
        </ButtonGroup>  
      </Collapse>
      <BasicButton
        size="large"
        onClick={() => {
        setOpen(!open)
      }}>
        <MoreVert/>
    </BasicButton>
    </Box>
  )
}


function CustomPagination(props) {
  const { changeRowsPerPage, rowPerPage, changePage, page, rowCount, pageNum } = props
  const [localPage, setLocalPage] = useState("");
  const [tempPageNum, setTempPageNum] = useState(pageNum);
  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    changePage(0)

  };
  // console.log("page",pageNum,page,tempPageNum)
  useEffect(() => { 
    if (pageNum == 0) {
      setTempPageNum(1)
    } else { 
      setTempPageNum(pageNum)
    }
    if (pageNum <= page) { 
      changePage(Math.max(0,pageNum - 1))
    }
  },[pageNum])

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    changePage(Math.max(0, pageNum - 1))
  };

  return (
    <Block className="flex justify-between">

      <StyledDropDownButton id="search" width="60px" options={[5, 10, 25, 50]} value={rowPerPage} onChange={(e: SelectChangeEvent) => {
        changeRowsPerPage(parseInt(e.target.value))
      }} theme={muiTheme} />

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
          {muiTheme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <Pagination
          className=""
          color="primary"
          page={page + 1}
          count={tempPageNum == 0 ? 1 : tempPageNum}
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
          {muiTheme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Block>
      {/* <TablePagination/> */}

    </Block>

  );
}

function createCritieras(columns, data) { 
  var mapping = {};
  var result = columns.reduce((tempResult, value, index) => {
    tempResult[value.name] = [];
    mapping[index] = value.name
    return tempResult
  }, {})
  console.log("createCrtieria",result,columns,data)
    data.forEach((entries) => {
      result[mapping[0]].push(entries[0])
      result[mapping[1]].push(entries[1])
      result[mapping[2]].push(entries[2])
      result[mapping[3]].push(entries[3])
      result[mapping[4]].push(entries[4])
    })
    return result
  // return {}
}

const ExpandableRowTable = (props) => {
  const [drawerOpen,setDrawerOpen] = useState(false)
  const tableRef = useRef(null);

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

  const mobileColumn: MUIDataTableColumnDef[] = [
    {
      name: "Salary",
      options: {
        filterList: [],
      }
    }
  ]
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

  const criterias = createCritieras(columns, data)

  const options: MUIDataTableOptions = {
    filter: true,
    customToolbar: (data) => { return <CustomToolbar/> },
    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
      return (
        <CustomPagination pageNum={Math.ceil(data.length / rowPerPage)} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
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

  const mobileOptions: MUIDataTableOptions = {
    filter: true,
    // customToolbar: (data) => { return null },
    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
      return (
        <CustomPagination pageNum={Math.ceil(data.length / rowPerPage)} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
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
    page: 1,
    searchText: "",
    // print
    // selectToolbarPlacement: "above",
    // download: false
  };

  return (
    <ThemeProvider theme={muiTheme}>
      {/* <Block className="p-5 min-h-0"> */}
      <Block className="md:block xs:hidden">
        <MUIDataTable
          // components={ }
          
          title={"ACME Employee list"}
          data={data}
          columns={columns}
          options={options}
        />
      </Block>
     
      <Block className="md:hidden">
        <MUIDataTable
          components={{
            // TableToolbar: () => { return null}
            // TableToolbarSelect: CustomDownloadIcon
            // icons: {
            //   TableToolbarSelect: CustomDownloadIcon
            // }
          }}
          innerRef={tableRef}
          title={"ACME Employee list"}
          data={data}
          columns={mobileColumn}
          options={mobileOptions}
        />
        {/* <BasicButton onClick={() => { 
          console.log("click,",tableRef)
        }}>test</BasicButton>
        <BasicButton onClick={() => {
          console.log("click,", tableRef)
        }}>test</BasicButton> */}
        <MobileToolbar setDrawerOpen={setDrawerOpen} />
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => { setDrawerOpen(false) }}
        >
          <FilterForm criterias={criterias} />
          </Drawer>
      </Block>
      {/* </Block> */}

    </ThemeProvider>

  );
};

export default ExpandableRowTable;
