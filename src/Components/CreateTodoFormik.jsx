import React from "react";
import styles from "./Components.module.css";
import { useMutation, useQueryClient } from "react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import agent from "../Utils/agent";
import * as yup from "yup";

export default function CreateTodoFormik() {

    const queryClient = useQueryClient();
    const {mutate, isLoading} = useMutation((value) => 
    agent.TODOS.createNewTodo(value.text, value.isDone), {
        onSuccess: (res) => {
            queryClient.invalidateQueries("todos");
        }
    });

    return (
        <Formik
            initialValues={{text:"", isDone:false}}
            validationSchema={yup.object().shape({
                text: yup.string().required().min(3).max(200),
                isDone: yup.bool()
            })}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                if (!isLoading) {
                    mutate({
                        text: values.text,
                        isDone: values.isDone,
                    })
                }
                resetForm();
            }}
        >
            {({values, errors, touched}) => (
                <Form className={styles.form}>
                    <label htmlFor="text">Text</label>
                    {errors.text && touched.text && (
                        <span>{errors.text}</span>
                    )}
                    <Field type="text" name="text" />
                    <label htmlFor="isDone">Done</label>
                    <ErrorMessage name="isDone" component="div"/>
                    <label>
                        <Field type="checkbox" name="isDone"/>
                        {`${values.isDone}`}
                    </label>
                    <button type="submit">Create New Todo</button>
                </Form>
            )}
        </Formik>
    )
}