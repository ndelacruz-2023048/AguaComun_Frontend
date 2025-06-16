import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentModal } from '../modal/PaymentModal'

export const FundraisingCampaignsDetailTemplate = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const campaignId = state?.campaignId

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [campaign, setCampaign] = useState(null)

  useEffect(() => {
    if (!campaignId) {
      navigate('/campaigns/user')
      return
    }

    const fetchCampaign = async () => {
      try {
        const res = await fetch(`http://localhost:3662/v1/aguacomun/campaign/${campaignId}`)
        const data = await res.json()
        setCampaign(data)
      } catch (error) {
        console.error('Error loading campaign:', error)
      }
    }

    fetchCampaign()
  }, [campaignId, navigate])

  if (!campaign) return <p>Loading...</p>

  const progress = Math.min((campaign.amountRaised / campaign.goalAmount) * 100, 100).toFixed(0)

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          {campaign.name}
        </h2>
        <p className="text-sm text-gray-600 mb-6">Led by {campaign.coordinator || 'Community Leader'}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div className="bg-green-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {progress}% funded · {campaign.amountRaised} / {campaign.goalAmount} Q
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-lg">Project Details</h3>
          <p className="text-sm text-gray-700">{campaign.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Coordinator</h3>
          <div className="flex items-center gap-3">
            <img
              src={campaign.coordinatorImage || "https://via.placeholder.com/40"}
              alt={campaign.coordinator || "Coordinator"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{campaign.coordinator || 'Community Leader'}</p>
              <p className="text-sm text-gray-500">Verified Community Leader</p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-4xl"
          >
            Donate
          </button>
        </div>

        {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} />}

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Donor List</h3>
          <ul className="text-sm text-gray-700">
            {campaign.donors?.length > 0 ? (
              campaign.donors.map((donor, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{donor.name || 'Anonymous'}</span>
                  <span>{donor.amount} Q</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex justify-between py-2"><span>Elena Morales</span><span>500 Q</span></li>
                <li className="flex justify-between py-2"><span>Carlos Lopez</span><span>200 Q</span></li>
                <li className="flex justify-between py-2"><span>Sofia Ramirez</span><span>1000 Q</span></li>
                <li className="flex justify-between py-2"><span>Anonymous</span><span>1300 Q</span></li>
              </>
            )}
          </ul>
        </div>

        <div className="mb-8 border-2 border-dashed border-green-400 rounded p-6 text-center">
          <h3 className="font-semibold mb-2">Upload Proof of Completion</h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload photos or documents showing the completed well repair or expenditure.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-4xl">
            Upload
          </button>
        </div>
      </section>
    </div>
  )
}