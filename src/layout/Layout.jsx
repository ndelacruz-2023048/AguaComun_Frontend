import React from 'react'
import { NavLink, Outlet } from 'react-router'
import logo from '../assets/LogoAgua.jpeg'
import { Icon } from '@iconify/react'
import './Layout.css'

export const Layout = () => {
  return (
    <div>
        <header className='flex justify-between items-center text-black py-4 px-8 md:px-15 bg-white drop-shadow-md'>
            <div className='flex items-center gap-4'>
                <img src={logo} alt="LogoAguaComun" className='w-10 h-10 rounded-full hover:scale-105 transition-all'/>
                <h1 className='font-bold text-2xl'>AguaComún</h1>
            </div>
            <div className='flex gap-6'>
                <NavLink to={'/'}>
                    <span className='text-lg'>Home</span>
                </NavLink>

                <NavLink to={'*'}>
                    <span className='text-lg'>Projects</span>
                </NavLink>

                <NavLink to={'*'}>
                    <span className='text-lg'>Community</span>
                </NavLink>

                <NavLink to={'*'}>
                    <span className='text-lg'>Resources</span>
                </NavLink>
            </div>
            <div className='bg-zinc-300 rounded-full p-2 hover:bg-zinc-400 transition-all cursor-pointer'>
                <Icon icon="token:push" className='w-7 h-7'/>
            </div>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}
