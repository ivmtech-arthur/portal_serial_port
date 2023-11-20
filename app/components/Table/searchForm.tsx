import Block from 'components/Common/Element/Block'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import BasicButton from "components/Button/BasicButton";
import { useEffect, useState } from "react";
import { Box } from "react-feather";
import general from 'data/general';
import { useStore } from 'store'
import { get } from 'lodash';
import BasicTextField from 'components/TextField/basicTextField';


function SearchForm(props) {
    const { searchText, setSearchText, onChange } = props
    const [tempsearchs, setTempsearchs] = useState(searchText)
    const {
        state: {
            site: { lang },
        },
    } = useStore()
    const generalString = get(general, lang)

    return (
        <Block className="flex flex-col p-4">
            <BasicTextField placeholder="search here" value={searchText || tempsearchs} onChange={(e) => setTempsearchs(e.target.value)}></BasicTextField>
            <BasicButton
                className="my-2"
                onClick={() => {
                    setTempsearchs("")
                    setSearchText("")
                }}>{generalString.cancel}</BasicButton>
            <BasicButton onClick={() => {
                onChange(tempsearchs)
            }}>{generalString.confirm}</BasicButton>
        </Block>
    )
}

export default SearchForm