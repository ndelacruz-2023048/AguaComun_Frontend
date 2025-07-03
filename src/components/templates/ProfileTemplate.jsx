import React, { useEffect, useState } from "react";
import { UserAuth } from '../../context/AuthContext'
import { GenerateInitialsAvatarProfile } from '../../utils/Avatar';
import { useUserCommunities } from '../../hooks/useUserCommunities';
import { useDonationUser } from '../../hooks/useDonationUser';
import { useReportUser } from '../../hooks/useReportUser';
import { useCollaborationUser } from '../../hooks/useCollaborationUser';
import { jwtDecode } from 'jwt-decode';
import { Icon } from '@iconify/react';
import { useSocket } from "../../hooks/useSocket";

export const ProfileTemplate = () => {
    const { user } = UserAuth();
    const [communityCollaboration, setCommunityCollaboration] = useState()
    const socket = useSocket()
    
    useEffect(()=>{
        socket.on("list-turns",(data)=>{
            setCommunityCollaboration(data)
        })
    },[])
    
    let userDecoded = null;
    let userId = null;
    let name = '', surname = '', profile = '', type = '', email = '', mobilePhone = '', community = null;
    if (user) {
        try {
            userDecoded = jwtDecode(user);
            userId = userDecoded._id || userDecoded.uid || userDecoded.id;
            name = userDecoded.name || '';
            surname = userDecoded.surname || '';
            profile = userDecoded.profile || '';
            type = userDecoded.rol || userDecoded.type || '';
            email = userDecoded.email || '';
            mobilePhone = userDecoded.mobilePhone || '';
            community = userDecoded.community || null;
        } catch (e) {
            console.error(e);
        }
    }
    
    const { communities, isLoading, error } = useUserCommunities(userId);
    const { contributions, isLoading: loadingCampaigns, error: errorCampaigns } = useDonationUser(userId);
    const { reports, isLoading: loadingReports, error: errorReports } = useReportUser(userId);
    const { collaborations, isLoading: loadingCollab, error: errorCollab } = useCollaborationUser(userId);

    return (
        <div className="min-h-screen bg-[#F7FAFC] px-2 sm:px-4 md:px-6 lg:px-8 py-5 w-full flex flex-col items-center">
            {/* Header */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-[#338826] px-2 sm:px-0 w-full text-center md:text-left md:ml-[220px]">
                Profile Detail
            </h1>
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center mt-4 mb-8 w-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center mb-4">
                    {profile && profile.trim() !== '' ? (
                        <img
                            src={profile}
                            alt="Foto de perfil"
                            className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                        />
                    ) : (
                        <GenerateInitialsAvatarProfile name={name} surname={surname} />
                    )}
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center">
                    {name} {surname}
                </h2>
                <span className="text-green-700 font-medium text-xs sm:text-sm md:text-base mt-1">
                    {type}
                </span>
                <h3 className="block text-xs sm:text-sm text-gray-500 mt-1">
                    Usuario ID: {userId}
                </h3>
                {/* Main Community */}
                {community && (
                    <div className="mt-3 text-blue-700 text-xs sm:text-sm md:text-base font-medium flex items-center gap-2 flex-wrap justify-center">
                        <span>Comunidad principal:</span>
                        {community.image && (
                            <img 
                                src={community.image} 
                                alt={community.name} 
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-blue-200" 
                            />
                        )}
                        <span>{community.name}</span>
                    </div>
                )}
            </div>
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-6 mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-4xl">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                    Contact Information
                </h2>
                <hr className="border-gray-200 mb-4"/>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex-1">
                        <p className="text-gray-600 text-sm sm:text-base mb-1">Email:</p>
                        <p className="text-gray-800 font-medium break-all">{email}</p>
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-600 text-sm sm:text-base mb-1">Mobile Phone:</p>
                        <p className="text-gray-800 font-medium">{mobilePhone}</p>
                    </div>
                </div>
            </div>
            {/* Communities Section */}
            <SectionContainer 
                title={`Comunidades donde es ${type}`}
                isLoading={isLoading}
                error={error}
                items={communities}
                emptyMessage="No pertenece a ninguna comunidad adicional."
                renderItem={(c) => (
                    <div className="flex items-start gap-4">
                        <Icon icon="mdi:account-group" width="24" height="24" className="text-gray-500 mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-gray-900">{c.name}</div>
                            <div className="text-gray-600 text-sm">{c.description}</div>
                        </div>
                    </div>
                )}
                className="max-w-lg md:max-w-2xl lg:max-w-4xl"
            />
            
            {/* Campaigns Section */}
            <SectionContainer 
                title="Campañas en las que has aportado"
                isLoading={loadingCampaigns}
                error={errorCampaigns}
                items={contributions}
                emptyMessage="No has aportado a ninguna campaña."
                renderItem={(c) => (
                    <div className="flex items-start gap-4">
                        <Icon icon="mdi:charity" width="24" height="24" className="text-green-600 mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-green-800">{c.name}</div>
                            <div className="text-gray-600 text-sm">{c.description}</div>
                            <div className="text-gray-800 text-sm">Aportado: ${c.amount}</div>
                        </div>
                    </div>
                )}
                className="max-w-lg md:max-w-2xl lg:max-w-4xl"
            />
            
            {/* Reports Section */}
            <SectionContainer 
                title="Reportes realizados"
                isLoading={loadingReports}
                error={errorReports}
                items={reports}
                emptyMessage="No has realizado ningún reporte."
                renderItem={(r) => (
                    <div className="flex items-start gap-4">
                        <Icon icon="mdi:alert-circle-outline" width="24" height="24" className="text-red-600 mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-red-800">{r.title || r.type || 'Reporte'}</div>
                            <div className="text-gray-600 text-sm">{r.description}</div>
                            <div className="text-gray-800 text-sm">Estado: {r.status || 'N/A'}</div>
                        </div>
                    </div>
                )}
                className="max-w-lg md:max-w-2xl lg:max-w-4xl"
            />
            
            {/* Collaborations Section */}
            <SectionContainer 
                title="Colaboraciones en actividades"
                isLoading={loadingCollab}
                error={errorCollab}
                items={collaborations}
                emptyMessage="No has colaborado en ninguna actividad."
                renderItem={(a) => (
                    <div className="flex items-start gap-4">
                        <Icon icon="mdi:calendar-check" width="24" height="24" className="text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-bold text-blue-800">{a.activityName}</div>
                            <div className="text-gray-600 text-sm">{a.description}</div>
                            <div className="text-gray-800 text-sm">
                                Fecha: {a.startDate ? new Date(a.startDate).toLocaleDateString() : 'N/A'} | 
                                Estado: {a.status || 'N/A'}
                            </div>
                        </div>
                    </div>
                )}
                className="max-w-lg md:max-w-2xl lg:max-w-4xl"
            />
        </div>
    );
}

// Reusable Section Component
const SectionContainer = ({ title, isLoading, error, items, emptyMessage, renderItem, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-6 mx-auto w-full ${className || 'max-w-4xl'}`}>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                {title}
            </h2>
            
            {isLoading && (
                <div className="text-blue-600 text-sm sm:text-base py-4 flex items-center gap-2">
                    <Icon icon="mdi:loading" className="animate-spin" />
                    Cargando...
                </div>
            )}
            
            {error && (
                <div className="text-red-600 text-sm sm:text-base py-4 flex items-center gap-2">
                    <Icon icon="mdi:alert-circle" />
                    Error al cargar datos
                </div>
            )}
            
            {items.length > 0 && !isLoading && !error && (
                <ul className="space-y-4">
                    {items.map((item, idx) => (
                        <li 
                            key={item._id || idx} 
                            className="p-3 sm:p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            {renderItem(item)}
                        </li>
                    ))}
                </ul>
            )}
            
            {(!isLoading && !error && items.length === 0) && (
                <div className="text-gray-500 text-sm sm:text-base py-4 text-center">
                    {emptyMessage}
                </div>
            )}
        </div>
    );
};