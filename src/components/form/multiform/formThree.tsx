import { useFormContext } from "react-hook-form";
import imagenmodal from "../../../assets/images/modal/3.png";
import { useProjects } from "../../../hooks/useProjects";
import Dropdown from "../../common/DropDown";

const FormThree = () => {
const { setValue, watch } = useFormContext();
const { projects} = useProjects();
const handleProjectChange = (selectedProjectId: string) => {
    setValue("proyecto_id", selectedProjectId); 
};

const proyectoId = watch("proyecto_id");

return (
  <div className="flex flex-col gap-4">
    <img
      src={imagenmodal}
      alt=""
      className="w-full max-w-md rounded-lg mb-[20px]"
    />
    <Dropdown
      options={projects.map((proj) => ({ id: proj.id, nombre: proj.titulo }))}
      selectValue={proyectoId || ""}
      onChange={handleProjectChange}
      placeholder="Selecciona un proyecto"
    />

  </div>
);

}
export default FormThree;