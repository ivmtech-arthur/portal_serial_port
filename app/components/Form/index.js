import { useState } from "react";
import LoginForm from "./Login";
import ContactForm from "./contactForm";
import ForgetPasswordForm from "./ForgetPassword";
import ResetPasswordForm from "./ResetPassword";
import Block from '/components/Common/Element/Block'
import EditForm from "./EditForm";
import map from 'lodash/map'
function FormHandler(props) {
    const { formType, parentCallback, ...restProps } = props
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [formValid, setFormValid] = useState(false);

    async function handleOnSubmit(e, callback) {
        e.preventDefault();

        const formData = {};
        map(fields, (value, name) => {
            if (!name) return false;
            checkValidation([name], value);
            setFields({ ...fields, [name]: value });
        });

        if (formValid === false) return false;
        if (Object.keys(errors).length == 0 && callback && formValid) {
            callback()
        }


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

    function handleValidation(e) {
        if (e.target) {

            let value
            switch (e.target.type) {
                case "checkbox":
                    value = e.target.checked
                    break;
                default:
                    value = e.target.value
            }
            const name = e.target.name;

            checkValidation(name, value);
        } else {
            checkValidation(e.name, e.value)
        }

    }

    function checkValidation(name, value) {
        
        if (value === "") {
            delete fields[name];
            setErrors({ ...errors, [name]: 'Required' });
            setFormValid(false);
            return false;
        }

        delete errors[name];
        setFields({ ...fields, [name]: value });
        setFormValid(true);
        // Special validation for email
        switch (name) {
            case "email":
                emailValidation(name, value)
                break;
            case "password":
                passwordValidation(name, value)
                break;
        }

    }

    // Email Validation
    function emailValidation(name, value) {
        const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        if ((emailRegex.test(value) === false)) {
            // delete fields[name];
            setErrors({ ...errors, [name]: 'Email is not validate' });
            setFormValid(false);
        }
    }

    const passwordValidation = (name, value) => {
        if (value.length < 8) {
            // delete fields[name];
            setErrors({ ...errors, [name]: 'Password is too short' });
            setFormValid(false);
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

    return (
        <Block>
            {formType == "Login" && <LoginForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} handleError={handleError} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
            {formType == "ContactForm" && <ContactForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "ForgetPassword" && <ForgetPasswordForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "ResetPassword" && <ResetPasswordForm handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} {...restProps} />}
            {formType == "EditForm" && <EditForm getInitFields={getInitFields} handleOnSubmit={handleOnSubmit} handleValidation={handleValidation} errors={errors} parentCallback={parentCallback} fields={fields} {...restProps} />}
        </Block>
    )
}

export default FormHandler