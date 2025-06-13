import FormularioCampana from "../components/Forms/CampaignForms";

export const EditCampaignPage =()=> {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Editar Campaña de Recaudación</h1>

      <FormularioCampana modo="editar"/>
    </div>
  );
}