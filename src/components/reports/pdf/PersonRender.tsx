import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { Person } from "../../../types/Person"

const styles = StyleSheet.create({
  pageContainer: { flexDirection: "column", padding: 20 },
  container: { border: "1px solid black", padding: 10, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 3 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  summaryContainer: {
    marginBottom: 15,
    padding: 10,
    borderBottom: "1px solid black",
  },
  summaryText: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
})

// Function to generate the summary at the top
const PeopleSummary = ({ people }: { people: Person[] }) => {
  const total = people.length
  const maleCount = people.filter((p) => p.sexo === "M").length
  const femaleCount = people.filter((p) => p.sexo === "F").length

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>Resumen General de Personas</Text>
      <Text style={styles.text}>Total de Personas: {total}</Text>
      <Text style={styles.text}>Hombres: {maleCount}</Text>
      <Text style={styles.text}>Mujeres: {femaleCount}</Text>
    </View>
  )
}

// Function to render all persons
export const PersonRender = ({ people }: { people: Person[] }) => (
  <View style={styles.pageContainer}>
    {/* Show summary at the top */}
    <PeopleSummary people={people} />

    {/* Render all persons */}
    {people.map((person) => (
      <View wrap={false} key={person.id_persona} style={styles.container}>
        <Text style={styles.title}>
          {person.nombre} {person.apellido}
        </Text>
        <Text style={styles.text}>
          Identificación: {person.tipo_identificacion} {person.identificacion}
        </Text>
        <Text style={styles.text}>Edad: {person.edad}</Text>
        <Text style={styles.text}>
          Sexo: {person.sexo === "M" ? "Masculino" : "Femenino"}
        </Text>
        <Text style={styles.text}>Correo: {person.correo}</Text>
        <Text style={styles.text}>Estado Civil: {person.estado_civil}</Text>
        <Text style={styles.text}>
          Grado Académico: {person.grado_academico}
        </Text>
      </View>
    ))}
  </View>
)
