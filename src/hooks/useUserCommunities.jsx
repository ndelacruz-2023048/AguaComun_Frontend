import { useEffect, useState } from 'react';
import axios from 'axios';

export const useUserCommunities = (userId) => {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUserCommunities = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await axios.get(`http://localhost:3662/v1/aguacomun/user/communities/${userId}`,
        { withCredentials: true }
      );
      setCommunities(response.data.communities || []);
    } catch (e) {
      setError(true);
      setCommunities([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId) fetchUserCommunities();
  }, [userId]);

  return { communities, isLoading, error };
};