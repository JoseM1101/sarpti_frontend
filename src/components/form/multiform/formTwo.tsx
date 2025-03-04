import { useFormContext } from "react-hook-form";

const FormTwo = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col md:flex-row gap-8">
    
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Tutores</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              {...register("cedula-1")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-2")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-3")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-4")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>


        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Autores</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              {...register("cedula-5")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-6")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-7")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              {...register("cedula-8")}
              placeholder="Cedula"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTwo;