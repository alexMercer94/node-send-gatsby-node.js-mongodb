import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';

const Header = () => {
    // Extract user authenticad from local storage
    const AuthContext = useContext(authContext);
    const { userAuthenticated, user, logout } = AuthContext;

    // Next router
    const router = useRouter();

    useEffect(() => {
        userAuthenticated();
    }, []);

    /**
     * Close user's session
     */
    const logOut = () => {
        router.push('/login');
        logout();
    };

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0" src="/logo.svg" />
            </Link>
            <div>
                {user ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hola {user.name}</p>
                        <button
                            type="button"
                            className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                            onClick={() => logOut()}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                                Iniciar Sesión
                            </a>
                        </Link>
                        <Link href="/signin">
                            <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
