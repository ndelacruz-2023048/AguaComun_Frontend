import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LinksArraySidebarAdmin } from '../../utils/dataEstatica';
import { Icon } from '@iconify/react';
import { Tooltip as ReactTooltip } from 'react-tooltip'; // Asegúrate de tenerlo instalado
import { motion, AnimatePresence } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export const SidebarAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = UserAuth();
    let type = '';
    if (user) {
        try {
            const decodedToken = jwtDecode(user);
            type = decodedToken?.rol || decodedToken?.type || '';
        } catch (e) {
            console.error(e);
        }
    }
    // Filtrar los links según el type del usuario
    const filteredLinks = LinksArraySidebarAdmin.filter(link => link.type.includes(type));

    return (
        <>
            {/* Inicializa tooltip global */}
            <ReactTooltip id="sidebarTooltip" place="right" effect="solid" />

            <motion.section
                initial={false}
                animate={{ width: isOpen ? '16rem' : '4.5rem' }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`bg-gray-50 p-4 h-full flex flex-col rounded-r-xl ${
                    isOpen ? 'shadow-lg' : ''
                }`}
            >
                {/* Botón para abrir/cerrar + título con animación */}
                <div className="flex justify-between mb-4 items-center">
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.label
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                htmlFor=""
                                className="text-sm font-bold text-gray-700"
                            >
                                Acciones avanzadas
                            </motion.label>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <motion.span
                            initial={false}
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Icon icon="ic:baseline-menu" width="24" height="24" />
                        </motion.span>
                    </button>
                </div>

                {/* Opciones del menú con animaciones */}
                {filteredLinks.map(({ label, icon, to }, index) => (
                    <motion.div
                        key={to}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: isOpen ? index * 0.05 : 0, duration: 0.3 }}
                        className="mb-2"
                    >
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `group flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out ${
                                    isActive
                                        ? 'bg-green-400 text-white shadow-md'
                                        : 'hover:bg-gray-200 hover:shadow-sm'
                                }`
                            }
                        >
                            {/* Ícono con efecto al pasar el cursor */}
                            <motion.span
                                whileHover={{
                                    scale: 1.2,
                                    color: '#38c024',
                                    boxShadow: '0px 0px 8px rgba(56, 192, 36, 0.4)',
                                }}
                                transition={{ type: 'tween', duration: 0.2 }}
                                data-tooltip-id="sidebarTooltip"
                                data-tooltip-content={label}
                                data-tooltip-place="right"
                                className="inline-flex items-center justify-center size-10 rounded-md transition-all"
                            >
                                <Icon icon={icon} className="text-2xl group-hover:text-green-600 transition-colors" />
                            </motion.span>

                            {/* Texto solo visible si está abierto */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="whitespace-nowrap overflow-hidden ml-3"
                                    >
                                        {label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </motion.div>
                ))}
            </motion.section>
        </>
    );
};