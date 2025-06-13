import { useNavigate } from "react-router"

export const FundraisingCampaignsPage = () => {
  const navigate = useNavigate()

  return (
    <div>FundraisingCampaignsPage
      <button onClick={()=>{navigate("/cashpayment")}}>
        PayMents
      </button>
    </div>
  )
}
