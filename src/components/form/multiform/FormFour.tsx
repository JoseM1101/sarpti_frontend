import { useFormContext } from "react-hook-form";


const FormFour = () => {
const {register} = useFormContext();

return(
    <div className="flex flex-col gap-4">
        <input type="text" {...register("palabra-1")} placeholder="Palabra" className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="text" {...register("palabra-2")} placeholder="Palabra" className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="text" {...register("palabra-3")} placeholder="Palabra" className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
)

}
export default FormFour;