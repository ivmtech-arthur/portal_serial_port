import CustomTable from "./table";

// const CustDeleteButton = () => {
//     return (

//     )
// }


const Table1 = (props) => {
    const { handleClickEdit, columns,rows, onRowClick, handleClickDelete,filter } = props
   
    // const rows2 = reduce(props.rows,(arr,obj) => {
    //     const {id, attributes} = obj
    //     // let newAttributes = reduce(attributes,(subObj,field,key) => {
    //     //     let newField = field
    //     //     if(field && Object.keys(field).length > 0){
    //     //         // const {id: id2, attributes: attribute2} = field.data
    //     //         // newField = {...id2,...attribute2}
    //     //         // newField = field.data
    //     //     }
    //     //     // console.log("newField",newField)
    //     //     let tempObj = {}
    //     //     tempObj[key] = newField
    //     //     return {...subObj,...tempObj}
    //     // },{})
    //     // console.log("newAttributes",newAttributes)
    //     // arr[obj.id-1] = obj.attribute
    //     return [...arr, {id,...attributes}];
    // },[])
    // console.log("rows",props.rows,rows2)
    // const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    // ];
    return (
        <CustomTable rows={rows} columns={columns} onRowClick={onRowClick} filter={filter}/>
    )
}

export default Table1