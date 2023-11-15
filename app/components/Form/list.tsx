import { PalletDetailListInput, PalletDetailListSchema } from "lib/validations/pallet.schema"
import { useCallback, useEffect, useMemo, useState } from "react"
import Block from 'components/Common/Element/Block'
import { ZodError } from "zod"
import general from 'data/general'
import get from 'lodash/get'
import { useStore } from 'store/index'
import BasicButton from "components/Button/BasicButton"
import { useRouter } from "next/router"
import { Add, FilterList, MoreVert, Search } from "@mui/icons-material"
import { Box, ButtonGroup, Collapse } from "@mui/material"

// function Test2(props) {
//     const { Component2 } = props
//     return (<>
//         <Component2/>
//     </>)
// }

function MobileToolbar(props) {
    const { setDrawerOpen, setDrawerAction, dataList, columns, handleClickAdd } = props
    const router = useRouter();

    const [open, setOpen] = useState(false)

    // const handleDownload = useCallback(() => {
    //     columns.filter((column) => { return !action.includes(column.name) })
    //     var columnString = columns.filter((column) => { return !actions.includes(column.name) }).map((filteredCol) => { return filteredCol.name }).join(',') + '\n'
    //     var dataString = dataList.map((data) => {
    //         var tempResult = data.join(',')
    //         tempResult += "\n"
    //         return tempResult
    //     }).join("")
    //     const csvContent = `data:text/csv;charset=utf-8,${columnString}${dataString}`;
    //     const encodedURI = encodeURI(csvContent);
    //     window.open(encodedURI);
    // }, [dataList])

    const buttons = [
        <BasicButton size="large" key="search" onClick={() => {
            setDrawerOpen(true)
            setDrawerAction("search")
        }}><Search /></BasicButton>,


        <BasicButton size="large" onClick={() => {
            setDrawerOpen(true)
            setDrawerAction("filter")
        }} key="filter"><FilterList /></BasicButton>,
        // <BasicButton size="large" key="download" onClick={handleDownload}><DownloadCloud /></BasicButton>,
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

function ListFormHandler(props) {
    1
    const { formType, formCount, ChildformList, ChildForm, Container, parentDataList, listFormType, handleSubmit, assignInvoke, assignSetDataList, invoke, parentClickSubmit, setParentClickSubmit, preserveState, parentHandleChildChange } = props
    const [validateResult, setValidateResult] = useState<boolean[]>([])
    const [parentInvoke, setParentInvoke] = useState(false)
    const router = useRouter();
    const [errorsFromParent, setErrorsFromParent] = useState(preserveState.errorsFromParent || [])
    const [dataList, setDataList] = useState<any[]>(parentDataList || [])
    const [updateDetailList, setUpdateDetailList] = useState<any[]>([])
    const [submitChildCallbackList, setSubmitChildCallbackList] = useState([])
    const {
        state: {
            site: { lang, systemConstant: { cloudFrontURL, schema } },
            user: { userProfile, accessToken }
        },
        dispatch,
    } = useStore()

    const generalString = get(general, lang)
    useEffect(() => {
        if (assignInvoke)
            assignInvoke(setParentInvoke)
    }, [])

    useEffect(() => {
        parentDataList
        // if (assignSetDataList) {
        //     assignSetDataList(addData)
        // }

    }, [dataList])

    const handleClickAdd = () => {
        console.log("add item", dataList)
        dataList.push({})
        setDataList([...dataList])
    }

    // useEffect(() => {
    //     // if (parentClickSubmit) { 
    //     console.log("parent Invoke", parentClickSubmit, parentInvoke)
    //         setParentInvoke(true)
    //     // }

    // }, [parentClickSubmit])


    // useMemo(() => {

    // }, [])

    // useEffect(() => {
    //     setDataList(parentDataList)
    // }, [parentDataList])

    const handleChildChange = (index: number, data, isDelete = false) => {
        if (parentHandleChildChange)
            parentHandleChildChange(index, data, isDelete, dataList, setDataList, updateDetailList, setUpdateDetailList)

    }

    const handleChildCallback = (func, index, isDelete = false) => {
        let tempCallbackList = dataList
        if (isDelete) {
            tempCallbackList.splice(index, 1)
        } else {
            tempCallbackList.push(func)
        }
        setDataList([...tempCallbackList])
    }

    useEffect(() => {
        console.log("useEffect,validate submit 2", validateResult, dataList, listFormType)
        if (validateResult.length != 0) {
            if (validateResult.length == dataList.length && validateResult.every((result) => result)) {
                setValidateResult([])
                setErrorsFromParent([])
                try {
                    console.log("useEffect,validate submit4")
                    switch (listFormType) {
                        case "PallDetailList":
                            console.log("useEffect,validate submit5")
                            let body = dataList as PalletDetailListInput
                            let data = PalletDetailListSchema.parse(body)
                            console.log("useEffect,validate submit 3", data, body, dataList)
                            if (handleSubmit)
                                handleSubmit(dataList, updateDetailList)
                            break;
                    }

                } catch (e) {
                    console.log("error will be", dataList, e)
                    if (e instanceof ZodError) {
                        console.log("error handleOnSubmit useEffect", dataList, e, e.name, e.message, e.cause, e.issues)
                        const errorsList = e.errors.reduce((result, error, index) => {
                            let obj: any = {}
                            obj[error.path[2]] = error.message
                            result.push(obj)
                            return result
                        }, [])

                        setErrorsFromParent([...errorsList])
                    }
                }
            } else {
                setValidateResult([])
            }
        }

    }, [validateResult])




    const list = dataList ? dataList.map((data, index) => {
        return <Container>
            <ChildForm
                index={index}
                errorFromParent={errorsFromParent[index]}
                parentInvoke={parentInvoke}
                handleChildChange={handleChildChange}
                setChildResult={async (promise: Promise<string>) => {
                    console.log("setChildResult", promise)
                    const result = await promise
                    if (result == "error") {
                        validateResult.push(false)
                        setValidateResult([...validateResult])
                    } else {
                        validateResult.push(true)
                        setValidateResult([...validateResult])
                    }
                    setParentInvoke(false)

                    // setParentClickSubmit(false, {
                    //     errorsFromParent
                    // })
                    // setChildResult(result)
                }}
            />
        </Container>

    }) : []

    // const itemList = ChildformList(() => {})

    // const list = itemList.map((FormComponent: JSX.Element, index) => {
    //     // let a = () => { return (<FormComponent />) }
    //     console.log("typeof", typeof FormComponent)
    //     return (<Container>
    //         <Test
    //             Component={FormComponent}
    //             // {...formComponent.props}
    //             errorFromParent={errorsFromParent[index]}
    //             parentInvoke={parentInvoke}
    //             setChildResult={async (promise: Promise<string>) => {
    //                 console.log("setChildResult", promise)
    //                 const result = await promise
    //                 if (result == "error") {
    //                     validateResult.push(false)
    //                     setValidateResult([...validateResult])
    //                 } else {
    //                     validateResult.push(true)
    //                     setValidateResult([...validateResult])
    //                 }
    //                 setParentInvoke(false)
    //                 // setChildResult(result)
    //             }}
    //         />
    //         {/* <FormComponent {...FormComponent.props} /> */}
    //     </Container>)
    // })

    return (
        <>
            {/* {dataList} */}
            {/* <ChildformList {...testProps} /> */}
            {list}
            <Block className="flex justify-center">
                <BasicButton className="mt-10 mr-3 w-32" onClick={(e) => {
                    setParentInvoke(true)
                }}>{generalString.confirm}</BasicButton>
                <BasicButton className="mt-10 ml-3 w-32" onClick={(e) => {
                    router.back()
                }}>{generalString.back}</BasicButton>
            </Block>
            <Block className="md:hidden">
                <MobileToolbar handleClickAdd={handleClickAdd} />
            </Block>
        </>
    )
}

export default ListFormHandler