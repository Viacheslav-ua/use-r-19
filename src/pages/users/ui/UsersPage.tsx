import { Suspense, useState } from "react"
import { fetchUsers } from "../../../shared/api"
import { CreateUserForm } from "./UserForm"
import { UsersList } from "./UsersList"


const defaultUsersPromise = fetchUsers()

export function UsersPage() {

  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise)

  const refetchUsers = () => {
    setUsersPromise(fetchUsers())
  }

  return (
    <main className="container mx-auto p-4 pt-10">
      <h1 className="text-3xl font-bold underline mb-8">Users</h1>
      <CreateUserForm refetchUsers={refetchUsers}/>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </main>

  )
}