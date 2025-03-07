import { useFormContext } from "react-hook-form";

const FormFive = () => {
const {register} = useFormContext();

return( 
  <div className="flex flex-col gap-4">

    <input type="text" {...register("inversion")} placeholder="Inversión" className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>
)

}

export default FormFive;