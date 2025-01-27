import { twMerge } from "tailwind-merge"
import Entity from "../types/Entity"

const formatList = (items: string[], separator = "; ") => {
  return items.map((item, index) =>
    index !== items.length - 1 ? `${item}${separator}` : item
  )
}

const formatLinks = (items: Entity["relatedProducts"], separator = "; ") => {
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

const EntityCard = () => {
  return null
}

EntityCard.Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <h3 className={twMerge("font-semibold", className)}>{children}</h3>

EntityCard.Description = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <h3 className={twMerge("font-semibold", className)}>{children}</h3>

EntityCard.Authors = ({
  authors,
  className,
}: {
  authors: Entity["authors"]
  className?: string
}) => (
  <p className={twMerge("font-semibold", className)}>{formatList(authors)}</p>
)

EntityCard.Tutors = ({
  tutors,
  className,
}: {
  tutors: Entity["tutors"]
  className?: string
}) => (
  <p className={twMerge("font-semibold", className)}>{formatList(tutors)}</p>
)

EntityCard.RelatedProducts = ({
  products,
  className,
}: {
  products: Entity["relatedProducts"]
  className?: string
}) => (
  <p className={twMerge("font-semibold", className)}>{formatLinks(products)}</p>
)

EntityCard.Investment = ({
  investment,
  className,
}: {
  investment: Entity["investment"]
  className?: string
}) => <p className={twMerge("font-semibold", className)}>${investment}</p>

EntityCard.Dates = ({
  startDate,
  endDate,
  className,
}: {
  startDate: Entity["startDate"]
  endDate?: Entity["endDate"]
  className?: string
}) => (
  <div className={twMerge("flex flex-col font-semibold", className)}>
    <p>Fecha inicio: {startDate}</p>
    <p>Fecha final: {endDate || "--"}</p>
  </div>
)

EntityCard.Keywords = ({
  keywords,
  className,
}: {
  keywords: Entity["keywords"]
  className?: string
}) => (
  <>
    {keywords.map((keyword, index) => (
      <div
        key={index}
        className={twMerge("border border-lightblue p-1 rounded-md", className)}
      >
        <p>{keyword}</p>
      </div>
    ))}
  </>
)

export default EntityCard
