// ⬆️ Importaciones
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function FormularioCampana({ modo = "crear" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    category: "Emergencia",
    status: "Activa",
    goalAmount: "",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: ""
  });

//data.startDate

  const [todasCampanas, setTodasCampanas] = useState([]);

  // 👉 Convertir fecha ISO a formato local YYYY-MM-DD
  const toLocalDateInput = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

  // 🟡 Cargar campañas para validación
  useEffect(() => {
    fetch(`${API_URL}/v1/aguacomun/campaign`)
      .then((res) => res.json())
      .then((data) => setTodasCampanas(data))
      .catch((err) => console.error("Error al obtener campañas:", err));
  }, []);

  // 🟢 Modo edición: cargar campaña y formatear fechas
  useEffect(() => {
    if (modo === "editar" && id) {
      fetch(`${API_URL}/v1/aguacomun/campaign/${id}`)
        .then((res) => res.json())
        .then((data) => {
          data.goalAmount = data.goalAmount?.toString() || "";
          data.startDate = toLocalDateInput(data.startDate);
          data.endDate = toLocalDateInput(data.endDate);
          setFormData(data);
        })
        .catch((err) => console.error("Error al obtener campaña:", err));
    }
  }, [modo, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, status, goalAmount, startDate, endDate, description, imageUrl } = formData;

    // ⚠️ Validación de campos vacíos
    if (!name || !category || !goalAmount || !startDate || !endDate || !description || !imageUrl) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // 🟡 Validación de fechas
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const [y1, m1, d1] = startDate.split("-").map(Number);
    const [y2, m2, d2] = endDate.split("-").map(Number);

    const fechaInicio = new Date(y1, m1 - 1, d1);
    const fechaFin = new Date(y2, m2 - 1, d2);

    if (fechaInicio < hoy) {
      alert("La fecha de inicio no puede ser anterior a hoy");
      return;
    }

    if (fechaFin < hoy) {
      alert("La fecha de finalización no puede ser anterior a hoy");
      return;
    }

    if (fechaFin < fechaInicio) {
      alert("La fecha de finalización no puede ser anterior a la de inicio");
      return;
    }

    // 🟢 Validación de nombre único
    const nombreExiste = todasCampanas.some(camp =>
      camp.name.trim().toLowerCase() === name.trim().toLowerCase() &&
      camp._id !== id
    );

    if (nombreExiste) {
      alert("Ya existe una campaña con ese nombre");
      return;
    }

    const url = modo === "editar"
      ? `${API_URL}/v1/aguacomun/campaign/${id}`
      : `${API_URL}/v1/aguacomun/campaign`;

    const method = modo === "editar" ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error al guardar la campaña");
      }

      navigate("/campaigns");
    } catch (err) {
      console.error("Error al guardar campaña:", err);
      alert("Hubo un error al guardar la campaña.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto w-[100vw]">
      <h1 className="text-2xl font-bold">
        {modo === "editar" ? "Editar Campaña de Recaudación" : "Agregar Campaña de Recaudación"}
      </h1>

      {/* Información */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Información</h2>
        <div className="flex flex-col gap-3">
          <input className="input" placeholder="Nombre de la campaña" name="name" value={formData.name} onChange={handleChange} />
          <select className="input" name="category" value={formData.category} onChange={handleChange}>
            <option value="Emergencia">Emergencia</option>
            <option value="Importante">Importante</option>
            <option value="Dispensable">Dispensable</option>
          </select>
          <select className="input" name="status" value={formData.status} onChange={handleChange}>
            <option value="Activa">Activa</option>
            <option value="Pausada">Pausada</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>
      </section>

      {/* Fechas y Meta */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Meta y Fechas</h2>
        <div className="flex flex-col gap-3">
          <input className="input" type="number" name="goalAmount" placeholder="Monto de la meta" value={formData.goalAmount} onChange={handleChange} />
          <input className="input" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <input className="input" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
      </section>

      {/* Descripción */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Contenido</h2>
        <div className="flex flex-col gap-3">
          <textarea className="input h-32 resize-none" placeholder="Descripción" name="description" value={formData.description} onChange={handleChange} />
          <input className="input" placeholder="URL de la imagen" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        </div>
      </section>

      {/* Vista Previa */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Vista Previa</h2>
        <div className="flex bg-white shadow rounded-lg overflow-hidden">
          <img src={formData.imageUrl || "https://via.placeholder.com/200"} alt="Campaña" className="w-52 h-40 object-cover" />
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {modo === "editar" ? "Guardar" : "Crear"}
        </button>
        <button type="button" className="text-gray-600 hover:underline" onClick={() => navigate("/campaigns")}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
