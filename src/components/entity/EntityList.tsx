import ListView from "../common/ListView"
import { Entity } from "../../types/Entity"

interface EntityListProps<T> {
  entities: T[]
  renderEntity: (entity: T) => JSX.Element
}

function EntityList<T extends Entity>({
  entities,
  renderEntity,
}: EntityListProps<T>) {
  return (
    <ListView>
      {entities.map((entity) => (
        <div key={entity.id}>{renderEntity(entity)}</div>
      ))}
    </ListView>
  )
}

export default EntityList
