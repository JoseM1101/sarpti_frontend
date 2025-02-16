import { useUsers } from "../../hooks/useUsers"

export default function UserGrid() {
  const { users } = useUsers()

  return (
    <div>
      {users.map((user) => {
        return user.correo
      })}
    </div>
  )
}
