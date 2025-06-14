import { FundraisingCampaignsTemplates } from "../components/templates/FundraisingCampaignsTemplates"
import { useNavigate } from "react-router"

export const FundraisingCampaignsPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <FundraisingCampaignsTemplates/>
    </div>
  )
}
