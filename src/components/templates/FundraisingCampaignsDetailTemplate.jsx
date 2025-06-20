import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PaymentModal } from '../modal/PaymentModal'
import io from 'socket.io-client'

const socket = io('https://aguacomunbackend-production.up.railway.app') // Ya inicializado globalmente

export const FundraisingCampaignsDetailTemplate = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const campaignId = state?.campaignId

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [campaign, setCampaign] = useState(null)
  const [donors, setDonors] = useState([])

  const fetchCampaign = async () => {
    try {
      const res = await fetch(`https://aguacomunbackend-production.up.railway.app/v1/aguacomun/campaign/${campaignId}`)
      const data = await res.json()
      setCampaign(data)
    } catch (error) {
      console.error('Error loading campaign:', error)
    }
  }

  const fetchRecentDonors = async () => {
    try {
      const res = await fetch(`https://aguacomunbackend-production.up.railway.app/v1/aguacomun/payment/recent/${campaignId}`)
      const data = await res.json()
      setDonors(data.donors)
    } catch (error) {
      console.error('Error loading recent donors:', error)
    }
  }

  useEffect(() => {
    if (!campaignId) {
      navigate('/campaigns/user')
      return
    }

    fetchCampaign()
    fetchRecentDonors()

    const handleNewPayment = (data) => {
      if (data.campaignId === campaignId) {
        setDonors(prev => {
          const newDonors = [data.donor, ...prev]
          return newDonors.slice(0, 4) // limitar a 4 como en el backend
        })

        // Refrescar campaña para actualizar amountRaised
        fetchCampaign()
      }
    }

    socket.on('newPayment', handleNewPayment)

    return () => {
      socket.off('newPayment', handleNewPayment)
    }
  }, [campaignId, navigate])

  if (!campaign) return <p>Loading...</p>

  const progress = Math.min((campaign.amountRaised / campaign.goalAmount) * 100, 100).toFixed(0)

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-2">{campaign.name}</h2>
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

        {isModalOpen && (
          <PaymentModal
            campaignId={campaignId}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2">Recent Donations</h3>
          <ul className="text-sm text-gray-700">
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>{donor.name}</span>
                  <span>{donor.amount} Q</span>
                  <span className={`text-xs px-2 py-1 rounded-[15px] ${donor.status === 'Confirmado' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {donor.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="py-2 text-gray-500">No recent donations yet.</li>
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

      <button
        onClick={() => navigate('/campaigns/user')}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-4xl"
      >
        Back
      </button>
    </div>
  )
}
