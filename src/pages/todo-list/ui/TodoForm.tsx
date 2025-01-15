import { useActionState } from "react"
import { createTaskAction } from "../actions/create-task-action"

interface CreateTaskFormParams {
 userId: string
 refetchTasks: () => void
}
export const CreateTaskForm = ({userId, refetchTasks}: CreateTaskFormParams) => {

  const [ state, dispatch, isPending ] = useActionState(
    createTaskAction({ refetchTasks, userId }),
    { title: '' }
  )

  return (
    <form action={dispatch} className="flex gap-2">
      <input
        className="border-b-2 border-gray-600 outline-none"
        placeholder="Input Title"
        name="title"
      />
      <button
        type="submit"
        defaultValue={state.title}
        className="bg-blue-500 hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded disabled:bg-gray-400"
        disabled={isPending}
      >Add</button>
      <div className="text-red-500">{state.error}</div>
    </form>
  )
}