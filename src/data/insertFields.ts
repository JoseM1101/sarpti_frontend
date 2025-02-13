interface FieldType {
  name: string
  placeholder: string
  required: boolean
  type: "text" | "textarea" | "number"
}

export const fields: Record<number, FieldType[]> = {
  1: [
    {
      name: "titulo",
      placeholder: "Titulo",
      required: true,
      type: "text",
    },
    {
      name: "descripcion",
      placeholder: "Descripción",
      required: true,
      type: "textarea",
    },
  ],
  2: [
    {
      name: "cedula-1",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
    {
      name: "cedula-2",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
    {
      name: "cedula-3",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
  ],
  3: [
    {
      name: "cedula-4",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
    {
      name: "cedula-5",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
    {
      name: "cedula-6",
      placeholder: "Cédula",
      required: true,
      type: "text",
    },
  ],
  4: [
    {
      name: "palabra-1",
      placeholder: "Palabra",
      required: false,
      type: "text",
    },
    {
      name: "palabra-2",
      placeholder: "Palabra",
      required: false,
      type: "text",
    },
    {
      name: "palabra-3",
      placeholder: "Palabra",
      required: false,
      type: "text",
    },
  ],
  5: [
    {
      name: "inversion",
      placeholder: "Inversión",
      required: false,
      type: "number",
    },
    {
      name: "inversionista",
      placeholder: "Inversionista",
      required: false,
      type: "text",
    },
  ],
}
