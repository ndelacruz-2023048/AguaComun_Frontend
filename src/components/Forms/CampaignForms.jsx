import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function FormularioCampana({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "Activa",
    goalAmount: "",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (modo === "editar" && id) {
      fetch(`http://localhost:3662/v1/aguacomun/campaign/${id}`)
        .then((res) => res.json())
        .then((data) => {
          data.goalAmount = data.goalAmount?.toString() || "";
          setFormData(data);
        })
        .catch((err) => console.error("Error al obtener campaña:", err));
    }
  }, [modo, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      modo === "editar"
        ? `http://localhost:3662/v1/aguacomun/campaign/${id}`
        : "http://localhost:3662/v1/aguacomun/campaign";

    const method = modo === "editar" ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      navigate("/campaigns");
    } catch (err) {
      console.error("Error al guardar campaña:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto w-[100vw]">
      {/* Título */}
      <h1 className="text-2xl font-bold">
        {modo === "editar" ? "Editar Campaña de Recaudación" : "Agregar Campaña de Recaudación"}
      </h1>

      {/* Información */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Información</h2>
        <div className="flex flex-col gap-3">
          <input
            className="input"
            placeholder="Nombre de la campaña"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="input"
            placeholder="Categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <select
            className="input"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Activa">Activa</option>
            <option value="Pausada">Pausada</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>
      </section>

      {/* Meta y Fechas */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Meta y Fechas</h2>
        <div className="flex flex-col gap-3">
          <input
            className="input"
            placeholder="Monto de la meta"
            type="number"
            name="goalAmount"
            value={formData.goalAmount}
            onChange={handleChange}
          />
          <input
            className="input"
            type="date"
            name="startDate"
            value={formData.startDate?.split("T")[0]}
            onChange={handleChange}
          />
          <input
            className="input"
            type="date"
            name="endDate"
            value={formData.endDate?.split("T")[0]}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* Contenido */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Contenido</h2>
        <div className="flex flex-col gap-3">
          <textarea
            className="input h-32 resize-none"
            placeholder="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="input"
            placeholder="URL de la imagen"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* Vista previa */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Vista Previa</h2>
        <div className="flex bg-white shadow rounded-lg overflow-hidden">
          <img
            src={formData.imageUrl || "https://via.placeholder.com/200"}
            alt="Campaña"
            className="w-52 h-40 object-cover"
          />
          <div className="p-4">
            <p className="font-semibold mb-1">{formData.name || "Nombre de campaña"}</p>
            <p className="text-sm text-gray-600">
              {formData.description || "Descripción de la campaña..."}<br />
              Recaudado: $0 de ${formData.goalAmount || 0}
            </p>
          </div>
        </div>
      </section>

      {/* Botones */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {modo === "editar" ? "Guardar" : "Crear"}
        </button>
        <button
          onClick={() => navigate("/campaigns")}
          type="button"
          className="text-gray-600 hover:underline"
        >
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
