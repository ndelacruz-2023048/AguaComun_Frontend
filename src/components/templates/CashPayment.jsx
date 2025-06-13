import React from 'react'
import { PaymentModal } from '../modal/PaymentModal'

export const CashPayment = () => {
  return (
    <div className="fixed min-h-screen w-[40vw] left-[30%] p-6">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Registrar Aporte en Efectivo</h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre/Identificación del Usuario
            </label>
            <input
              type="text"
              placeholder="Ingrese el nombre"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto (numérico)
            </label>
            <input
              type="number"
              placeholder="Ingrese el monto"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección del punto de reunión
            </label>
            <input
              type="text"
              placeholder="Ingrese el punto de encuentro"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pago
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Método de pago"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔒
              </span>
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#12a019] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#138519] transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      
      <PaymentModal/>
    </div>
  )
}