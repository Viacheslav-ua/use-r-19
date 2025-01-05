import { FC, useActionState } from "react"
import { User } from "../../../shared/api"
import { DeleteUserAction } from "../actions/delete-user-action"


interface UserCardProps {
  user: User
  deleteUserAction: DeleteUserAction
}

export const UserCard: FC<UserCardProps> = ({ user, deleteUserAction }) => {

  const [state, handleDelete, isPending] = useActionState(
    deleteUserAction, 
    {}
  )

  return (
    <div className="border p-2 m-2 rounded bg-gray-200 flex justify-between disabled:text-gray-400">
      {user.email}
      <form action={handleDelete}>
        <input type="hidden" name="id" value={user.id} />
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