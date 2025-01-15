import { startTransition, use, useOptimistic, useState } from "react"
import { fetchUsers, User } from "../../../shared/api/apiUsers"
import { createUserAction } from "../actions/create-user-action"
import { deleteUserAction } from "../actions/delete-user-action"

const defaultUsersPromise = fetchUsers()

export const useUsers = () => {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise)

  const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()))

  const [createdUsers, optimisticCreate] = useOptimistic(
    [] as User[],
    (createdUsers, user: User) => [...createdUsers, user]
  )

  const [deletedUsersIds, optimisticDelete] = useOptimistic(
    [] as string[],
    (deletedUsersIds, id: string) => deletedUsersIds.concat(id)
  )

  const useUsersList = () => {
    const users = use(usersPromise)

    return users
      .concat(createdUsers)
      .filter(user => !deletedUsersIds.includes(user.id))
      
  }

  return {
    createUserAction: createUserAction({ refetchUsers, optimisticCreate }),
    deleteUserAction: deleteUserAction({ refetchUsers, optimisticDelete }),
    useUsersList
  }
}