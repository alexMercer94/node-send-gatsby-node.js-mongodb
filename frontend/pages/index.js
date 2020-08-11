import Link from 'next/link';
import React, { Fragment, useContext, useEffect } from 'react';
import Alert from '../components/Alert';
import Dropzone from '../components/Dropzone';
import Layout from '../components/Layout';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Index = () => {
    // Extract user authenticad from local storage
    const AuthContext = useContext(authContext);
    const { userAuthenticated } = AuthContext;
    // Extract error message from files
    const AppContext = useContext(appContext);
    const { file_message, url } = AppContext;

    useEffect(() => {
        userAuthenticated();
    }, []);

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                {url ? (
                    <Fragment>
                        <p className="text-center text-2xl mt-10">
                            <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es: </span>
                            {`${process.env.frontendURL}/enlaces/${url}`}
                        </p>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-gray-900 w-full mt-4 p-2 text-white uppercase font-bold rounded mt-10"
                            onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}
                        >
                            Copiar enlace
                        </button>
                    </Fragment>
                ) : (
                    <>
                        {file_message && <Alert />}
                        <div className="lg:flex md:shadow-lg p-5 bg-white rouded-lg py-10">
                            <Dropzone />
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                    Compartir archivo de forma sencilla y privada
                                </h2>
                                <p className="text-lg leading-loose">
                                    <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir
                                    archivoscon cifrado de extremo a extremo y un archivo que es eliminado después de
                                    ser descargado. Asi que puedes mantener lo que compartes como private y asegurarte
                                    de que tus cosas no permanezcan en linea para siempre.
                                </p>
                                <Link href="/signin">
                                    <a className="text-red-500 font-bold text-lg hover:text-red-700">
                                        Crea un cuenta para mayores beneficios
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Index;
