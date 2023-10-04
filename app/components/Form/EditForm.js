
import Block from '/components/Common/Element/Block'
import get from 'lodash/get'
import { useStore } from '/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SvgIconTick from '/public/svg/icon_tick.svg'
import SvgIconWarning from '/public/svg/icon_warning.svg'
import SvgIconInfoPurple from '/public/svg/icon_info_purple.svg'
import SvgIconShiftPurple from '/public/svg/icon_shift_purple.svg'
import SvgIconPlanPurple from '/public/svg/icon_plan_purple.svg'
import SvgIconPlanDatePurple from '/public/svg/icon_plan_date_purple.svg'
import general from '../../data/general'
import forgetPassword from '../../data/auth/forgetPassword'
import StyledBodyBold1 from '../Common/Element/bodyBold1'
import StyledBody4 from '/components/Common/Element/body4'
import Button1 from '../Button/Button1'
import StyledH3 from '../Common/Element/H3'
import StyledBody2 from '../Common/Element/body2'
import Popup from '.'
import StyledTextField from '../TextField/styledTextField'
import StyledH5 from '../Common/Element/H5'
import StyledBodyLight1 from '../Common/Element/bodyLight1'
import CustomCheckBox from '../Button/CheckBox'
import { map } from 'lodash'
import CustomRadioGroup from '../Button/RadioGroup'
import StyledTextSelectField from '../TextField/styledTextSelectField'
import StyledTextCalendar from '../TextField/styledTextCalendar'
import axios from 'axios'
import getConfig from 'next/config'
import { withCookies } from 'react-cookie'
import Button2 from '../Button/Button2'
const { publicRuntimeConfig } = getConfig()
const { API_URL, APP_URL } = publicRuntimeConfig

const EditForm = (props) => {
    const { isOpen, data, getInitFields, handleConfirm, handleOnSubmit, errors, handleCancel, handleValidation, handleChange, physioData, subscriptionData, fields, mode } = props
    const { cookies } = props
    const token = cookies.get("userToken")
    const router = useRouter()
    const {
        state: {
            site: { lang },
        },
        dispatch
    } = useStore()
    const [deleted, setDeleted] = useState(false)

    const [open, setOpen] = useState(isOpen ? isOpen : false)
    const [parentState, setParentState] = useState({})
    const generalString = get(general, lang)

    const physioOption = map(physioData, (data, index) => {
        return {
            id: data.id,
            value: data.attributes.name
        }
    })

    const subscriptionOption = map(subscriptionData, (data, index) => {
        return {
            id: data.id,
            value: data.attributes.subscriptionPlanType
        }
    })

    const initFields = mode == 'add' ? {
        name: '',
        email: '',
        phone: '',
        gendar: '',
        physio: '',
        carerEmail: '',
        subscription: '',
        subscriptionDate: '',
    } : {
        name: data.name,
        email: data.email,
        phone: data.phone,
        gendar: data.gendar,
        physio: data.physio.data?.attributes?.name,
        carerEmail: data.carerEmail,
        subscription: data.subscription.data?.attributes?.subscriptionPlanType,
        subscriptionDate: '',
    }

    const handleEdit = async () => {
        await axios
            .put(`${API_URL}/api/palletConfig/${data.id}`,{ data: {...fields}}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
                handleConfirm()
            }).catch((err) => {
            })
    }

    const handleAdd = async() => {
        await axios
            .post(`${API_URL}/api/palletConfig/`,{ data: {...fields}}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
            }).catch((err) => {
            })
    }

    useEffect(() => {
        getInitFields(initFields)
    }, [])

    return (
        <Block>
        </Block>
    )
}

export default withCookies(EditForm)