import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Signin = () => {
    // Access to state
    const AuthContext = useContext(authContext);
    const { message, registerUser } = AuthContext;

    // Fom & validations with Formik and Yup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string()
                .required('El password es olibgatorio')
                .min(6, 'El password debe contener al menos 6 caracteres'),
        }),
        onSubmit: (values) => {
            registerUser(values);
        },
    });

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center -my-4">Crear Cuenta</h2>
                {message && <Alert />}
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mg-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoComplete="name"
                                    placeholder="Nombre de Usuario"
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.name}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mg-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Email de Usuario"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.email}</p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="mg-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Password de Usuario"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.password}</p>
                                    </div>
                                ) : null}
                            </div>
                            <input
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full mt-4 p-2 text-white uppercase font-bold rounded"
                                disabled={!formik.isValid}
                                value="Crear Cuenta"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signin;
