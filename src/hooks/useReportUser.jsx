import { useEffect, useState } from 'react';
import axios from 'axios';

export const useReportUser = (userId) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setError(false);
    axios.get(`https://aguacomunbackend-production.up.railway.app/v1/aguacomun/user/reports/${userId}`, { withCredentials: true })
      .then(res => {
        setReports(res.data.reports || []);
      })
      .catch(() => {
        setError(true);
        setReports([]);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { reports, isLoading, error };
};
