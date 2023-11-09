import { PalletDetailListInput, PalletDetailListSchema } from "lib/validations/pallet.schema"
import { useEffect, useMemo, useState } from "react"
import Block from 'components/Common/Element/Block'
import { ZodError } from "zod"
import general from 'data/general'
import get from 'lodash/get'
import { useStore } from 'store/index'
import BasicButton from "components/Button/BasicButton"
import { useRouter } from "next/router"

// function Test2(props) {
//     const { Component2 } = props
//     return (<>
//         <Component2/>
//     </>)
// }

function Test(props) {
    const { Component, ...restProps } = props
    console.log("test props", restProps)
    return (
        // <Test2
        //     Component2={(props) => {
        //         return <Component {...props} {...restProps} />
        //     }}
        // />
        <>
            {Component}
        </>
        // <Component {...restProps} />
    )
}

function ListFormHandler(props) {
    1
    const { formType, formCount, ChildformList, ChildForm, Container, parentDataList, listFormType, handleSubmit, assignInvoke, assignSetDataList, invoke, parentClickSubmit, setParentClickSubmit, preserveState } = props
    const [validateResult, setValidateResult] = useState<boolean[]>([])
    const [parentInvoke, setParentInvoke] = useState(false)
    const router = useRouter();
    const [errorsFromParent, setErrorsFromParent] = useState(preserveState.errorsFromParent || [])
    const [dataList, setDataList] = useState<any[]>(parentDataList || [])
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
        if (assignSetDataList) {
            assignSetDataList(addData)
        }
    }, [])

    const addData = () => {
        dataList.push({})
        setDataList([...dataList])
    }

    // useEffect(() => {
    //     // if (parentClickSubmit) { 
    //     console.log("parent Invoke", parentClickSubmit, parentInvoke)
    //         setParentInvoke(true)
    //     // }

    // }, [parentClickSubmit])
    21
    // useEffect(() => {
    //     console.log("parent Invoke", invoke)
    //     setParentInvoke(invoke)
    // }, [invoke])

    useMemo(() => {

    }, [])

    useEffect(() => {
        setDataList(parentDataList)
    }, [parentDataList])

    const handleChildChange = (index: number, data, isDelete = false) => {
        console.log("handleChildChange", index, data, dataList, isDelete)
        let tempDataList = dataList
        if (isDelete) {
            tempDataList.splice(index, 1)
            // handleChildCallback(index, null, true)
        }
        else {
            tempDataList[index] = data
        }

        setDataList([...tempDataList])
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
        console.log("useEffect,validate submit 2", validateResult, dataList)
        if (validateResult.length != 0) {
            if (validateResult.length == dataList.length && validateResult.every((result) => result)) {
                setValidateResult([])
                setErrorsFromParent([])
                try {
                    switch (listFormType) {
                        case "PallDetailList":
                            let body = dataList as PalletDetailListInput
                            let data = PalletDetailListSchema.parse(body)
                            console.log("handleSubmit", data, body, dataList)
                            if (handleSubmit)
                                handleSubmit(dataList)
                            break;
                    }

                } catch (e) {
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

        </>
    )
}

export default ListFormHandler