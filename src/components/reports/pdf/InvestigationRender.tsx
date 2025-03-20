import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { Investigation, InvestigationLevel } from "../../../types/Investigation"
import { EntityStatus } from "../../../types/Entity"
import { statusItems } from "../../../utils"

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

// Helper function to get readable investigation level names
const getInvestigationLevelName = (level: InvestigationLevel): string => {
  switch (level) {
    case InvestigationLevel.PREGRADO:
      return "Pregrado"
    case InvestigationLevel.ESPECIALIZACION:
      return "Especialización"
    case InvestigationLevel.MAESTRIA:
      return "Maestría"
    case InvestigationLevel.DOCTORADO:
      return "Doctorado"
    default:
      return "Desconocido"
  }
}

// Function to generate the summary at the top
const InvestigationSummary = ({
  investigations,
}: {
  investigations: Investigation[]
}) => {
  const total = investigations.length
  const inProgress = investigations.filter(
    (inv) => inv.estatus === EntityStatus.ACTIVE
  ).length
  const finished = investigations.filter(
    (inv) => inv.estatus === EntityStatus.FINISHED
  ).length
  const canceled = investigations.filter(
    (inv) => inv.estatus === EntityStatus.CANCELLED
  ).length
  const inactive = investigations.filter(
    (inv) => inv.estatus === EntityStatus.INACTIVE
  ).length

  // Count investigations by level
  const levelCounts = {
    [InvestigationLevel.PREGRADO]: 0,
    [InvestigationLevel.ESPECIALIZACION]: 0,
    [InvestigationLevel.MAESTRIA]: 0,
    [InvestigationLevel.DOCTORADO]: 0,
  }

  investigations.forEach((inv) => {
    levelCounts[inv.nivel]++
  })

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>Resumen General de Investigaciones</Text>
      <Text style={styles.text}>Total de Investigaciones: {total}</Text>
      <Text style={styles.text}>
        {statusItems[EntityStatus.ACTIVE].label}: {inProgress}
      </Text>
      <Text style={styles.text}>
        {statusItems[EntityStatus.FINISHED].label}: {finished}
      </Text>
      <Text style={styles.text}>
        {statusItems[EntityStatus.CANCELLED].label}: {canceled}
      </Text>
      <Text style={styles.text}>
        {statusItems[EntityStatus.INACTIVE].label}: {inactive}
      </Text>

      <Text style={styles.sectionTitle}>
        Investigaciones por Nivel Académico:
      </Text>
      <Text style={styles.text}>
        Pregrado: {levelCounts[InvestigationLevel.PREGRADO]}
      </Text>
      <Text style={styles.text}>
        Especialización: {levelCounts[InvestigationLevel.ESPECIALIZACION]}
      </Text>
      <Text style={styles.text}>
        Maestría: {levelCounts[InvestigationLevel.MAESTRIA]}
      </Text>
      <Text style={styles.text}>
        Doctorado: {levelCounts[InvestigationLevel.DOCTORADO]}
      </Text>
    </View>
  )
}

// Function to render all investigations together
export const InvestigationRender = ({
  investigations,
}: {
  investigations: Investigation[]
}) => (
  <View style={styles.pageContainer}>
    <InvestigationSummary investigations={investigations} />
    {investigations.map((investigation) => (
      <View wrap={false} key={investigation.id} style={styles.container}>
        <Text style={styles.title}>{investigation.titulo}</Text>
        <Text style={styles.text}>
          Fecha Inicio: {investigation.fecha_inicio}
        </Text>

        {/* Show Fecha Culminación only if investigation is finished */}
        {investigation.estatus === EntityStatus.FINISHED ? (
          <Text style={styles.text}>
            Fecha Culminación: {investigation.fecha_culminacion}
          </Text>
        ) : (
          <Text style={styles.text}>
            Estatus: {statusItems[investigation.estatus].label}
          </Text>
        )}

        <Text style={styles.text}>
          Nivel: {getInvestigationLevelName(investigation.nivel)}
        </Text>
        <Text style={styles.text}>Proyecto: {investigation.proyecto}</Text>
        <Text style={styles.text}>
          Inversión: ${investigation.inversion.toLocaleString()}
        </Text>

        {investigation.autores.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Autores:</Text>
            {investigation.autores.map((autor, index) => (
              <Text key={index} style={styles.text}>
                - {autor.nombre} {autor.apellido}
              </Text>
            ))}
          </View>
        )}

        {investigation.tutores.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Tutores:</Text>
            {investigation.tutores.map((tutor, index) => (
              <Text key={index} style={styles.text}>
                - {tutor.nombre} {tutor.apellido}
              </Text>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Palabras Clave:</Text>
        {investigation.keywords.length > 0 ? (
          <Text style={styles.text}>{investigation.keywords.join(", ")}</Text>
        ) : (
          <Text style={styles.text}>No keywords registradas.</Text>
        )}

        <Text style={styles.sectionTitle}>Productos:</Text>
        {investigation.productos && investigation.productos.length > 0 ? (
          investigation.productos.map((producto) => (
            <Text key={producto.id} style={styles.text}>
              - {producto.titulo}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No hay productos registrados.</Text>
        )}
      </View>
    ))}
  </View>
)
