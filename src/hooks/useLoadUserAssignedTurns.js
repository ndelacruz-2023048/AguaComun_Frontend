import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useCommunityCollaboration } from '../stores/communityCollaborationStore';
import { UserAuth } from '../context/AuthContext';

export function useLoadUserAssignedTurns() {
  const { user } = UserAuth();
  const { setTurnsAssignedToUser } = useCommunityCollaboration();

  useEffect(() => {
    const fetchUserTurns = async () => {
      try {
        if (!user) return;
        const decoded = jwtDecode(user);
        const userId = decoded.uid || decoded._id || decoded.id;
        if (!userId) return;
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/v1/aguacomun/communityTurn/user/${userId}`);
        const data = await res.json();
        setTurnsAssignedToUser(Array.isArray(data) ? data : []);
      } catch (err) {
        setTurnsAssignedToUser([]);
      }
    };
    fetchUserTurns();
  }, [user, setTurnsAssignedToUser]);
}
