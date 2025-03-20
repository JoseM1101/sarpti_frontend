import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"
import axios from "axios"
import Cookies from "js-cookie"

const FormTwo = () => {
  const { register, watch } = useFormContext()
  const [tutorCount, setTutorCount] = useState(1)
  const [authorCount, setAuthorCount] = useState(1)

  const [tutorVerifications, setTutorVerifications] = useState<{
    [key: string]: { isValid: boolean; nombre?: string }
  }>({})
  const [authorVerifications, setAuthorVerifications] = useState<{
    [key: string]: { isValid: boolean; nombre?: string }
  }>({})

  const verifyCedula = async (cedula: string, type: "tutor" | "author") => {
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
        } else {
          if (type === "tutor") {
            setTutorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }))
          } else {
            setAuthorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }))
          }
        }
      } catch (error) {
        console.error("Error al verificar la cédula:", error)

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          if (type === "tutor") {
            setTutorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }))
          } else {
            setAuthorVerifications((prev) => ({
              ...prev,
              [cedula]: { isValid: false, nombre: "Cédula no se encuentra" },
            }))
          }
        }
      }
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && name.startsWith("cedula-")) {
        const index = parseInt(name.split("-")[1], 10)
        const cedula = value[name]
        if (cedula && cedula.length === 8) {
          if (index < 5) {
            verifyCedula(cedula, "tutor")
          } else {
            verifyCedula(cedula, "author")
          }
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const handleAddTutor = () => {
    if (tutorCount < 4) {
      setTutorCount((prev) => prev + 1)
    } else {
      alert("No se pueden agregar más de 4 tutores.")
    }
  }

  const handleRestTutor = () => {
    if (tutorCount > 1) {
      setTutorCount((prev) => prev - 1)
    } else {
      alert("No se pueden eliminar más tutores.")
    }
  }

  const handleAddAuthor = () => {
    if (authorCount < 4) {
      setAuthorCount((prev) => prev + 1)
    } else {
      alert("No se pueden agregar más de 4 autores.")
    }
  }

  const handleRestAuthor = () => {
    if (authorCount > 1) {
      setAuthorCount((prev) => prev - 1)
    } else {
      alert("No se pueden eliminar más autores.")
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Tutores</h2>
          {[...Array(tutorCount)].map((_, index) => {
            const cedula = watch(`cedula-${index + 1}`)
            const verification = tutorVerifications[cedula]

            return (
              <div key={index} className="flex flex-col gap-3">
                <input
                  type="text"
                  {...register(`cedula-${index + 1}`, { required: true })}
                  placeholder="Cédula"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {cedula && cedula.length === 8 && (
                  <div className="flex items-center gap-2">
                    {verification ? (
                      <>
                        <span
                          style={{
                            color: verification.isValid ? "green" : "red",
                          }}
                        >
                          {verification.isValid ? "✓" : "X"}
                        </span>
                        {verification.isValid ? (
                          <span>{verification.nombre}</span>
                        ) : (
                          <span>Cédula no se encuentra</span>
                        )}
                      </>
                    ) : (
                      <span>Verificando...</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          <button
            type="button"
            onClick={handleAddTutor}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Agregar Cédula
          </button>

          {tutorCount > 1 && (
            <button
              type="button"
              onClick={handleRestTutor}
              className="mt-4 p-2 bg-red text-white rounded-lg ml-1"
            >
              Eliminar Cédula
            </button>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Autores</h2>
          {[...Array(authorCount)].map((_, index) => {
            const cedula = watch(`cedula-${index + 5}`)
            const verification = authorVerifications[cedula]

            return (
              <div key={index} className="flex flex-col gap-3">
                <input
                  type="text"
                  {...register(`cedula-${index + 5}`, { required: index < 1 })}
                  placeholder="Cédula"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                {cedula && cedula.length === 8 && (
                  <div className="flex items-center gap-2">
                    {verification ? (
                      <>
                        <span
                          style={{
                            color: verification.isValid ? "green" : "red",
                          }}
                        >
                          {verification.isValid ? "✓" : "X"}
                        </span>
                        {verification.isValid ? (
                          <span>{verification.nombre}</span>
                        ) : (
                          <span>Cédula no se encuentra</span>
                        )}
                      </>
                    ) : (
                      <span>Verificando...</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
          <button
            type="button"
            onClick={handleAddAuthor}
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
          >
            Agregar Cédula
          </button>

          {authorCount > 1 && (
            <button
              type="button"
              onClick={handleRestAuthor}
              className="mt-4 p-2 bg-red text-white rounded-lg ml-1"
            >
              Eliminar Cédula
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormTwo
