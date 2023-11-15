import { useEffect, useState } from "react";
import LoginForm from "./Login";
import ContactForm from "./contactForm";
import ForgetPasswordForm from "./ForgetPassword";
import ResetPasswordForm from "./ResetPassword";
import Block from 'components/Common/Element/Block'
import EditForm from "./EditForm";
import map from 'lodash/map'
import { ZodError } from "zod";
import ProductForm from "./productForm";
import AccountForm from "./accountForm";
import { ChangeUserDataInput, ChangeUserDataSchema, RegisterUserInput, RegisterUserSchema } from "lib/validations/user.schema";
import { ChangeProductInput, ChangeProductSchema, CreateProductInput, CreateProductSchema } from "lib/validations/product.schema";
import MachineForm from "./machineForm";
import { ChangeMachineInput, ChangeMachineSchema, CreateMachineInput, CreateMachineSchema } from "lib/validations/machine.schema";
import MachineTypeForm from "./machineTypeForm";
import PalletDetailForm from "./palletDetailForm";
import { ChangePalletDetailInput, ChangePalletDetailSchema, CreatePalletDetailInput, CreatePalletDetailSchema } from "lib/validations/pallet.schema";


function FormHandler(props) {
    const { formType, parentCallback, errorFromParent, ...restProps } = props
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [formValid, setFormValid] = useState(false);

    async function handleOnSubmit(e, callback, action) {
        try {
            console.log("handleOnSubmitx", fields, e, action, formType, restProps)
            if (e)
                e.preventDefault()
            var body;
            var data;
            switch (action) {
                case "register":
                    body = fields as RegisterUserInput;
                    data = RegisterUserSchema.parse(body);
                    break;
                case "editUser":
                    body = fields as ChangeUserDataInput;
                    data = ChangeUserDataSchema.parse(body);
                    break;
                case "createProduct":
                    body = fields as CreateProductInput;
                    data = CreateProductSchema.parse(body);
                    break;
                case "changeProduct":
                    body = fields as ChangeProductInput;
                    data = ChangeProductSchema.parse(body);
                    break;
                case "createMachine":
                    body = fields as CreateMachineInput;
                    data = CreateMachineSchema.parse(body);
                    break;
                case "changeMachine":
                    body = fields as ChangeMachineInput;
                    data = ChangeMachineSchema.parse(body);
                    break;
                case "createPalletDetail":
                    body = fields as CreatePalletDetailInput;
                    data = CreatePalletDetailSchema.parse(body)
                    break
                case "editPalletDetail":
                    body = fields as ChangePalletDetailInput;
                    data = ChangePalletDetailSchema.parse(body)
                    break
            }

            if (callback)
                return callback(fields)

            return "success"
        } catch (e) {
            if (e instanceof ZodError) {
                console.log("error handleOnSubmit", fields, e.name, e.message, e.cause, e.issues)
                const errors = e.errors.reduce((result, error, index) => {
                    result[error.path[0]] = error.message
                    return result
                }, {})
                setErrors({ ...errors })
            }

            return "error"
        }




        // map(fields, (value, name) => {
        //     if (!name) return false;
        //     checkValidation([name], value);
        //     setFields({ ...fields, [name]: value });
        // });

        // if (formValid === false) return false;
        // if (Object.keys(errors).length == 0 && callback && formValid) {
        //     callback()
        // }


        // try {
        //     const response = await fetch('/api/mail', {
        //                         method: 'post',
        //                         body: JSON.stringify(formData)
        //                     });
        //     const body = await response.json();
        //     console.log(body);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    async function handleValidation(e, valueType = "string", customParams = { action: "add", index: 0, objParam: {} }) {
        console.log("handleValidationx", e, valueType, e.target.value, fields, customParams)
        try {
            if (e.target) {
                // const body = fields as RegisterUserInput;
                // const data = RegisterUserSchema.parse(body);
                let value
                switch (e.target.type) {
                    case "checkbox":
                        value = e.target.checked
                        break;
                    case "file":
                    case "fileMultiple":
                        value = e.target.files[0]
                        break;
                    default:
                        value = e.target.value
                }
                const name = e.target.name;

                assignValue(name, value, valueType, customParams);
            } else {
                assignValue(e.name, e.value, valueType, customParams)
            }
        } catch (e) {
            //
            setFormValid(false);
            if (e instanceof ZodError) {
                console.log("error handleValidation", fields, e.name, e.message, e.cause, e.issues)
            }
        }


    }

    function assignValue(name, value, valueType, customParams = { action: "add", index: 0, objParam: {} }) {
        console.log("assignValue", name, value, valueType, fields, customParams)

        if (value === "") {
            delete fields[name];
            // setErrors({ ...errors, [name]: 'Required' });
            setFormValid(false);
            return false;
        }

        delete errors[name];
        var tempValue = value;

        if (customParams.action == "defaultValue") {
            setDefaultValue(customParams.objParam)
        }

        switch (valueType) {
            case "string":
                break;
            case "number":
                tempValue = parseFloat(value)
                break;
            case "fileMultiple":
                tempValue = fields[name]
                if (customParams.action == "delete") {
                    tempValue.splice(customParams.index, 1)
                } else {
                    tempValue.push(value)
                }
                break;
            default:
                break;
        }
        setFields({ ...fields, [name]: tempValue });
        setFormValid(true);
        // Special validation for email
        // switch (name) {
        //     case "email":
        //         emailValidation(name, value)
        //         break;
        //     case "password":
        //         passwordValidation(name, value)
        //         break;
        // }

    }

    function setDefaultValue(obj) {
        console.log("setDefaultValue", obj, fields)
        for (const name in obj) {
            // delete fields[name] = obj
            fields[name] = obj[name]
            setFields({ ...fields });
            // assignValue(name, obj[name], typeof obj[name])
            // delete errors[name];
            // let tempValue = obj[name]
            // console.log("setDefaultValue", name, tempValue, fields)
            // setFields({ ...fields, [name]: tempValue });
        }
    }

    // Email Validation
    function emailValidation(name, value) {
        const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        if ((emailRegex.test(value) === false)) {
            // delete fields[name];
            // setErrors({ ...errors, [name]: 'Email is not validate' });
            setFormValid(false);
        }
    }

    const passwordValidation = (name, value) => {
        if (value.length < 8) {
            // delete fields[name];
            // setErrors({ ...errors, [name]: 'Password is too short' });
            setFormValid(false); 12
        }
    }

    function getInitFields(initFields) {
        setFields({ ...fields, ...initFields })
        console.log("initFields", fields, initFields)
    }

    const handleError = (newErrors, fields) => {
        console.log("handleError", newErrors, fields)
        setErrors({ ...errors, ...newErrors })
    }

    // useEffect(() => { 
    //     setErrors({})
    // },[])

    useEffect(() => {
        console.log("useEffect form", errorFromParent,errors)
        if (errorFromParent) {
            setErrors({ ...errors, ...errorFromParent })
        } else {
            setErrors({})
        }
    }, [errorFromParent])

    return (
        <Block>
            {formType == "Login" && <LoginForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} handleError={handleError} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "ContactForm" && <ContactForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "ForgetPassword" && <ForgetPasswordForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "ResetPassword" && <ResetPasswordForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "EditForm" && <EditForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "AccountForm" && <AccountForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "ProductForm" && <ProductForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "MachineForm" && <MachineForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "MachineTypeForm" && <MachineTypeForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "PalletDetailForm" && <PalletDetailForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} setDefaultValue={setDefaultValue} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
        </Block>
    )
}

export default FormHandler