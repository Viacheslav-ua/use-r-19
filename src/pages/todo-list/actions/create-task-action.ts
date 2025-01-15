import { startTransition } from "react";
import { createTask } from "../../../shared/api/apiTasks";

type CreateActionsState = {
  error?: string
  title?: string
};

export type CreateTaskAction = (
  state: CreateActionsState, 
  formData: FormData
) => Promise<CreateActionsState>

type CreateTaskActionParams = {
  userId: string
  refetchTasks: () => void
}

export const createTaskAction =
  ({ refetchTasks, userId }: CreateTaskActionParams): CreateTaskAction =>
  async (_, formData: FormData) => {

    const title = String(formData.get('title'))

    try {
      const task = {
        id: crypto.randomUUID(),
        title,
        done: false,
        createdAt: Date.now(),
        userId,
      }
      
      await createTask(task);
      startTransition(() => {
        refetchTasks()
      })

      return {
        title: '',
      }

    } catch {

      return { 
        error: 'Error while creating Task',
        title,
      }
    }
  };