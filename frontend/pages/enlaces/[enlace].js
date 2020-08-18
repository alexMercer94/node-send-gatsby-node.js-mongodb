import React, { Fragment, useContext, useState } from 'react';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import appContext from '../../context/app/appContext';
/**
 * Servir archivos estaticos
 * @param {*} params
 */
export async function getStaticProps({ params }) {
    const { enlace } = params;
    const result = await axiosClient.get(`/api/enlaces/${enlace}`);

    return {
        props: {
            enlace: result.data,
        },
    };
}

/**
 * Obtener datos cuando se construye el sitio
 */
export async function getStaticPaths() {
    const enlaces = await axiosClient.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map((enlace) => ({
            params: {
                enlace: enlace.url,
            },
        })),
        fallback: false,
    };
}

const Enlace = ({ enlace }) => {
    const [hasPassword, setHasPassword] = useState(enlace.password);
    const [password, setPassword] = useState('');

    // Extract error message from files
    const AppContext = useContext(appContext);
    const { showAlert, file_message } = AppContext;

    const verifyPass = async (e) => {
        e.preventDefault();

        const data = {
            password,
        };

        try {
            const response = await axiosClient.post(`/api/enlaces/${enlace.enlace}`, data);
            setHasPassword(response.data.password);
        } catch (error) {
            showAlert(error.response.data.msg);
        }
    };

    return (
        <Layout>
            {hasPassword ? (
                <>
                    <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>
                    {file_message && <Alert />}
                    <div className="flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={(e) => verifyPass(e)}
                            >
                                <div className="mg-4">
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        autoComplete="password"
                                        placeholder="Password del enlace"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="bg-red-500 hover:bg-gray-900 w-full mt-4 p-2 text-white uppercase font-bold rounded"
                                    value="Vaidar Password"
                                />
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <Fragment>
                    <h1 className="text-4xl text-center text-gray700">Descarga tu archivo:</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a
                            href={`${process.env.backendURL}/api/files/${enlace.file}`}
                            className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                        >
                            Aquí
                        </a>
                    </div>
                </Fragment>
            )}
        </Layout>
    );
};

export default Enlace;
