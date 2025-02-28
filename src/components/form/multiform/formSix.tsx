import { useFormContext } from "react-hook-form";
import imagenmodal from "../../../assets/images/modal-proyectos/1.png";

const FormSix = () => {
  const {register} = useFormContext();

  return (
        <div>
          <img src={imagenmodal} alt="" className="mx-auto w-48 h-auto rounded-lg mb-8"/>
          <input type="text" {...register("titulo")} placeholder="Titulo" className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-[20px]"/>
          <input type="text" {...register("descripcion")} placeholder="Descripcion" className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    )
}

export default FormSix;