import MUIDataTable, { MUIDataTableOptions, MUIDataTableToolbar, MUIDataTableProps, MUIDataTableColumn, MUIDataTableColumnDef } from "mui-datatables";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Theme, ButtonGroup, Drawer, TextField } from "@mui/material";
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
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
import { Add, Delete, Download, Edit, Filter, FilterList, More, MoreHoriz, MoreVert, Search } from "@mui/icons-material";
import { muiTheme } from "styles/mui";
import { DownloadCloud } from "react-feather";
import FilterForm from "./filterForm";

import SvgIconDeleteGrey from 'public/svg/icon_delete_grey.svg'
import SvgIconDeleteBlack from 'public/svg/icon_delete_black.svg'
import SvgIconEditGrey from 'public/svg/icon_edit_grey.svg'
import SvgIconEditBlack from 'public/svg/icon_edit_black.svg'
import SvgIconMore from 'public/svg/icon_more_arrow_black.svg'
import SearchForm from "./searchForm";

function CustomToolbar(props) {

  return (<>
    {/* <Button variant="outlined">test</Button> */}
    <BasicButton variant="text" tooltip="Add Record"><Add /></BasicButton>
  </>)
}


function CustomDownloadIcon(props) {
  // const ref = props.tableRef();
  console.log("toolbar", props)
  return (
    <IconButton><KeyboardArrowDownIcon /></IconButton>
  )
}

