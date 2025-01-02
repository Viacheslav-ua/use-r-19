import { FC, useTransition } from "react"
import { User, deleteUser } from "../../../shared/api"


interface UserCardProps {
  user: User
  refetchUsers: () => void
}

export const UserCard: FC<UserCardProps> = ({ user, refetchUsers }) => {

  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {

    startTransition(async () => {
      await deleteUser(user.id)
      startTransition(() => refetchUsers())
    })
  }

  return (
    <div className="border p-2 m-2 rounded bg-gray-200 flex justify-between disabled:text-gray-400">
      {user.email}
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}