import { useState } from "react";
import { useFormContext } from "react-hook-form";

const FormFive = () => {
  const { register } = useFormContext();
  const [productCount, setProductCount] = useState(1);

  const handleAddProduct = () => {
    setProductCount((prev) => prev + 1);
  };

  const handleRestProduct = () => {
    if (productCount > 1) {
      setProductCount((prev) => prev - 1);
    } else {
      alert("No se pueden eliminar más productos.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        {...register("inversion", { required: true })}
        placeholder="Inversión"
        className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        {...register("nivel", { required: true })}
        className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona un nivel</option>
        <option value="1">1: Pregrado</option>
        <option value="2">2: Especialización</option>
        <option value="3">3: Maestría</option>
        <option value="4">4: Doctorado</option>
      </select>

      <h2 className="font-semibold text-lg">Productos</h2>
      <div className="max-h-60 overflow-y-auto  rounded-lg p-2  items-cente">
        {[...Array(productCount)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <input
              type="text"
              {...register(`productos.${index}.titulo`, { required: true })}
              placeholder="Título del Producto"
              className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register(`productos.${index}.descripcion`, { required: true })}
              placeholder="Descripción del Producto"
              className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register(`productos.${index}.url`)}
              placeholder="URL del Producto"
              className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            {productCount > 1 && (
            <hr className="mb-4"/>

            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddProduct}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar Producto
      </button>

      {productCount > 1 && (
        <button
          type="button"
          onClick={handleRestProduct}
          className="mt-4 p-2 bg-red text-white rounded-lg ml-1"
        >
          Eliminar Producto
        </button>
      )}
    </div>
  );
};

export default FormFive;