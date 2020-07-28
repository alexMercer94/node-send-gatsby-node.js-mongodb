import React from 'react';
import Layout from '../components/Layout';

const Signin = () => {
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center -my-4">Crear Cuenta</h2>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <div className="mg-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    placeholder="Nombre de Usuario"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Signin;
