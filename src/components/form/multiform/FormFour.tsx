import { useState, useEffect } from "react"
import { useFormContext } from "react-hook-form"

const FormFour = () => {
  const { register, setValue, getValues } = useFormContext()
  const [wordsCount, setWordsCount] = useState(1)

  const handleAddWord = () => {
    const palabras = getValues("palabras") || []
    setValue("palabras", [...palabras, ""])
    setWordsCount((prev) => prev + 1)
  }

  const handleRestWord = () => {
    if (wordsCount > 1) {
      const palabras = getValues("palabras") || []
      palabras.pop()
      setValue("palabras", palabras)
      setWordsCount((prev) => prev - 1)
    } else {
      alert("No se pueden eliminar más palabras")
    }
  }

  useEffect(() => {
    const palabras = getValues("palabras") || []
    if (palabras.length === 0) {
      setValue("palabras", Array(wordsCount).fill(""))
    }
  }, [setValue, getValues, wordsCount])

  return (
    <div className="flex flex-col gap-4">
      {[...Array(wordsCount)].map((_, index) => (
        <input
          key={index}
          type="text"
          {...register(`palabras.${index}`, { required: true })}
          placeholder="Palabra"
          className="max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}

      <button
        type="button"
        onClick={handleAddWord}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Agregar palabra
      </button>

      {wordsCount > 1 && (
        <button
          type="button"
          onClick={handleRestWord}
          className="mt-4 p-2 bg-red text-white rounded-lg"
        >
          Eliminar palabra
        </button>
      )}
    </div>
  )
}

export default FormFour
