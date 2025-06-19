import React from "react";
import { UserAuth } from '../../context/AuthContext'
import { GenerateInitialsAvatarProfile } from '../../utils/Avatar';
import { useUserCommunities } from '../../hooks/useUserCommunities';

export const ProfileTemplate = () => {
    const { user } = UserAuth();

    if (!user) return <div>Cargando...</div>;

    const name = user.name || '';
    const surname = user.surname || '';
    const rol = user.rol || user.type || '';
    const profilePicture = user.profilePicture || user.profile || '/default-profile.png';
    const email = user.email || 'No email provided';
    const mobilePhone = user.mobilePhone || user.numberPhone || '';
    const community = user.community;
    // Usar el hook para obtener comunidades por userId
    const userId = user.uid || user._id || user.id;
    const { communities, isLoading, error } = useUserCommunities(userId);

    return (
        <div className="flex flex-col min-h-screen w-7/7 bg-[#F7FAFC] px-4 sm:px-6 lg:px-8 py-5">
            <h1 className="md:text-4xl lg:text-[40px] ml-8 font-bold mb-6 md:mb-8 lg:mb-5 text-[#338826]"> Profile Detail</h1>
            <div className="flex flex-col items-center border-amber-300 justify-center mt-12 mb-8">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-3">
                {profilePicture && profilePicture !== '/default-profile.png' ? (
                <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-[120px] h-[120px] rounded-full object-cover border-4 border-green-200"
                />
                ) : (
                <GenerateInitialsAvatarProfile name={name} surname={surname} />
                )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">{name} {surname}</h2>
            <span className="text-green-700 font-medium ">{rol}</span>
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
            {/* Sección de comunidades al final */}
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Comunidades donde es {rol}</h2>
                {isLoading && <div className="text-blue-600 mt-2">Cargando comunidades...</div>}
                {error && <div className="text-red-600 mt-2">Error al cargar comunidades</div>}
                {communities.length > 0 && !isLoading && !error && (
                    <ul className="flex flex-wrap gap-4 justify-center">
                        {communities.map((c, idx) => (
                            <li key={c._id || idx} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                {c.image && <img src={c.image} alt={c.name} className="w-6 h-6 rounded-full object-cover" />}
                                <span>{c.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {(!isLoading && !error && communities.length === 0) && (
                    <div className="text-gray-600">No pertenece a ninguna comunidad adicional.</div>
                )}
            </div>
            <div className="p-5 w-[1200px] mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Comunidades donde es </h2>
                {isLoading && <div className="text-blue-600 mt-2">Cargando comunidades...</div>}
                {error && <div className="text-red-600 mt-2">Error al cargar comunidades</div>}
                {communities.length > 0 && !isLoading && !error && (
                    <ul className="flex flex-wrap gap-4 justify-center">
                        {communities.map((c, idx) => (
                            <li key={c._id || idx} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                {c.image && <img src={c.image} alt={c.name} className="w-6 h-6 rounded-full object-cover" />}
                                <span>{c.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {(!isLoading && !error && communities.length === 0) && (
                    <div className="text-gray-600">No pertenece a ninguna comunidad adicional.</div>
                )}
            </div>
        </div>
    );
}