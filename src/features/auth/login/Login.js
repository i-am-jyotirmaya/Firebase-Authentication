import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import firebase from 'firebase';

import './Login.scss';
import {addUserRecord, Ui, loginUser} from '../../../app/firebase';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Login = (props) => {
    const history = useHistory();
    
    useEffect(() => {
        Ui.start('#firebaseui', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            callbacks: {
                signInSuccessWithAuthResult: (result) => {
                    console.log(result);
                    if(result.additionalUserInfo.isNewUser) {
                        addUserRecord(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.email);
                    }
                    return true;
                }
            }
        })
    })
    return (
        <React.Fragment>
            <section className="component-section">
                <h2>Login</h2>
                <hr />
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Provide a valid email!').required('Provide an email!'),
                        password: Yup.string().required('Provide a password!')
                    })}
                    onSubmit={(values, actions) => {
                        loginUser(values.email, values.password, () => {
                            history.push('/');
                        });
                    }}
                >
                    {({errors, touched, isSubmitting}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="login-email">Email</label>
                                <Field id="login-email" name="email" type="text" className="field"/>
                                {touched.email && errors.email && <div className="field-error">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <Field id="login-password" name="password" type="password" className="field"/>
                                {touched.password && errors.password && <div className="field-error">{errors.password}</div>}
                            </div>
                            <div className="form-group">
                                {!isSubmitting ?
                                    <button type="submit" className="control btn">Login</button> :
                                    <CircularProgress />
                                }
                            </div>
                            <p className="base-message">Not a member? <Link to="/signup">Signup</Link></p>
                            <p style={{textAlign: 'center'}}>OR</p>
                        </Form>
                    )}
                </Formik>
                <div className="firebaseui" id="firebaseui"></div>
            </section>
        </React.Fragment>
    )
}

export default Login;