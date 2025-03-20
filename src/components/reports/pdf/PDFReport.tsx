import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer"
import Button from "../../../components/common/Button"
import FilterDisplay from "./FilterDisplay"
import { useFilterContext } from "../../../components/filters/context/useFilterContext"

// Define styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  recordContainer: {
    border: "1px solid black",
    padding: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
  },
})

type RecordRenderer<T> = (records: T[]) => React.ReactNode

interface PDFProps<T> {
  data: T[]
  title: string
  filters: string[]
  recordRenderer: RecordRenderer<T>
}

// PDF Document Component (Uses a Custom Render Function)
const PDFDocument = <T,>({
  data,
  title,
  filters,
  recordRenderer,
}: PDFProps<T>) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{title}</Text>

        {/* Display applied filters */}
        {filters.length > 0 && <FilterDisplay filters={filters} />}

        {/* Display data */}
        {data.length === 0 ? (
          <Text>No hay datos disponibles para el reporte.</Text>
        ) : (
          <View>{recordRenderer(data)}</View>
        )}
      </Page>
    </Document>
  )
}

const openPDFReport = async <T,>(
  data: T[],
  title: string,
  filters: string[],
  recordRenderer: RecordRenderer<T>
) => {
  const blob = await pdf(
    <PDFDocument
      data={data}
      title={title}
      filters={filters}
      recordRenderer={recordRenderer}
    />
  ).toBlob()
  const url = URL.createObjectURL(blob)
  window.open(url, "_blank")
}

const PDFReport = <T,>({
  data,
  title,
  recordRenderer,
}: {
  data: T[]
  title: string
  recordRenderer: RecordRenderer<T>
}) => {
  const { filterQuery } = useFilterContext()

  return (
    <Button
      className="py-3"
      onClick={() => openPDFReport(data, title, filterQuery, recordRenderer)}
    >
      Generar Reporte
    </Button>
  )
}

export default PDFReport
