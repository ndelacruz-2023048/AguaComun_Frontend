import React from 'react';
import { FaTint, FaBell, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

export const CommunityTemplate = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 font-sans w-[85vw] mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-4">Community Water Dashboard</h2>

      {/* Water Source Status */}
      <section className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Water Source Status</h3>
        <div className="flex gap-4 flex-wrap">
          <button className="flex items-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded w-36 justify-center">
            <FaTint /> Well 1
          </button>
          <button className="flex items-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded w-36 justify-center">
            <FaTint /> Tank 1
          </button>
        </div>
      </section>

      {/* Weekly Consumption */}
      <section className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Weekly Consumption</h3>
        <div className="bg-yellow-100 text-yellow-800 px-8 py-4 rounded w-full">
          <p className="text-sm">Average Consumption</p>
          <p className="text-2xl font-bold">1200L</p>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Recent Reports</h3>
        <div className="flex flex-col gap-3">
          <div className=" flex items-start gap-3 text-yellow-700">
            <FaExclamationTriangle className="mt-2" />
            <div>
              <p className="font-semibold">Pipe Break</p>
              <p className="text-sm text-gray-600">Reported by Elena Ramírez</p>
              <p className="text-sm text-gray-600">Pipe break near the main square</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-yellow-700">
            <FaExclamationTriangle className="mt-1" />
            <div>
              <p className="font-semibold">Dry Well</p>
              <p className="text-sm text-gray-600">Reported by Miguel Torres</p>
              <p className="text-sm text-gray-600">Well 2 is dry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Alerts */}
      <section className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Climate Alerts</h3>
        <div className="flex items-start gap-3 text-green-700">
          <FaExclamationTriangle className="mt-1" />
          <div>
            <p className="font-semibold">Drought Alert</p>
            <p className="text-sm text-gray-600">Low rainfall expected next week</p>
          </div>
        </div>
      </section>

      {/* Community Schedule */}
      <section className="mb-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Community Schedule</h3>
        <div className="flex items-start gap-3 text-blue-700">
          <FaCalendarAlt className="mt-1" />
          <div>
            <p className="font-semibold">Turn-based usage plan</p>
          </div>
        </div>
      </section>
    </div>
  );
};
