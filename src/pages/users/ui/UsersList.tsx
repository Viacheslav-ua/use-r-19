import { FC, use } from "react"
import { User } from "../../../shared/api"
import { UserCard } from "./UserCard"


interface UsersListProps {
  usersPromise: Promise<User[]>
}

export const UsersList: FC<UsersListProps> = ({ usersPromise }) => {

  const users = use(usersPromise)

  return (
    <div className="flex flex-col">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}