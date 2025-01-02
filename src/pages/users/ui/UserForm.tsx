import { FC, useActionState } from "react"
import { createUserAction } from "../actions"

interface CreateUserFormProps {
  refetchUsers: () => void
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ refetchUsers }) => {

  const [state, dispatch, isPending] = useActionState(
    createUserAction({refetchUsers}), 
    {}
  )


  return (
    <form action={dispatch} className="flex gap-2">
      <input
        className="border-b-2 border-gray-600 outline-none"
        placeholder="Input Task"
        type="email"
        name="email"
        disabled={isPending}
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