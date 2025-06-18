import React, { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import logo from '../assets/LogoAguaComun.svg'
import { Icon } from '@iconify/react'
import { SidebarAdmin } from '../components/sidebar/sidebarAdmin'
import { UserAuth } from '../context/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { GenerateInitialsAvatar } from '../utils/Avatar'
import { useLogout } from '../hooks/useLogout'

export const Layout = () => {
    const { user } = UserAuth();
        const [descodeUserState, setdescodeUserState] = useState()
        useEffect(() => {
            const decodeUser = jwtDecode(user)
            setdescodeUserState(decodeUser)
        }, [])
    
    let name, surname, profile = ''
    if(user) {
        try {
        const decodedToken = jwtDecode(user);
            name = decodedToken?.name || '';
            surname = decodedToken?.surname || '';
            profile = decodedToken?.profile || '';
        } catch (e) {
            console.error(e);
        }
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const { logout } = useLogout()

    const handleLogoutClick  = ()=> {
        logout()
    }

    return (
        <div>
            <header className='flex justify-between items-center text-black py-4 px-8 md:px-15 bg-white drop-shadow-md'>
                <div className='flex items-center gap-4'>
                    <img src={logo} alt="LogoAguaComun" className='w-10 h-10 rounded-full hover:scale-105 transition-all'/>
                    <h1 className='font-bold text-2xl'>AguaComún</h1>
                </div>
                <div className='flex gap-6 items-center'>
                    <div className='flex gap-6 '>
                        <NavLink to={'/'}>
                            <span className='text-lg'>Home</span>
                        </NavLink>

                        <NavLink to={'*'}>
                            <span className='text-lg'>Projects</span>
                        </NavLink>

                        <NavLink to={'/community'}>
                            <span className='text-lg'>Community</span>
                        </NavLink>

                        <NavLink to={'campaigns/user'}>
                            <span className='text-lg'>Fundraising Campaings</span>
                        </NavLink>

                        <NavLink to={'/community-collaboration'}>
                            <span className='text-lg'>Collaboration</span>
                        </NavLink>
                    </div>
                    <div className='bg-zinc-300 rounded-full p-2 hover:bg-zinc-400 transition-all cursor-pointer'>
                        <Icon icon="token:push" className='w-7 h-7'/>
                    </div>
                    <div onClick={toggleMenu} className='transition-all cursor-pointer'>
                        {profile && profile.trim() !== '' ? (
                            <img
                                src={profile}
                                alt="Foto de perfil"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <GenerateInitialsAvatar name={name} surname={surname} />
                        )}
                        {isMenuOpen && (
                            <div
                                className=" absolute left-450 mt-2 w-48 bg-gray-100 rounded-md shadow-lg z-10 origin-top-right"
                                style={{ transform: 'translateX(-100%)' }}
                            >
                                <div className='absolute left-44 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-100'/>
                                <NavLink to="/profile" className="px-4 py-2 flex gap-2 hover:bg-gray-200">
                                    <Icon icon="iconamoon:profile-fill" width="20" height="20" />
                                    Profile
                                </NavLink>
                                <NavLink to="/settings" className="flex gap-2 px-4 py-2 hover:bg-gray-200">
                                    <Icon icon="solar:settings-bold" width="20" height="20" />
                                    Settings
                                </NavLink>
                                <button
                                    type="button"
                                    className="flex gap-2 px-4 py-2 w-48 hover:bg-gray-200 cursor-pointer"
                                    onClick={handleLogoutClick}
                                >
                                    <Icon icon="line-md:logout" width="20" height="20" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main>
                <div className='flex flex-col md:flex-row'>
                    {descodeUserState?.type === "ADMIN" && (
                        <SidebarAdmin/>
                    )}
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}
