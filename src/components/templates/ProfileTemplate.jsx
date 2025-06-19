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
     console.log(communityCollaboration)
    
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
    
    console.log('User Communities:', communities);
    

    return (
        <div className="flex flex-col min-h-screen w-7/7 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
            <h1 className="md:text-4xl lg:text-[40px] ml-8 font-bold mb-6 md:mb-8 lg:mb-5 text-[#338826]"> Profile Detail</h1>
            <div className="flex flex-col items-center border-amber-300 justify-center mt-12 mb-8">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-3">
                {profile && profile.trim() !== '' ? (
                    <img
                        src={profile}
                        alt="Foto de perfil"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <GenerateInitialsAvatarProfile name={name} surname={surname} />
                )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{name} {surname}</h2>
            <span className="text-green-700 font-medium ">{type}</span>
            {/* Comunidad principal */}
            {community && (
                <div className="mt-2 text-blue-700 text-lg font-medium flex items-center gap-2">
                    <span>Comunidad principal:</span>
                    {community.image && (
                        <img src={community.image} alt={community.name} className="w-8 h-8 rounded-full object-cover border-2 border-blue-200" />
                    )}
                    <span>{community.name}</span>
                </div>
            )}
            </div>
            <div className="p-5  w-[1200px] mx-auto">
                <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
                <hr className="border-gray-500 mb-8 "/>
                <div className="flex rounded-lg w-full max-w-md">
                    <p className="flex text-gray-700 mb-2">Email: <br />{email}</p>
                    <p className="flex text-gray-700 p-7 mt-[-27px] mb-2">Mobile Phone: <br />{mobilePhone}</p>
                </div>
            </div>

            {/* Comunidades donde es miembro */}
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Comunidades donde es {type}</h2>
                {isLoading && <div className="text-blue-600 mt-2">Cargando comunidades...</div>}
                {error && <div className="text-red-600 mt-2">Error al cargar comunidades</div>}
                {communities.length > 0 && !isLoading && !error && (
                    <ul className="flex flex-col gap-4">
                        {communities.map((c, idx) => (
                            <li key={c._id || idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
                                <Icon icon="mdi:account-group" width="36" height="36" className="text-gray-500" />
                                <div>
                                    <div className="font-bold text-lg text-gray-900">{c.name}</div>
                                    <div className="text-gray-600 text-sm">{c.description}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {(!isLoading && !error && communities.length === 0) && (
                    <div className="text-gray-600">No pertenece a ninguna comunidad adicional.</div>
                )}
            </div>

            {/* Campañas en las que ha aportado */}
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Campañas en las que has aportado</h2>
                {loadingCampaigns && <div className="text-blue-600 mt-2">Cargando campañas...</div>}
                {errorCampaigns && <div className="text-red-600 mt-2">Error al cargar campañas</div>}
                {contributions.length > 0 && !loadingCampaigns && !errorCampaigns && (
                    <ul className="flex flex-col gap-4">
                        {contributions.map((c, idx) => (
                            <li key={idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-green-200">
                                <Icon icon="mdi:charity" width="36" height="36" className="text-green-600" />
                                <div>
                                    <div className="font-bold text-lg text-green-800">{c.name}</div>
                                    <div className="text-gray-600 text-sm">{c.description}</div>
                                    <div className="text-gray-800 text-sm">Aportado: ${c.amount}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {(!loadingCampaigns && !errorCampaigns && contributions.length === 0) && (
                    <div className="text-gray-600">No has aportado a ninguna campaña.</div>
                )}
            </div>

            {/* Reportes realizados */}
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Reportes realizados</h2>
                {loadingReports && <div className="text-blue-600 mt-2">Cargando reportes...</div>}
                {errorReports && <div className="text-red-600 mt-2">Error al cargar reportes</div>}
                {reports.length > 0 && !loadingReports && !errorReports && (
                    <ul className="flex flex-col gap-4">
                        {reports.map((r, idx) => (
                            <li key={r._id || idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-red-200">
                                <Icon icon="mdi:alert-circle-outline" width="36" height="36" className="text-red-600" />
                                <div>
                                    <div className="font-bold text-lg text-red-800">{r.title || r.type || 'Reporte'}</div>
                                    <div className="text-gray-600 text-sm">{r.description}</div>
                                    <div className="text-gray-800 text-sm">Estado: {r.status || 'N/A'}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {(!loadingReports && !errorReports && reports.length === 0) && (
                    <div className="text-gray-600">No has realizado ningún reporte.</div>
                )}
            </div>

            {/* Colaboraciones en actividades */}
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Colaboraciones en actividades</h2>
                {loadingCollab && <div className="text-blue-600 mt-2">Cargando colaboraciones...</div>}
                {errorCollab && <div className="text-red-600 mt-2">Error al cargar colaboraciones</div>}
                {collaborations.length > 0 && !loadingCollab && !errorCollab && (
                    <ul className="flex flex-col gap-4">
                        {collaborations.map((a, idx) => (
                            <li key={a._id || idx} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow border border-blue-200">
                                <Icon icon="mdi:calendar-check" width="36" height="36" className="text-blue-600" />
                                <div>
                                    <div className="font-bold text-lg text-blue-800">{a.activityName}</div>
                                    <div className="text-gray-600 text-sm">{a.description}</div>
                                    <div className="text-gray-800 text-sm">Fecha: {a.startDate ? new Date(a.startDate).toLocaleDateString() : 'N/A'} | Estado: {a.status || 'N/A'}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {(!loadingCollab && !errorCollab && collaborations.length === 0) && (
                    <div className="text-gray-600">No has colaborado en ninguna actividad.</div>
                )}
            </div>
        </div>
    );
}