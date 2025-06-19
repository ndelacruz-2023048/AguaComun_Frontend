import { useEffect, useState } from 'react';
import axios from 'axios';

export const useDonationUser = (userId) => {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setError(false);
    axios.get(`http://localhost:3662/v1/aguacomun/user/campaigns-contributed/${userId}`, { withCredentials: true })
      .then(res => {
        setContributions(res.data.contributions || []);
      })
      .catch(() => {
        setError(true);
        setContributions([]);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { contributions, isLoading, error };
};
