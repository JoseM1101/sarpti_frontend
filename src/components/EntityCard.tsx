import Card from "./Card"
import { twMerge } from "tailwind-merge"
import Entity from "../types/Entity"
import Badge from "./Badge"

interface EntityProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const EntityCard: React.FC<EntityProps> = ({ className, entity }) => {
  const baseClasses = "w-full"
  const mergedClasses = twMerge(baseClasses, className)
  const {
    title,
    authors,
    tutors,
    relatedProducts,
    investment,
    startDate,
    endDate,
    keywords,
    currentState,
  } = entity

  return (
    <Card className={mergedClasses}>
      <Badge state={currentState} />
      <div className="p-2 flex">
        <div className="w-8/12">
          <h3 className="font-semibold w-96 overflow-hidden whitespace-nowrap text-ellipsis truncate">
            {title}
          </h3>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col">
              <p className="text-sm font-semibold w-72 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                Autores:&nbsp;
                {authors.map((author, index) => {
                  return index !== authors.length - 1 ? `${author}; ` : author
                })}
              </p>
              <p className="text-sm font-semibold w-72 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                Tutores:&nbsp;
                {tutors.map((tutor, index) => {
                  return index !== tutors.length - 1 ? `${tutor}; ` : tutor
                })}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold w-64 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                Productos:&nbsp;
                {relatedProducts.map((product, index) => {
                  return index !== relatedProducts.length - 1 ? (
                    <a key={product.title} href={product.url} target="_blank">
                      {product.title};&nbsp;
                    </a>
                  ) : (
                    <a key={product.title} href={product.url} target="_blank">
                      {product.title}
                    </a>
                  )
                })}
              </p>
              <p className="text-sm font-semibold w-64 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                Inversión: ${investment}
              </p>
            </div>
          </div>
        </div>
        <span className="mx-3 h-auto bg-black w-px"></span>
        <div className="flex-grow">
          <div className="flex flex-col font-semibold">
            <p className="text-sm">Fecha inicio: {startDate}</p>
            <p className="text-sm">Fecha final: {endDate || "--"}</p>
            <div className="flex flex-col">
              <p className="text-sm">Palabras clave:</p>
              <div className="flex gap-2 flex-wrap">
                {keywords.map((keyword) => (
                  <div className="border border-lightblue p-1 rounded-md">
                    <p className="text-xs">{keyword}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default EntityCard
