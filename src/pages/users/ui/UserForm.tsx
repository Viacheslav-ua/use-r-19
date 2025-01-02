import { FC, startTransition, useActionState, useState } from "react"
// import { createUser } from "../../../shared/api"
import { createUserAction } from "../actions"

interface CreateUserFormProps {
  refetchUsers: () => void
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ refetchUsers }) => {

  const [email, setEmail] = useState('')
  // const [isPending, startTransition] = useTransition()
  const [state, dispatch, isPending] = useActionState(createUserAction({refetchUsers, setEmail}), {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      dispatch({email})

    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border-b-2 border-gray-600 outline-none"
        placeholder="Input Task"
        type="email"
        value={email}
        disabled={isPending}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded disabled:bg-gray-400"
        disabled={isPending}
      >Add</button>
      {state.error && <div className="text-red-500">{state.error}</div>}
    </form>
  )
}