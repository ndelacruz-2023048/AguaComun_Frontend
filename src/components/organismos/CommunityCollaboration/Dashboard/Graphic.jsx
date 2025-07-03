import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSocket } from '../../../../hooks/useSocket'; // ajusta si es necesario

export const Graphic = () => {
  const [data, setData] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    const handleReportSummary = (reportData) => {
      console.log("Resumen recibido:", reportData);
      setData(reportData);
    };

    socket.on("report:summary", handleReportSummary);
    socket.emit("report:get-summary");

    return () => {
      socket.off("report:summary", handleReportSummary);
    };
  }, [socket]);

  return (
    <div className='h-[39.5%] w-[100%]'>
      <h2 className='text-2xl font-semibold mb-6'>Reportes de Agua Potable</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#75BF3B" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#75BF3B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#75BF3B" fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};