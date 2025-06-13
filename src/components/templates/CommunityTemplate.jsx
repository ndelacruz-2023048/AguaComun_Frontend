import React from 'react'

export const CommunityTemplate = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Funding for Water Truck
        </h2>
        <p className="text-sm text-gray-600 mb-6">Led by Maria Rodriguez</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div className="bg-green-600 h-4 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-sm text-gray-600 mb-6">75% funded · 3,000 / 5,000 Q</p>

        <div className="mb-6">
          <h3 className="font-semibold text-lg">Project Details</h3>
          <p className="text-sm text-gray-700">
            This project aims to repair the community well in San Cristobal, ensuring access to clean water for over 200 families. Your support will directly contribute to the health and well-being of our community.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Coordinator</h3>
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="Maria Rodriguez"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Maria Rodriguez</p>
              <p className="text-sm text-gray-500">Verified Community Leader</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
            Donate
          </button>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Donor List</h3>
          <ul className="text-sm text-gray-700">
            <li className="flex justify-between"><span>Elena Morales</span><span>500 Q</span></li>
            <li className="flex justify-between"><span>Carlos Lopez</span><span>200 Q</span></li>
            <li className="flex justify-between"><span>Sofia Ramirez</span><span>1000 Q</span></li>
            <li className="flex justify-between"><span>Anonymous</span><span>1300 Q</span></li>
          </ul>
        </div>

        <div className="mb-8 border-2 border-dashed border-green-400 rounded p-6 text-center">
          <h3 className="font-semibold mb-2">Upload Proof of Completion</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload photos or documents showing the completed well repair or expenditure.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
            Upload
          </button>
        </div>
      </section>
    </div>
  )
}