function MobileToolbar(props) {
  const { setDrawerOpen,setDrawerAction } = props
  const buttons = [
    <BasicButton size="large" key="search" onClick={() => {
      setDrawerOpen(true)
      setDrawerAction("search")
    }}><Search /></BasicButton>,
    <BasicButton size="large" onClick={() => {
      setDrawerOpen(true)
      setDrawerAction("filter")
    }} key="filter"><FilterList /></BasicButton>,
    <BasicButton size="large" key="download"><DownloadCloud /></BasicButton>,
    <BasicButton key="add"><Add /></BasicButton>,
  ];

  const [open, setOpen] = useState(false)
  return (
    <Box
      sx={{
        // width: "100px",
       
        // trnasform: 'translate(100%,100%)',
        transformOrigin: '0 100% 0',
        scale: '1.3',
        // transform
        zIndex: 9999,
        right: 10,
        bottom: 50,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        // size="large"
        onClick={() => {
          setOpen(!open)
        }}>
        <MoreVert />
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
  console.log("page is", pageNum, page, tempPageNum)
  useEffect(() => {
    if (pageNum == 0) {
      setTempPageNum(1)
    } else {
      setTempPageNum(pageNum)
    }
    if (pageNum <= page) {
      changePage(Math.max(0, pageNum - 1))
    }
  }, [pageNum])

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
  console.log("createCrtieria", result, columns, data)
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

const CustomEditButton = (props) => {
  const [hover, setHover] = useState(false)
  const { params, handleClickEdit } = props
  return (
    <BasicButton
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
      {/* {hover ? <SvgIconEditBlack /> : <SvgIconEditGrey />} */}
      {<Edit/>}
    </BasicButton>
  )
}

const CustomDeleteButton = (props) => {
  const [hover, setHover] = useState(false)
  const { params, handleClickDelete } = props
  return (<BasicButton
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
    <Delete/>
  </BasicButton>)
}

const CustomMoreButton = (props) => {
  const { handleClickDelete, handleClickEdit, params } = props
  const [showMore, setShowMore] = useState(false)
  return (
    
    // <Block className="relative">
    //   <Collapse
    //     sx={{ position: "absolute" }}
    //     className="absolute"
    //     in={showMore}
    //   // bg='lightGrey1' borderRadius='16px' zIndex='10' position='absolute' right='10%' pl='15px' alignItems='center'
    //   >
    //     <ButtonGroup
    //       orientation="vertical"
    //       aria-label="vertical contained button group"
    //       variant="contained"
    //     >
    //       <CustomDeleteButton params={params} handleClickDelete={handleClickDelete} />
    //       <CustomEditButton params={params} handleClickEdit={handleClickEdit} />
    //     </ButtonGroup>



    //   </Collapse>
    //   <IconButton
    //     color="primary"
    //     aria-label="open drawer"
    //     edge="start"
    //     onClick={(event) => {
    //       event.stopPropagation();
    //       setShowMore(!showMore)
    //     }}
    //   >
    //     {/* <SvgIconDeleteGrey /> */}
    //     {<SvgIconMore />}
    //   </IconButton>
    // </Block>
    <Block
      className="h-[inherit] w-[inherit] relative"
    >
      <Box
        sx={{
          // width: "100px",
          // scale: '1.3',
          // transformOrigin: '100% 100% 0',
          // transform
          zIndex: 9999,
          right: 0,
          // bottom: 0,
          top: 0,
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          position: 'absolute',
          // position: 'relative',
          display: 'flex',
          '& > *': {
            marginX: 1,
          },
        }}
      >
        <Collapse in={showMore} >
          <ButtonGroup
            // sx={{
            //   transformOrigin: '100% 100% 0',
            // }}
            sx={{
              // position: "absolute",
              // bottom: '30px'
            }}
            // orientation="vertical"
            // aria-label="vertical contained button group"
            variant="contained"
          >
            <CustomDeleteButton params={params} handleClickDelete={handleClickDelete} />
            <CustomEditButton params={params} handleClickEdit={handleClickEdit} />
          </ButtonGroup>
        </Collapse>
        <BasicButton
          sx={{
            // position: "absolute",
          }}
          // color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={(event) => {
            event.stopPropagation();
            setShowMore(!showMore)
          }}
        >
          {/* <SvgIconDeleteGrey /> */}
          {<MoreHoriz />}
        </BasicButton>
      </Box>
    </Block>
    
  )
}


const ExpandableRowTable = (props) => {
  const { columnsFromParent, dataObjList, mobileDataObjList } = props
  var columns = []
  columns = JSON.parse(JSON.stringify(columnsFromParent))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerAction,setDrawerAction] = useState("")
  const tableRef = useRef(null);
  const [filterObj, setFilterObj] = useState({})
  const [searchText,setSearchText] = useState("")

  console.log("ExpandableRowTable props", columns, dataObjList)
  const data = dataObjList.map((dataObj) => {
    var result = Object.assign([], dataObj.data)
    console.log("ExpandableRowTable loopxd", columns, dataObj)
    if (dataObj.edit) {

      if (!columns.some((column) => { return column.name == "edit" })) {
        columns.push({ name: "edit" })
      }
      // if (result.length < columns.length) { 
      result.push(<CustomEditButton />)
      // }

    }
    if (dataObj.delete) {
      if (!columns.some((column) => { return column.name == "delete" })) {
        columns.push({ name: "delete" })
      }

      // if (result.length < columns.length) {
      result.push(<CustomDeleteButton />)
      // }

    }
    return result
  })


  const mobileColumn: MUIDataTableColumnDef[] = [
    ...(columns.map((column) => {
      return {
        name: column.name,
        options: {
          display: column.mobileDisplay,
          ...(filterObj[column.name] ? { filterList: [filterObj[column.name]] } : {}),
        }
      }
    }))
  ]

  const mobileCollapseColumn = columns.filter((column) => {
    return column.mobileCollapse
  }).map((filterColumn) => {
    return {
      ...filterColumn,
      columnIndex: columns.indexOf(filterColumn)
    }
  })

  const mobileData = mobileDataObjList.map((dataObj) => {
    var result = Object.assign([], dataObj.data)
    if (dataObj.more) {
      if (!columns.some((column) => { return column.name == "more" })) {
        // columns.push({name: "more"})
        mobileCollapseColumn.push({
          name: "more", mobileCollapse: true, mobileDisplay: false, columnIndex: columnsFromParent.length
        })
      }
      result.push(<CustomMoreButton />)
    }

    return result
  })




  // const [localPage,setLocalPage] = useState(0)
  // const columns = [
  //   {
  //     name: "Name"
  //   },
  //   {
  //     name: "Title"
  //   },
  //   {
  //     name: "Location"
  //   },
  //   {
  //     name: "Age"
  //   },
  //   {
  //     name: "Salary"
  //   }
  // ];

  // const mobileColumn: MUIDataTableColumnDef[] = [
  //   {
  //     name: "Name",
  //     options: {
  //       ...(filterObj["Name"] ? { filterList: [filterObj["Name"]] } : {}),
  //     }
  //   },


  //   {
  //     name: "Title",
  //     options: {
  //       ...(filterObj["Title"] ? { filterList: [filterObj["Title"]] } : {}),
  //       display: false,
  //     }
  //   },
  //   {
  //     name: "Location",
  //     options: {
  //       ...(filterObj["Location"] ? { filterList: [filterObj["Location"]] } : {}),
  //       display: false,
  //     }
  //   },
  //   {
  //     name: "Age",
  //     options: {
  //       ...(filterObj["Age"] ? { filterList: [filterObj["Age"]] } : {}),
  //       display: false,
  //     }
  //   },
  //   {
  //     name: "Salary",
  //     options: {
  //       ...(filterObj["Salary"] ? { filterList: [filterObj["Salary"]] } : {}),
  //       display: false,
  //     }
  //   },

  // ]
  // const data = [
  //   ["Gabby George", "Business Analyst", "Minneapolis", 30, 100000],
  //   ["Business Analyst", "Business Consultant", "Dallas", 55, 200000],
  //   ["Jaden Collins", "Attorney", "Santa Ana", 27, 500000],
  //   ["Franky Rees", "Business Analyst", "St. Petersburg", 22, 50000],
  //   ["Aaren Rose", "Business Consultant", "Toledo", 28, 75000],
  //   ["Blake Duncan", "Business Management Analyst", "San Diego", 65, 94000],
  //   ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, 210000],
  //   ["Lane Wilson", "Commercial Specialist", "Omaha", 19, 65000],
  //   ["Robin Duncan", "Business Analyst", "Los Angeles", 20, 77000],
  //   ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, 135000],
  //   ["Harper White", "Attorney", "Pittsburgh", 52, 420000],
  //   ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, 150000],
  //   ["Frankie Long", "Industrial Analyst", "Austin", 31, 170000],
  //   ["Brynn Robbins", "Business Analyst", "Norfolk", 22, 90000],
  //   ["Justice Mann", "Business Consultant", "Chicago", 24, 133000],
  //   ["Addison Navarro", "Business Management Analyst", "New York", 50, 295000],
  //   ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, 200000],
  //   ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, 400000],
  //   ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, 110000],
  //   ["Danny Leon", "Computer Scientist", "Newark", 60, 220000],
  //   ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, 180000],
  //   ["Jesse Hall", "Business Analyst", "Baltimore", 44, 99000],
  //   ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, 90000],
  //   ["Terry Macdonald", "Commercial Specialist", "Miami", 39, 140000],
  //   ["Justice Mccarthy", "Attorney", "Tucson", 26, 330000],
  //   ["Silver Carey", "Computer Scientist", "Memphis", 47, 250000],
  //   ["Franky Miles", "Industrial Analyst", "Buffalo", 49, 190000],
  //   ["Glen Nixon", "Corporate Counselor", "Arlington", 44, 80000],
  //   [
  //     "Gabby Strickland",
  //     "Business Process Consultant",
  //     "Scottsdale",
  //     26,
  //     45000
  //   ],
  //   ["Mason Ray", "Computer Scientist", "San Francisco", 39, 142000]
  // ];
  console.log("mobile", mobileColumn, mobileData, mobileCollapseColumn)
  const criterias = createCritieras(columns, data)

  const options: MUIDataTableOptions = {
    filter: true,
    customToolbar: (data) => { return <CustomToolbar /> },
    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
      return (
        <CustomPagination pageNum={Math.ceil(data.length / rowPerPage)} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
      );
    },

    selectableRows: "single",
    filterType: "dropdown",
    // responsive: "scrollMaxHeight",
    rowsPerPage: 5,
    expandableRows: false,
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
      // setLocalPage(page)
      return (
        <CustomPagination pageNum={Math.ceil(rowCount / rowPerPage)} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
      );
    },
    onChangePage: (page) => {
      console.log()
    },
    onFilterChipClose: (index, removeFilter, filterList) => {
      var field: any = mobileColumn[index];
      delete filterObj[field.name]
      setFilterObj({ ...filterObj })
      console.log("onFIlterChipClose", index, removeFilter, filterList, filterObj, field);
    },
    onFilterChange: (changedColumn, filterList) => {
      console.log("onFIlterChange", changedColumn, filterList);
    },
    // onTableChange
    selectableRows: "single",
    filterType: "dropdown",

    // responsive: "scrollMaxHeight",
    rowsPerPage: 5,
    expandableRows: true,
    selectableRowsHideCheckboxes: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log("rowData", mobileCollapseColumn, rowData, rowData.filter((rowItem, index) => {
        return mobileCollapseColumn.map((filteredColumn, index2) => {
          return filteredColumn.columnIndex
        }).includes(index)
      }))
      const tableHeaderList = mobileCollapseColumn.map((filteredColumn) => {
        return <TableCell align="right">{filteredColumn.name}</TableCell>
      })
      const tableCellList = rowData.filter((rowItem, index) => {
        return mobileCollapseColumn.map((filteredColumn, index2) => {
          return filteredColumn.columnIndex
        }).includes(index)
      }).map((filteredRowItem: any) => {

        return <TableCell align="right">{(filteredRowItem == true) ? "true" : filteredRowItem}</TableCell>
        // } else {
        //   continue
        // }
        // <TableCell component="th" scope="row">

      })
      console.log("renderExpand", rowData, rowMeta,
        tableCellList, tableHeaderList);
      return (
        <Fragment>
          <tr>
            <td colSpan={6}>
              {/* <Block> */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {tableHeaderList}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={rowMeta.dataIndex}>

                      {tableCellList}
                    </TableRow>
                  </TableBody>
                </Table>

              </TableContainer>
              {/* Collase Element to be added */}
              {/* </Block> */}
            </td>
          </tr>
        </Fragment>

      );
    },
    page: 1,
    searchText: searchText,
    search: false,
    customSearchRender: () => null
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
            TableToolbarSelect: () => { return null }
            // TableToolbar: () => { return null}
            // TableToolbarSelect: CustomDownloadIcon
            // icons: {
            //   TableToolbarSelect: CustomDownloadIcon
            // }
          }}
          innerRef={tableRef}
          title={"ACME Employee list"}
          data={mobileData}
          columns={mobileColumn}
          options={mobileOptions}
        />
        {/* <BasicButton onClick={() => { 
          console.log("click,",tableRef)
        }}>test</BasicButton>
        <BasicButton onClick={() => {
          console.log("click,", tableRef)
        }}>test</BasicButton> */}
        <MobileToolbar setDrawerOpen={setDrawerOpen} setDrawerAction={setDrawerAction} />
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => { setDrawerOpen(false) }}
        >
          {drawerAction == "search" && <SearchForm/> }
          {drawerAction == "filter" && <FilterForm criterias={criterias} onChange={(tempFilter) => {
            var tempFilterObj = filterObj
            for (const field in tempFilter) { 
              var value = tempFilter[field]
              // console.log("onChange", tempFilterObj, value, field)
              tempFilterObj[field] = value
            }
        
            
            setFilterObj({ ...tempFilterObj })
          }} selectedCriteria={filterObj} />}
        </Drawer>
      </Block>
      {/* </Block> */}

    </ThemeProvider>

  );
};

export default ExpandableRowTable;
