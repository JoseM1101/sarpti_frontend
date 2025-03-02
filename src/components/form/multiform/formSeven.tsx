import { useUsers } from "../../../hooks/useUsers";
import { useAreas } from "../../../hooks/useAreas";
import { useFormContext } from "react-hook-form";
import Dropdown from "../../common/DropDown";
import imagenmodal from "../../../assets/images/modal-proyectos/2.png";

const FormSeven = () => {
    const {setValue, watch} = useFormContext();
    const {users} =  useUsers();
    const {areas} = useAreas();

    const handleUserChange = (selectedUserName: string) => {
        setValue("responsable", selectedUserName)
    }
    
    const handleAreaChange = (selectedAreaId: string) => {
        setValue("areas_tematicas_id", selectedAreaId)
    }

    const responsable = watch("responsable");
    const areas_tematicas_id = watch("areas_tematicas_id");
  
    console.log("Responsables", responsable); 

return(
    <div>
        <img src={imagenmodal} alt="" className="mx-auto w-48 h-auto rounded-lg mb-8" />
        <Dropdown 
        options={users.map((user) => ({id: user.usuario, nombre: user.usuario}))}
        selectValue={responsable || ""}  
        onChange={handleUserChange}
        placeholder="Selecciona un responsable"
       />

    <Dropdown 
        options={areas.map((areastem) => ({id: areastem.id, nombre: areastem.titulo}))}
        selectValue={areas_tematicas_id || ""}  
        onChange={handleAreaChange}
        placeholder="Selecciona un area tematica"
       />
    </div>
)

}
export default FormSeven;