import { Text, View, StyleSheet } from "@react-pdf/renderer"
import { Project } from "../../../types/Project"
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

// Function to generate the summary at the top
const ProjectSummary = ({ projects }: { projects: Project[] }) => {
  const total = projects.length
  const inProgress = projects.filter(
    (proj) => proj.estatus === EntityStatus.ACTIVE
  ).length
  const finished = projects.filter(
    (proj) => proj.estatus === EntityStatus.FINISHED
  ).length
  const canceled = projects.filter(
    (proj) => proj.estatus === EntityStatus.CANCELLED
  ).length
  const inactive = projects.filter(
    (proj) => proj.estatus === EntityStatus.INACTIVE
  ).length

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>Resumen General de Proyectos</Text>
      <Text style={styles.text}>Total de Proyectos: {total}</Text>
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
    </View>
  )
}

// Function to render all projects together
export const ProjectRender = ({ projects }: { projects: Project[] }) => (
  <View style={styles.pageContainer}>
    {/* Show summary at the top */}
    <ProjectSummary projects={projects} />

    {/* Render all projects */}
    {projects.map((project) => (
      <View wrap={false} key={project.id} style={styles.container}>
        <Text style={styles.title}>{project.titulo}</Text>
        <Text style={styles.text}>
          Fecha de Creación: {project.fecha_creacion}
        </Text>
        <Text style={styles.text}>Responsable: {project.responsable}</Text>
        <Text style={styles.text}>Creador: {project.creador}</Text>

        {/* Show status unless the project is finished */}
        {project.estatus === EntityStatus.FINISHED ? (
          <Text style={styles.text}>Proyecto Finalizado</Text>
        ) : (
          <Text style={styles.text}>
            Estatus: {statusItems[project.estatus].label}
          </Text>
        )}

        {/* Thematic Areas */}
        <Text style={styles.sectionTitle}>Áreas Temáticas:</Text>
        {project.areas_tematicas.length > 0 ? (
          <Text style={styles.text}>{project.areas_tematicas}</Text>
        ) : (
          <Text style={styles.text}>No asignadas.</Text>
        )}
      </View>
    ))}
  </View>
)
