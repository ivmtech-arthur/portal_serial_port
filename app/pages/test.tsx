import BasicButton from "components/Button/BasicButton"
import SimpleCard from "components/Card/simpleCard"
import ExpandableRowTable from "components/Table/expandableTable"
import CustomTable3 from "components/Table/newTable"
import { MoneyOff } from "@mui/icons-material"
import * as Icon from "react-feather";
export default function Test() { 
    
    return (
        <>
        <ExpandableRowTable/>
            <CustomTable3 />
            <SimpleCard image={{
                src: "/image/logo.jpg",
                width: "359px",
                height:"316px"
            }} desc="test test" title="test title" />
            <BasicButton
                variant="contained"
                startIcon={<Icon.Smile />}
                // endIcon={ <Icon.Smile />}
            >
                testyoyo
                {/* <Icon.Smile /> */}
                {/* <Icon.Smile className="pr-1 w-4" /> */}
            </BasicButton>
            
        </>
    )
} 

