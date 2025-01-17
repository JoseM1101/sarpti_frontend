import {Card} from "./ui/Card"
import { twMerge } from "tailwind-merge"
import Entity from "../types/Entity"
import Badge from "./ui/Badge"
import { Link } from 'react-router-dom';

interface EntityProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  className?: string
  entity: Entity
}

const formatList = (items: string[], separator = "; ") => {
  return items.map((item, index) =>
    index !== items.length - 1 ? `${item}${separator}` : item
  )
}

const formatLinks = (
  items: { title: string; url: string }[],
  separator = "; "
) => {
  return items.map((item, index) => (
    <a
      key={item.title}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.title}
      {index !== items.length - 1 && separator}
    </a>
  ))
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
    <Link to={'/ProjectPage'}>
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
                  Autores: {formatList(authors)}
                </p>
                <p className="text-sm font-semibold w-72 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                  Tutores: {formatList(tutors)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold w-64 overflow-hidden whitespace-nowrap text-ellipsis truncate">
                  Productos: {formatLinks(relatedProducts)}
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
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="border border-lightblue p-1 rounded-md"
                    >
                      <p className="text-xs">{keyword}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default EntityCard
