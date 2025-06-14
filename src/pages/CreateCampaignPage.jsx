import FormularioCampana from "../components/Forms/CampaignForms";

export const CreateCampaignPage = ()=>{
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Agregar Nueva Campaña</h1>
      <FormularioCampana />
    </div>
  )
}