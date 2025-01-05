import { FC } from "react"
import { User } from "../../../shared/api"
import { UserCard } from "./UserCard"
import { DeleteUserAction } from "../actions/delete-user-action"


interface UsersListProps {
  useUsersList: () => User[]
  deleteUserAction: DeleteUserAction
}

export const UsersList: FC<UsersListProps> = ({ useUsersList, deleteUserAction }) => {

  const users = useUsersList()

  return (
    <div className="flex flex-col">
      {users.map(user => (
        <UserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />
      ))}
    </div>
  )
}