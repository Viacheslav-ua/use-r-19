import { Suspense, useState } from "react"
import { fetchUsers } from "../../../shared/api"
import { CreateUserForm } from "./UserForm"
import { UsersList } from "./UsersList"
import { ErrorBoundary } from "react-error-boundary"


const defaultUsersPromise = fetchUsers()

export function UsersPage() {

  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise)

  const refetchUsers = () => {
    setUsersPromise(fetchUsers())
  }

  return (
    <main className="container mx-auto p-4 pt-10">
      <h1 className="text-3xl font-bold underline mb-8">Users</h1>
      <CreateUserForm refetchUsers={refetchUsers} />
      <ErrorBoundary fallbackRender={
        (e) => <div className="text-red-500">Something went wrong: {JSON.stringify(e.error)}</div>
      }>
        <Suspense fallback={<div className="text-red-600">Loading...</div>}>
          <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
        </Suspense>
      </ErrorBoundary>

    </main>

  )
}