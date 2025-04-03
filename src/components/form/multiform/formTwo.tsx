import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"

const FormTwo = () => {
  const { register, watch, formState: { errors }, setError, clearErrors } = useFormContext()
  const [tutorCount, setTutorCount] = useState(1)
  const [authorCount, setAuthorCount] = useState(1)
  const [invalidCedulas, setInvalidCedulas] = useState<string[]>([])
  const [duplicateCedulas, setDuplicateCedulas] = useState<string[]>([])

  const [tutorVerifications, setTutorVerifications] = useState<{
    [key: string]: { isValid: boolean; nombre?: string }
  }>({})
  const [authorVerifications, setAuthorVerifications] = useState<{
    [key: string]: { isValid: boolean; nombre?: string }
  }>({})

  // Función para verificar si hay cédulas inválidas
  const hasInvalidCedulas = () => {
    return invalidCedulas.length > 0
  }

  // Función para verificar duplicados
  const checkForDuplicates = () => {
    const allCedulas: string[] = []
    const duplicates: string[] = []
    
    // Recoger todas las cédulas de tutores
    for (let i = 1; i <= tutorCount; i++) {
      const cedula = watch(`cedula-${i}`)
      if (cedula && cedula.length === 8) {
        if (allCedulas.includes(cedula)) {
          duplicates.push(cedula)
        }
        allCedulas.push(cedula)
      }
    }
    
    // Recoger todas las cédulas de autores
    for (let i = 5; i < 5 + authorCount; i++) {
      const cedula = watch(`cedula-${i}`)
      if (cedula && cedula.length === 8) {
        if (allCedulas.includes(cedula)) {
          duplicates.push(cedula)
        }
        allCedulas.push(cedula)
      }
    }
    
    setDuplicateCedulas([...new Set(duplicates)]) // Eliminar duplicados en la lista
    return duplicates.length > 0
  }

  // Función para verificar si el formulario puede avanzar
  const canProceed = () => {
    return !hasInvalidCedulas() && duplicateCedulas.length === 0
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)
    ) {
      return
    }
    
    if (!/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }

  const verifyCedula = async (cedula: string, type: "tutor" | "author", fieldName: string) => {
    if (cedula.length === 8) {
      try {
        const token = Cookies.get("token")
        const response = await axios.get(`/personas?identificacion=${cedula}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = response.data

        if (data.success && data.data.list.length > 0) {
          const persona = data.data.list[0]
          const nombreCompleto = `${persona.nombre} ${persona.apellido}`.trim()

          if (type === "tutor") {
            setTutorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: true, nombre: nombreCompleto },
            }))
          } else {
            setAuthorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: true, nombre: nombreCompleto },
            }))
          }
          // Eliminar de cédulas inválidas si estaba ahí
          setInvalidCedulas(prev => prev.filter(c => c !== cedula))
          clearErrors(fieldName)
        } else {
          // Cédula no encontrada
          if (type === "tutor") {
            setTutorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no encontrada" },
            }))
          } else {
            setAuthorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no encontrada" },
            }))
          }
          // Agregar a cédulas inválidas
          setInvalidCedulas(prev => [...prev, cedula])
        }
      } catch (error) {
        console.error("Error al verificar la cédula:", error)
        if (type === "tutor") {
          setTutorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Error al verificar" },
          }))
        } else {
          setAuthorVerifications((prev) => ({
            ...prev,
            [cedula]: { isValid: false, nombre: "Error al verificar" },
          }))
        }
        // Agregar a cédulas inválidas
        setInvalidCedulas(prev => [...prev, cedula])
        setError(fieldName, {
          type: "manual",
          message: "Error al verificar la cédula"
        })
      }
    } else if (cedula.length > 0) {
      // Cédula incompleta
      setError(fieldName, {
        type: "manual",
        message: "La cédula debe tener 8 dígitos"
      })
    } else {
      // Campo vacío
      clearErrors(fieldName)
    }
    checkForDuplicates()
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name.startsWith("cedula-")) {
        const index = parseInt(name.split("-")[1], 10)
        const cedula = value[name]
        
        // Resetear verificación cuando cambia la cédula
        if (index < 5) {
          setTutorVerifications(prev => ({...prev, [cedula]: undefined}))
        } else {
          setAuthorVerifications(prev => ({...prev, [cedula]: undefined}))
        }
        
        if (cedula) {
          if (index < 5) {
            verifyCedula(cedula, "tutor", `cedula-${index}`)
          } else {
            verifyCedula(cedula, "author", `cedula-${index}`)
          }
        } else {
          // Si el campo está vacío, limpiar errores
          clearErrors(name)
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, tutorCount, authorCount])

  const handleAddTutor = () => {
    if (tutorCount < 4) {
      setTutorCount((prev) => prev + 1)
    }
  }

  const handleRestTutor = () => {
    if (tutorCount > 1) {
      setTutorCount((prev) => prev - 1)
    }
  }

  const handleAddAuthor = () => {
    if (authorCount < 4) {
      setAuthorCount((prev) => prev + 1)
    }
  }

  const handleRestAuthor = () => {
    if (authorCount > 1) {
      setAuthorCount((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Tutores</h2>
          {[...Array(tutorCount)].map((_, index) => {
            const fieldName = `cedula-${index + 1}`
            const cedula = watch(fieldName)
            const verification = tutorVerifications[cedula]

            return (
              <div key={index} className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  {...register(fieldName, { 
                    required: "La cédula es requerida",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "La cédula solo debe contener números"
                    },
                    minLength: {
                      value: 8,
                      message: "La cédula debe tener 8 dígitos"
                    },
                    maxLength: {
                      value: 8,
                      message: "La cédula debe tener 8 dígitos"
                    },
                    validate: {
                      validCedula: () => !invalidCedulas.includes(cedula) || "Cédula no válida",
                      notDuplicate: () => !duplicateCedulas.includes(cedula) || "Cédula duplicada"
                    }
                  })}
                  onKeyDown={handleKeyDown}
                  placeholder="Cédula"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={8}
                />
                {errors[fieldName] && (
                  <span className="text-red text-sm">
                    {String(errors[fieldName]?.message)}
                  </span>
                )}
                {verification && (
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: verification.isValid ? "green" : "red" }}>
                      {verification.isValid ? "✓" : "✗"}
                    </span>
                    <span style={{ color: verification.isValid ? "inherit" : "red" }}>
                      {verification.nombre}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddTutor}
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
              disabled={tutorCount >= 4}
            >
              Agregar Tutor
            </button>
            {tutorCount > 1 && (
              <button
                type="button"
                onClick={handleRestTutor}
                className="mt-2 p-2 bg-red text-white rounded-lg"
              >
                Eliminar Tutor
              </button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Autores</h2>
          {[...Array(authorCount)].map((_, index) => {
            const fieldName = `cedula-${index + 5}`
            const cedula = watch(fieldName)
            const verification = authorVerifications[cedula]

            return (
              <div key={index} className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  {...register(fieldName, { 
                    required: "La cédula es requerida",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "La cédula solo debe contener números"
                    },
                    minLength: {
                      value: 8,
                      message: "La cédula debe tener 8 dígitos"
                    },
                    maxLength: {
                      value: 8,
                      message: "La cédula debe tener 8 dígitos"
                    },
                    validate: {
                      validCedula: () => !invalidCedulas.includes(cedula) || "Cédula no válida",
                      notDuplicate: () => !duplicateCedulas.includes(cedula) || "Cédula duplicada"
                    }
                  })}
                  onKeyDown={handleKeyDown}
                  placeholder="Cédula"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={8}
                />
                {errors[fieldName] && (
                  <span className="text-red text-sm">
                    {String(errors[fieldName]?.message)}
                  </span>
                )}
                {verification && (
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: verification.isValid ? "green" : "red" }}>
                      {verification.isValid ? "✓" : "✗"}
                    </span>
                    <span style={{ color: verification.isValid ? "inherit" : "red" }}>
                      {verification.nombre}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddAuthor}
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
              disabled={authorCount >= 4}
            >
              Agregar Autor
            </button>
            {authorCount > 1 && (
              <button
                type="button"
                onClick={handleRestAuthor}
                className="mt-2 p-2 bg-red text-white rounded-lg"
              >
                Eliminar Autor
              </button>
            )}
          </div>
        </div>
      </div>

      {hasInvalidCedulas() && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">¡Atención!</strong>
          <span className="block sm:inline"> Hay cédulas no válidas. Por favor corrige los errores antes de continuar.</span>
        </div>
      )}

      {duplicateCedulas.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">¡Atención!</strong>
          <span className="block sm:inline"> Hay cédulas duplicadas: {duplicateCedulas.join(', ')}. No puedes usar la misma cédula en múltiples campos.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!canProceed()}
        className={`mt-4 p-2 rounded-lg ${
          canProceed() 
            ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed'
        } text-white`}
      >
        Siguiente
      </button>
    </div>
  )
}

export default FormTwo