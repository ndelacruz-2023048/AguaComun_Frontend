import { useNavigate } from "react-router";

export default function FormularioCampana({ modo = "crear" }) {
  const navigate = useNavigate()
  return (
    <form className="space-y-6 max-w-3xl mx-auto w-[100vw]">
      {/* Título */}
      <h1 className="text-2xl font-bold">
        {modo === "editar" ? "Editar Campaña de Recaudación" : "Agregar Campaña de Recaudación"}
      </h1>

      {/* Información */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Información</h2>
        <div className="flex flex-col gap-3">
          <input className="input" placeholder="Nombre de la campaña" />
          <input className="input" placeholder="Categoría" />
          <input className="input" placeholder="Estado" />
        </div>
      </section>

      {/* Meta y Fechas */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Meta y Fechas</h2>
        <div className="flex flex-col gap-3">
          <input className="input" placeholder="Monto de la meta" />
          <input className="input" type="date" placeholder="Fecha de inicio" />
          <input className="input" type="date" placeholder="Fecha de finalización" />
        </div>
      </section>

      {/* Contenido */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Contenido</h2>
        <div className="flex flex-col gap-3">
          <textarea className="input h-32 resize-none" placeholder="Descripción" />
          <input className="input" placeholder="URL de la imagen" />
        </div>
      </section>

      {/* Vista previa */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Vista Previa</h2>
        <div className="flex bg-white shadow rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/200"
            alt="Campaña"
            className="w-52 h-40 object-cover"
          />
          <div className="p-4">
            <p className="font-semibold mb-1">
              Ayuda a la familia Rodríguez a reconstruir su hogar
            </p>
            <p className="text-sm text-gray-600">
              La familia Rodríguez perdió su hogar en un incendio.<br />
              Necesitan ayuda para reconstruir y volver a empezar.<br />
              Recaudado: $2,500 de $10,000
            </p>
          </div>
        </div>
      </section>

      {/* Botones */}
      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {modo === "editar" ? "Guardar" : "Crear"}
        </button>
        <button onClick={()=> navigate('/campaigns')} type="button" className="text-gray-600 hover:underline">
          Cancelar
        </button>
        {modo === "editar" && (
          <button type="button" className="text-red-600 hover:underline">
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}