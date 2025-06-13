import React from 'react';

export const HistorialTemplate = () => {
  const confirmados = [
    {
      nombre: 'Elena Ramírez',
      monto: '$50',
      lugar: 'Cafetería Central',
      fecha: '15 de Julio, 10:00 AM',
    },
    {
      nombre: 'Carlos Mendoza',
      monto: '$75',
      lugar: 'Parque del Sol',
      fecha: '20 de Julio, 2:00 PM',
    },
    {
      nombre: 'Sofía Vargas',
      monto: '$100',
      lugar: 'Centro Cívico',
      fecha: '25 de Julio, 4:00 PM',
    },
  ];

  const pendientes = [
    {
      nombre: 'Daniel Castro',
      monto: '$25',
      lugar: 'Biblioteca Municipal',
      fecha: '30 de Julio, 11:00 AM',
    },
    {
      nombre: 'Isabel Torres',
      monto: '$60',
      lugar: 'Plaza de la Cultura',
      fecha: '5 de Agosto, 3:00 PM',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Historial de Aportes en Efectivo
        </h1>
        <p className="text-gray-500 mb-6">
          Revisa el historial de tus aportes en efectivo; incluyendo detalles como el monto, punto de encuentro, fecha, hora y estado.
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o identificación del aportante"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex gap-4 mb-6">
          <button className="bg-white border px-4 py-2 rounded-lg text-sm text-gray-600">
            Estado
          </button>
          <button className="bg-white border px-4 py-2 rounded-lg text-sm text-gray-600">
            Fecha
          </button>
        </div>

        {/* Aportes Confirmados */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Aportes Confirmados</h2>
        <div className="bg-white rounded-lg overflow-hidden mb-6">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
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
                <tr key={index} className="border-t">
                  <td className="p-4">{ap.nombre}</td>
                  <td className="p-4 text-blue-600">{ap.monto}</td>
                  <td className="p-4">{ap.lugar}</td>
                  <td className="p-4">{ap.fecha}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      Confirmado
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aportes Pendientes */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Aportes Pendientes</h2>
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
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
                <tr key={index} className="border-t">
                  <td className="p-4">{ap.nombre}</td>
                  <td className="p-4 text-blue-600">{ap.monto}</td>
                  <td className="p-4">{ap.lugar}</td>
                  <td className="p-4">{ap.fecha}</td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      Pendiente
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
}
