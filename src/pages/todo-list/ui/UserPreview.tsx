import { FC, Suspense, use } from "react"
import { useUsersGlobal } from "../../../entities/users"

export interface UserPreviewProps {
  userId: string
}

export const UserPreview: FC<UserPreviewProps> = ({ userId }) => {

  const { usersPromise } = useUsersGlobal()
  const users = use(usersPromise)

  return (
    <span className="italic">{users.find(user => user.id === userId)?.email}</span>
  )
}