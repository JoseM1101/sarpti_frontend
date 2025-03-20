import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { statusItems } from "../../../utils"
import { EntityStatus } from "../../../types/Entity"

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 5,
    padding: 20,
    borderBottom: "1px solid black",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  filterText: {
    fontSize: 12,
    marginBottom: 3,
  },
})

// **Format Basic Filters (Status, Date, Investment)**
const formatFilters = (filters: (string | null)[]): string[] => {
  return filters
    .filter((filter): filter is string => filter !== null) // Ensure filter is not null
    .map((filter) => {
      const [key, value] = filter.split("=")

      switch (key) {
        case "estatus": {
          const statusKey = parseInt(value, 10) as EntityStatus
          return `Estatus: ${statusItems[statusKey]?.label || "Desconocido"}`
        }
        case "titulo":
          return `Título contiene: "${value}"`
        case "inversion_min":
          return `Inversión mínima: $${value}`
        case "inversion_max":
          return `Inversión máxima: $${value}`
        case "fecha_inicio_min":
          return `Fecha de inicio desde: ${value}`
        case "fecha_inicio_max":
          return `Fecha de inicio hasta: ${value}`
        case "fecha_culminacion_min":
          return `Fecha de culminación desde: ${value}`
        case "fecha_culminacion_max":
          return `Fecha de culminación hasta: ${value}`
        default:
          return null
      }
    })
    .filter((text): text is string => text !== null) // Remove null values
}

// **Fetch & Display Filtered Data**
const FilterDisplay = ({ filters }: { filters: string[] }) => {
  const formattedFilters = formatFilters(filters)

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Filtros Aplicados:</Text>

      {formattedFilters.map((filterText, index) => (
        <Text key={index} style={styles.filterText}>
          - {filterText}
        </Text>
      ))}
    </View>
  )
}

export default FilterDisplay
