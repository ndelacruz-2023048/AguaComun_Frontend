import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useSocket } from '../../hooks/useSocket';
import dayjs from 'dayjs';
import 'dayjs/locale/es' // Para español
dayjs.locale('es')

export const HistorialTemplate = () => {
  const [open, setOpen] = useState(false);  
  const [ordenFechaAscendente, setOrdenFechaAscendente] = useState(true);
  const [payments, setPayments] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const ordenarPorFecha = () => {
  const copia = [...payments]; // no mutamos el original

  const ordenados = copia.sort((a, b) => {
    const fechaA = new Date(a.manualDate);
    const fechaB = new Date(b.manualDate);

    return ordenFechaAscendente
      ? fechaB - fechaA // Ascendente
      : fechaA - fechaB; // Descendente
  });

  setPayments(ordenados);
  setOrdenFechaAscendente(!ordenFechaAscendente);
};

  const socket = useSocket();

  const handleConfirm = (paymentId) => {
  socket.emit('confirm-payment', paymentId); // Enviar ID al backend
  };

  useEffect(() => {
    // Emitir evento para solicitar pagos
    socket.emit('get-payments-campaign',);

    // Escuchar pagos recibidos
    socket.on('list-campaign-payments', (data) => {
      setPayments(data || []);
    });

    return () => {
      socket.off('list-campaign-payments');
    };
  }, [socket]);

  // Separar confirmados y pendientes

    const pagosFiltrados = payments.filter((p) => {
    const nombre = p.user?.name ? p.user.name.toLowerCase() : 'anónimo';
    const identificacion = p.user?.identificacion?.toLowerCase() || ''; // Si tienes este campo
    const texto = busqueda.toLowerCase();

    return nombre.includes(texto) || identificacion.includes(texto);
    });

  const confirmados = pagosFiltrados.filter(p => p.status === 'Confirmado');
  const pendientes = pagosFiltrados.filter(p => p.status === 'Pendiente');
  

  return (
    <div className="p-8 justify-center">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#589e4f] mb-2">
          Historial de Aportes en Efectivo
        </h1>
        <p className="text-[#155dfc] mb-6">
          Revisa el historial de tus aportes en efectivo; incluyendo detalles como el monto, punto de encuentro, fecha, hora y estado.
        </p>

        <div className="mb-6 relative">
          <Icon 
            icon="mdi:magnify" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0051ff]" 
            width="20" 
            height="20" 
          />
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="text-[#0051ff] bg-[#dbe3f5] w-full pl-10 p-3 rounded-lg focus:outline-none focus:ring focus:border-[#155dfc]"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            onClick={ordenarPorFecha}
            className="bg-[#a48647] px-4 py-2 rounded-3xl text-sm text-white flex items-center">
              {ordenFechaAscendente
                ? 'Fecha (Más antiguo a más reciente)'
                : 'Fecha (Más reciente a más antiguo)'}
              <Icon
                icon="mdi:chevron-down"
                className={`ml-2 transition-transform duration-200 ${ordenFechaAscendente ? '' : 'rotate-180'}`}
                width="18"
                height="18"
              />
          </button>
        </div>

        {/* Aportes Confirmados */}
        <h2 className="text-xl font-semibold text-[#a48647] mb-2">Aportes Confirmados</h2>
        <div className="bg-white rounded-lg overflow-hidden mb-6">
          <table className="min-w-full text-sm text-left bg-white rounded-xl shadow border-[0.5px] border-[#e4e4e4]">
            <thead className="text-[#589e4f]">
              <tr>
                <th className="p-4">Aportante</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Punto de Encuentro</th>
                <th className="p-4">Fecha/Hora</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {confirmados.map((ap, index) => (
                <tr key={index} className="border-[0.5px] border-[#e4e4e4] hover:bg-gray-50">
                  <td className="p-4 text-[#a48647]">{ap.user?.name || 'Anónimo'}</td>
                  <td className="p-4 text-[#0051ff]">{ap.amount} Q</td>
                  <td className="p-4 text-[#0051ff]">{ap.address || 'Sin punto'}</td>
                  <td className="p-4 text-[#0051ff]">
                    {ap.manualDate ? dayjs(ap.manualDate).format('D [de] MMMM [de] YYYY') : 'Sin fecha'}
                  </td>
                  <td className="p-4">
                    <span className="bg-[#75bf3b] text-[#ffffff] px-6 py-1.5 rounded-full text-xs flex justify-center border-[#75bf3b] border-[1px]">
                      Confirmado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aportes Pendientes */}
        <h2 className="text-xl font-semibold text-[#a48647] mb-2">Aportes Pendientes</h2>
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left bg-white rounded-xl shadow border-[0.5px] border-[#e4e4e4]">
            <thead className="text-[#589e4f]">
              <tr>
                <th className="p-4">Aportante</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Punto de Encuentro</th>
                <th className="p-4">Fecha/Hora</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pendientes.map((ap, index) => (
                <tr key={index} className="border-[0.5px] border-[#e4e4e4] hover:bg-gray-50">
                  <td className="p-4 text-[#a48647]">{ap.user?.name || 'Anónimo'}</td>
                  <td className="p-4 text-[#0051ff]">{ap.amount} Q</td>
                  <td className="p-4 text-[#0051ff]">{ap.address || 'Sin punto'}</td>
                  <td className="p-4 text-[#0051ff]">
                    {ap.manualDate ? dayjs(ap.manualDate).format('D [de] MMMM [de] YYYY') : 'Sin fecha'}
                  </td>
                  <td className="p-4">
                    <span className="bg-[#d7ad2c] text-[#ffffff] px-6 py-1.5 rounded-full text-xs flex justify-center border-[#d7ad2c] border-[1px] hover:bg-gray-50 hover:text-[#d7ad2c]">
                      <button onClick={() => handleConfirm(ap._id)}>
                        Por confirmar
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
