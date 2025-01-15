import { use } from "react"
import { TaskCard } from "./TodoCard"
import { Task } from "../../../shared/api/apiTasks"



interface TasksListProps {
  tasksPromise: Promise<Task[]>,
  refetchTasks: () => void
}

export const TasksList = ({tasksPromise, refetchTasks}: TasksListProps) => {

  const tasks = use(tasksPromise)

  return (
    <div className="flex flex-col">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} refetchTasks={refetchTasks} />
      ))}
    </div>
  )
}