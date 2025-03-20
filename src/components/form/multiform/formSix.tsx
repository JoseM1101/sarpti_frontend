import { useFormContext } from "react-hook-form";


const FormSix = () => {
  const {register} = useFormContext();

  return (
        <div>
          <input type="text" {...register("titulo")} placeholder="Titulo" className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[20px]"/>
          <input type="text" {...register("descripcion")} placeholder="Descripcion" className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    )
}

export default FormSix;