import { use, useOptimistic } from "react"
import { User } from "../../../shared/api/apiUsers"
import { createUserAction } from "../actions/create-user-action"
import { deleteUserAction } from "../actions/delete-user-action"
import { useUsersGlobal } from "../../../entities/users"

export const useUsers = () => {
  const { usersPromise, refetchUsers } = useUsersGlobal()

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