import React, { useEffect, useState } from 'react' 
import { NavLink, Outlet } from 'react-router-dom' 
import logo from '../assets/LogoAguaComun.svg' 
import { Icon } from '@iconify/react' 
import { SidebarAdmin } from '../components/sidebar/SidebarAdmin' 
import { UserAuth } from '../context/AuthContext' 
import { jwtDecode } from 'jwt-decode' 
import { GenerateInitialsAvatar } from '../utils/Avatar' 
import { useLogout } from '../hooks/useLogout' 
import { motion, AnimatePresence } from 'framer-motion' 

export const Layout = () => {
    const { user } = UserAuth() 
        const [descodeUserState, setdescodeUserState] = useState()
        useEffect(() => {
            const decodeUser = jwtDecode(user)
            setdescodeUserState(decodeUser)
        }, [])
    
    let name, surname, profile = ''
    if(user) {
        try {
        const decodedToken = jwtDecode(user) 
            name = decodedToken?.name || '' 
            surname = decodedToken?.surname || '' 
            profile = decodedToken?.profile || '' 
        } catch (e) {
            console.error(e) 
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen) 
    }

    const { logout } = useLogout()

    const handleLogoutClick  = ()=> {
        logout()
    }

    return (
        <div className='w-full h-full absolute bg-gray-50 flex flex-col'>
            <header className='flex justify-between items-center text-gray-800 py-4 px-18 md:px-15 bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 border-b border-green-200/50 shadow-lg backdrop-blur-sm flex-shrink-0'>
                {/* Logo y título */}
                <div className='flex items-center gap-4 group'>
                    <div className='relative'>
                        <img src={logo} alt="LogoAguaComun" className='w-10 h-10 rounded-full shadow-md group-hover:scale-110 transition-all duration-300 ease-out'/>
                        <div className='absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>
                    <h1 className='font-bold text-2xl bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent'>
                        AguaComún
                    </h1>
                </div>

                {/* Navegación y controles */}
                <div className='flex gap-8 items-center'>
                    {/* Enlaces de navegación */}
                    <div className='flex gap-6'>
                        <NavLink 
                            to={'/'}
                            className={({ isActive }) => 
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                                    isActive 
                                        ? 'text-green-600 bg-green-50 shadow-md' 
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                                }`
                            }
                        >
                            <span className='relative z-10 text-lg'>Home</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </NavLink>

                        <NavLink 
                            to={'campaigns/user'}
                            className={({ isActive }) => 
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                                    isActive 
                                        ? 'text-green-600 bg-green-50 shadow-md' 
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                                }`
                            }
                        >
                            <span className='relative z-10 text-lg'>Recaudación de fondos</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </NavLink>

                        <NavLink 
                            to={'campaigns/user'}
                            className={({ isActive }) => 
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                                    isActive 
                                        ? 'text-green-600 bg-green-50 shadow-md' 
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                                }`
                            }
                        >
                            <span className='relative z-10 text-lg'>Reportes de agua</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </NavLink>

                        <NavLink 
                            to={'/community-collaboration'}
                            className={({ isActive }) => 
                                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                                    isActive 
                                        ? 'text-green-600 bg-green-50 shadow-md' 
                                        : 'text-gray-600 hover:text-green-600 hover:bg-green-50/50'
                                }`
                            }
                        >
                            <span className='relative z-10 text-lg'>Colaboración</span>
                            <div className='absolute inset-0 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </NavLink>
                    </div>

                    {/* Notificaciones */}
                    <div className='relative group'>
                        <div className='bg-gradient-to-r from-green-100 to-yellow-100 rounded-full p-2 hover:from-green-200 hover:to-yellow-200 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg'>
                            <Icon icon="token:push" className='w-7 h-7 text-green-600'/>
                        </div>
                        <div className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center'>
                            <span className='text-xs text-white font-bold'>3</span>
                        </div>
                    </div>

                    {/* Perfil de usuario */}
                    <div className='relative'>
                        <div 
                            onClick={toggleMenu} 
                            className='transition-all duration-300 cursor-pointer group'
                        >
                            {profile && profile.trim() !== '' ? (
                                <div className='relative'>
                                    <img
                                        src={profile}
                                        alt="Foto de perfil"
                                        className="w-10 h-10 rounded-full object-cover shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                </div>
                            ) : (
                                <div className='group-hover:scale-105 transition-all duration-300'>
                                    <GenerateInitialsAvatar name={name} surname={surname} />
                                </div>
                            )}
                        </div>

                        {/* Menú desplegable */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50 border-green-200/50"
                                >
                                    <div className='absolute -top-2 right-6 h-4 w-4 bg-white border-l border-t border-green-200/50 transform rotate-45'/>
                                    
                                    <NavLink 
                                        to="/profile" 
                                        className="px-4 py-2 flex gap-2 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all duration-200"
                                    >
                                        <Icon icon="iconamoon:profile-fill" width="20" height="20" />
                                        <span>Profile</span>
                                    </NavLink>
                                    
                                    <NavLink 
                                        to="/settings" 
                                        className="flex gap-2 px-4 py-2 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all duration-200"
                                    >
                                        <Icon icon="solar:settings-bold" width="20" height="20" />
                                        <span>Settings</span>
                                    </NavLink>
                                    
                                    <button
                                        type="button"
                                        className="flex gap-2 px-4 py-2 w-full hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-200 cursor-pointer"
                                        onClick={handleLogoutClick}
                                    >
                                        <Icon icon="line-md:logout" width="20" height="20" />
                                        <span>Logout</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* Contenido principal con animación */}
            <main className='w-full flex-1 flex'>
                <div className='flex flex-col md:flex-row w-full'>
                    {(descodeUserState?.type === "ADMIN" || descodeUserState?.type === "COORDINADOR") && (
                        <SidebarAdmin/>
                    )}
                    <div className='flex-1'>
                        <Outlet/>
                    </div>
                </div>
            </main>
        </div>
    ) 
} 