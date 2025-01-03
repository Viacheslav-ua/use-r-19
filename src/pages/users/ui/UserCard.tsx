import { FC, useActionState } from "react"
import { User } from "../../../shared/api"
import { deleteUserAction } from "../actions/delete-user-action"


interface UserCardProps {
  user: User
  refetchUsers: () => void
}

export const UserCard: FC<UserCardProps> = ({ user, refetchUsers }) => {

  const [state, handleDelete, isPending] = useActionState(
    deleteUserAction({refetchUsers, id: user.id}), 
    {}
  )

  return (
    <div className="border p-2 m-2 rounded bg-gray-200 flex justify-between disabled:text-gray-400">
      {user.email}
      <form action={handleDelete}>
        <button
        type="submit"
        disabled={isPending}
      >
        Delete
        {state.error && <div className="text-red-500">{state.error}</div>}
      </button>
      </form>
      
    </div>
  )
}