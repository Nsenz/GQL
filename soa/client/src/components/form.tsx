import React, {useState} from 'react';
import { MutationFunctionOptions, OperationVariables, FetchResult } from "@apollo/client";
import { Formik, Form } from "formik"
import { FieldAtomic } from './molecules/field';

export const FormikForm: React.FC<{
    handler: (options?: MutationFunctionOptions<any,
        OperationVariables> | undefined) => Promise<FetchResult<any,
            Record<string, any>, Record<string, any>>>, refetch: Function, startPolling?: (delay: number)=>void}> = ({ handler, refetch, startPolling }) => {
                const [username, setUsername] = useState('');
                const [password, setPassword] = useState('');
                return (
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={async (_, { setSubmitting, setErrors }) => {
                            setSubmitting(true);
                            const response = await handler({
                                variables: {
                                    username,
                                    password
                                },
                            });
                            if (response.data.login != null) {
                                localStorage.setItem('token', response.data.login);
                                refetch();
                                if (startPolling) startPolling(2000);
                                setSubmitting(false);
                            } else {
                                setErrors({
                                    username: 'Check your credentials'
                                });
                            }
                        }}
                    >
                        {({
                            isSubmitting,
                            errors
                        }) => (
                            <Form style={{display: 'flex', flexDirection: 'column'}}>
                                <FieldAtomic onChange={(e)=>setUsername(e.target.value)} type='text' name='username' label='username' size='medium' key='username' />
                                <br />
                                <FieldAtomic onChange={(e)=>setPassword(e.target.value)} error={errors.username} type='password' name='password' label='password' size='medium' key='password' />
                                <br />
                                <button type='submit' disabled={isSubmitting} 
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    border: 0,
                                    backgroundColor: 'rgb(120, 216, 245)',
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: 1,
                                    color: '#162D3D',
                                    padding: '14px 16px',
                                    borderRadius: '30rem'
                                }}>
                                    Send
                                </button>
                            </Form>
                        )}
                    </Formik>
                )
            }