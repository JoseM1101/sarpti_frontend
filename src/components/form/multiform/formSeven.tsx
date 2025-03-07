import { useUsers } from "../../../hooks/useUsers";
import { useAreas } from "../../../hooks/useAreas";
import { useFormContext } from "react-hook-form";
import Dropdown from "../../common/DropDown";


const FormSeven = () => {
  const { setValue, watch } = useFormContext();
  const { users } = useUsers();
  const { areas } = useAreas();

  const handleUserChange = (selectedUserName: string) => {
    setValue("responsable", selectedUserName);
  };

  const handleAreaChange = (selectedAreaId: string) => {
    setValue("areas_tematicas_id", selectedAreaId);
  };

  const responsable = watch("responsable");
  const areas_tematicas_id = watch("areas_tematicas_id");

  console.log("Responsables", responsable);

  return (
    <div className="flex flex-col gap-6">

      <div className="w-full max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Responsable
        </label>
        <Dropdown
          options={users.map((user) => ({
            id: user.usuario,
            nombre: user.usuario,
          }))}
          selectValue={responsable || ""}
          onChange={handleUserChange}
          placeholder="Selecciona un responsable"
        />
      </div>


      <div className="w-full max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Área Temática
        </label>
        <Dropdown
          options={areas.map((areastem) => ({
            id: areastem.id,
            nombre: areastem.titulo,
          }))}
          selectValue={areas_tematicas_id || ""}
          onChange={handleAreaChange}
          placeholder="Selecciona un área temática"
        />
      </div>
    </div>
  );
};

export default FormSeven;