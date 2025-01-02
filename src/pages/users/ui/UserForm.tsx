import { FC, useState } from "react"
import { createUser } from "../../../shared/api"

interface CreateUserFormProps {
  refetchUsers: () => void
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ refetchUsers }) => {

  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createUser({
      id: crypto.randomUUID(),
      email,
    })
    refetchUsers()
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border-b-2 border-gray-600 outline-none"
        placeholder="Input Task"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded" >Add</button>
    </form>
  )
}