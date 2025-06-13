import { useNavigate } from "react-router";

export const DeleteCampaignPage =()=> {
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log("Campaña eliminada");
    navigate("/campaigns");
  };

  return (
    <div className="min-h-screen flex w-[100vw] items-center justify-center bg-[#fffaf9]">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          ¿Estás seguro de que quieres eliminar esta campaña?
        </h2>
        <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-6 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
