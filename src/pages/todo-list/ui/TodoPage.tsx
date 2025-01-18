import { startTransition, Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CreateTaskForm } from "./TodoForm";
import { TasksList } from "./TodoList";
import { useParams } from "react-router-dom";
import { fetchTasks } from "../../../shared/api/apiTasks";
import { UserPreview } from "./UserPreview";

export function TodoPage() {

    const { userId } = useParams()
    if (!userId) return
    const [paginatedTasksPromise, setTaskPromise] = useState(() => fetchTasks({ filter: { userId, }}))

    const refetchTasks = () => {
      startTransition(() => setTaskPromise(fetchTasks({filter: { userId }})))
    }

    const tasksPromise = useMemo(
      () => paginatedTasksPromise.then(res => res.data),
      [paginatedTasksPromise]
    )

    return (
       <main className="container mx-auto p-4 pt-10">
         <h1 className="text-3xl font-bold underline mb-8">
          Tasks User:&nbsp; 
          <Suspense>
            <UserPreview userId={userId} />
          </Suspense>
          </h1>
         <CreateTaskForm refetchTasks={refetchTasks} userId={userId} />
         <ErrorBoundary fallbackRender={
           (e) => <div className="text-red-500">Something went wrong: {JSON.stringify(e.error)}</div>
         }>
           <Suspense fallback={<div className="text-red-600">Loading...</div>}>
             <TasksList tasksPromise={tasksPromise} refetchTasks={refetchTasks} />
           </Suspense>
         </ErrorBoundary>
   
       </main>
   
     )
}