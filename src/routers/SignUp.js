import React from 'react';
import TextField from '@material-ui/core/TextField';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from 'react-router-dom'

import {Formik, Form, useField, useFormikContext } from "formik";
import {firebase} from '../firebase/firebase'
import {createUser} from '../firebase/createUser'

import * as Yup from "yup";

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });
    return (
        <div>
            <label className="checkbox">
                <input {...field} {...props} type="checkbox" />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

const MyTextInput = ({ label, ...rests }) => {

    const [field, meta] = useField(rests);
    return (
        <div>
            <TextField
                label={label}
                {...field} {...rests}
            >
            </TextField>

            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

const SignUpForm = () => {
    return (
        <Form>
            <MyTextInput
                label="User name"
                name="userName"
                variant="outlined"
            />

            <MyTextInput
                label="Email"
                name='email'
                variant="outlined"
            />

            <MyTextInput
                label="Password"
                name='password'
                variant="outlined"
            />

            <MyTextInput
                label="Repeat password"
                name='retype'
                variant="outlined"
            />
            

            <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions
            </MyCheckbox>

            <button type="submit">Submit</button>
        </Form>
    )
}

const FormikValidation = () => {
    return (
        <Formik
            initialValues={{
                userName: "",
                email: "",
                acceptedTerms: false, // added for our checkbox
                password: "" ,
                retype: ""
            }}
            validationSchema={Yup.object({
                userName: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                email: Yup.string()
                    .email("Invalid email addresss`")
                    .required("Required"),
                acceptedTerms: Yup.boolean()
                    .required("Required")
                    .oneOf([true], "You must accept the terms and conditions."),
                password: Yup.string()
                    .min(8, "Password must be 8 chracters at least")
                    .required("Required"),
                retype: Yup.string()
                    .oneOf([Yup.ref('password'),null],"Password must match")
            })}
            onSubmit={async (values) => {
                console.log(values) 
                createUser(
                    values.email,
                    values.password,
                    values.userName
                    )
            }}
        >

            <SignUpForm />

        </Formik>
    )
}

const SignUp = () => {

    return (

        <div className="form">
            <FormikValidation />
            <p>
                Already have an account?<NavLink to="/login"> Log in</NavLink>
            </p>
            <NavLink to="/home">
                <HomeIcon style={{ fontSize: 40, margin: 'auto', color: 'black' }} />
            </NavLink>

        </div>

    )
}


export default SignUp