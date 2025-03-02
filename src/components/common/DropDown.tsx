import React from "react";

interface DropDownProps {
  options: {id:string, nombre:string}[];
  selectValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DropDown: React.FC<DropDownProps> = ({options, selectValue,onChange , placeholder}) => {

  return(
    <select value={selectValue} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.nombre}</option>
      ))}
    </select>
  );

}

export default DropDown;