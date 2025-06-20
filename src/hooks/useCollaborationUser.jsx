import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCollaborationUser = (userId) => {
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setError(false);
    axios.get(`https://aguacomunbackend-production.up.railway.app/v1/aguacomun/user/collaborations/${userId}`, { withCredentials: true })
      .then(res => {
        setCollaborations(res.data.collaborations || []);
      })
      .catch(() => {
        setError(true);
        setCollaborations([]);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { collaborations, isLoading, error };
}