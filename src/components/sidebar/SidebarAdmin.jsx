import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LinksArraySidebarAdmin } from '../../utils/dataEstatica';
import { Icon } from '@iconify/react';

export const SidebarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false); // true = abierto por defecto

    return (
        <section className={`bg-gray-50 p-4 ${isOpen ? 'w-64' : 'w-18'} transition-all duration-300 ease-in-out`}>
            {/* Botón para abrir/cerrar */}
            <div className="flex justify-between mb-4 items-center">
                {isOpen && <label htmlFor="">Acciones avanzadas</label>}
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200">
                    <Icon icon={isOpen ? "ic:baseline-close" : "ic:baseline-menu"} width="24" height="24" />
                </button>
            </div>

            {/* Opciones del menú */}
            {LinksArraySidebarAdmin.map(({ label, icon, to }) => (
                <div key={to} className="mb-2">
                    <NavLink
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center p-2 rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-[#E8F0F2] text-black'
                                    : 'hover:bg-gray-200'
                            }`
                        }
                    >
                        <Icon icon={icon} className="text-2xl mr-3 flex-shrink-0" />
                        {isOpen && <span className="whitespace-nowrap">{label}</span>}
                    </NavLink>
                </div>
            ))}
        </section>
    );
};