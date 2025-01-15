import { FC, useActionState } from "react"
import { Task } from "../../../shared/api/apiTasks"
import { deleteTaskAction } from "../actions/delete-task-action"

interface TaskCardProps {
  task: Task
  refetchTasks: () => void
}

export const TaskCard: FC<TaskCardProps> = ({ task, refetchTasks }) => {

  const [deleteState, handleDelete, isPending] = useActionState(
    deleteTaskAction({refetchTasks}), 
    {},
  )

  return (
    <div className="border p-2 m-2 rounded bg-gray-200 flex justify-between disabled:text-gray-400">
      {task.title}
      <form action={handleDelete}>
        <input type="hidden" name="id" value={task.id} />
        <button
          type="submit"
        disabled={isPending}
        >
          Delete
          {deleteState.error && <div className="text-red-500">{deleteState.error}</div>}
        </button>
      </form>

    </div>
  )
}