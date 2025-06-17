import axios from 'axios';
import { create } from 'zustand';
import { useEffect } from 'react';
import { socketConnection } from '../socket/socket';

const useManagerCommunityStore = create((set, get) => ({
    communities: [],
    selectedCommunity: null,
    managers: [],
    setSelectedCommunity: (community) => set({ selectedCommunity: community }),
    fetchCommunities: async () => {
        try {
            const response = await axios.get('http://localhost:3662/v1/aguacomun/communityManager/view');
            set({ communities: response.data.communities });
        } catch (error) {
            set({ communities: [] });
        }
    },
    fetchManagersByCommunity: async (communityId) => {
        try {
            const { selectedCommunity } = get();
            const response = await axios.get('http://localhost:3662/v1/aguacomun/user/view');
            // Filtra los usuarios por dirección (zona, municipio y departamento) que coincidan con la comunidad seleccionada
            let filtered = response.data.users;
            if (selectedCommunity && selectedCommunity.department && selectedCommunity.municipality && selectedCommunity.zone) {
                filtered = filtered.filter(user => {
                    const address = user.address || {};
                    return (
                        address.department === selectedCommunity.department &&
                        address.municipality === selectedCommunity.municipality &&
                        address.zone === selectedCommunity.zone
                    );
                });
            }
            set({ managers: filtered });
        } catch (error) {
            set({ managers: [] });
        }
    },
}));

// Hook para escuchar el evento de comunidades en tiempo real
export const useCommunitySocketListener = () => {
    useEffect(() => {
        socketConnection.connect();
        socketConnection.on('list-communities', (communities) => {
            useManagerCommunityStore.setState({ communities });
        });
        return () => {
            socketConnection.off('list-communities');
        };
    }, []);
};

export default useManagerCommunityStore;