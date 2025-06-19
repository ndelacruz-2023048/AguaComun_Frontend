import React, { useEffect, useState } from 'react';
import { getAllCommunities, getAllReports, getAllDonations } from '../../routers/services/Api';
import { UserAuth } from '../../context/AuthContext';
import { Icon } from '@iconify/react';

export const UserActivityHistory = () => {
  const { user } = UserAuth();
  const [communities, setCommunities] = useState([]);
  const [reports, setReports] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);
      // Comunidades donde el usuario es miembro o coordinador
      const commRes = await getAllCommunities();
      let userCommunities = [];
      if (commRes && commRes.data) {
        userCommunities = commRes.data.filter(c =>
          c.members?.some(m => m.userId === user._id) ||
          c.coordinators?.some(m => m.userId === user._id)
        ).map(c => {
          let role = 'Miembro';
          if (c.coordinators?.some(m => m.userId === user._id)) role = 'Coordinador';
          return { name: c.name, description: c.description, role };
        });
      }
      setCommunities(userCommunities);

      // Reportes hechos por el usuario
      const repRes = await getAllReports();
      let userReports = [];
      if (repRes && repRes.data) {
        userReports = repRes.data.filter(r => r.userId === user._id);
      }
      setReports(userReports);

      // Donaciones hechas por el usuario
      const donRes = await getAllDonations();
      let userDonations = [];
      if (donRes && donRes.data && Array.isArray(donRes.data)) {
        userDonations = donRes.data.filter(d => d.userId === user._id);
      }
      setDonations(userDonations);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) return <div>Cargando historial...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Coordinated Communities</h2>
      {communities.length === 0 && <p className="mb-6">No communities found.</p>}
      {communities.map((c, i) => (
        <div key={i} className="flex items-center mb-2">
          <Icon icon="mdi:account-group" className="mr-2 text-gray-600" width={24} />
          <div>
            <div className="font-semibold">{c.name} <span className="text-xs text-blue-600 ml-2">({c.role})</span></div>
            <div className="text-gray-500 text-sm">{c.description}</div>
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-8 mb-4">Current Activities</h2>
      {reports.length === 0 && <p className="mb-6">No reports found.</p>}
      {reports.map((r, i) => (
        <div key={i} className="flex items-center mb-2">
          <Icon icon="mdi:note-text-outline" className="mr-2 text-green-600" width={24} />
          <div>
            <div className="font-semibold">{r.title || 'Water Report'}</div>
            <div className="text-gray-500 text-sm">{r.description || 'No description'} | Date: {r.date || r.createdAt}</div>
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-8 mb-4">Donations</h2>
      {donations.length === 0 && <p className="mb-6">No donations found.</p>}
      {donations.map((d, i) => (
        <div key={i} className="flex items-center mb-2">
          <Icon icon="mdi:cash" className="mr-2 text-yellow-600" width={24} />
          <div>
            <div className="font-semibold">Donation: {d.amount} {d.currency || ''}</div>
            <div className="text-gray-500 text-sm">Date: {d.date || d.createdAt} | Status: {d.status || 'Completed'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserActivityHistory;
