import { useFormContext } from "react-hook-form";
import imagenmodal from "../../../assets/images/modal/5.png";

const FormFive = () => {
const {register} = useFormContext();

return( 
  <div className="flex flex-col gap-4">
    <img src={imagenmodal} alt="" className="w-full max-w-md rounded-lg mb-[20px]"
        />
    <input type="text" {...register("inversion")} placeholder="Inversión" className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>
)

}

export default FormFive;