import React from 'react';
import { MutationFunctionOptions, OperationVariables, FetchResult } from "@apollo/client";
import { Formik, Form, ErrorMessage, Field } from "formik"

export const FormikForm: React.FC<{
    handler: (options?: MutationFunctionOptions<any,
        OperationVariables> | undefined) => Promise<FetchResult<any,
            Record<string, any>, Record<string, any>>>, refetch: Function, startPolling?: (delay: number)=>void}> = ({ handler, refetch, startPolling }) => {
                return (
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            setSubmitting(true);
                            const response = await handler({
                                variables: values,
                            });
                            if (response.data.login != null) {
                                localStorage.setItem('token', response.data.login);
                                refetch();
                                if (startPolling) startPolling(2000);
                                setSubmitting(false);
                            } else {
                                setErrors({
                                    username: 'Check your username',
                                    password: 'Check your password'
                                });
                            }
                        }}
                    >
                        {({
                            isSubmitting
                        }) => (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <label htmlFor="username">Username: </label>
                                <Field type="username" name="username"/>
                                <ErrorMessage name="username" component="div" />
                                <label htmlFor="password">Password: </label>
                                <Field type="password" name="password"/>
                                <ErrorMessage name="password" component="div" />
                                <button type="submit" disabled={isSubmitting} style={{marginTop: '1em'}}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                )
            }