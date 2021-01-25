import { CircularProgress } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import './Profile.scss'

const Profile = (props) => {
    return (
        <React.Fragment>
            <section className="component-section">
                <h2>Profile</h2>
                <hr />
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        sex: '',
                        address: '',
                        description: ''
                    }}
                    // validationSchema={}
                    onSubmit={() => {}}
                >
                    {({touched, errors, isSubmitting}) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="profile-firstName">First Name</label>
                                <Field id="profile-firstName" name="firstName" type="text" className="field"/>
                                {touched.firstName && errors.firstName && <div className="field-error">{errors.firstName}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-lastName">Last Name</label>
                                <Field id="profile-lastName" name="lastName" type="text" className="field"/>
                                {touched.lastName && errors.lastName && <div className="field-error">{errors.lastName}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-sex">Sex</label>
                                <Field id="profile-sex" name="sex" as="select" className="field select">
                                    <option value="" disabled></option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                    <option value="o">Other</option>
                                </Field>
                                {touched.sex && errors.sex && <div className="field-error">{errors.sex}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-address">Address</label>
                                <Field id="profile-address" name="address" type="text" className="field"/>
                                {touched.address && errors.address && <div className="field-error">{errors.address}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="profile-description">Description</label>
                                <Field id="profile-description" name="description" as="textarea" className="field"/>
                                {touched.description && errors.description && <div className="field-error">{errors.description}</div>}
                            </div>
                            <div className="form-group btn">
                                {!isSubmitting ?
                                <button type="submit" className="control btn">Signup</button> :
                                <CircularProgress/>}
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </React.Fragment>
    );
}

export default Profile;