import { FC } from "react"
import { User } from "../../../shared/api"


interface UserCardProps {
  user: User
}

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <div className="border p-2 m-2 rounded bg-gray-200 flex justify-between">
      {user.email}
      <button
        type="button"
        // onClick={() => handleDelete(user.id)}
      >
        Delete
      </button>
    </div>
  )
}