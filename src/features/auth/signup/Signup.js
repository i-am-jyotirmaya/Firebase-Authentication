import { CircularProgress } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { createUser } from '../../../app/firebase';
import useInitialAuthCheck from '../../../custom-hooks/useInitialAuthCheck';

import './Signup.scss'

const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name should be atleast 2 characters!').required('Provide a name!'),
    email: Yup.string().email('Provide a valid email!').required('Provide an email!'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {message: 'Password does not match criteria!'}).required('Enter a password!'),
    confirmPassword: Yup.string().required('Confirm password!')
});

const Signup = (props) => {
    const history = useHistory();

    const component = useInitialAuthCheck({authStatusCode: 1, redirectPath: '/'});
    if(component) return component;

    return (
        <React.Fragment>
            <section className="component-section">
                <h2>Signup</h2>
                <hr/>
                <Formik
                    initialValues={{
                        // name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validationSchema}
                    validate={(values) => {
                        const errors = {};
                        if(values.password !== values.confirmPassword) {
                            errors.confirmPassword = "Passwords do not match!"
                        }
                        return errors;
                    }}
                    
                    onSubmit={(values, actions) => {
                        createUser(values.email, values.password, () => {
                            history.push('/');
                        });
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            {/* <div className="form-group">
                                <label htmlFor="signup-name">Name</label>
                                <Field id="signup-name" name="name" type="text" className="field"/>
                                {touched.name && errors.name && <div className="field-error">{errors.name}</div>}
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="signup-email">Email</label>
                                <Field id="signup-email" name="email" type="text" className="field"/>
                                {touched.email && errors.email && <div className="field-error">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-password">Password</label>
                                <Field id="signup-password" name="password" type="password" className="field"/>
                                {touched.password && errors.password && <div className="field-error">{errors.password}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-c-password">Confirm Password</label>
                                <Field id="signup-c-password" name="confirmPassword" type="password" className="field"/>
                                {touched.confirmPassword && errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                            </div>
                            <div className="form-group">
                                {!isSubmitting ?
                                <button type="submit" className="control btn">Signup</button> :
                                <CircularProgress/>}
                                {/* <CircularProgress /> */}
                            </div>
                            <p className="base-message">Already a member? <Link to="/login">Login</Link></p>
                        </Form>
                    )}
                </Formik>        
            </section>
        </React.Fragment>
    )
}

export default Signup;