import React from 'react';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

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
    console.log(enlace);
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray700">Descarga tu archivo:</h1>
            <div className="flex items-center justify-center mt-10">
                <a
                    href={`${process.env.backendURL}/api/files/${enlace.file}`}
                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                >
                    Aquí
                </a>
            </div>
        </Layout>
    );
};

export default Enlace;
