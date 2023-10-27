import MUIDataTable, { MUIDataTableOptions, MUIDataTableToolbar, MUIDataTableProps, MUIDataTableColumn, MUIDataTableColumnDef } from "mui-datatables";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Theme, ButtonGroup, Drawer, TextField } from "@mui/material";
import { Fragment, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import { useEffect, useRef, ReactNode } from 'react';
import Block from 'components/Common/Element/Block'
import {
  createTheme,
  ThemeProvider,
  styled as muiStyled,
} from '@mui/material/styles'

import Pagination from '@mui/material/Pagination';
import { Button, Collapse, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon, TableFooter, TablePagination, Typography } from '@mui/material';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StyledDropDownButton from 'components/TextField/styledDropDownButton';
import BasicButton from "components/Button/BasicButton";
import { Add, Delete, Download, Edit, Filter, FilterList, More, MoreHoriz, MoreVert, Search } from "@mui/icons-material";
import { muiTheme } from "styles/mui";
import { DownloadCloud } from "react-feather";
import FilterForm from "./filterForm";
import SearchForm from "./searchForm";
import { CSVLink, CSVDownload } from "react-csv";
import { useRouter } from "next/router";
import { useStore } from "store/contexts";
import Popup from "components/Popup";

function CustomToolbar(props) {
  const router = useRouter()
  const {
    state: {
      site: { lang, pageName },
    },
  } = useStore()
  const { handleClickAdd } = props
  return (<>
    <BasicButton variant="text" tooltip="Add Record" onClick={() => {
      console.log("path", window.location.href, router.asPath)
      if (handleClickAdd)
        handleClickAdd()
      // router.push({ pathname: `${router.asPath}/add`, query: { pageName: pageName } }, `${router.asPath}/add`)
    }}><Add /></BasicButton>
  </>)
}

const actions = ["edit", "delete", "more", "view"]

// function CustomToolbarSelect(props) {
//   const router = useRouter()
//   const {
//     state: {
//       site: { lang, pageName },
//     },
//   } = useStore()
//   const { } = props
//   return (<>
//     <BasicButton variant="text" tooltip="Add Record" onClick={() => {
//       console.log("path", window.location.href, router.asPath)
//       router.push({ pathname: `${router.asPath}/add`, query: { pageName: pageName } }, `${router.asPath}/add`)
//     }}><Add /></BasicButton>
//   </>)
// }

function MobileToolbar(props) {
  const { setDrawerOpen, setDrawerAction, dataList, columns, handleClickAdd } = props
  const router = useRouter();

  const [open, setOpen] = useState(false)

  const handleDownload = useCallback(() => {
    columns.filter((column) => { return !actions.includes(column.name) })
    // data.filter((entry) => {
    //   let a: ReactNode;
    //   if (a instanceof ReactNode) { 

    //   }
    //   return 
    // })
    var columnString = columns.filter((column) => { return !actions.includes(column.name) }).map((filteredCol) => { return filteredCol.name }).join(',') + '\n'
    var dataString = dataList.map((data) => {
      var tempResult = data.join(',')
      tempResult += "\n"
      return tempResult
    }).join("")
    console.log("download data", dataList, columnString)
    //  const csvList = 
    // const dummyData = "rahul,delhi,accountsdept\n";
    // const csvContent = `data:text/csv;charset=utf-8,${columnString}${dataString}`;
    // const encodedURI = encodeURI(csvContent);
    // window.open(encodedURI);
  }, [dataList])

  const buttons = [
    <BasicButton size="large" key="search" onClick={() => {
      setDrawerOpen(true)
      setDrawerAction("search")
    }}><Search /></BasicButton>,


    <BasicButton size="large" onClick={() => {
      setDrawerOpen(true)
      setDrawerAction("filter")
    }} key="filter"><FilterList /></BasicButton>,
    <BasicButton size="large" key="download" onClick={handleDownload}><DownloadCloud /></BasicButton>,
    <BasicButton key="add" onClick={() => {
      if (handleClickAdd) {
        handleClickAdd()
      }
    }}><Add /></BasicButton>,
  ];

  return (
    <Box
      sx={{
        transformOrigin: '0 100% 0',
        scale: '1.3',
        zIndex: 9999,
        right: 20,
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

          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {/* <Block>
            <CSVDownload data={data} target="_blank" />
          </Block> */}
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

      <StyledDropDownButton
        variant={'filled'}
        id="search"
        width="60px"
        color={"secondary"}
        options={[
          {
            value: 1,
            label: 1
          },
          {
            value: 5,
            label: 5
          },
          {
            value: 10,
            label: 10
          },
          {
            value: 25,
            label: 25
          },
          {
            value: 50,
            label: 50
          },
        ]}
        value={rowPerPage}
        onChange={(e: SelectChangeEvent) => {
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
  const { data, handleClickEdit } = props
  return (
    <BasicButton
      color="primary"
      aria-label="open drawer"
      edge="start"
      onClick={(event) => {
        setHover(false)
        event.stopPropagation()
        console.log("handleClickEdit", data)
        handleClickEdit(data)
      }}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
    >
      {<Edit />}
    </BasicButton>
  )
}

const CustomDeleteButton = (props) => {
  const [hover, setHover] = useState(false)
  const { data, handleClickDelete } = props
  return (<BasicButton
    color="primary"
    aria-label="open drawer"
    edge="start"
    onClick={(event) => {
      setHover(false)
      event.stopPropagation();
      handleClickDelete(data)
    }}
    // sx={{ mr: 2, visibility: { md: 'hidden' } }}
    onMouseEnter={() => { setHover(true) }}
    onMouseLeave={() => { setHover(false) }}
  >
    <Delete />
  </BasicButton>)
}

const CustomMoreButton = (props) => {
  const { handleClickDelete, handleClickEdit, data } = props
  const [showMore, setShowMore] = useState(false)
  return (

    <Block
      className="h-[inherit] w-[inherit] relative md:hidden"
    >
      <Box
        sx={{
          zIndex: 9999,
          // right: 0,
          top: 0,
          left: '50%',
          transform: 'translate(-50%,0%)',
          // position: 'relative',
          position: "absolute",
          // margin: 'auto',
          // display: 'flex',
          '& > *': {
            marginX: 1,
          },
        }}
      >
        <Collapse in={showMore}
          // orientation="horizontal"
          sx={{
            position: "absolute",
            //   left: '0',
            right: '50px',
            // top: '0',
            // transform: 'translate(50%,0%)',
          }}
        >
          <ButtonGroup
            variant="contained"
          >
            <CustomDeleteButton data={data} handleClickDelete={(data) => { handleClickDelete(data[0]) }} />
            <CustomEditButton data={data} handleClickEdit={(data) => { handleClickEdit(data[0], data[1]) }} />
          </ButtonGroup>
        </Collapse>
        <BasicButton
          aria-label="open drawer"
          edge="start"
          onClick={(event) => {
            event.stopPropagation();
            setShowMore(!showMore)
          }}
        >
          {<MoreHoriz />}
        </BasicButton>
      </Box>
    </Block>

  )
}


const ExpandableRowTable = (props) => {
  const { columnsFromParent, dataObjList, mobileDataObjList, message, popupTitle, handleDelete,handleClickAdd, title } = props
  var columns = []
  columns = JSON.parse(JSON.stringify(columnsFromParent))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerAction, setDrawerAction] = useState("")
  const router = useRouter()
  const [filterObj, setFilterObj] = useState({})
  const [searchText, setSearchText] = useState("")
  const [popupData, setPopupData] = useState({})

  const [canGetDesiredData, setCanGetDesiredData] = useState(true)
  const {
    state: {
      site: { lang, pageName },
      user: { userProfile }
    },
    dispatch,
  } = useStore()

  const handleClickEdit = (
    (id, displayID) => {
      console.log("id", id, displayID)
      router.push({ pathname: `${router.asPath}/${id}` }, `${router.asPath}/${displayID}`)
    })

  const handleClickDelete = (id) => {
    setPopupData(id)
    dispatch({
      type: 'showPopup',
      payload: {
        popup: true,
        popupType: 'confirmProceed',
        isGlobal: false,
      },
    })

  }

  useEffect(() => {
    setCanGetDesiredData(true)
  }, [filterObj, searchText])




  const initData = Object.assign([], dataObjList.map((dataObj) => {
    return Object.assign([], dataObj.data)
  }))
  const data = dataObjList.map((dataObj) => {
    var result = Object.assign([], dataObj.data)
    if (userProfile?.userID == result[0]) {
      return result
    }
    if (dataObj.edit) {

      if (!columns.some((column) => { return column.name == "edit" })) {
        columns.push({ name: "edit" })
      }
      //notes: assume ID always at zero position
      result.push(<CustomEditButton data={result} handleClickEdit={(data) => { handleClickEdit(data[0], data[1]) }} />)
    }
    if (dataObj.delete) {
      if (!columns.some((column) => { return column.name == "delete" })) {
        columns.push({ name: "delete" })
      }
      result.push(<CustomDeleteButton handleClickDelete={(data) => { handleClickDelete(data[0]) }} />)


    }
    return result
  })

  const [desiredData, setDesiredData] = useState(initData)
  useEffect(() => {
    console.log("desiredData", desiredData)
  }, [desiredData])
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

  const desktopColumn: MUIDataTableColumnDef[] = [
    ...(columns
      // .filter((column) => {
      // return !column.desktopIgnore
      // })
      .map((filteredColumn) => {
        let result: MUIDataTableColumnDef = {
          name: filteredColumn.name,
          options: {
            viewColumns: !filteredColumn.desktopIgnore,
            filter: !filteredColumn.desktopIgnore,
            searchable: !filteredColumn.desktopIgnore,
            display: !filteredColumn.desktopIgnore,
            ...(filteredColumn.name == "edit" || filteredColumn.name == "delete" || filteredColumn.name == "more" ? {
              download: false
            } : {}),
            ...(filteredColumn.download ? {} : { download: false })
            // setCellProps: () => ({ style: { minWidth: "100px", maxWidth: "800px",display:"flex",alignitems:'end', justifyContent: 'end',backgroundColor:'orange' }})
            // customBodyRender: (data, type, row) => { return <Block className=" h-40">{data}</Block> }
            // ...(filterObj[column.name] ? { filterList: [filterObj[column.name]] } : {}),
          }
        }
        return result
      }))
  ]

  const mobileCollapseColumn = columns.filter((column) => {
    return column.mobileCollapse
  }).map((filterColumn) => {

    return {
      ...filterColumn,
      columnIndex: columns.indexOf(filterColumn),
      ...(filterColumn.name == "edit" || filterColumn.name == "delete" || filterColumn.name == "more" ? {
        download: false
      } : {}),
      ...(Object.keys(filterColumn).includes("download") ? { download: filterColumn.download } : { download: true })
    }
  })

  const mobileData = mobileDataObjList.map((dataObj) => {
    var result = Object.assign([], dataObj.data)
    if (userProfile?.userID == result[0]) {
      return result
    }
    if (dataObj.more) {
      if (!mobileCollapseColumn.some((column) => { return column.name == "more" })) {
        // columns.push({name: "more"})
        mobileCollapseColumn.push({
          name: "more", mobileCollapse: true, mobileDisplay: false, columnIndex: columnsFromParent.length, download: false
        })
      }
      //hardcode
      // result.pop()
      result.push(<CustomMoreButton data={result} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />)
    } else {
      result.push(<>xd</>)
    }

    return result
  })

  console.log("ExpandableRowTable props", columns, dataObjList, userProfile, mobileDataObjList, mobileData, mobileCollapseColumn)



  const criterias = createCritieras(columns, data)

  const options: MUIDataTableOptions = {
    filter: true,
    customToolbar: (data) => { return <CustomToolbar handleClickAdd={handleClickAdd} /> },
    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
      return (
        <CustomPagination pageNum={Math.ceil(data.length / rowPerPage)} page={page} rowCount={rowCount} rowPerPage={rowPerPage} changeRowsPerPage={changeRowsPerPage} changePage={changePage} />
      );
    },

    selectableRows: "multiple",
    filterType: "dropdown",
    // responsive: "scrollMaxHeight",
    rowsPerPage: 5,
    expandableRows: false,
    // selectableRowsHideCheckboxes: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log(rowData, rowMeta);
      return (
        <Block>
          Collase Element to be added
        </Block>
      );
    },
    page: 1,
    isRowSelectable: (dataIndex, selectedRows) => {
      // console.log("isRowSelectable", dataIndex, data[dataIndex], !userProfile.userID || (userProfile.userID && data[dataIndex][0] != userProfile.userID))
      return !userProfile.userID || (userProfile.userID && data[dataIndex][0] != userProfile.userID)
    },
  };

  const mobileOptions: MUIDataTableOptions = {

    customFooter: (rowCount, page, rowPerPage, changeRowsPerPage, changePage) => {
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
    selectableRows: "multiple",
    filterType: "dropdown",

    responsive: 'standard',
    rowsPerPage: 5,
    expandableRows: true,
    selectableRowsHeader: true,
    rowHover: true,
    // selectableRowsHideCheckboxes: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log("rowData", mobileData, columns, mobileColumn, mobileCollapseColumn, rowData, rowData.filter((rowItem, index) => {
        return mobileCollapseColumn.map((filteredColumn, index2) => {
          return filteredColumn.columnIndex
        }).includes(index)
      }))
      const tableHeaderList = mobileCollapseColumn.map((filteredColumn) => {
        return <TableCell align="center">
          <Block className="mx-3 font-semibold">{filteredColumn.name}</Block></TableCell>
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
        <Fragment >
          <tr className="overflow-auto">
            <td colSpan={6}>
              {/* <Block> */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead className="overflow-auto">
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
    fixedHeader: true,

    page: 1,
    searchText: searchText,
    // ilter
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    // search: false,
    customSearchRender: () => null,
    isRowSelectable: (dataIndex, selectedRows) => {
      // console.log("isRowSelectable", dataIndex, data[dataIndex], !userProfile.userID || (userProfile.userID && data[dataIndex][0] != userProfile.userID))
      return !userProfile.userID || (userProfile.userID && data[dataIndex][0] != userProfile.userID)
    },
    onRowSelectionChange(currentRowsSelected, allRowsSelected, rowsSelected) {
      // if()
    },
    // onRowSelectionChange: (currentRow, allRow, rows) => {
    //   console.log("")
    // },
    onRowsDelete(rowsDeleted, newTableData) {
      console.log("onRowsDelete", rowsDeleted.data, data, rowsDeleted.data.map((item) => {
        //notes assume ID always at zero position
        return data[item.dataIndex][0]
      }))

      const tempPopupData = rowsDeleted.data.map((item) => {
        return data[item.dataIndex][0]
      })
      setPopupData(tempPopupData)
      dispatch({
        type: 'showPopup',
        payload: {
          popup: true,
          popupType: 'confirmProceed',
          isGlobal: false,
        },
      })
    },
    // customToolbarSelect(selectedRows, displayData, setSelectedRows) {
    //   return <CustomToolbar />
    // },
    onTableChange(action, tableState) {
      console.log("action", action, tableState, canGetDesiredData)
      if (canGetDesiredData) {

        // tableState.displayData.pop()
        console.log("action can", action, tableState, canGetDesiredData, tableState.displayData)
        var resultDataList = []
        // tableState.columns[0].download
        var result = tableState.displayData.map((item) => {
          return item.data.filter((value, index) => {
            // return columns[index]
            let cond = mobileCollapseColumn.find((collapseCol) => {
              return collapseCol.columnIndex == index
            })
            if (cond) {
              return cond.download
            } else {
              return true
            }
            // return Object.keys(columns[index]).includes("download") ? columns[index].download :
            //   actions.includes(mobile[index]) ? false : true
          })
        })
        setDesiredData(result)
        // if (tableState.selectedRows.data.length > 0) {
        //   setDesiredData(tableState.selectedRows.data)
        // } else {
        //   setDesiredData(tableState.displayData)
        // }
        setCanGetDesiredData(false)
      }


    },
    // print
    // selectToolbarPlacement: "above",
    // download: false
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Block className="md:block xs:hidden">
        <MUIDataTable
          components={{
            // TableToolbarSelect
          }}

          title={title}
          data={data}
          columns={desktopColumn}
          options={options}
        />
      </Block>

      <Block className="md:hidden">
        <MUIDataTable
          title={title}
          data={mobileData}
          columns={mobileColumn}
          options={mobileOptions}
        />

        <MobileToolbar setDrawerOpen={setDrawerOpen} setDrawerAction={setDrawerAction} dataList={desiredData} columns={mobileColumn} handleClickAdd={handleClickAdd} />
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => { setDrawerOpen(false) }}
        >
          {drawerAction == "search" && <SearchForm value={searchText} setSearchText={setSearchText} onChange={(text) => {
            setSearchText(text)
          }} />}
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

      <Popup type="local" propsToPopup={{ proceedFunc: (data) => { handleDelete(data) }, title: popupTitle, message: message, popupData: popupData, mode: "delete" }} />
    </ThemeProvider>

  );
};

export default ExpandableRowTable;
