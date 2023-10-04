import { useState } from "react";

function ContactForm() {

    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [formValid, setFormValid] = useState(false);

    async function handleOnSubmit(e) {
        e.preventDefault();

        console.log('fields', fields);
        console.log('errors', errors);
        console.log('formValid', formValid);

        const formData = {};
        [...e.currentTarget.elements].map((field) => {
            if (!field.name) return false;
            checkValidation([field.name], field.value);
            setFields({...fields, [field.name]: field.value});
        });

        if (formValid === false) return false;

        try {
            const response = await fetch('/api/mail', {
                                method: 'post',
                                body: JSON.stringify(formData)
                            });
            const body = await response.json();
            console.log(body);
        } catch (error) {
            console.log(error);
        }

        console.log(formData);
    }

    function handleValidation(e) {
        const name = e.target.name;
        const value = e.target.value;
        checkValidation(name, value);
    }

    function checkValidation(name, value) {
        if (value === "") {
            delete fields[name];
            setErrors({...errors, [name]: 'Required'});
            setFormValid(false);
            return false;
        }

        delete errors[name];
        setFields({...fields, [name]: value});
        setFormValid(true);
        // Special validation for email
        emailValidation(name, value);

        console.log('fields on validaton', fields);
        console.log('errors on validation', errors);
    }

    // Email Validation
    function emailValidation(name, value) {
        const emailRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        if ((name == 'email') && (emailRegex.test(value) === false)) {
            delete fields[name];
            setErrors({...errors, [name]: 'Email is not validate'});
            setFormValid(false);
        }
    }

    return (
        <div className="mt-5 mt-md-0">
            <h1 className="section-title h1-responsive text-center mb-4">
                <span>
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.99 38"><defs><style dangerouslySetInnerHTML={{__html: ".cls-1{fill:#cb0a34;}" }} /></defs><title>latest from out videos</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path className="cls-1" d="M456.28,8.29a4.6,4.6,0,0,0,.29-.59c0-.11.08-.21.11-.31a4.56,4.56,0,0,0,.21-.72l0-.21A6.11,6.11,0,0,0,457,5.6h0a5.5,5.5,0,1,0-9.24,4C422.6,9.89,288,9.52,281.13,9.52h-31c-7.86,0-15.13,2.18-21.14,7.26a30.14,30.14,0,0,0-8.72-5.25c-4.68-1.82-9.42-2-14.32-2H9.24A5.5,5.5,0,1,0,0,5.5v0c0,.05,0,.09,0,.14a3.4,3.4,0,0,0,0,.45c0,.12,0,.23,0,.35l.06.3A1.82,1.82,0,0,0,.22,7,5.48,5.48,0,0,0,4.5,10.9a5.13,5.13,0,0,0,1.12.16c.85,0,1.7,0,2.54,0H209.44a28.85,28.85,0,0,1,19,7.26,28.31,28.31,0,0,0-6.38,9.13L229,38.29,236,27.45h0a28.11,28.11,0,0,0-6.38-9.12A28.8,28.8,0,0,1,241.09,12c4-1.09,8-1,12.14-1H451l.54,0a5.47,5.47,0,0,0,3.21-1l.07,0s0,0,.05-.05a4.53,4.53,0,0,0,.62-.54l.24-.26a6.41,6.41,0,0,0,.39-.52C456.15,8.52,456.21,8.4,456.28,8.29Z" /></g></g></svg>
                </span>
            </h1>
            <form className="contact_form" method="post" onSubmit={handleOnSubmit}>
                <div className="response-status"></div>
                <div className="form-group row">
                    <div className="col-md-6 mb-2">
                        <label className="mb-1">Name <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            onChange={handleValidation}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label className="mb-1">Email <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            name="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={handleValidation}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="col-md-12 mb-2">
                        <label className="mb-1">Subject:</label>
                        <input type="text" name="subject" className="form-control" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="mb-1">Message <span className="text-danger">*</span></label>
                        <textarea
                            name="message"
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            rows="5"
                            onChange={handleValidation}
                        ></textarea>
                        {errors.message && <span className="text-danger">{errors.message}</span>}
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary btn-block rounded waves-effect waves-light">Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm